import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { hasDatabaseUrl, getSql } from '@/lib/db';
import { createSession, hashPassword, AUTH_COOKIE, sessionCookieOptions } from '@/lib/auth';

import { ensureReferralSchema, normalizeReferralCode } from '@/lib/referrals';

import { ADMIN_COOKIE, adminCookieOptions } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: '서버에 DATABASE_URL이 설정되지 않았습니다.' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const displayName = String(body.displayName || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const role = body.role === 'creator' ? 'creator' : body.role === 'reader' ? 'reader' : null;

    if (!displayName || displayName.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || !role) {
      return NextResponse.json({ error: '이름, 이메일, 가입 유형을 확인해 주세요.' }, { status: 400 });
    }
    if (password.length < 8 || password.length > 200) {
      return NextResponse.json({ error: '비밀번호는 8자 이상 입력해 주세요.' }, { status: 400 });
    }

    const referralCode = normalizeReferralCode(body.referralCode);
    await ensureReferralSchema();
    const sql = getSql();
    const id = randomUUID();
    const passwordHash = await hashPassword(password);
    const rows = await sql`
      WITH new_user AS (
        INSERT INTO webtoon_users (id, role, display_name, email, password_hash)
        VALUES (${id}, ${role}, ${displayName}, ${email}, ${passwordHash})
        ON CONFLICT (email) DO NOTHING
        RETURNING id, role, display_name, email, created_at
      ), referral AS (
        INSERT INTO webtoon_referrals (invitee_id, inviter_id)
        SELECT new_user.id, codes.user_id
        FROM new_user JOIN webtoon_referral_codes codes ON codes.code = ${referralCode}::uuid
      )
      SELECT * FROM new_user
    `;
    if (!rows[0]) {
      return NextResponse.json({ error: '이미 가입된 이메일입니다. 로그인 탭을 이용해 주세요.' }, { status: 409 });
    }

    const row = rows[0] as { id: string; role: 'reader' | 'creator'; display_name: string; email: string; created_at: Date | string };
    const { token, expiresAt } = await createSession(row.id);
    const response = NextResponse.json({
      user: {
        id: row.id,
        role: row.role,
        displayName: row.display_name,
        email: row.email,
        joinedAt: new Date(row.created_at).toLocaleDateString('ko-KR'),
      },
    }, { status: 201 });
    response.cookies.set(AUTH_COOKIE, token, sessionCookieOptions(expiresAt));
    response.cookies.set(ADMIN_COOKIE, '', adminCookieOptions(true));
    return response;
  } catch (error) {
    console.error('POST /api/auth/signup error:', error);
    return NextResponse.json({ error: '회원가입 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
