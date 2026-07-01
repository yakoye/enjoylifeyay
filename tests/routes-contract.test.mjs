import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const routes = [
  'src/pages/index.astro',
  'src/pages/writing/index.astro',
  'src/pages/writing/[slug].astro',
  'src/pages/series/index.astro',
  'src/pages/tools/index.astro',
  'src/pages/nature/index.astro',
  'src/pages/bookshelf/index.astro',
  'src/pages/favorites/index.astro',
  'src/pages/projects/index.astro',
  'src/pages/about/index.astro',
  'src/pages/404.astro',
];

test('所有主导航路由均有静态页面', async () => {
  await Promise.all(routes.map((route) => access(new URL(`../${route}`, import.meta.url))));
});

test('核心页面过滤草稿且示例内容不伪造外链', async () => {
  for (const route of routes.slice(0, 3)) {
    const source = await readFile(new URL(`../${route}`, import.meta.url), 'utf8');
    assert.match(source, /draft/);
  }
  const sample = await readFile(new URL('../src/content/writing/site-notes.md', import.meta.url), 'utf8');
  assert.doesNotMatch(sample, /https?:\/\//);
});
