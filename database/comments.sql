-- Enjoy Life 评论数据库（Cloudflare D1）
-- 默认 pending；设置 COMMENTS_MODERATION=auto 后新评论会直接 approved。
-- email 为可选字段，仅供站长后续联系使用，永不在公开文章页输出。

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  article_slug TEXT NOT NULL,
  author TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at INTEGER NOT NULL,
  ip_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS comments_article_status_created
  ON comments (article_slug, status, created_at);

CREATE INDEX IF NOT EXISTS comments_rate_limit
  ON comments (ip_hash, created_at);
