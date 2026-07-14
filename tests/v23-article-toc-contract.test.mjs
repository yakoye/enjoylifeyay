import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('v0.23 desktop TOC defaults expanded and collapses into a clickable dot rail', async () => {
  const toc = await readFile(new URL('../src/components/ArticleToc.astro', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.match(toc, /data-article-toc-desktop/);
  assert.match(toc, /data-toc-collapse/);
  assert.match(toc, /data-toc-expand/);
  assert.match(toc, /article-toc-dot-track/);
  assert.match(toc, /setDesktopCollapsed\(true\)/);
  assert.match(toc, /setDesktopCollapsed\(false\)/);
  assert.match(css, /@media \(min-width: 900px\)/);
  assert.match(css, /position: sticky;/);
  assert.match(css, /grid-template-columns: clamp\(10rem, 20vw, 13\.75rem\)/);
  assert.match(css, /\.article-toc-desktop\.is-collapsed \.article-toc-rail/);
});

test('v0.23 mobile TOC previews three headings and can expand or collapse in place', async () => {
  const toc = await readFile(new URL('../src/components/ArticleToc.astro', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.match(toc, /const previewCount = 3/);
  assert.match(toc, /toc-preview-extra/);
  assert.match(toc, /data-toc-mobile-toggle/);
  assert.match(toc, /expanded \? '收起目录' : '展开目录'/);
  assert.match(css, /\.article-toc-mobile:not\(\.is-expanded\) \.toc-preview-extra/);
});

test('v0.23 TOC highlights the current section on desktop and mobile', async () => {
  const toc = await readFile(new URL('../src/components/ArticleToc.astro', import.meta.url), 'utf8');

  assert.match(toc, /data-toc-link/);
  assert.match(toc, /getBoundingClientRect\(\)\.top/);
  assert.match(toc, /classList\.toggle\('is-active', active\)/);
  assert.match(toc, /aria-current/);
});
