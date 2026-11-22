import { ensureLibrarySchema } from '@/lib/reader-library';
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getPaidWorks } from '@/lib/work-payments';
import { getReferralWorks } from '@/lib/referral-access';
import { getSql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const privateHeaders = { 'Cache-Control': 'private, no-store' };
function reply(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: privateHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return reply({ error: '로그인이 필요합니다.' }, 401);
    await ensureLibrarySchema();
    const sql = getSql();
    const entries = await sql`
      SELECT work_id AS "workId", saved, last_episode AS "episode", last_cut AS cut, updated_at AS "updatedAt", saved_at AS "savedAt"
      FROM webtoon_reader_library WHERE user_id = ${user.id}
      ORDER BY COALESCE(last_read_at, updated_at) DESC
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
    const unlocked = episode !== null && episode > 5
      && ([...await getPaidWorks(user.id), ...await getReferralWorks(user.id)]).includes(workId);
    const cut = Number.isInteger(body.cut) ? Math.max(0, Math.min(10000, body.cut)) : 0;
    const [entry] = await sql`
      INSERT INTO webtoon_reader_library (user_id, work_id, saved, last_episode, read_first, read_second, last_cut, last_read_at, saved_at)
      SELECT ${user.id}, w.id, COALESCE(${saved}::boolean, FALSE), ${episode}::int,
        COALESCE(${episode}::int = 1, FALSE), COALESCE(${episode}::int = 2, FALSE), ${cut},
        CASE WHEN ${episode}::int IS NOT NULL THEN NOW() END,
        CASE WHEN ${saved}::boolean THEN NOW() END
      FROM webtoon_creator_works w
      WHERE w.id = ${workId} AND NOT EXISTS (SELECT 1 FROM webtoon_hidden_works h WHERE h.work_id = w.id) AND (
        ${episode}::int IS NULL OR (
          (${episode}::int <= 5 OR ${unlocked}::boolean OR w.author_id = ${user.id}) AND
          jsonb_path_exists(w.payload, '$.episodes[*] ? (@.num == $number && (!exists(@.releaseAt) || (@.releaseAt > 0 && @.releaseAt <= $now)))', jsonb_build_object('number', ${episode}::int, 'now', EXTRACT(EPOCH FROM NOW()) * 1000), true)
        )
      )
      ON CONFLICT (user_id, work_id) DO UPDATE SET
        saved = COALESCE(${saved}::boolean, webtoon_reader_library.saved),
        last_episode = COALESCE(EXCLUDED.last_episode, webtoon_reader_library.last_episode),
        read_first = webtoon_reader_library.read_first OR EXCLUDED.read_first,
        read_second = webtoon_reader_library.read_second OR EXCLUDED.read_second,
        last_cut = CASE WHEN EXCLUDED.last_episode IS NULL THEN webtoon_reader_library.last_cut ELSE EXCLUDED.last_cut END,
        last_read_at = COALESCE(EXCLUDED.last_read_at, webtoon_reader_library.last_read_at),
        saved_at = CASE WHEN webtoon_reader_library.saved THEN webtoon_reader_library.saved_at ELSE EXCLUDED.saved_at END,
        updated_at = NOW()
      RETURNING work_id AS "workId", saved, last_episode AS "episode", last_cut AS cut, updated_at AS "updatedAt", saved_at AS "savedAt"
    `;
    return entry ? reply({ entry }) : reply({ error: '작품이나 열람할 수 있는 회차를 찾지 못했습니다.' }, 404);
  } catch (error) {
    console.error('POST /api/library failed:', error);
    return reply({ error: '읽기 기록을 저장하지 못했습니다.' }, 500);
  }
}
