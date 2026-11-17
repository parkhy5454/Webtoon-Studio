import { NextRequest, NextResponse } from 'next/server';
import { hasDatabaseUrl, getSql } from '@/lib/db';
import { ensureAuthSchema, getSessionUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: '서버에 DATABASE_URL이 설정되지 않았습니다.' }, { status: 503 });
  }
  try {
    await ensureAuthSchema();
    const user = await getSessionUser(request);
    if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    const sql = getSql();
    await sql`UPDATE webtoon_users SET role = 'creator' WHERE id = ${user.id}`;
    return NextResponse.json({ user: { ...user, role: 'creator' } });
  } catch (error) {
    console.error('POST /api/auth/upgrade error:', error);
    return NextResponse.json({ error: '작가 계정 전환 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
