import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('v0.21 内容集合使用 section 与 tags 的精简文章模型', async () => {
  const schema = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  for (const name of ['writing', 'tools', 'nature', 'books', 'favorites', 'sectionPages', 'sitePages']) {
    assert.match(schema, new RegExp(`\\b${name}\\b`));
  }
  assert.match(schema, /section:\s*z\.enum\(writingSectionIds\)/);
  assert.match(schema, /tags:\s*z\.array\(z\.string\(\)\.min\(1\)\)\.max\(3\)/);
  for (const obsolete of ['domain:', 'format:', 'topics:', 'series:']) {
    assert.doesNotMatch(schema, new RegExp(obsolete));
  }
  assert.match(schema, /draft:\s*z\.boolean\(\)\.default\(true\)/);
});

test('可维护目录数据存在且未知链接保持空值', async () => {
  const files = ['tools.json', 'nature.json', 'books.json', 'favorites.json'];
  await Promise.all(files.map((file) => access(new URL(`../src/content/${file}`, import.meta.url))));
  const tools = JSON.parse(await readFile(new URL('../src/content/tools.json', import.meta.url), 'utf8'));
  assert.ok(tools.length >= 11);
  for (const entry of tools) {
    if (entry.status === 'link-pending') {
      assert.equal(entry.url, '');
      assert.equal(entry.githubUrl, '');
    }
  }
});

test('正在做内容由 Markdown 页面维护，首页与独立页面共用同一份数据', async () => {
  const [home, index, now] = await Promise.all([
    readFile(new URL('../src/content/site-pages/home.md', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/now/index.astro', import.meta.url), 'utf8'),
  ]);
  assert.match(home, /^nowItems:/m);
  assert.match(index, /getEntry\('sitePages', 'home'\)/);
  assert.match(now, /getEntry\('sitePages', 'home'\)/);
});
