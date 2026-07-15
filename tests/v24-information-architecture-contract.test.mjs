import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('v0.24 article header uses breadcrumbs, clickable tags and all-tags entry', async () => {
  const layout = await read('src/layouts/ArticleLayout.astro');
  assert.match(layout, /<Breadcrumbs items=/);
  assert.match(layout, /<h1>\{data\.title\}<\/h1>/);
  assert.match(layout, /href=\{tagHref\(tag\)\}>#\{tag\}<\/a>/);
  assert.match(layout, /href="\/tags\/">全部标签<\/a>/);
  assert.doesNotMatch(layout, /getPublicTagSet/);
});

test('v0.24 second-level pages show parent breadcrumb and active sibling topic', async () => {
  const route = await read('src/pages/[section]/[slug].astro');
  const map = await read('src/components/SectionMap.astro');
  const css = await read('src/styles/global.css');
  assert.match(route, /<Breadcrumbs items=/);
  assert.match(route, /<SectionMap label="同级主题"/);
  assert.match(map, /section-map-current/);
  assert.match(css, /\.section-map-current::after/);
});

test('v0.25 parent sections use descriptive topic previews', async () => {
  const directory = await read('src/components/TopicPreview.astro');
  assert.match(directory, /topic-preview/);
  assert.match(directory, /description/);
  for (const section of ['technology', 'tools', 'reading', 'nature', 'life']) {
    const page = await read(`src/pages/${section}/index.astro`);
    assert.match(page, /TopicPreview/);
  }
});
