import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getSql } from '@/lib/db';
import { ensureReferralSchema } from '@/lib/referrals';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

    await ensureReferralSchema();
    const sql = getSql();
    await sql`
      INSERT INTO webtoon_referral_codes (user_id, code)
      VALUES (${user.id}, ${randomUUID()})
      ON CONFLICT (user_id) DO NOTHING
    `;
    const [summary] = await sql`
      SELECT code,
        (SELECT count(*)::int FROM webtoon_referrals WHERE inviter_id = ${user.id}) AS "signups",
        (SELECT count(*)::int FROM webtoon_referrals
          WHERE inviter_id = ${user.id} AND first_payment_id IS NOT NULL) AS "paid",
        (SELECT count(*)::int FROM webtoon_referral_rewards WHERE recipient_id = ${user.id}) AS "rewards"
      FROM webtoon_referral_codes WHERE user_id = ${user.id}
    `;
    return NextResponse.json(summary, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('GET /api/referrals error:', error);
    return NextResponse.json({ error: '초대 정보를 불러오지 못했습니다.' }, { status: 500 });
  }
}
