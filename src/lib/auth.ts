import { createHash, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import type { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';

const scrypt = promisify(nodeScrypt);
export const AUTH_COOKIE = 'webtoon_session';
const SESSION_DAYS = 30;

export interface PublicUser {
  id: string;
  role: 'reader' | 'creator';
  displayName: string;
  email: string;
  joinedAt: string;
}

export async function ensureAuthSchema() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_users (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL CHECK (role IN ('reader', 'creator')),
      display_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES webtoon_users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS webtoon_sessions_user_id_idx ON webtoon_sessions(user_id)`;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_assets (
      id TEXT PRIMARY KEY,
      uploader_user_id TEXT NOT NULL REFERENCES webtoon_users(id) ON DELETE CASCADE,
      file_name TEXT NOT NULL,
      content_type TEXT NOT NULL,
      data_base64 TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_creator_works (
      id TEXT PRIMARY KEY,
      author_id TEXT NOT NULL REFERENCES webtoon_users(id) ON DELETE CASCADE,
      payload JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_hidden_works (
      work_id TEXT PRIMARY KEY REFERENCES webtoon_creator_works(id) ON DELETE CASCADE
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS webtoon_creator_works_author_idx ON webtoon_creator_works(author_id)`;
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt.toString('hex')}:${derived.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(':');
  if (!saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = (await scrypt(password, Buffer.from(saltHex, 'hex'), expected.length)) as Buffer;
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

const digestToken = (token: string) => createHash('sha256').update(token).digest('hex');

export async function createSession(userId: string) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const sql = getSql();
  await sql`
    INSERT INTO webtoon_sessions (token_hash, user_id, expires_at)
    VALUES (${digestToken(token)}, ${userId}, ${expiresAt.toISOString()})
  `;
  return { token, expiresAt };
}

export async function getSessionUser(request: NextRequest): Promise<PublicUser | null> {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  const sql = getSql();
  const rows = await sql`
    SELECT u.id, u.role, u.display_name, u.email, u.created_at
    FROM webtoon_sessions s
    JOIN webtoon_users u ON u.id = s.user_id
    WHERE s.token_hash = ${digestToken(token)} AND s.expires_at > NOW()
    LIMIT 1
  `;
  const row = rows[0] as
    | { id: string; role: 'reader' | 'creator'; display_name: string; email: string; created_at: Date | string }
    | undefined;
  if (!row) return null;
  return {
    id: row.id,
    role: row.role,
    displayName: row.display_name,
    email: row.email,
    joinedAt: new Date(row.created_at).toLocaleDateString('ko-KR'),
  };
}

export async function revokeSession(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (!token) return;
  const sql = getSql();
  await sql`DELETE FROM webtoon_sessions WHERE token_hash = ${digestToken(token)}`;
}

export const sessionCookieOptions = (expires: Date) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  expires,
});
