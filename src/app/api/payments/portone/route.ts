import { getReferralWorks } from '@/lib/referral-access';
import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getSql } from '@/lib/db';
import { ensurePaymentSchema, getPaidWorks, paymentConfig, PASS_DAYS, PASS_PRICE, verifyWorkPayment } from '@/lib/work-payments';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const enabled = process.env.PAYMENTS_ENABLED === 'true' && !!paymentConfig();
  try {
    const user = await getSessionUser(request);
    return NextResponse.json({ enabled, price: PASS_PRICE, days: PASS_DAYS,
      paidWorks: user ? [...await getPaidWorks(user.id), ...await getReferralWorks(user.id)] : [],
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch {
    return NextResponse.json({ error: '이용권을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const config = paymentConfig();
  try {
    const user = await getSessionUser(request);
    if (!user) return NextResponse.json({ error: '로그인 후 이용권을 구매해 주세요.' }, { status: 401 });
    const body = await request.json();
    if (body?.action === 'confirm' && config && typeof body.paymentId === 'string' &&
        /^workpass-[a-f0-9-]{36}$/.test(body.paymentId)) {
      const result = await verifyWorkPayment(body.paymentId, user.id);
      return result ? NextResponse.json(result) : NextResponse.json({ error: '주문을 찾지 못했습니다.' }, { status: 404 });
    }

    if (!config || process.env.PAYMENTS_ENABLED !== 'true') {
      return NextResponse.json({ error: '결제 서비스는 준비 중입니다.' }, { status: 503 });
    }
    const workId = typeof body?.workId === 'string' ? body.workId : '';
    if (body?.action !== 'start' || !workId || workId.length > 200) {
      return NextResponse.json({ error: '구매할 작품을 확인해 주세요.' }, { status: 400 });
    }
    if ((await getReferralWorks(user.id)).includes(workId)) {
      return NextResponse.json({ error: '이미 무료 이용권을 사용 중인 작품입니다.' }, { status: 409 });
    }
    await ensurePaymentSchema();
    const sql = getSql();
    const [work] = await sql`
      SELECT id, LEFT(payload->>'title', 70) AS title FROM webtoon_creator_works
      WHERE id = ${workId} AND author_id <> ${user.id}
       AND jsonb_path_exists(payload, '$.episodes[*] ? (@.num > 5)')
    `;
    if (!work?.title) return NextResponse.json({ error: '구매할 수 있는 작품을 찾지 못했습니다.' }, { status: 404 });
    const [, orders] = await sql.transaction([
      sql`SELECT pg_advisory_xact_lock(hashtextextended(${'paid-work:' + user.id + ':' + workId}, 0))`,
      sql`
      INSERT INTO webtoon_payment_orders (id, user_id, work_id, amount, pass_days)
      SELECT ${'workpass-' + randomUUID()}, ${user.id}, ${workId}, ${PASS_PRICE}, ${PASS_DAYS}
      WHERE NOT EXISTS (
        SELECT 1 FROM webtoon_payment_orders WHERE user_id = ${user.id} AND work_id = ${workId}
        AND status IN ('PAID', 'PARTIAL_CANCELLED') AND expires_at > NOW()
      )
      ON CONFLICT (user_id, work_id) WHERE status = 'PENDING' DO UPDATE SET user_id = EXCLUDED.user_id
      RETURNING id, amount
      `,
    ]);
    const [order] = orders;
    if (!order) return NextResponse.json({ error: '이미 이용 중인 작품입니다.' }, { status: 409 });
    return NextResponse.json({
      paymentId: order.id, orderName: work.title + ' 작품 이용권', totalAmount: order.amount,
      storeId: config.storeId, channelKey: config.channelKey, currency: 'KRW', payMethod: 'CARD',
    });
  } catch {
    console.error('PortOne order processing failed');
    return NextResponse.json({ error: '주문 확인 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
