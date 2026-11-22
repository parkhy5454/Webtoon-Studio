import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getSql } from '@/lib/db';
import { ensureReferralAccessSchema } from '@/lib/referral-access';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    const body = await request.json();
    const workId = typeof body?.workId === 'string' ? body.workId : '';
    if (!workId || workId.length > 200) return NextResponse.json({ error: '작품을 확인해 주세요.' }, { status: 400 });
    await ensureReferralAccessSchema();
    const sql = getSql();
    if (body.action === 'configure') {
      const limit = body.monthlyLimit;
      if (user.role !== 'creator' || !Number.isInteger(limit) || limit < 0 || limit > 500) {
        return NextResponse.json({ error: '월 한도는 0~500 사이로 설정해 주세요.' }, { status: 400 });
      }
      const [program] = await sql`
        INSERT INTO webtoon_referral_programs (work_id, monthly_limit)
        SELECT id, ${limit} FROM webtoon_creator_works WHERE id = ${workId} AND author_id = ${user.id}
        ON CONFLICT(work_id) DO UPDATE SET monthly_limit = EXCLUDED.monthly_limit
        RETURNING work_id
      `;
      return NextResponse.json({ saved: !!program }, { status: program ? 200 : 404 });
    }
    if (body.action !== 'redeem') return NextResponse.json({ error: '이용권 요청을 확인해 주세요.' }, { status: 400 });
    const [, , rows] = await sql.transaction([
      sql`SELECT pg_advisory_xact_lock(hashtextextended(${'reward-user:' + user.id}, 0))`,
      sql`SELECT pg_advisory_xact_lock(hashtextextended(${'reward-work:' + workId}, 0))`,
      sql`
        INSERT INTO webtoon_referral_redemptions (invitee_id, recipient_id, work_id)
        SELECT reward.invitee_id, reward.recipient_id, program.work_id
        FROM webtoon_referral_rewards reward
        JOIN webtoon_referrals referral ON referral.invitee_id = reward.invitee_id
        JOIN webtoon_payment_orders payment ON payment.id = referral.first_payment_id
        JOIN webtoon_referral_programs program ON program.work_id = ${workId}
        JOIN webtoon_creator_works work ON work.id = program.work_id
        WHERE reward.recipient_id = ${user.id} AND work.author_id <> ${user.id}
          AND payment.status IN ('PAID', 'PARTIAL_CANCELLED')
          AND NOT EXISTS (SELECT 1 FROM webtoon_hidden_works hidden WHERE hidden.work_id = work.id)
          AND jsonb_path_exists(work.payload, '$.episodes[*] ? (@.num > 5 && (!exists(@.releaseAt) || (@.releaseAt > 0 && @.releaseAt <= $now)))', jsonb_build_object('now', EXTRACT(EPOCH FROM NOW()) * 1000))
          AND NOT EXISTS (SELECT 1 FROM webtoon_referral_redemptions used
            WHERE used.invitee_id = reward.invitee_id AND used.recipient_id = reward.recipient_id)
          AND NOT EXISTS (SELECT 1 FROM webtoon_referral_redemptions active
            WHERE active.work_id = program.work_id AND active.recipient_id = reward.recipient_id AND active.expires_at > NOW())
          AND NOT EXISTS (SELECT 1 FROM webtoon_payment_orders active
            WHERE active.work_id = program.work_id AND active.user_id = reward.recipient_id
            AND active.status IN ('PAID', 'PARTIAL_CANCELLED') AND active.expires_at > NOW())
          AND program.monthly_limit > (SELECT count(*) FROM webtoon_referral_redemptions monthly
            WHERE monthly.work_id = program.work_id
              AND monthly.redeemed_at >= (date_trunc('month', NOW() AT TIME ZONE 'Asia/Seoul') AT TIME ZONE 'Asia/Seoul'))
        ORDER BY reward.earned_at, reward.invitee_id LIMIT 1
        ON CONFLICT DO NOTHING
        RETURNING expires_at
      `,
    ]);
    if (!rows.length) return NextResponse.json({ error: '사용 가능한 보상이나 이 작품의 이번 달 제공 한도가 없습니다.' }, { status: 409 });
    return NextResponse.json({ expiresAt: rows[0].expires_at });
  } catch {
    console.error('Referral redemption request failed');
    return NextResponse.json({ error: '추천 이용권 처리에 실패했습니다.' }, { status: 500 });
  }
}
