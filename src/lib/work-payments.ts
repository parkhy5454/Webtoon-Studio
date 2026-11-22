import { PaymentClient } from '@portone/server-sdk';
import { ensureAuthSchema } from '@/lib/auth';
import { getSql } from '@/lib/db';
import { recordVerifiedFirstPayment } from '@/lib/referrals';

export const PASS_PRICE = 2900;
export const PASS_DAYS = 30;

export function paymentConfig() {
  const storeId = process.env.PORTONE_STORE_ID;
  const secret = process.env.PORTONE_API_SECRET;
  const channelKey = process.env.PORTONE_CHANNEL_KEY;
  const webhookSecret = process.env.PORTONE_WEBHOOK_SECRET;
  if (!storeId || !secret || !channelKey || !webhookSecret) return null;
  return { storeId, secret, channelKey, webhookSecret };
}

async function createPaymentSchema() {
  await ensureAuthSchema();
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_payment_orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES webtoon_users(id),
      work_id TEXT NOT NULL REFERENCES webtoon_creator_works(id),
      amount INTEGER NOT NULL CHECK (amount > 0),
      pass_days SMALLINT NOT NULL CHECK (pass_days > 0),
      status TEXT NOT NULL DEFAULT 'PENDING',
      refunded INTEGER NOT NULL DEFAULT 0,
      fees INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      provider_updated_at TIMESTAMPTZ,
      paid_at TIMESTAMPTZ,
      expires_at TIMESTAMPTZ
    )
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS webtoon_pending_order_idx
    ON webtoon_payment_orders(user_id, work_id) WHERE status = 'PENDING'
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS webtoon_payment_owner_idx
    ON webtoon_payment_orders(user_id, work_id, expires_at)
  `;
}

let schema: Promise<void> | undefined;
export function ensurePaymentSchema() {
  schema ??= createPaymentSchema().catch((error) => {
    schema = undefined;
    throw error;
  });
  return schema;
}

export async function getPaidWorks(userId: string) {
  await ensurePaymentSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT DISTINCT work_id FROM webtoon_payment_orders
    WHERE user_id = ${userId} AND status IN ('PAID', 'PARTIAL_CANCELLED') AND expires_at > NOW()
  `;
  return rows.map((row) => String(row.work_id));
}

export async function verifyWorkPayment(paymentId: string, userId?: string) {
  const config = paymentConfig();
  if (!config) throw new Error('PortOne credentials unavailable');
  await ensurePaymentSchema();
  const sql = getSql();
  const [order] = await sql`
    SELECT id, amount, user_id, work_id FROM webtoon_payment_orders
    WHERE id = ${paymentId} AND (${userId ?? null}::text IS NULL OR user_id = ${userId ?? null})
  `;
  if (!order) return null;

  const client = PaymentClient({ storeId: config.storeId, secret: config.secret });
  const payment = await client.getPayment({ paymentId });
  if (!('status' in payment) ||
    (payment.status !== 'PAID' && payment.status !== 'PARTIAL_CANCELLED' &&
      payment.status !== 'CANCELLED' && payment.status !== 'FAILED')) {
    return { status: 'PENDING' };
  }

  if (payment.id !== order.id || payment.storeId !== config.storeId ||
      payment.channel?.key !== config.channelKey ||
      payment.currency !== 'KRW' || payment.amount.total !== order.amount) {
    throw new Error('PortOne payment did not match the stored order');
  }
  const paidAt = 'paidAt' in payment ? payment.paidAt ?? null : null;
  const [, updatedRows] = await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(hashtextextended(${'paid-work:' + order.user_id + ':' + order.work_id}, 0))`,
    sql`
    UPDATE webtoon_payment_orders SET
      status = ${payment.status}, refunded = ${payment.amount.cancelled},
      provider_updated_at = ${payment.updatedAt}::timestamptz,
      paid_at = COALESCE(${paidAt}::timestamptz, paid_at),
      expires_at = COALESCE(expires_at, ${paidAt}::timestamptz + MAKE_INTERVAL(days => pass_days))
    WHERE id = ${paymentId} AND
      (provider_updated_at IS NULL OR provider_updated_at <= ${payment.updatedAt}::timestamptz)
    RETURNING status
    `,
  ]);
  const [updated] = updatedRows;
  const [first] = await sql`
    SELECT id, paid_at, status FROM webtoon_payment_orders WHERE user_id = ${order.user_id} AND paid_at IS NOT NULL
    ORDER BY paid_at, id LIMIT 1
  `;
  if (first && (first.status === 'PAID' || first.status === 'PARTIAL_CANCELLED')) {
    await recordVerifiedFirstPayment(order.user_id, first.id, new Date(first.paid_at));
  }
  return { status: updated?.status ?? 'PENDING' };
}
