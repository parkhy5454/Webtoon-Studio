import { NextRequest, NextResponse } from 'next/server';
import { hasDatabaseUrl } from '@/lib/db';
import { ensureAuthSchema, getSessionUser } from '@/lib/auth';

import { getAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const admin = getAdminSession(request);
  if (admin) return NextResponse.json({ user: admin }, { headers: { 'Cache-Control': 'private, no-store' } });
  if (!hasDatabaseUrl()) return NextResponse.json({ user: null });
  try {
    await ensureAuthSchema();
    return NextResponse.json({ user: await getSessionUser(request) });
  } catch (error) {
    console.error('GET /api/auth/me error:', error);
    return NextResponse.json({ error: '로그인 상태 조회 실패' }, { status: 500 });
  }
}
