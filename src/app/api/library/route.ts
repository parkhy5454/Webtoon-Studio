import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, ensureAuthSchema } from '@/lib/auth';
import { getSql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const privateHeaders = { 'Cache-Control': 'private, no-store' };
function reply(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: privateHeaders });
}

async function ensureLibrarySchema() {
  await ensureAuthSchema();
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_reader_library (
      user_id TEXT NOT NULL REFERENCES webtoon_users(id) ON DELETE CASCADE,
      work_id TEXT NOT NULL REFERENCES webtoon_creator_works(id) ON DELETE CASCADE,
      saved BOOLEAN NOT NULL DEFAULT FALSE,
      last_episode INTEGER,
      read_first BOOLEAN NOT NULL DEFAULT FALSE,
      read_second BOOLEAN NOT NULL DEFAULT FALSE,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, work_id)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS webtoon_reader_library_work_idx ON webtoon_reader_library(work_id)`;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return reply({ error: '로그인이 필요합니다.' }, 401);
    await ensureLibrarySchema();
    const sql = getSql();
    const entries = await sql`
      SELECT work_id AS "workId", saved, last_episode AS "episode"
      FROM webtoon_reader_library WHERE user_id = ${user.id}
      ORDER BY updated_at DESC
    `;
    const stats = user.role === 'creator' ? await sql`
      SELECT w.id AS "workId",
        count(*) FILTER (WHERE l.read_first)::int AS "firstReaders",
        count(*) FILTER (WHERE l.read_first AND l.read_second)::int AS "secondReaders",
        count(*) FILTER (WHERE l.saved)::int AS "saves"
      FROM webtoon_creator_works w
      LEFT JOIN webtoon_reader_library l ON l.work_id = w.id AND l.user_id <> w.author_id
      WHERE w.author_id = ${user.id}
      GROUP BY w.id
    ` : [];
    return reply({ entries, stats });
  } catch (error) {
    console.error('GET /api/library failed:', error);
    return reply({ error: '읽기 기록을 불러오지 못했습니다.' }, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return reply({ error: '로그인이 필요합니다.' }, 401);
    const body = await request.json();
    const workId = typeof body?.workId === 'string' ? body.workId : '';
    const saved = typeof body?.saved === 'boolean' ? body.saved : null;
    const episode = Number.isInteger(body?.episode) && body.episode >= 1 && body.episode <= 2147483647
      ? Number(body.episode) : null;
    if (!workId || workId.length > 200 || (saved === null) === (episode === null)) {
      return reply({ error: '작품과 저장 내용을 확인해 주세요.' }, 400);
    }
    await ensureLibrarySchema();
    const sql = getSql();
    const [entry] = await sql`
      INSERT INTO webtoon_reader_library (user_id, work_id, saved, last_episode, read_first, read_second)
      SELECT ${user.id}, w.id, COALESCE(${saved}::boolean, FALSE), ${episode}::int,
        COALESCE(${episode}::int = 1, FALSE), COALESCE(${episode}::int = 2, FALSE)
      FROM webtoon_creator_works w
      WHERE w.id = ${workId} AND (
        ${episode}::int IS NULL OR (
          (${episode}::int <= 5 OR w.author_id = ${user.id}) AND
          jsonb_path_exists(w.payload, '$.episodes[*] ? (@.num == $number)', jsonb_build_object('number', ${episode}::int), true)
        )
      )
      ON CONFLICT (user_id, work_id) DO UPDATE SET
        saved = COALESCE(${saved}::boolean, webtoon_reader_library.saved),
        last_episode = COALESCE(EXCLUDED.last_episode, webtoon_reader_library.last_episode),
        read_first = webtoon_reader_library.read_first OR EXCLUDED.read_first,
        read_second = webtoon_reader_library.read_second OR EXCLUDED.read_second,
        updated_at = NOW()
      RETURNING work_id AS "workId", saved, last_episode AS "episode"
    `;
    return entry ? reply({ entry }) : reply({ error: '작품이나 열람할 수 있는 회차를 찾지 못했습니다.' }, 404);
  } catch (error) {
    console.error('POST /api/library failed:', error);
    return reply({ error: '읽기 기록을 저장하지 못했습니다.' }, 500);
  }
}
