import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('v1 定义七类严格内容集合', async () => {
  const schema = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  for (const name of ['writing', 'series', 'tools', 'projects', 'nature', 'books', 'favorites']) {
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
  const files = ['series.json', 'tools.json', 'projects.json', 'nature.json', 'books.json', 'favorites.json'];
  await Promise.all(files.map((file) => access(new URL(`../src/content/${file}`, import.meta.url))));
  const series = JSON.parse(await readFile(new URL('../src/content/series.json', import.meta.url), 'utf8'));
  const tools = JSON.parse(await readFile(new URL('../src/content/tools.json', import.meta.url), 'utf8'));
  const projects = JSON.parse(await readFile(new URL('../src/content/projects.json', import.meta.url), 'utf8'));
  assert.equal(series.length, 8);
  assert.ok(tools.length >= 11);
  assert.ok(projects.length >= 12);
  for (const entry of [...tools, ...projects]) {
    if (entry.status === 'link-pending') {
      assert.equal(entry.url, '');
      assert.equal(entry.githubUrl, '');
    }
  }
});

test('正在做数据独立于首页组件', async () => {
  const now = await readFile(new URL('../src/data/now.ts', import.meta.url), 'utf8');
  assert.match(now, /export const nowItems/);
});
