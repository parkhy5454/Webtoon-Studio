import { NextRequest, NextResponse } from 'next/server';
import { hasDatabaseUrl } from '@/lib/db';
import { ensureAuthSchema, getSessionUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!hasDatabaseUrl()) return NextResponse.json({ user: null });
  try {
    await ensureAuthSchema();
    return NextResponse.json({ user: await getSessionUser(request) });
  } catch (error) {
    console.error('GET /api/auth/me error:', error);
    return NextResponse.json({ error: '로그인 상태 조회 실패' }, { status: 500 });
  }
}
