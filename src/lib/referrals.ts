import { ensureAuthSchema } from '@/lib/auth';
import { getSql } from '@/lib/db';

export function normalizeReferralCode(value: unknown): string | null {
  return typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
    ? value.toLowerCase()
    : null;
}

async function createReferralTables() {
  await ensureAuthSchema();
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_referral_codes (
      user_id TEXT PRIMARY KEY REFERENCES webtoon_users(id) ON DELETE CASCADE,
      code UUID NOT NULL UNIQUE
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_referrals (
      invitee_id TEXT PRIMARY KEY REFERENCES webtoon_users(id) ON DELETE CASCADE,
      inviter_id TEXT NOT NULL REFERENCES webtoon_users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      first_payment_id TEXT UNIQUE,
      first_paid_at TIMESTAMPTZ,
      CHECK (invitee_id <> inviter_id)
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_referral_rewards (
      invitee_id TEXT NOT NULL REFERENCES webtoon_referrals(invitee_id) ON DELETE CASCADE,
      recipient_id TEXT NOT NULL REFERENCES webtoon_users(id) ON DELETE CASCADE,
      earned_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (invitee_id, recipient_id)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS webtoon_referrals_inviter_idx ON webtoon_referrals(inviter_id)`;
  await sql`CREATE INDEX IF NOT EXISTS webtoon_referral_rewards_recipient_idx ON webtoon_referral_rewards(recipient_id)`;
}

let schemaReady: Promise<void> | undefined;

export function ensureReferralSchema(): Promise<void> {
  schemaReady ??= createReferralTables().catch((error) => {
    schemaReady = undefined;
    throw error;
  });
  return schemaReady;
}

// Call only from the server after verifying a successful paid order with the PG
// and confirming from the payment ledger that this is the account's first payment.
// Use the canonical payment ID from that ledger, never a client-provided ID.
export async function recordVerifiedFirstPayment(
  inviteeId: string,
  paymentId: string,
  paidAt: Date,
): Promise<number> {
  await ensureReferralSchema();
  const sql = getSql();
  const rewards = await sql`
    WITH confirmed AS (
      UPDATE webtoon_referrals
      SET first_payment_id = ${paymentId}, first_paid_at = ${paidAt.toISOString()}::timestamptz
      WHERE invitee_id = ${inviteeId}
        AND first_payment_id IS NULL
        AND created_at <= ${paidAt.toISOString()}::timestamptz
      RETURNING invitee_id, inviter_id
    )
    INSERT INTO webtoon_referral_rewards (invitee_id, recipient_id)
    SELECT invitee_id, inviter_id FROM confirmed
    UNION ALL
    SELECT invitee_id, invitee_id FROM confirmed
    RETURNING recipient_id
  `;
  return rewards.length;
}
