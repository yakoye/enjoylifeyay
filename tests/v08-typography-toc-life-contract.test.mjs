import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('写作页采用稳定的按日期文本目录，不保留失效筛选器', async () => {
  const page = await readFile(new URL('../src/pages/writing/index.astro', import.meta.url), 'utf8');
  assert.match(page, /WritingList/);
  assert.doesNotMatch(page, /WritingFilters/);
});
