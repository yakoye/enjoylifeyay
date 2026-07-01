import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('v0.7 顶栏居中导航、归档入口与 favicon 资源齐备', async () => {
  const site = await readFile(new URL('../src/config/site.ts', import.meta.url), 'utf8');
  const global = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  assert.match(site, /href: '\/archive\/', label: '归档'/);
  assert.match(global, /grid-template-columns:\s*minmax\(0, 1fr\) auto minmax\(0, 1fr\)/);
  assert.match(global, /justify-self:\s*center/);
  assert.match(layout, /favicon-32\.png\?v=20260701/);
  await Promise.all(['favicon.ico', 'favicon-32.png', 'apple-touch-icon.png', 'site.webmanifest'].map((file) => access(new URL(`../public/${file}`, import.meta.url))));
});

test('v0.7 写作筛选与页面留白规则独立维护', async () => {
  const page = await readFile(new URL('../src/pages/writing/index.astro', import.meta.url), 'utf8');
  const filters = await readFile(new URL('../src/components/WritingFilters.astro', import.meta.url), 'utf8');
  const home = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  const global = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  assert.match(page, /WritingFilters/);
  assert.match(filters, /data-writing-filters/);
  assert.match(filters, /button\.addEventListener\('click'/);
  assert.match(filters, /history\.replaceState/);
  assert.doesNotMatch(home, /<hr/);
  const filtersBlock = global.match(/\.filters\s*\{[\s\S]*?\n\}/)?.[0] || '';
  assert.doesNotMatch(filtersBlock, /border/);
});

test('v0.7 媒体目录和旧图迁移脚本可用于长期维护', async () => {
  const schema = await readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8');
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const guide = await readFile(new URL('../docs/MEDIA_MANAGEMENT.md', import.meta.url), 'utf8');
  assert.match(schema, /mediaKey:\s*z\.string\(\)\.default\(''\)/);
  assert.match(pkg.scripts['import:legacy-images'], /import-legacy-images/);
  assert.match(guide, /public\/images\/articles\/<mediaKey>/);
  await access(new URL('../scripts/import-legacy-images.mjs', import.meta.url));
});
