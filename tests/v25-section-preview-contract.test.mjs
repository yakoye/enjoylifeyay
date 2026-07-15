import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('v0.25.1 writing lists keep only title, date and summary', async () => {
  const [writing, dated, css] = await Promise.all([
    read('src/components/WritingList.astro'),
    read('src/components/DatedTextList.astro'),
    read('src/styles/global.css'),
  ]);
  assert.match(writing, /dated-list-title-row/);
  assert.match(writing, /<time class="dated-list-date"/);
  assert.match(writing, /<div class="dated-list-description">\{entry\.data\.description\}<\/div>/);
  assert.doesNotMatch(writing, /section\.parentLabel/);
  assert.doesNotMatch(writing, /entry\.data\.tags/);
  assert.doesNotMatch(writing, /dated-list-meta/);
  assert.doesNotMatch(writing, /dated-list-description">：/);
  assert.match(dated, /dated-list-title-row/);
  assert.match(css, /grid-template-columns:\s*minmax\(0, 1fr\) auto/);
});

test('v0.25 every first-level section previews at most three items per topic', async () => {
  for (const section of ['technology', 'tools', 'reading', 'nature', 'life']) {
    const page = await read(`src/pages/${section}/index.astro`);
    assert.match(page, /TopicPreview/);
    assert.match(page, /\.slice\(0, 3\)/);
    assert.match(page, /new Set<string>\(\)/);
    assert.match(page, /\.has\(entry\.id\)/);
    assert.match(page, /\.add\(entry\.id\)/);
  }
});

test('v0.25 topic previews keep a clear linked heading and more entry', async () => {
  const component = await read('src/components/TopicPreview.astro');
  assert.match(component, /<h2 class="topic-preview-title"/);
  assert.match(component, /<a href=\{href\}>\{title\}<\/a>/);
  assert.match(component, /查看更多 &gt;&gt;/);
});
