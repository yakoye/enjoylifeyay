import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('legacy writing route redirects to the consolidated technology page', async () => {
  const page = await readFile(new URL('../src/pages/writing/index.astro', import.meta.url), 'utf8');
  assert.match(page, /Astro\.redirect\('\/technology\/#technical-writing', 301\)/);
  assert.doesNotMatch(page, /WritingFilters/);
});
