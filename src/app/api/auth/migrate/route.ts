import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { hasDatabaseUrl, getSql } from '@/lib/db';
import { ensureAuthSchema, hashPassword } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!hasDatabaseUrl()) return NextResponse.json({ error: 'DATABASE_URL이 설정되지 않았습니다.' }, { status: 503 });
  try {
    const body = await request.json();
    const users = Array.isArray(body.users) ? body.users.slice(0, 100) : [];
    await ensureAuthSchema();
    const sql = getSql();
    let imported = 0;
    for (const user of users) {
      const email = String(user?.email || '').trim().toLowerCase();
      const displayName = String(user?.displayName || '').trim();
      const password = String(user?.password || '');
      const role = user?.role === 'creator' ? 'creator' : user?.role === 'reader' ? 'reader' : null;
      if (!email || !displayName || !role || password.length < 1 || password.length > 200) continue;
      const passwordHash = await hashPassword(password);
      const rows = await sql`
        INSERT INTO webtoon_users (id, role, display_name, email, password_hash)
        VALUES (${String(user.id || randomUUID())}, ${role}, ${displayName}, ${email}, ${passwordHash})
        ON CONFLICT (email) DO NOTHING
        RETURNING id
      `;
      if (rows.length) imported += 1;
    }
    return NextResponse.json({ ok: true, imported });
  } catch (error) {
    console.error('POST /api/auth/migrate error:', error);
    return NextResponse.json({ error: '기존 가입정보 이전에 실패했습니다.' }, { status: 500 });
  }
}
