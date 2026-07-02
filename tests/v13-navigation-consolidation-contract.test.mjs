import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const file = (value) => new URL(`../${value}`, import.meta.url);

test('v0.13 uses the non-redundant public navigation', async () => {
  const site = await readFile(file('src/config/site.ts'), 'utf8');
  for (const label of ['主页', '技术', '工具', '阅读', '自然', '生活', '归档', '关于']) {
    assert.match(site, new RegExp(`label: '${label}'`));
  }
  for (const label of ['写作', '专题', '书架', '收藏', '项目']) {
    assert.doesNotMatch(site, new RegExp(`label: '${label}'`));
  }
  assert.match(site, /技术 · 工具 · 阅读 · 自然 · 生活/);
});

test('v0.13 provides consolidated technology reading life routes and preserves old entry redirects', async () => {
  for (const path of ['src/pages/technology/index.astro', 'src/pages/reading/index.astro', 'src/pages/life/index.astro']) {
    await access(file(path));
  }

  const redirects = [
    ['src/pages/writing/index.astro', '/technology/articles/'],
    ['src/pages/series/index.astro', '/technology/'],
    ['src/pages/bookshelf/index.astro', '/reading/books/'],
    ['src/pages/favorites/index.astro', '/reading/sites/'],
    ['src/pages/projects/index.astro', '/tools/diy/'],
  ];
  for (const [path, target] of redirects) {
    const source = await readFile(file(path), 'utf8');
    assert.ok(source.includes(target), `${path} must redirect to ${target}`);
  }
});

test('v0.13 merges project presentation into tools without adding a separate public project menu', async () => {
  const toolsPage = await readFile(file('src/pages/tools/index.astro'), 'utf8');
  assert.match(toolsPage, /SectionMap/);
  assert.doesNotMatch(toolsPage, /历史内容来源/);
  assert.doesNotMatch(toolsPage, /个人网站与生活工具/);
});
