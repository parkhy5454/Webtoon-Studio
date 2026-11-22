import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { hasDatabaseUrl, getSql } from '@/lib/db';
import { createSession, ensureAuthSchema, verifyPassword, AUTH_COOKIE, sessionCookieOptions } from '@/lib/auth';

import { ADMIN_COOKIE, adminCookieOptions, startAdminSession } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해 주세요.' }, { status: 400 });
    }

    if (email.length > 254 || password.length > 200) {
      return NextResponse.json({ error: '로그인 입력값을 확인해 주세요.' }, { status: 400 });
    }
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: '로그인 서버를 사용할 수 없습니다.' }, { status: 503 });
    }
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS webtoon_login_attempts (
        bucket TEXT PRIMARY KEY, attempts INTEGER NOT NULL, expires_at TIMESTAMPTZ NOT NULL
      )
    `;
    const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const bucket = createHash('sha256').update(ip).digest('hex');
    const [limit] = await sql`
      INSERT INTO webtoon_login_attempts (bucket, attempts, expires_at)
      VALUES (${bucket}, 1, NOW() + INTERVAL '10 minutes')
      ON CONFLICT (bucket) DO UPDATE SET
        attempts = CASE WHEN webtoon_login_attempts.expires_at <= NOW() THEN 1
          ELSE LEAST(webtoon_login_attempts.attempts + 1, 31) END,
        expires_at = CASE WHEN webtoon_login_attempts.expires_at <= NOW()
          THEN EXCLUDED.expires_at ELSE webtoon_login_attempts.expires_at END
      RETURNING attempts
    `;
    if (limit.attempts > 30) {
      return NextResponse.json({ error: '로그인 시도가 많습니다. 잠시 후 다시 시도해 주세요.' },
        { status: 429, headers: { 'Retry-After': '600' } });
    }

    const admin = startAdminSession(email, password);
    if (admin) {
      const response = NextResponse.json({ user: admin.user }, { headers: { 'Cache-Control': 'private, no-store' } });
      response.cookies.set(ADMIN_COOKIE, admin.token, adminCookieOptions());
      response.cookies.set(AUTH_COOKIE, '', { ...adminCookieOptions(true) });
      return response;
    }

    await ensureAuthSchema();
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
    response.cookies.set(ADMIN_COOKIE, '', adminCookieOptions(true));
    return response;
  } catch (error) {
    console.error('POST /api/auth/login error:', error);
    return NextResponse.json({ error: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
