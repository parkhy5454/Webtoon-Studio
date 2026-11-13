import { NextRequest, NextResponse } from "next/server";
import { ensureSchemaAndSeed, getSql, hasDatabaseUrl } from "@/lib/db";
import { DEFAULT_COMMENTS } from "@/lib/seed-data";

export async function GET(req: NextRequest) {
  const webtoonId = req.nextUrl.searchParams.get("webtoonId") || "seoul-moon";
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({
        connected: false,
        comments: DEFAULT_COMMENTS.filter((c) => c.webtoon_id === webtoonId),
      });
    }

    await ensureSchemaAndSeed();
    const sql = getSql();
    const rows = await sql`
      SELECT id, webtoon_id, author_name, tier_badge, content, created_at
      FROM comments
      WHERE webtoon_id = ${webtoonId}
      ORDER BY created_at DESC
      LIMIT 50
    `;
    return NextResponse.json({ connected: true, comments: rows });
  } catch (error) {
    console.error("GET /api/comments error:", error);
    return NextResponse.json({ connected: false, comments: DEFAULT_COMMENTS }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { webtoonId = "seoul-moon", authorName, tierBadge = "달동네 스페셜", content } =
      await req.json();

    if (!authorName || !content) {
      return NextResponse.json(
        { error: "닉네임과 응원 메시지를 입력해 주세요." },
        { status: 400 }
      );
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json(
        {
          connected: false,
          comment: {
            id: Date.now(),
            webtoon_id: webtoonId,
            author_name: authorName,
            tier_badge: tierBadge,
            content,
            created_at: new Date().toISOString(),
          },
        },
        { status: 201 }
      );
    }

    await ensureSchemaAndSeed();
    const sql = getSql();
    const rows = await sql`
      INSERT INTO comments (webtoon_id, author_name, tier_badge, content)
      VALUES (${webtoonId}, ${authorName}, ${tierBadge}, ${content})
      RETURNING id, webtoon_id, author_name, tier_badge, content, created_at
    `;

    return NextResponse.json({ connected: true, comment: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json({ error: "댓글 등록 실패" }, { status: 500 });
  }
}
