import { getSql } from '@/lib/db';
import { ensureReferralSchema } from '@/lib/referrals';
import { ensurePaymentSchema } from '@/lib/work-payments';

async function createSchema() {
  await ensurePaymentSchema();
  await ensureReferralSchema();
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_referral_programs (
      work_id TEXT PRIMARY KEY REFERENCES webtoon_creator_works(id),
      monthly_limit INTEGER NOT NULL CHECK (monthly_limit BETWEEN 0 AND 500)
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_referral_redemptions (
      invitee_id TEXT NOT NULL,
      recipient_id TEXT NOT NULL,
      work_id TEXT NOT NULL REFERENCES webtoon_creator_works(id),
      redeemed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
      PRIMARY KEY (invitee_id, recipient_id),
      FOREIGN KEY (invitee_id, recipient_id) REFERENCES webtoon_referral_rewards(invitee_id, recipient_id) ON DELETE CASCADE
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS webtoon_redemption_work_idx ON webtoon_referral_redemptions(work_id, redeemed_at)`;
}
let schema: Promise<void> | undefined;
export function ensureReferralAccessSchema() {
  schema ??= createSchema().catch((error) => { schema = undefined; throw error; });
  return schema;
}

export async function getReferralWorks(userId: string) {
  await ensureReferralAccessSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT DISTINCT redemption.work_id
    FROM webtoon_referral_redemptions redemption
    JOIN webtoon_referrals referral ON referral.invitee_id = redemption.invitee_id
    JOIN webtoon_payment_orders payment ON payment.id = referral.first_payment_id
    WHERE redemption.recipient_id = ${userId}
      AND redemption.expires_at > NOW() AND payment.status IN ('PAID', 'PARTIAL_CANCELLED')
  `;
  return rows.map((row) => String(row.work_id));
}
