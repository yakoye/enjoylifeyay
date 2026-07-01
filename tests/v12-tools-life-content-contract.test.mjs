import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const fromHere = (value) => fileURLToPath(new URL(value, import.meta.url));

test('v0.12 removes projects from navigation and redirects legacy projects route', async () => {
  const site = await readFile(fromHere('../src/config/site.ts'), 'utf8');
  const route = await readFile(fromHere('../src/pages/projects/index.astro'), 'utf8');
  assert.doesNotMatch(site, /label: '项目'/);
  assert.doesNotMatch(site, /label: '收藏'/);
  assert.match(route, /Astro\.redirect\('\/tools\/#projects', 301\)/);
});

test('v0.12 tools include the supplied public tool and site links', async () => {
  const tools = JSON.parse(await readFile(fromHere('../src/content/tools.json'), 'utf8'));
  const ids = new Set(tools.map((tool) => tool.id));
  for (const id of ['dictfloat','keypass','quick-note-float','regcalc64','familyjourney','regcalc-text-tool','litebites','fitjourney','yaji-classic-poetry','pcie-chinese-library']) {
    assert.ok(ids.has(id), `missing tool ${id}`);
  }
  assert.ok(tools.find((tool) => tool.id === 'familyjourney').url.startsWith('https://familyjourney.pages.dev'));
});

test('v0.12 adds about page and cycling/running articles', async () => {
  await stat(fromHere('../src/pages/about/me.astro'));
  const cycling = await readFile(fromHere('../src/content/writing/2026-07-01-the-long-road-i-have-ridden.md'), 'utf8');
  const running = await readFile(fromHere('../src/content/writing/2026-07-01-when-i-run.md'), 'utf8');
  assert.match(cycling, /series: \["life-cycling"\]/);
  assert.match(running, /series: \["life-running"\]/);
});

test('v0.12 narrows normal article images on desktop while preserving a wide opt-in', async () => {
  const typography = await readFile(fromHere('../src/styles/typography.css'), 'utf8');
  const global = await readFile(fromHere('../src/styles/global.css'), 'utf8');
  assert.match(typography, /width: min\(60%, 34rem\)/);
  assert.match(typography, /figure\.wide img/);
  assert.match(global, /@media \(max-width: 640px\)[\s\S]*\.article-prose img[\s\S]*width: 100%/);
});

test('v0.12 keeps an explicit mobile typography decision', async () => {
  const tokens = await readFile(fromHere('../src/styles/tokens.css'), 'utf8');
  assert.match(tokens, /--font-page-title: 1\.25rem/);
  assert.match(tokens, /--font-h2: 1\.125rem/);
  assert.match(tokens, /--font-h3: 1rem/);
  assert.match(tokens, /--font-body: 0\.9375rem/);
});
