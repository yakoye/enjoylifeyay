import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('legacy writing route redirects to the technology article directory', async () => {
  const page = await readFile(new URL('../src/pages/writing/index.astro', import.meta.url), 'utf8');
  assert.match(page, /Astro\.redirect\('\/technology\/articles\/', 301\)/);
  assert.doesNotMatch(page, /WritingFilters/);
});
