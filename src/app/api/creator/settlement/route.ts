import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { getSessionUser } from '@/lib/auth';
import { getSql } from '@/lib/db';
import { ensureReferralAccessSchema } from '@/lib/referral-access';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const headers = { 'Cache-Control': 'private, no-store' };
  try {
    const user = await getSessionUser(request);
    if (user?.role !== 'creator') return NextResponse.json({ error: '작가 로그인이 필요합니다.' }, { status: 401, headers });
    await ensureReferralAccessSchema();
    const sql = getSql();
    const reports = await sql`
      WITH month AS (SELECT date_trunc('month', NOW() AT TIME ZONE 'Asia/Seoul') AT TIME ZONE 'Asia/Seoul' AS start_at)
      SELECT work.id AS "workId",
        COALESCE((SELECT program.monthly_limit FROM webtoon_referral_programs program WHERE program.work_id = work.id), 0) AS "referralLimit",
        (SELECT count(*)::int FROM webtoon_referral_redemptions used WHERE used.work_id = work.id AND used.redeemed_at >= month.start_at) AS "referralUses",
        (SELECT count(DISTINCT receipt.user_id)::int FROM webtoon_payment_orders receipt WHERE receipt.work_id = work.id
          AND receipt.status IN ('PAID', 'PARTIAL_CANCELLED') AND receipt.expires_at > NOW()) AS "paidReaders",
        (SELECT count(*)::int FROM webtoon_payment_orders receipt WHERE receipt.work_id = work.id AND receipt.paid_at >= month.start_at
          AND receipt.status IN ('PAID', 'PARTIAL_CANCELLED') AND receipt.fees IS NULL) AS "pendingFees",
        (SELECT COALESCE(SUM(ROUND(GREATEST(receipt.amount - receipt.refunded - receipt.fees, 0) * 0.7)), 0)::text
          FROM webtoon_payment_orders receipt WHERE receipt.work_id = work.id AND receipt.paid_at >= month.start_at
          AND receipt.status IN ('PAID', 'PARTIAL_CANCELLED') AND receipt.fees IS NOT NULL) AS "creatorShare"
      FROM webtoon_creator_works work CROSS JOIN month WHERE work.author_id = ${user.id}
    `;
    return NextResponse.json({ reports }, { headers });
  } catch {
    console.error('Creator settlement read failed');
    return NextResponse.json({ error: '정산 현황을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Record the actual fee from the PG statement, never a browser-estimated percentage.
  if (!getAdminSession(request)) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
  try {
    const body = await request.json();
    const id = typeof body?.paymentId === 'string' ? body.paymentId : '';
    const fees = body?.fees;
    if (!/^workpass-[a-f0-9-]{36}$/.test(id) || !Number.isInteger(fees) || fees < 0) {
      return NextResponse.json({ error: '결제 번호와 실제 수수료를 확인해 주세요.' }, { status: 400 });
    }
    await ensureReferralAccessSchema();
    const sql = getSql();
    const rows = await sql`
      UPDATE webtoon_payment_orders SET fees = ${fees}
      WHERE id = ${id} AND paid_at IS NOT NULL AND amount >= ${fees}
      RETURNING id
    `;
    return NextResponse.json({ saved: !!rows.length }, { status: rows.length ? 200 : 404 });
  } catch {
    console.error('Creator settlement fee recording failed');
    return NextResponse.json({ error: '수수료를 저장하지 못했습니다.' }, { status: 500 });
  }
}
