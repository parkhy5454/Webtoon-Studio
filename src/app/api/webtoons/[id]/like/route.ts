import { NextRequest, NextResponse } from "next/server";
import { ensureSchemaAndSeed, getSql, hasDatabaseUrl } from "@/lib/db";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json().catch(() => ({}));
    const action = body.action === "view" ? "view" : "like";

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ connected: false, id, action });
    }

    await ensureSchemaAndSeed();
    const sql = getSql();

    if (action === "view") {
      const rows = await sql`
        UPDATE webtoons SET views = views + 1 WHERE id = ${id} RETURNING likes, views
      `;
      return NextResponse.json({ connected: true, ...(rows[0] || {}) });
    }

    const rows = await sql`
      UPDATE webtoons SET likes = likes + 1 WHERE id = ${id} RETURNING likes, views
    `;
    return NextResponse.json({ connected: true, ...(rows[0] || {}) });
  } catch (error) {
    console.error("POST /api/webtoons/[id]/like error:", error);
    return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
  }
}
