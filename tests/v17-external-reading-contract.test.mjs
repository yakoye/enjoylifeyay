import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => readFile(path.join(root, relative), 'utf8');

test('v0.18 站外专题由独立 Markdown 页面维护', async () => {
  const [page, config, sites] = await Promise.all([
    read('src/pages/reading/index.astro'),
    read('src/content.config.ts'),
    read('src/content/section-pages/reading/reading-sites.md'),
  ]);
  const siteLines = sites.match(/^\s*- \[[^\]]+\]\(https?:\/\//gm) ?? [];

  assert.match(config, /const sectionPages = defineCollection/);
  assert.match(sites, /showInMap:\s*true/);
  assert.match(page, /SectionDirectory/);
  assert.match(page, /getVisibleSectionPages\('reading'\)/);
  assert.ok(siteLines.length >= 96, '站外专题 Markdown 应保留用户维护的 96 个入口');
  for (const heading of ['工程、系统与程序设计', '认知、决策与学习', '科学、未来与社会', '数字考古与知识档案', '文学、思想与非虚构', '生活、独立工作与行走']) {
    assert.match(sites, new RegExp(`## ${heading}`));
  }
  for (const keyword of ['CoolShell', 'Dan Luu', 'Gwern', 'Paul Graham', 'Craig Mod', 'Textfiles', 'SDF Public Access UNIX System']) {
    assert.ok(sites.includes(keyword), `缺少站外专题：${keyword}`);
  }
});

test('v0.18 外部站点不再由 JSON 运行时数据和 pinned 状态维护', async () => {
  // Windows users often update the project by extracting an archive over an
  // existing checkout. In that workflow an obsolete src/content/reading-sites.json
  // can remain on disk even though the site no longer imports or renders it.
  // The contract must verify runtime ownership, not require a destructive cleanup.
  const [readme, maintenance, readingIndex, dynamicPage, config] = await Promise.all([
    read('README.md'),
    read('docs/CONTENT_MAINTENANCE.md'),
    read('src/pages/reading/index.astro'),
    read('src/pages/[section]/[slug].astro'),
    read('src/content.config.ts'),
  ]);

  assert.match(readme, /reading-sites\.md/);
  assert.match(maintenance, /reading-sites\.md/);
  assert.doesNotMatch(maintenance, /"pinned": true/);
  assert.doesNotMatch(readingIndex, /reading-sites\.json/);
  assert.doesNotMatch(dynamicPage, /reading-sites\.json/);
  assert.doesNotMatch(config, /reading-sites\.json/);
});

test('v0.20 桌面端站外专题最多两行，同时保留 Markdown 无序列表圆点', async () => {
  const css = await read('src/styles/global.css');
  assert.match(css, /\.external-sites-prose > ul > li[\s\S]*display:\s*list-item/);
  assert.match(css, /max-height:\s*3\.5em/);
  assert.doesNotMatch(css, /\.external-sites-prose > ul > li[\s\S]*display:\s*-webkit-box/);
  assert.match(css, /:where\(\.plain-list, \.text-list, \.article-prose ul, \.section-page-prose ul\) > li::before/);
});

test('v0.18 二级地图和二级页面覆盖五个栏目', async () => {
  const dynamicPage = await read('src/pages/[section]/[slug].astro');
  assert.match(dynamicPage, /SectionMap/);
  assert.match(dynamicPage, /getStaticPaths/);
  for (const section of ['technology', 'tools', 'reading', 'nature', 'life']) {
    const parent = await read(`src/pages/${section}/index.astro`);
    assert.match(parent, /SectionDirectory/, `${section} 首页应提供带说明的二级主题目录`);
    const files = await readFile(path.join(root, `src/content/section-pages/${section}/`), 'utf8').catch(() => '');
    assert.equal(files, '', 'directories are checked by static paths below');
  }
  for (const file of [
    'technology/technology-pcie.md', 'technology/technology-engineering.md',
    'tools/tools-extensions.md', 'reading/reading-articles.md', 'reading/reading-books.md', 'reading/reading-principles.md', 'reading/reading-sites.md',
    'nature/nature-walking.md', 'life/life-travel.md', 'life/life-food.md', 'life/life-family.md',
  ]) {
    await access(path.join(root, 'src/content/section-pages', file));
  }
});

test('v0.20 全站目录列表使用统一的大黑色圆点', async () => {
  const [css, writing, dated] = await Promise.all([
    read('src/styles/global.css'),
    read('src/components/WritingList.astro'),
    read('src/components/DatedTextList.astro'),
  ]);
  assert.match(css, /--directory-bullet-size:\s*1\.34em/);
  assert.match(css, /\.dated-list-bullet[\s\S]*font-size:\s*var\(--directory-bullet-size\)/);
  assert.match(writing, />•</);
  assert.match(dated, />•</);
});
