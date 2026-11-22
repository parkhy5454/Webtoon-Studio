import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE = 'webtoon_admin_session';
const sessionSeconds = 8 * 60 * 60;

function settings() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 20 || password.trim() !== password) return null;
  return { email, password };
}

function equal(left: string, right: string) {
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(left), digest(right));
}

function user(email: string) {
  return { id: 'admin-master', role: 'admin' as const, displayName: '총괄 관리자', email, joinedAt: '' };
}

function sign(payload: string, config: NonNullable<ReturnType<typeof settings>>) {
  return createHmac('sha256', config.password)
    .update('webtoon-admin-session:v1:' + config.email + ':' + payload)
    .digest('base64url');
}

export function startAdminSession(email: string, password: string) {
  const config = settings();
  if (!config || !equal(email, config.email) || !equal(password, config.password)) return null;
  const payload = Math.floor(Date.now() / 1000 + sessionSeconds) + '.' + randomBytes(24).toString('base64url');
  return { token: payload + '.' + sign(payload, config), user: user(config.email) };
}

export function getAdminSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const config = settings();
  if (!token || !config) return null;
  const match = /^(\d{10})\.([A-Za-z0-9_-]{32})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match || Number(match[1]) <= Date.now() / 1000) return null;
  if (!equal(match[3], sign(match[1] + '.' + match[2], config))) return null;
  return user(config.email);
}

export function adminCookieOptions(clear = false) {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const,
    path: '/', maxAge: clear ? 0 : sessionSeconds };
}
