import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const file = (value) => new URL(`../${value}`, import.meta.url);

test('v0.22 reading parent shows recent article links without duplicating article bodies or directory data', async () => {
  const page = await readFile(file('src/pages/reading/index.astro'), 'utf8');
  assert.match(page, /SectionDirectory/);
  assert.match(page, /WritingList/);
  assert.match(page, /最近文章/);
  for (const forbidden of ["getCollection('books')", 'reading-sites.json']) {
    assert.equal(page.includes(forbidden), false, `reading page must not retain ${forbidden}`);
  }
});

test('v0.14 technology and tools defer sections to reusable maps instead of empty card directories', async () => {
  const technology = await readFile(file('src/pages/technology/index.astro'), 'utf8');
  const tools = await readFile(file('src/pages/tools/index.astro'), 'utf8');
  assert.match(technology, /SectionDirectory/);
  assert.match(tools, /SectionDirectory/);
  assert.doesNotMatch(tools, /个人网站与生活工具/);
});

test('v0.14 tool and life categories do not repeat lifestyle websites in tools page', async () => {
  const toolsPage = await readFile(file('src/pages/tools/index.astro'), 'utf8');
  const tools = JSON.parse(await readFile(file('src/content/tools.json'), 'utf8'));
  assert.doesNotMatch(toolsPage, /websites-life/);
  for (const id of ['litebites', 'fitjourney', 'familyjourney']) {
    assert.ok(tools.find((entry) => entry.id === id && entry.category === 'websites-life'));
  }
});

test('v0.14 removes duplicated retired-source entries and uses direct HTML tool URLs', async () => {
  const favorites = JSON.parse(await readFile(file('src/content/favorites.json'), 'utf8'));
  const tools = JSON.parse(await readFile(file('src/content/tools.json'), 'utf8'));
  for (const id of ['legacy-enjoylifeblog', 'github-enjoylifeblog-source']) assert.equal(favorites.some((entry) => entry.id === id), false);
  for (const id of ['rich-editor', 'quick-note-richtext']) {
    const item = tools.find((entry) => entry.id === id);
    assert.match(item.url, /^https:\/\/cdn\.jsdelivr\.net\/gh\/yakoye\/dotfiles@main\/htmledit\/.+\.html$/);
    assert.match(item.githubUrl, /github\.com\/yakoye\/dotfiles\/blob\//);
  }
});

test('v0.14 removes the obsolete projects integration and retains redirect compatibility', async () => {
  const schema = await readFile(file('src/content.config.ts'), 'utf8');
  const redirect = await readFile(file('src/pages/projects/index.astro'), 'utf8');
  assert.doesNotMatch(schema, /const projects = defineCollection/);
  assert.doesNotMatch(schema, /projects\.json/);
  assert.match(redirect, /\/tools\/diy\//);
});
