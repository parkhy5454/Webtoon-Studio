import { neon } from '@neondatabase/serverless';

export const hasDatabaseUrl = (): boolean => {
  return !!process.env.DATABASE_URL;
};

export const getSql = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not defined');
  }
  return neon(url);
};

export const ensureSchemaAndSeed = async () => {
  if (!hasDatabaseUrl()) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      author VARCHAR(100) NOT NULL,
      badge VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      likes INT DEFAULT 0
    );
  `;
};
