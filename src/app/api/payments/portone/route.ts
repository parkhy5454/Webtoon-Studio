import { NextRequest, NextResponse } from "next/server";
import { ensureSchemaAndSeed, getSql, hasDatabaseUrl } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const {
      billingKey,
      webtoonId = "seoul-moon",
      customerName = "달빛 독자",
      customerEmail = "reader@example.com",
      tierName,
      priceKrw,
      referralCode = null,
    } = await req.json();

    if (!tierName || !priceKrw) {
      return NextResponse.json({ error: "필수 결제 정보가 누락되었습니다." }, { status: 400 });
    }

    const apiSecret = process.env.PORTONE_API_SECRET;
    let verifiedMode: "portone-live" | "test-fallback" = "test-fallback";

    // PortOne V2 빌링키 검증 (PORTONE_API_SECRET 설정 시 실제 API 호출)
    if (billingKey && apiSecret && !apiSecret.startsWith("your-")) {
      const verifyRes = await fetch(
        `https://api.portone.io/billing-keys/${encodeURIComponent(billingKey)}`,
        {
          headers: {
            Authorization: `PortOne ${apiSecret}`,
          },
        }
      );

      if (!verifyRes.ok) {
        const errText = await verifyRes.text();
        return NextResponse.json(
          { error: "포트원 빌링키 검증 실패", detail: errText },
          { status: 400 }
        );
      }
      verifiedMode = "portone-live";
    }

    const price = Number(priceKrw);
    const creatorShare = Math.round(price * 0.4);
    const platformShare = price - creatorShare;

    if (!hasDatabaseUrl()) {
      return NextResponse.json({
        ok: true,
        mode: verifiedMode,
        connected: false,
        message: "테스트 모드로 구독이 완료되었습니다 (Neon DB 미연결).",
      });
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
        ${billingKey || "test_billing_key"}, ${referralCode}, 'ACTIVE'
      )
      RETURNING id, tier_name, price_krw, creator_share_krw, platform_share_krw, status, created_at
    `;

    if (webtoonId) {
      await sql`
        UPDATE webtoons SET subscribers = subscribers + 1 WHERE id = ${webtoonId}
      `;
    }

    return NextResponse.json({
      ok: true,
      mode: verifiedMode,
      connected: true,
      subscription: rows[0],
    });
  } catch (error) {
    console.error("POST /api/payments/portone error:", error);
    return NextResponse.json({ error: "결제 처리 중 오류 발생" }, { status: 500 });
  }
}
