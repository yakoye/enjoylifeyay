import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('正式站点 URL 只在集中配置中定义', async () => {
  const site = await readFile(new URL('../src/config/site.ts', import.meta.url), 'utf8');
  const astro = await readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  assert.match(site, /https:\/\/enjoylifeyay\.pages\.dev/);
  assert.match(site, /name:\s*['"]Enjoy Life['"]/);
  assert.match(site, /技术 · 阅读 · 自然 · 工具 · 生活/);
  assert.match(astro, /site\.url/);
  assert.match(astro, /sitemap\(\)/);
});

test('基础布局输出 canonical 与社交分享元信息', async () => {
  const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  for (const marker of ['rel="canonical"', 'property="og:title"', 'property="og:description"', 'property="og:url"', 'name="twitter:card"']) {
    assert.ok(layout.includes(marker), `缺少 ${marker}`);
  }
});

test('RSS 和 robots 使用集中配置动态生成', async () => {
  await access(new URL('../src/pages/rss.xml.ts', import.meta.url));
  await access(new URL('../src/pages/robots.txt.ts', import.meta.url));
  const footer = await readFile(new URL('../src/components/SiteFooter.astro', import.meta.url), 'utf8');
  assert.match(footer, /href="\/rss\.xml"/);
  assert.doesNotMatch(footer, /准备中/);
});
