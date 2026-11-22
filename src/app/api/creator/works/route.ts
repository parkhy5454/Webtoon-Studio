import { NextRequest, NextResponse } from 'next/server';
import { getSql, hasDatabaseUrl } from '@/lib/db';
import { ensureAuthSchema, getSessionUser } from '@/lib/auth';

export const runtime = 'nodejs';

type CreatorWorkPayload = Record<string, unknown> & {
  id: string;
  authorId: string;
};

export async function GET() {
  if (!hasDatabaseUrl()) return NextResponse.json({ works: [] });
  try {
    await ensureAuthSchema();
    const sql = getSql();
    const rows = await sql`SELECT payload FROM webtoon_creator_works ORDER BY created_at ASC`;
    return NextResponse.json({ works: rows.map((row) => row.payload) });
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
