import { ensureLibrarySchema } from '@/lib/reader-library';
import { ensureReferralAccessSchema, getReferralWorks } from '@/lib/referral-access';
import { NextRequest, NextResponse } from 'next/server';
import { getSql, hasDatabaseUrl } from '@/lib/db';
import { ensureAuthSchema, getSessionUser } from '@/lib/auth';

import { getPaidWorks } from '@/lib/work-payments';
import { getAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type CreatorWorkPayload = Record<string, unknown> & {
  id: string;
  authorId: string;
};

export async function GET(request: NextRequest) {
  if (!hasDatabaseUrl()) return NextResponse.json({ works: [] });
  try {
    await ensureLibrarySchema();
    const sql = getSql();
    const admin = getAdminSession(request);
    const user = admin ? null : await getSessionUser(request);
    const rows = await sql`
      SELECT author_id, payload, created_at, updated_at,
        (SELECT count(*)::int FROM webtoon_reader_library l WHERE l.work_id = w.id AND l.user_id <> w.author_id
          AND (l.last_read_at >= NOW() - INTERVAL '7 days' OR (l.saved AND l.saved_at >= NOW() - INTERVAL '7 days'))) AS popularity
      FROM webtoon_creator_works w
      WHERE NOT EXISTS (SELECT 1 FROM webtoon_hidden_works h WHERE h.work_id = w.id AND h.deleted_by_author)
        AND (NOT EXISTS (SELECT 1 FROM webtoon_hidden_works h WHERE h.work_id = w.id)
          OR ${Boolean(admin)} OR author_id = ${user?.id ?? null})
      ORDER BY created_at ASC
    `;
    const paidWorks = new Set(user ? [...await getPaidWorks(user.id), ...await getReferralWorks(user.id)] : []);
    const now = Date.now();
    const works = rows.map(({ author_id, payload, created_at, updated_at, popularity }) => {
      const own = !!admin || user?.id === author_id;
      const episodes: { num: number; title: string; cuts: unknown; releaseAt?: number }[] = Array.isArray(payload?.episodes) ? payload.episodes : [];
      episodes.sort((a, b) => (a?.num ?? 0) - (b?.num ?? 0));
      const visible = episodes.filter((ep) => ep && (ep.releaseAt == null || (ep.releaseAt > 0 && ep.releaseAt <= now)));
      const canRead = own || paidWorks.has(payload?.id);
      return {
        ...payload, popularity, createdAt: created_at, updatedAt: updated_at,
        latestRelease: Math.max(0, ...visible.map((ep) => Number(ep.releaseAt) || 0)),
        episodes: (own ? episodes : visible).map((ep) =>
          canRead ? ep : { num: ep.num, title: ep.title, cuts: ep.num >= 1 && ep.num <= 5 ? ep.cuts : [] }),
      };
    });
    return NextResponse.json({ works }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('GET /api/creator/works error:', error);
    return NextResponse.json({ error: '작품 목록을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: 'DATABASE_URL이 설정되지 않았습니다.' }, { status: 503 });
  }
  try {
    await ensureAuthSchema();
    const user = await getSessionUser(request);
    if (!user || user.role !== 'creator') {
      return NextResponse.json({ error: '창작자 로그인 후 작품을 저장해 주세요.' }, { status: 401 });
    }
    const body = await request.json();
    const works: unknown[] = Array.isArray(body.works) ? body.works.slice(0, 100) : [];
    const ownWorks = works.filter((item): item is CreatorWorkPayload => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
      const work = item as Record<string, unknown>;
      return typeof work.id === 'string' && work.authorId === user.id;
    });
    const sql = getSql();
    for (const work of ownWorks) {
      await sql`
        INSERT INTO webtoon_creator_works (id, author_id, payload)
        VALUES (${work.id}, ${user.id}, ${JSON.stringify(work)}::jsonb)
        ON CONFLICT (id) DO UPDATE
        SET payload = jsonb_set(
          EXCLUDED.payload, '{genre}',
          COALESCE(webtoon_creator_works.payload->'genre', EXCLUDED.payload->'genre', '"드라마"'::jsonb)
        ), updated_at = NOW()
        WHERE webtoon_creator_works.author_id = EXCLUDED.author_id AND ${body.importOnly !== true}
      `;
    }
    return NextResponse.json({ saved: ownWorks.length });
  } catch (error) {
    console.error('POST /api/creator/works error:', error);
    return NextResponse.json({ error: '작품 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

const allowedGenres = new Set<string>(['로맨스', '로맨스판타지', '판타지', '액션', '미스터리·추리', '스릴러', '코미디', 'SF', '시대극', '드라마', '일상', '기업']);

export async function PATCH(request: NextRequest) {
  if (!hasDatabaseUrl()) return NextResponse.json({ error: '작품 저장 서버를 사용할 수 없습니다.' }, { status: 503 });
  try {
    await ensureAuthSchema();
    const user = await getSessionUser(request);
    if (user?.role !== 'creator') {
      return NextResponse.json({ error: '작가 계정으로 로그인해 주세요.' }, { status: 401 });
    }
    const body = await request.json().catch(() => null);
    if (typeof body?.id === 'string' && typeof body.completed === 'boolean') {
      const [work] = await getSql()`
        UPDATE webtoon_creator_works SET payload = jsonb_set(payload, '{completed}', to_jsonb(${body.completed}::boolean))
        WHERE id = ${body.id} AND author_id = ${user.id} RETURNING id
      `;
      return NextResponse.json({ saved: !!work }, { status: work ? 200 : 404 });
    }
    if (typeof body?.id === 'string' && body.episode) {
      const episode = body.episode;
      if (!Number.isSafeInteger(episode.num) || episode.num < 1 || episode.num > 2147483647 ||
          typeof episode.title !== 'string' || !episode.title.trim() ||
          !Array.isArray(episode.cuts) || !Number.isSafeInteger(episode.releaseAt) || episode.releaseAt < 0 ||
          typeof body.editing !== 'boolean') {
        return NextResponse.json({ error: '회차 번호와 내용을 확인해 주세요.' }, { status: 400 });
      }
      const data = JSON.stringify(episode);
      const cover = episode.releaseAt > 0 && episode.releaseAt <= Date.now() && typeof episode.cuts[0]?.img === 'string'
        ? episode.cuts[0].img : '';
      const [updated] = await getSql()`
        UPDATE webtoon_creator_works
        SET payload = jsonb_set(
          jsonb_set(payload, '{episodes}', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb)
            FROM jsonb_array_elements(COALESCE(payload->'episodes', '[]'::jsonb)) AS item
            WHERE item->'num' IS DISTINCT FROM to_jsonb(${episode.num}::int)
          ) || jsonb_build_array(${data}::jsonb)),
          '{coverImg}', to_jsonb(COALESCE(NULLIF(payload->>'coverImg', ''), ${cover}::text))
        ), updated_at = NOW()
        WHERE id = ${body.id} AND author_id = ${user.id}
          AND jsonb_path_exists(
            COALESCE(payload->'episodes', '[]'::jsonb),
            '$[*] ? (@.num == $number)', jsonb_build_object('number', ${episode.num}::int)
          ) = ${body.editing}::boolean
        RETURNING payload->'episodes' AS episodes, payload->>'coverImg' AS "coverImg"
      `;
      if (!updated) return NextResponse.json({
        error: body.editing ? '수정할 회차를 찾을 수 없습니다.' : '이미 같은 번호의 회차가 있거나 작품을 찾을 수 없습니다.',
      }, { status: 409 });
      return NextResponse.json(updated);
    }
    const genres: unknown = body?.genres;
    if (typeof body?.id !== 'string' || !Array.isArray(genres) || genres.length < 1 ||
        genres.length > 2 || new Set(genres).size !== genres.length ||
        !genres.every((genre) => typeof genre === 'string' && allowedGenres.has(genre))) {
      return NextResponse.json({ error: '장르를 1~2개 선택해 주세요.' }, { status: 400 });
    }
    const genre = genres.join(' · ');
    const sql = getSql();
    const rows = await sql`
      UPDATE webtoon_creator_works
      SET payload = jsonb_set(payload, '{genre}', to_jsonb(${genre}::text)), updated_at = NOW()
      WHERE id = ${body.id} AND author_id = ${user.id}
      RETURNING id
    `;
    if (!rows.length) return NextResponse.json({ error: '수정할 작품을 찾을 수 없습니다.' }, { status: 404 });
    return NextResponse.json({ genre });
  } catch (error) {
    console.error('PATCH /api/creator/works error:', error);
    return NextResponse.json({ error: '장르를 저장하지 못했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (user?.role !== 'creator') return NextResponse.json({ error: '작가 로그인이 필요합니다.' }, { status: 401 });
    const id = request.nextUrl.searchParams.get('id');
    if (!id || id.length > 200) return NextResponse.json({ error: '삭제할 작품을 확인해 주세요.' }, { status: 400 });
    await ensureReferralAccessSchema();
    const sql = getSql();
    const [work] = await sql`
      SELECT id FROM webtoon_creator_works WHERE id = ${id} AND author_id = ${user.id}
    `;
    if (!work) return NextResponse.json({ error: '삭제할 작품을 찾을 수 없습니다.' }, { status: 404 });

    const rows = await sql`
      INSERT INTO webtoon_hidden_works (work_id, deleted_by_author)
      SELECT w.id, TRUE FROM webtoon_creator_works w
      WHERE w.id = ${id} AND w.author_id = ${user.id}
        AND NOT EXISTS (
          SELECT 1 FROM webtoon_payment_orders p WHERE p.work_id = w.id
            AND ((p.status IN ('PAID', 'PARTIAL_CANCELLED') AND p.expires_at > NOW())
              OR (p.status = 'PENDING' AND p.created_at > NOW() - INTERVAL '30 minutes'))
        )
        AND NOT EXISTS (
          SELECT 1 FROM webtoon_referral_redemptions r
          JOIN webtoon_referrals f ON f.invitee_id = r.invitee_id
          JOIN webtoon_payment_orders p ON p.id = f.first_payment_id
          WHERE r.work_id = w.id AND r.expires_at > NOW() AND p.status IN ('PAID', 'PARTIAL_CANCELLED')
        )
      ON CONFLICT (work_id) DO UPDATE SET deleted_by_author = TRUE
      RETURNING work_id
    `;
    if (!rows.length) return NextResponse.json({ error: '사용 중인 이용권이나 진행 중인 결제가 있어 삭제할 수 없습니다.' }, { status: 409 });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error('DELETE /api/creator/works error:', error);
    return NextResponse.json({ error: '작품을 삭제하지 못했습니다. 다시 시도해 주세요.' }, { status: 500 });
  }
}
