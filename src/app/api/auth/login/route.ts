import { NextRequest, NextResponse } from 'next/server';
import { hasDatabaseUrl, getSql } from '@/lib/db';
import { createSession, ensureAuthSchema, verifyPassword, AUTH_COOKIE, sessionCookieOptions } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: '서버에 DATABASE_URL이 설정되지 않았습니다.' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해 주세요.' }, { status: 400 });
    }

    await ensureAuthSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT id, role, display_name, email, password_hash, created_at
      FROM webtoon_users WHERE email = ${email} LIMIT 1
    `;
    const row = rows[0] as
      | { id: string; role: 'reader' | 'creator'; display_name: string; email: string; password_hash: string; created_at: Date | string }
      | undefined;
    const valid = row ? await verifyPassword(password, row.password_hash) : false;
    if (!row || !valid) {
      return NextResponse.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    const { token, expiresAt } = await createSession(row.id);
    const response = NextResponse.json({
      user: {
        id: row.id,
        role: row.role,
        displayName: row.display_name,
        email: row.email,
        joinedAt: new Date(row.created_at).toLocaleDateString('ko-KR'),
      },
    });
    response.cookies.set(AUTH_COOKIE, token, sessionCookieOptions(expiresAt));
    return response;
  } catch (error) {
    console.error('POST /api/auth/login error:', error);
    return NextResponse.json({ error: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
