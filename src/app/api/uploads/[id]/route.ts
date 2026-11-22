import { getReferralWorks } from '@/lib/referral-access';
import { NextRequest, NextResponse } from 'next/server';
import { getSql, hasDatabaseUrl } from '@/lib/db';
import { getPaidWorks } from '@/lib/work-payments';
import { getAdminSession } from '@/lib/admin-auth';
import { ensureAuthSchema, getSessionUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!hasDatabaseUrl()) return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } });
  try {
    const { id } = await context.params;
    await ensureAuthSchema();
    const sql = getSql();
    const admin = getAdminSession(request);
    const user = admin ? null : await getSessionUser(request);
    const paidWorks = JSON.stringify(user ? [...await getPaidWorks(user.id), ...await getReferralWorks(user.id)] : []);
    const imageUrl = JSON.stringify(`/api/uploads/${id}`);
    const rows = await sql`
      SELECT asset.content_type, asset.data_base64 FROM webtoon_assets asset
      WHERE asset.id = ${id} AND (
        ${Boolean(admin)} OR asset.uploader_user_id = ${user?.id ?? null}
        OR EXISTS (
          SELECT 1 FROM webtoon_creator_works work
          WHERE work.author_id = asset.uploader_user_id AND (
            work.payload->'coverImg' = ${imageUrl}::jsonb OR
            jsonb_path_exists(work.payload, '$.episodes[*] ? (@.num >= 1 && @.num <= 5).cuts[*] ? (@.img == $image)', jsonb_build_object('image', ${imageUrl}::jsonb), true) OR (
              ${paidWorks}::jsonb ? work.id AND
              jsonb_path_exists(work.payload, '$.episodes[*].cuts[*] ? (@.img == $image)', jsonb_build_object('image', ${imageUrl}::jsonb), true)
            )
          )
        )
      )
      LIMIT 1
    `;
    const asset = rows[0] as { content_type: string; data_base64: string } | undefined;
    if (!asset) return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } });
    return new NextResponse(Buffer.from(asset.data_base64, 'base64'), {
      headers: {
        'Content-Type': asset.content_type,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('GET /api/uploads/[id] error:', error);
    return new NextResponse('Image unavailable', { status: 500 });
  }
}
