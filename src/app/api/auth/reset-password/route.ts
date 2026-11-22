import { createHash, randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { ensureAuthSchema, hashPassword } from '@/lib/auth';
import { getSql } from '@/lib/db';

export const runtime = 'nodejs';

const digest = (token: string) => createHash('sha256').update(token).digest('hex');

async function prepare() {
  await ensureAuthSchema();
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_password_resets (
      user_id TEXT PRIMARY KEY REFERENCES webtoon_users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL
    )
  `;
  return sql;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sql = await prepare();
    if (body?.action === 'request') {
      const apiKey = process.env.RESEND_API_KEY;
      const from = process.env.RESET_FROM_EMAIL;
      const origin = process.env.RESET_PUBLIC_ORIGIN;
      if (!apiKey || !from || !origin) {
        return NextResponse.json({ error: '이메일을 통한 비밀번호 재설정은 준비 중입니다.' }, { status: 503 });
      }

      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
      if (email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) {
        return NextResponse.json({ error: '이메일을 확인해 주세요.' }, { status: 400 });
      }
      const url = new URL('/reset-password', origin);
      if (url.protocol !== 'https:') throw new Error('Reset origin must use HTTPS');
      const token = randomBytes(32).toString('base64url');
      const tokenHash = digest(token);
      const rows = await sql`
        INSERT INTO webtoon_password_resets (user_id, token_hash, expires_at)
        SELECT id, ${tokenHash}, NOW() + INTERVAL '30 minutes'
        FROM webtoon_users WHERE email = ${email}
        ON CONFLICT (user_id) DO UPDATE SET token_hash = EXCLUDED.token_hash,
          created_at = NOW(), expires_at = EXCLUDED.expires_at
          WHERE webtoon_password_resets.created_at <= NOW() - INTERVAL '5 minutes'
        RETURNING user_id
      `;
      if (rows.length) {
        url.hash = new URLSearchParams({ token }).toString();
        try {
          const sent = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              from, to: [email], subject: '웹툰스튜디오 비밀번호 재설정',
              text: `아래 링크에서 30분 안에 새 비밀번호를 설정해 주세요.\n${url}\n요청한 적이 없다면 이 메일을 무시하세요.`,
            }),
          });
          if (!sent.ok) throw new Error('Email provider rejected the request');
        } catch {
          await sql`DELETE FROM webtoon_password_resets WHERE token_hash = ${tokenHash}`;
          console.error('Password reset email could not be sent');
        }
      }
      return NextResponse.json({ ok: true });
    }

    const token = typeof body?.token === 'string' ? body.token : '';
    const password = typeof body?.password === 'string' ? body.password.trim() : '';
    if (body?.action !== 'confirm' || !/^[A-Za-z0-9_-]{43}$/.test(token) || password.length < 8 || password.length > 200) {
      return NextResponse.json({ error: '재설정 링크와 새 비밀번호(8자 이상)를 확인해 주세요.' }, { status: 400 });
    }
    const tokenHash = digest(token);
    const valid = await sql`
      SELECT 1 FROM webtoon_password_resets WHERE token_hash = ${tokenHash} AND expires_at > NOW()
    `;
    if (!valid.length) return NextResponse.json({ error: '만료되었거나 이미 사용한 링크입니다.' }, { status: 400 });
    const hash = await hashPassword(password);
    const updated = await sql`
      WITH redeemed AS (
        DELETE FROM webtoon_password_resets WHERE token_hash = ${tokenHash} AND expires_at > NOW()
        RETURNING user_id
      ), changed AS (
        UPDATE webtoon_users SET password_hash = ${hash}
        FROM redeemed WHERE webtoon_users.id = redeemed.user_id
        RETURNING webtoon_users.id
      ), revoked AS (
        DELETE FROM webtoon_sessions USING changed WHERE webtoon_sessions.user_id = changed.id
      )
      SELECT id FROM changed
    `;
    if (!updated.length) return NextResponse.json({ error: '만료되었거나 이미 사용한 링크입니다.' }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    console.error('Password reset request failed');
    return NextResponse.json({ error: '비밀번호 재설정 중 문제가 발생했습니다.' }, { status: 500 });
  }
}
