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
        SET payload = EXCLUDED.payload, updated_at = NOW()
        WHERE webtoon_creator_works.author_id = EXCLUDED.author_id
      `;
    }
    return NextResponse.json({ saved: ownWorks.length });
  } catch (error) {
    console.error('POST /api/creator/works error:', error);
    return NextResponse.json({ error: '작품 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
