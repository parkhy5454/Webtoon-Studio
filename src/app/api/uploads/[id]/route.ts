import { NextRequest, NextResponse } from 'next/server';
import { getSql, hasDatabaseUrl } from '@/lib/db';
import { ensureAuthSchema } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!hasDatabaseUrl()) return new NextResponse('Not found', { status: 404 });
  try {
    const { id } = await context.params;
    await ensureAuthSchema();
    const sql = getSql();
    const rows = await sql`
      SELECT content_type, data_base64 FROM webtoon_assets WHERE id = ${id} LIMIT 1
    `;
    const asset = rows[0] as { content_type: string; data_base64: string } | undefined;
    if (!asset) return new NextResponse('Not found', { status: 404 });
    return new NextResponse(Buffer.from(asset.data_base64, 'base64'), {
      headers: {
        'Content-Type': asset.content_type,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('GET /api/uploads/[id] error:', error);
    return new NextResponse('Image unavailable', { status: 500 });
  }
}
