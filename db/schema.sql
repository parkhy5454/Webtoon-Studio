-- 달빛 웹툰 스튜디오 PostgreSQL (Neon DB) 스키마

CREATE TABLE IF NOT EXISTS webtoons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL DEFAULT '드라마',
  badge TEXT NOT NULL DEFAULT '오리지널 웹툰',
  subtitle TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  poster TEXT NOT NULL DEFAULT '/images/poster-seoul-moon.jpg',
  ep1_title TEXT NOT NULL DEFAULT '제1화',
  ep2_title TEXT NOT NULL DEFAULT '제2화',
  ep1_subtitle TEXT NOT NULL DEFAULT '웹툰 원고 뷰어',
  stats_json JSONB NOT NULL DEFAULT '{"eps":"연재중","cuts":"50컷","perk":"2주 선공개"}'::jsonb,
  characters_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  cuts_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  script_lines_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  subscribers INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  webtoon_id TEXT NOT NULL REFERENCES webtoons(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  tier_badge TEXT NOT NULL DEFAULT '달동네 스페셜',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  webtoon_id TEXT REFERENCES webtoons(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  tier_name TEXT NOT NULL,
  price_krw INTEGER NOT NULL,
  creator_share_krw INTEGER NOT NULL,
  platform_share_krw INTEGER NOT NULL,
  billing_key TEXT,
  referral_code TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
