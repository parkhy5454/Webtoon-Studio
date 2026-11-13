import { neon } from "@neondatabase/serverless";
import { DEFAULT_COMMENTS, DEFAULT_WEBTOONS } from "./seed-data";

export function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL 환경변수가 설정되지 않았습니다.");
  }
  return neon(url);
}

let initialized = false;

export async function ensureSchemaAndSeed() {
  if (!hasDatabaseUrl()) return { connected: false };
  const sql = getSql();

  if (!initialized) {
    await sql`
      CREATE TABLE IF NOT EXISTS webtoons (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL DEFAULT '드라마',
        badge TEXT NOT NULL DEFAULT '오리지널 웹툰',
        subtitle TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        poster TEXT NOT NULL DEFAULT '/images/poster-seoul-moon.jpg',
        ep1_title TEXT NOT NULL DEFAULT '제1화',
        ep2_title TEXT NOT NULL DEFAULT '제2화',
        ep1_subtitle TEXT NOT NULL DEFAULT '웹툰 원고 뷰어',
        stats_json JSONB NOT NULL DEFAULT '{"eps":"연재중","cuts":"50컷","perk":"2주 선공개"}'::jsonb,
        characters_json JSONB NOT NULL DEFAULT '[]'::jsonb,
        cuts_json JSONB NOT NULL DEFAULT '[]'::jsonb,
        script_lines_json JSONB NOT NULL DEFAULT '[]'::jsonb,
        subscribers INTEGER NOT NULL DEFAULT 0,
        views INTEGER NOT NULL DEFAULT 0,
        likes INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        webtoon_id TEXT NOT NULL REFERENCES webtoons(id) ON DELETE CASCADE,
        author_name TEXT NOT NULL,
        tier_badge TEXT NOT NULL DEFAULT '달동네 스페셜',
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        webtoon_id TEXT REFERENCES webtoons(id) ON DELETE SET NULL,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        tier_name TEXT NOT NULL,
        price_krw INTEGER NOT NULL,
        creator_share_krw INTEGER NOT NULL,
        platform_share_krw INTEGER NOT NULL,
        billing_key TEXT,
        referral_code TEXT,
        status TEXT NOT NULL DEFAULT 'ACTIVE',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    const existing = await sql`SELECT COUNT(*)::int AS cnt FROM webtoons`;
    if (existing[0]?.cnt === 0) {
      for (const w of DEFAULT_WEBTOONS) {
        await sql`
          INSERT INTO webtoons (
            id, title, author, genre, badge, subtitle, description, poster,
            ep1_title, ep2_title, ep1_subtitle,
            stats_json, characters_json, cuts_json, script_lines_json,
            subscribers, views, likes
          ) VALUES (
            ${w.id}, ${w.title}, ${w.author}, ${w.genre}, ${w.badge}, ${w.subtitle}, ${w.description}, ${w.poster},
            ${w.ep1_title}, ${w.ep2_title}, ${w.ep1_subtitle},
            ${JSON.stringify(w.stats)}::jsonb,
            ${JSON.stringify(w.characters)}::jsonb,
            ${JSON.stringify(w.cuts)}::jsonb,
            ${JSON.stringify(w.script_lines)}::jsonb,
            ${w.subscribers}, ${w.views}, ${w.likes}
          )
          ON CONFLICT (id) DO NOTHING
        `;
      }

      for (const c of DEFAULT_COMMENTS) {
        await sql`
          INSERT INTO comments (webtoon_id, author_name, tier_badge, content)
          VALUES (${c.webtoon_id}, ${c.author_name}, ${c.tier_badge}, ${c.content})
        `;
      }
    }

    initialized = true;
  }

  return { connected: true };
}
