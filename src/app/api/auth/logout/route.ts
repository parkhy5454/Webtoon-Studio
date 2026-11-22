import { NextRequest, NextResponse } from 'next/server';
import { hasDatabaseUrl } from '@/lib/db';
import { AUTH_COOKIE, ensureAuthSchema, revokeSession } from '@/lib/auth';

import { ADMIN_COOKIE, adminCookieOptions } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    if (hasDatabaseUrl()) {
      await ensureAuthSchema();
      await revokeSession(request);
    }
  } catch (error) {
    console.error('POST /api/auth/logout error:', error);
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  response.cookies.set(ADMIN_COOKIE, '', adminCookieOptions(true));
  return response;
}
