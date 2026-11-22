import { ensureAuthSchema } from '@/lib/auth';
import { getSql } from '@/lib/db';

export async function ensureLibrarySchema() {
  await ensureAuthSchema();
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS webtoon_reader_library (
      user_id TEXT NOT NULL REFERENCES webtoon_users(id) ON DELETE CASCADE,
      work_id TEXT NOT NULL REFERENCES webtoon_creator_works(id) ON DELETE CASCADE,
      saved BOOLEAN NOT NULL DEFAULT FALSE,
      last_episode INTEGER,
      read_first BOOLEAN NOT NULL DEFAULT FALSE,
      read_second BOOLEAN NOT NULL DEFAULT FALSE,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, work_id)
    )
  `;
  await sql`ALTER TABLE webtoon_reader_library ADD COLUMN IF NOT EXISTS last_cut INTEGER NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE webtoon_reader_library ADD COLUMN IF NOT EXISTS last_read_at TIMESTAMPTZ`;
  await sql`ALTER TABLE webtoon_reader_library ADD COLUMN IF NOT EXISTS saved_at TIMESTAMPTZ`;
  await sql`CREATE INDEX IF NOT EXISTS webtoon_reader_library_work_idx ON webtoon_reader_library(work_id)`;
}

