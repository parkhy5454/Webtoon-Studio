import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      author,
      genre = "드라마",
      subtitle = "",
      description = "",
      poster = "/images/poster-seoul-moon.jpg",
      ep1Title = "제1화",
      cuts = [],
    } = body;

    if (!title || !author) {
      return NextResponse.json(
        { error: "작품명과 작가명을 모두 입력해 주세요." },
        { status: 400 }
      );
    }

    const id = `wt-${Date.now()}`;
    const newWebtoon = {
      id,
      title,
      author,
      genre,
      badge: "신규 창작자 오리지널 연재작",
      subtitle: subtitle || `${author} 작가의 새로운 이야기`,
      description: description || `${title} — 웹툰스튜디오스 독점 연재작.`,
      poster,
      ep1_title: ep1Title,
      ep2_title: "제2화 (연재 예정)",
      ep1_subtitle: "웹툰 원고 뷰어",
      stats: { eps: "연재 시작", cuts: `${Math.max(1, cuts.length)}컷`, perk: "2주 선공개" },
      characters: [],
      cuts:
        cuts.length > 0
          ? cuts
          : [{ img: poster, caption: `[컷 1] ${title} 제1화 오프닝 컷` }],
      script_lines: [
        {
          cut: "컷 1~10",
          scene: `${title} 첫 번째 장면`,
          dialogue: `${author}: 독자 여러분, 첫 화를 공개합니다!`,
        },
      ],
      subscribers: 0,
      views: 1,
      likes: 0,
    };

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ connected: false, webtoon: newWebtoon }, { status: 201 });
    }

    await ensureSchemaAndSeed();
    const sql = getSql();
    await sql`
      INSERT INTO webtoons (
        id, title, author, genre, badge, subtitle, description, poster,
        ep1_title, ep2_title, ep1_subtitle,
        stats_json, characters_json, cuts_json, script_lines_json,
        subscribers, views, likes
      ) VALUES (
        ${newWebtoon.id}, ${newWebtoon.title}, ${newWebtoon.author}, ${newWebtoon.genre},
        ${newWebtoon.badge}, ${newWebtoon.subtitle}, ${newWebtoon.description}, ${newWebtoon.poster},
        ${newWebtoon.ep1_title}, ${newWebtoon.ep2_title}, ${newWebtoon.ep1_subtitle},
        ${JSON.stringify(newWebtoon.stats)}::jsonb,
        ${JSON.stringify(newWebtoon.characters)}::jsonb,
        ${JSON.stringify(newWebtoon.cuts)}::jsonb,
        ${JSON.stringify(newWebtoon.script_lines)}::jsonb,
        0, 1, 0
      )
    `;

    return NextResponse.json({ connected: true, webtoon: newWebtoon }, { status: 201 });
  } catch (error) {
    console.error("POST /api/webtoons error:", error);
    return NextResponse.json({ error: "작품 등록 중 오류가 발생했습니다." }, { status: 500 });
  }
}
