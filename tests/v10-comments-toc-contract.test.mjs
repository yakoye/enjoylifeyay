import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const writingDir = fileURLToPath(new URL('../src/content/writing/', import.meta.url));

test('v0.10 每篇公开文章都有可展开的目录', async () => {
  const articleLayout = await readFile(new URL('../src/layouts/ArticleLayout.astro', import.meta.url), 'utf8');
  assert.match(articleLayout, /toc\.length >= 1/);
  assert.match(articleLayout, /import ArticleToc from '\.\.\/components\/ArticleToc\.astro'/);
  assert.match(articleLayout, /<ArticleToc headings=\{toc\} \/>/);

  const filenames = (await readdir(writingDir)).filter((name) => /\.mdx?$/.test(name));
  for (const filename of filenames) {
    const content = await readFile(join(writingDir, filename), 'utf8');
    if (/^draft:\s*true\s*$/m.test(content)) continue;
    assert.match(content, /^#{2,4}\s+\S+/m, `${filename} 缺少用于目录的分节标题`);
  }
});

test('文章保留目录和代码增强，但不再提供评论入口或 API', async () => {
  const articleLayout = await readFile(new URL('../src/layouts/ArticleLayout.astro', import.meta.url), 'utf8');
  assert.doesNotMatch(articleLayout, /Comments|评论/);
  for (const path of [
    '../src/components/Comments.astro',
    '../functions/api/comments.js',
    '../database/comments.sql',
    '../docs/COMMENTS_D1.md',
  ]) await assert.rejects(access(new URL(path, import.meta.url)));
  await access(new URL('../scripts/audit-writing-toc.mjs', import.meta.url));
});

test('v0.10 新文章保留来源链接，并以本站阅读摘要与补记呈现', async () => {
  const article = await readFile(new URL('../src/content/writing/2026-07-01-programmer-engineer-ai-era.md', import.meta.url), 'utf8');
  assert.match(article, /date:\s*2026-07-01/);
  assert.match(article, /https:\/\/blog\.cnbang\.net\/writting\/3667\//);
  assert.match(article, /不转载原文全文/);
  assert.match(article, /## AI 时代让角色重新靠近/);
});
