-- Enjoy Life 评论数据库（Cloudflare D1）
-- 评论默认 pending；仅 approved 评论会在公开文章页显示。

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  article_slug TEXT NOT NULL,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at INTEGER NOT NULL,
  ip_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS comments_article_status_created
  ON comments (article_slug, status, created_at);

CREATE INDEX IF NOT EXISTS comments_rate_limit
  ON comments (ip_hash, created_at);
