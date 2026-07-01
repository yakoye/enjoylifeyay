import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('technology page keeps a stable dated text directory without the retired filters', async () => {
  const page = await readFile(new URL('../src/pages/technology/index.astro', import.meta.url), 'utf8');
  assert.match(page, /WritingList/);
  assert.doesNotMatch(page, /WritingFilters/);
});
