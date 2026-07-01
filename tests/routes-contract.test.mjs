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
  'src/pages/now/index.astro',
  'src/pages/tags/index.astro',
  'src/pages/archive/index.astro',
  'src/pages/404.astro',
];

test('所有主导航路由均有静态页面', async () => {
  await Promise.all(routes.map((route) => access(new URL(`../${route}`, import.meta.url))));
});

test('首页和栏目页由集合或独立数据驱动', async () => {
  const home = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  assert.match(home, /nowItems/);
  assert.match(home, /getCollection\(['"]series['"]/);
  assert.match(home, /最近写作/);
  assert.match(home, /正在做/);
  const writing = await readFile(new URL('../src/pages/writing/index.astro', import.meta.url), 'utf8');
  assert.match(writing, /URLSearchParams/);
  const writingList = await readFile(new URL('../src/components/WritingList.astro', import.meta.url), 'utf8');
  assert.match(writingList, /data-domain/);
});

test('公开页面不保留骨架期长期占位语', async () => {
  for (const route of routes.filter((route) => !route.includes('[slug]'))) {
    const source = await readFile(new URL(`../${route}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /内容正在整理中|RSS 准备中/);
  }
});

test('核心页面过滤草稿且示例内容不伪造外链', async () => {
  for (const route of routes.slice(0, 3)) {
    const source = await readFile(new URL(`../${route}`, import.meta.url), 'utf8');
    assert.match(source, /draft/);
  }
  const sample = await readFile(new URL('../src/content/writing/site-notes.md', import.meta.url), 'utf8');
  assert.doesNotMatch(sample, /https?:\/\//);
});
