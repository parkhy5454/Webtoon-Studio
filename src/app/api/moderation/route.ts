import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { ensureAuthSchema, getSessionUser } from '@/lib/auth';
import { getSql } from '@/lib/db';

export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'private, no-store' };
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers });

async function prepare() {
  await ensureAuthSchema();
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_discussion (
      id BIGSERIAL PRIMARY KEY, work_id TEXT NOT NULL REFERENCES webtoon_creator_works(id),
      author_id TEXT NOT NULL REFERENCES webtoon_users(id), episode INTEGER NOT NULL,
      content TEXT NOT NULL, hidden BOOLEAN DEFAULT FALSE, created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_reports (
      id BIGSERIAL PRIMARY KEY, reporter TEXT NOT NULL REFERENCES webtoon_users(id),
      kind TEXT NOT NULL, target TEXT NOT NULL, reason TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open', created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (reporter, kind, target)
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_moderation_log (
      id BIGSERIAL PRIMARY KEY, report_id BIGINT NOT NULL REFERENCES webtoon_reports(id),
      action TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  return sql;
}

export async function GET(request: NextRequest) {
  try {
    const sql = await prepare();
    if (request.nextUrl.searchParams.get('queue') === '1') {
      if (!getAdminSession(request)) return reply({}, 403);
      const reports = await sql`
        SELECT r.id::text, r.kind, r.target, r.reason, r.status,
          CASE WHEN r.kind = 'work' THEN w.payload->>'title' ELSE d.content END AS preview,
          COALESCE((SELECT jsonb_agg(jsonb_build_object('action', log.action, 'at', log.created_at) ORDER BY log.id DESC)
            FROM (SELECT * FROM webtoon_moderation_log WHERE report_id = r.id ORDER BY id DESC LIMIT 5) log), '[]'::jsonb) AS history
        FROM webtoon_reports r
        LEFT JOIN webtoon_creator_works w ON r.kind = 'work' AND w.id = r.target
        LEFT JOIN webtoon_discussion d ON r.kind = 'comment' AND d.id::text = r.target
        ORDER BY (r.status = 'open') DESC, r.id DESC LIMIT 100
      `;
      return reply({ reports });
    }
    const workId = request.nextUrl.searchParams.get('work');
    const comments = await sql`
      SELECT d.id::text, u.display_name AS author, d.episode, d.content, d.created_at AS "createdAt", 0 AS likes
      FROM webtoon_discussion d JOIN webtoon_users u ON u.id = d.author_id
      WHERE work_id = ${workId} AND NOT d.hidden AND NOT EXISTS
        (SELECT 1 FROM webtoon_hidden_works h WHERE h.work_id = d.work_id)
      ORDER BY d.id DESC LIMIT 100
    `;
    return reply({ comments });
  } catch { return reply({ error: '목록을 불러오지 못했습니다.' }, 500); }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sql = await prepare();
    if (body.action === 'resolve') {
      if (!getAdminSession(request)) return reply({}, 403);
      const id = String(body.id);
      const state = body.state;
      if (!/^\d{1,18}$/.test(id) || !['hide', 'restore', 'dismiss'].includes(state)) return reply({}, 400);
      const rows = await sql`
        WITH report AS (
          UPDATE webtoon_reports SET status = ${state} WHERE id = ${id}::bigint RETURNING id, kind, target
        ), hidden AS (
          INSERT INTO webtoon_hidden_works(work_id) SELECT target FROM report WHERE kind = 'work' AND ${state} = 'hide'
          ON CONFLICT DO NOTHING
        ), restored AS (
          DELETE FROM webtoon_hidden_works h USING report WHERE h.work_id = report.target AND report.kind = 'work' AND ${state} = 'restore'
        ), comments AS (
          UPDATE webtoon_discussion d SET hidden = (${state} = 'hide') FROM report
          WHERE report.kind = 'comment' AND d.id::text = report.target AND ${state} <> 'dismiss'
        )
        INSERT INTO webtoon_moderation_log(report_id, action) SELECT id, ${state} FROM report RETURNING id
      `;
      return reply({ ok: rows.length > 0 }, rows.length ? 200 : 404);
    }
    const user = await getSessionUser(request);
    if (!user) return reply({ error: '로그인이 필요합니다.' }, 401);
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    const target = typeof body.target === 'string' ? body.target : '';
    if (!target || target.length > 200 || !content || content.length > 500) return reply({}, 400);
    if (body.action === 'comment' && Number.isInteger(body.episode) && body.episode > 0 && body.episode <= 2147483647) {
      const rows = await sql`
        INSERT INTO webtoon_discussion(work_id, author_id, episode, content)
        SELECT w.id, ${user.id}, ${body.episode}, ${content} FROM webtoon_creator_works w WHERE w.id = ${target}
         AND NOT EXISTS (SELECT 1 FROM webtoon_hidden_works h WHERE h.work_id = w.id)
         AND jsonb_path_exists(w.payload, '$.episodes[*] ? (@.num == $ep && (!exists(@.releaseAt) || (@.releaseAt > 0 && @.releaseAt <= $now)))',
         jsonb_build_object('ep', ${body.episode}::int, 'now', EXTRACT(EPOCH FROM NOW()) * 1000))
        RETURNING id
      `;
      return reply({ ok: !!rows.length }, rows.length ? 201 : 404);
    }
    if (body.action !== 'report' || !['work', 'comment'].includes(body.kind)) return reply({}, 400);
    const rows = await sql`
      INSERT INTO webtoon_reports(reporter,kind,target,reason)
      SELECT ${user.id}, ${body.kind}, ${target}, ${content}
      WHERE (${body.kind} = 'work' AND EXISTS (SELECT 1 FROM webtoon_creator_works WHERE id = ${target}))
         OR (${body.kind} = 'comment' AND EXISTS (SELECT 1 FROM webtoon_discussion WHERE id::text = ${target}))
      ON CONFLICT DO NOTHING RETURNING id
    `;
    return reply({ ok: !!rows.length }, rows.length ? 201 : 409);
  } catch { return reply({ error: '요청을 처리하지 못했습니다.' }, 500); }
}
