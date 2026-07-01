import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('v0.8 页面标题、紧凑间距和无装饰横线规则统一', async () => {
  const tokens = await readFile(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  const typography = await readFile(new URL('../src/styles/typography.css', import.meta.url), 'utf8');
  const global = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  assert.match(tokens, /--font-page-title:\s*1\.625rem/);
  assert.match(typography, /h1\s*\{[\s\S]*?margin-bottom:\s*0\.1875rem/);
  assert.match(typography, /hr,[\s\S]*?display:\s*none/);
  assert.match(global, /\.home-intro\s*\{[\s\S]*?margin-bottom:\s*1\.125rem/);
});

test('v0.8 null 更新日期不会变为 1970，文章目录默认折叠', async () => {
  const schema = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  const article = await readFile(new URL('../src/layouts/ArticleLayout.astro', import.meta.url), 'utf8');
  assert.match(schema, /z\.union\(\[z\.null\(\), date\]\)\.optional\(\)/);
  assert.match(article, /value\.valueOf\(\) !== 0/);
  assert.match(article, /heading\.depth >= 2 && heading\.depth <= 4/);
  assert.match(article, /toc\.length >= 1/);
  assert.match(article, /<summary aria-label="展开或收起目录">目录<\/summary>/);
  assert.doesNotMatch(article, /<details class="article-toc" open/);
});

test('v0.8 书架右侧日期与骑行跑步专题可维护', async () => {
  const bookshelf = await readFile(new URL('../src/pages/bookshelf/index.astro', import.meta.url), 'utf8');
  const datedList = await readFile(new URL('../src/components/DatedTextList.astro', import.meta.url), 'utf8');
  const series = JSON.parse(await readFile(new URL('../src/content/series.json', import.meta.url), 'utf8'));
  const maintenance = await readFile(new URL('../docs/CONTENT_MAINTENANCE.md', import.meta.url), 'utf8');
  assert.match(bookshelf, /DatedTextList/);
  assert.match(bookshelf, /finishedAt/);
  assert.match(datedList, /metaInline/);
  assert.ok(series.some((entry) => entry.id === 'life-cycling'));
  assert.ok(series.some((entry) => entry.id === 'life-running'));
  assert.match(maintenance, /life-cycling/);
  assert.match(maintenance, /life-running/);
});

test('v0.8 写作筛选支持来回切换和浏览器前进后退', async () => {
  const filters = await readFile(new URL('../src/components/WritingFilters.astro', import.meta.url), 'utf8');
  assert.match(filters, /root\.addEventListener\('click'/);
  assert.match(filters, /window\.addEventListener\('popstate'/);
  assert.match(filters, /item\.hidden = !show/);
  assert.match(filters, /history\.replaceState/);
});


test('v0.9 标题栏与正文同宽、窄屏仅保留图标、目录显示为中文', async () => {
  const tokens = await readFile(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  const header = await readFile(new URL('../src/components/SiteHeader.astro', import.meta.url), 'utf8');
  const global = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const article = await readFile(new URL('../src/layouts/ArticleLayout.astro', import.meta.url), 'utf8');
  assert.match(tokens, /--nav-max:\s*var\(--content-max\)/);
  assert.match(header, /class="site-brand-name"/);
  assert.match(global, /@media \(max-width: 620px\)[\s\S]*?\.site-brand-name[\s\S]*?display:\s*none/);
  assert.match(article, /<summary aria-label="展开或收起目录">目录<\/summary>/);
  assert.doesNotMatch(article, /\[ToC\]/);
});
