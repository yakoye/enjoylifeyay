-- v0.11: 仅针对已经使用 v0.10 建表的远程 D1 数据库执行一次。
ALTER TABLE comments ADD COLUMN email TEXT NOT NULL DEFAULT '';
