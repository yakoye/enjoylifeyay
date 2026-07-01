import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';

const writingDir = new URL('../src/content/writing/', import.meta.url);

test('v0.10 每篇公开文章都有可展开的目录', async () => {
  const articleLayout = await readFile(new URL('../src/layouts/ArticleLayout.astro', import.meta.url), 'utf8');
  assert.match(articleLayout, /toc\.length >= 1/);
  assert.match(articleLayout, /<summary aria-label="展开或收起目录">目录<\/summary>/);

  const filenames = (await readdir(writingDir)).filter((name) => /\.mdx?$/.test(name));
  for (const filename of filenames) {
    const content = await readFile(join(writingDir.pathname, filename), 'utf8');
    if (/^draft:\s*true\s*$/m.test(content)) continue;
    assert.match(content, /^#{2,4}\s+\S+/m, `${filename} 缺少用于目录的分节标题`);
  }
});

test('v0.10 文章末尾提供极简评论入口与 D1 审核 API', async () => {
  const articleLayout = await readFile(new URL('../src/layouts/ArticleLayout.astro', import.meta.url), 'utf8');
  const comments = await readFile(new URL('../src/components/Comments.astro', import.meta.url), 'utf8');
  const api = await readFile(new URL('../functions/api/comments.js', import.meta.url), 'utf8');
  const sql = await readFile(new URL('../database/comments.sql', import.meta.url), 'utf8');
  const docs = await readFile(new URL('../docs/COMMENTS_D1.md', import.meta.url), 'utf8');

  assert.match(articleLayout, /<Comments article=\{entry\.id\}/);
  assert.match(comments, /邮箱（可选）/);
  assert.match(comments, /昵称（可选）/);
  assert.match(comments, /email/);
  assert.match(api, /env\.COMMENTS_DB/);
  assert.match(api, /'pending'/);
  assert.match(api, /'approved'/);
  assert.match(api, /crypto\.subtle\.digest/);
  assert.match(sql, /CREATE TABLE IF NOT EXISTS comments/);
  assert.match(docs, /COMMENTS_DB/);
  await access(new URL('../scripts/audit-writing-toc.mjs', import.meta.url));
});

test('v0.10 新文章保留来源链接，并以本站阅读摘要与补记呈现', async () => {
  const article = await readFile(new URL('../src/content/writing/2026-07-01-programmer-engineer-ai-era.md', import.meta.url), 'utf8');
  assert.match(article, /date:\s*2026-07-01/);
  assert.match(article, /https:\/\/blog\.cnbang\.net\/writting\/3667\//);
  assert.match(article, /不转载原文全文/);
  assert.match(article, /## AI 时代让角色重新靠近/);
});
