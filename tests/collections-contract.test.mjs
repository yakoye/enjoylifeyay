import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('v1 定义六类严格内容集合', async () => {
  const schema = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  for (const name of ['writing', 'series', 'tools', 'nature', 'books', 'favorites']) {
    assert.match(schema, new RegExp(`\\b${name}\\b`));
  }
  for (const value of ['technology', 'reading', 'life', 'nature', 'tool']) {
    assert.match(schema, new RegExp(`['"]${value}['"]`));
  }
  for (const value of ['article', 'answer', 'note', 'guide', 'reference', 'project-log', 'observation']) {
    assert.match(schema, new RegExp(`['"]${value}['"]`));
  }
  assert.match(schema, /draft:\s*z\.boolean\(\)\.default\(true\)/);
});

test('可维护目录数据存在且未知链接保持空值', async () => {
  const files = ['series.json', 'tools.json', 'nature.json', 'books.json', 'favorites.json'];
  await Promise.all(files.map((file) => access(new URL(`../src/content/${file}`, import.meta.url))));
  const series = JSON.parse(await readFile(new URL('../src/content/series.json', import.meta.url), 'utf8'));
  const tools = JSON.parse(await readFile(new URL('../src/content/tools.json', import.meta.url), 'utf8'));
  assert.equal(series.length, 10);
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
