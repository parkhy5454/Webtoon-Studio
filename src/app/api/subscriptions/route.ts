import { NextRequest, NextResponse } from "next/server";
import { ensureSchemaAndSeed, getSql, hasDatabaseUrl } from "@/lib/db";

export async function GET() {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({
        connected: false,
        subscriptions: [],
        summary: {
          totalSubscriptions: 142,
          monthlyRevenueKrw: 142 * 4900,
          creatorShareKrw: Math.round(142 * 4900 * 0.4),
          platformShareKrw: Math.round(142 * 4900 * 0.6),
        },
      });
    }

    await ensureSchemaAndSeed();
    const sql = getSql();
    const rows = await sql`
      SELECT id, webtoon_id, customer_name, customer_email, tier_name,
             price_krw, creator_share_krw, platform_share_krw,
             referral_code, status, created_at
      FROM subscriptions
      ORDER BY created_at DESC
      LIMIT 50
    `;

    const agg = await sql`
      SELECT
        COUNT(*)::int AS cnt,
        COALESCE(SUM(price_krw), 0)::int AS total_price,
        COALESCE(SUM(creator_share_krw), 0)::int AS total_creator,
        COALESCE(SUM(platform_share_krw), 0)::int AS total_platform
      FROM subscriptions
      WHERE status = 'ACTIVE'
    `;

    const s = agg[0] || { cnt: 0, total_price: 0, total_creator: 0, total_platform: 0 };

    return NextResponse.json({
      connected: true,
      subscriptions: rows,
      summary: {
        totalSubscriptions: s.cnt,
        monthlyRevenueKrw: s.total_price,
        creatorShareKrw: s.total_creator,
        platformShareKrw: s.total_platform,
      },
    });
  } catch (error) {
    console.error("GET /api/subscriptions error:", error);
    return NextResponse.json({ error: "구독 현황 조회 실패" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      webtoonId = "seoul-moon",
      customerName = "구독자",
      customerEmail = "reader@example.com",
      tierName,
      priceKrw,
      billingKey = null,
      referralCode = null,
    } = body;

    if (!tierName || !priceKrw) {
      return NextResponse.json(
        { error: "구독 요금제 정보가 필요합니다." },
        { status: 400 }
      );
    }

    const price = Number(priceKrw);
    const creatorShare = Math.round(price * 0.4);
    const platformShare = price - creatorShare;

    if (!hasDatabaseUrl()) {
      return NextResponse.json(
        {
          connected: false,
          subscription: {
            id: Date.now(),
            webtoon_id: webtoonId,
            customer_name: customerName,
            customer_email: customerEmail,
            tier_name: tierName,
            price_krw: price,
            creator_share_krw: creatorShare,
            platform_share_krw: platformShare,
            billing_key: billingKey,
            referral_code: referralCode,
            status: "ACTIVE",
            created_at: new Date().toISOString(),
          },
        },
        { status: 201 }
      );
    }

    await ensureSchemaAndSeed();
    const sql = getSql();
    const rows = await sql`
      INSERT INTO subscriptions (
        webtoon_id, customer_name, customer_email, tier_name,
        price_krw, creator_share_krw, platform_share_krw,
        billing_key, referral_code, status
      ) VALUES (
        ${webtoonId}, ${customerName}, ${customerEmail}, ${tierName},
        ${price}, ${creatorShare}, ${platformShare},
        ${billingKey}, ${referralCode}, 'ACTIVE'
      )
      RETURNING id, webtoon_id, customer_name, customer_email, tier_name,
                price_krw, creator_share_krw, platform_share_krw,
                referral_code, status, created_at
    `;

    if (webtoonId) {
      await sql`
        UPDATE webtoons SET subscribers = subscribers + 1 WHERE id = ${webtoonId}
      `;
    }

    return NextResponse.json({ connected: true, subscription: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("POST /api/subscriptions error:", error);
    return NextResponse.json({ error: "구독 저장 실패" }, { status: 500 });
  }
}
