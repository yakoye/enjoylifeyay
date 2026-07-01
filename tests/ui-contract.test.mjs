import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('全局布局遵守 890px、16px 和中文排版约束', async () => {
  const tokens = await readFile(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  const typography = await readFile(new URL('../src/styles/typography.css', import.meta.url), 'utf8');
  assert.match(tokens, /--content-max:\s*890px/);
  assert.match(tokens, /--page-gutter-mobile:\s*16px/);
  assert.match(typography, /\.article-prose\s+p[\s\S]*text-align:\s*justify/);
  assert.match(typography, /\.article-prose\s+:is\(h2,\s*h3,\s*h4,\s*ul,\s*ol,\s*li,\s*pre,\s*code,\s*table,\s*blockquote,\s*figure,\s*figcaption,\s*hr\)[\s\S]*text-align:\s*left/);
});

test('主题默认跟随系统并保存手动偏好', async () => {
  const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  const toggle = await readFile(new URL('../src/components/ThemeToggle.astro', import.meta.url), 'utf8');
  assert.match(layout, /prefers-color-scheme:\s*dark/);
  assert.match(layout, /localStorage\.getItem\(['"]theme['"]\)/);
  assert.match(toggle, /localStorage\.setItem\(['"]theme['"]/);
  assert.match(toggle, /aria-label=/);
});

test('站点公开名称为 Enjoy Life', async () => {
  const site = await readFile(new URL('../src/config/site.ts', import.meta.url), 'utf8');
  const footer = await readFile(new URL('../src/components/SiteFooter.astro', import.meta.url), 'utf8');
  assert.match(site, /name:\s*['"]Enjoy Life['"]/);
  assert.match(footer, /site\.name/);
});
