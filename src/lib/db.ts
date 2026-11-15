import { neon } from '@neondatabase/serverless';

export function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  return neon(process.env.DATABASE_URL);
}

export async function ensureSchemaAndSeed() {
  if (!hasDatabaseUrl()) return;
  try {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        webtoon_id TEXT NOT NULL DEFAULT '1',
        episode_id INTEGER NOT NULL DEFAULT 1,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
  } catch (e) {
    console.error('DB init skipped or failed:', e);
  }
}
