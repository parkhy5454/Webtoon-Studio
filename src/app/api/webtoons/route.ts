import { NextResponse } from "next/server";
import { ensureSchemaAndSeed, getSql, hasDatabaseUrl } from "@/lib/db";
import { DEFAULT_WEBTOONS } from "@/lib/seed-data";

export async function GET() {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ connected: false, webtoons: DEFAULT_WEBTOONS });
    }

    await ensureSchemaAndSeed();
    const sql = getSql();
    const rows = await sql`
      SELECT
        id, title, author, genre, badge, subtitle, description, poster,
        ep1_title, ep2_title, ep1_subtitle,
        stats_json AS stats,
        characters_json AS characters,
        cuts_json AS cuts,
        script_lines_json AS script_lines,
        subscribers, views, likes
      FROM webtoons
      ORDER BY created_at ASC
    `;

    return NextResponse.json({ connected: true, webtoons: rows });
  } catch (error) {
    console.error("GET /api/webtoons error:", error);
    return NextResponse.json(
      { connected: false, webtoons: DEFAULT_WEBTOONS, error: "웹툰 목록 조회 실패" },
      { status: 500 }
    );
  }
}

export function POST() {
  return NextResponse.json({ error: '작품 등록은 작가 스튜디오를 이용해 주세요.' }, { status: 410 });
}
