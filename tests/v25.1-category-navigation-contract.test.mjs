import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('v0.25.1 every first-level section exposes direct category navigation near the top', async () => {
  for (const section of ['technology', 'tools', 'reading', 'nature', 'life']) {
    const page = await read(`src/pages/${section}/index.astro`);
    assert.match(page, /import SectionMap/);
    assert.match(page, /const categoryItems = sectionPages\.map/);
    assert.match(page, /href: `\/\$\{sectionPage\.data\.section\}\/\$\{sectionPage\.data\.routeSlug\}\//);
    assert.match(page, /<SectionMap label="分类" items=\{categoryItems\} \/>/);
  }
});

test('v0.25.1 category and sibling navigation use spacing instead of middle-dot separators', async () => {
  const [map, css] = await Promise.all([
    read('src/components/SectionMap.astro'),
    read('src/styles/global.css'),
  ]);
  assert.doesNotMatch(map, /section-map-separator/);
  assert.doesNotMatch(map, />·</);
  assert.match(map, /section-map-prefix/);
  assert.match(css, /\.section-map\s*\{[\s\S]*display:\s*flex/);
  assert.match(css, /gap:\s*0\.32rem 1rem/);
});
