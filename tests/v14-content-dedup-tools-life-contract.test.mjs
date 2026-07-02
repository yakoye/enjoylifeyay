import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const file = (value) => new URL(`../${value}`, import.meta.url);

test('v0.14 reading page shows one nonduplicated list of public reading articles', async () => {
  const page = await readFile(file('src/pages/reading/index.astro'), 'utf8');
  assert.match(page, /DatedTextList/);
  for (const forbidden of ["getCollection('books')", "getCollection('series')", '<h2']) {
    assert.equal(page.includes(forbidden), false, `reading page must not retain ${forbidden}`);
  }
});

test('v0.14 hides empty technical series and emits static series only when public writing exists', async () => {
  const technology = await readFile(file('src/pages/technology/index.astro'), 'utf8');
  const seriesPage = await readFile(file('src/pages/series/[id].astro'), 'utf8');
  assert.match(technology, /filter\(\(item\) => item\.count > 0\)/);
  assert.match(seriesPage, /writingEntries\.some/);
});

test('v0.14 tool and life categories do not repeat lifestyle websites', async () => {
  const toolsPage = await readFile(file('src/pages/tools/index.astro'), 'utf8');
  const lifePage = await readFile(file('src/pages/life/index.astro'), 'utf8');
  const tools = JSON.parse(await readFile(file('src/content/tools.json'), 'utf8'));
  assert.match(toolsPage, /自己 DIY 项目/);
  assert.match(toolsPage, /Chrome 扩展与网页工具/);
  assert.doesNotMatch(toolsPage, /个人网站与生活工具/);
  for (const id of ['litebites', 'fitjourney', 'familyjourney']) {
    assert.ok(tools.find((entry) => entry.id === id && entry.category === 'websites-life'));
  }
  for (const heading of ['饮食', '影集与家庭', '运动']) assert.match(lifePage, new RegExp(heading));
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

  // A zip-overlay upgrade can leave an old, unused projects.json on disk. The
  // important contract is that Astro no longer defines or loads a projects
  // collection; stale files must not break local verification.
  assert.doesNotMatch(schema, /const projects = defineCollection/);
  assert.doesNotMatch(schema, /projects\.json/);
  assert.match(redirect, /\/tools\/#diy-projects/);
});
