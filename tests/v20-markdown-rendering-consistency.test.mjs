import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (relative) => readFile(new URL(`../${relative}`, import.meta.url), 'utf8');

test('v0.20 一级页面的读者文案由 Markdown 页面统一维护', async () => {
  const schema = await read('src/content.config.ts');
  assert.match(schema, /const sitePages = defineCollection/);

  for (const page of ['home', 'technology', 'tools', 'reading', 'nature', 'life', 'archive', 'about', 'about-me', 'now', 'search', 'tags']) {
    await access(new URL(`../src/content/site-pages/${page}.md`, import.meta.url));
  }

  for (const route of ['index.astro', 'technology/index.astro', 'tools/index.astro', 'reading/index.astro', 'nature/index.astro', 'life/index.astro', 'archive/index.astro', 'about/index.astro', 'about/me.astro', 'now/index.astro', 'search/index.astro', 'tags/index.astro']) {
    const source = await read(`src/pages/${route}`);
    assert.match(source, /getEntry\('sitePages'/, `${route} 应从 Markdown 页面读取标题或导语`);
  }
});

test('v0.20 Markdown、首页目录与日期目录使用同一种大圆点', async () => {
  const [css, writing, dated] = await Promise.all([
    read('src/styles/global.css'),
    read('src/components/WritingList.astro'),
    read('src/components/DatedTextList.astro'),
  ]);
  assert.match(css, /--directory-bullet-size:\s*1\.34em/);
  assert.match(css, /content:\s*'•'/);
  assert.match(css, /\.dated-list-bullet[\s\S]*font-size:\s*var\(--directory-bullet-size\)/);
  assert.match(writing, />•</);
  assert.match(dated, />•</);
});

test('v0.20 Shiki 同时输出明暗主题 token，代码块背景跟随站点主题', async () => {
  const [config, css] = await Promise.all([
    read('astro.config.mjs'),
    read('src/styles/global.css'),
  ]);
  assert.match(config, /themes:\s*\{[\s\S]*light:\s*'github-light'[\s\S]*dark:\s*'github-dark-default'/);
  assert.match(config, /defaultColor:\s*false/);
  assert.match(css, /\.article-prose pre\.astro-code[\s\S]*background-color:\s*var\(--code-background\) !important/);
  assert.match(css, /:root\[data-theme='dark'\] \.article-prose pre\.astro-code/);
});
