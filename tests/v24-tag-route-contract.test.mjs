import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('v0.24.1 tag routes keep slash-containing tags in one path segment', async () => {
  const [tags, route] = await Promise.all([
    read('src/lib/tags.ts'),
    read('src/pages/tags/[tag].astro'),
  ]);

  assert.match(tags, /export function encodeTagParam/);
  assert.match(tags, /TAG_PARAM_UNSAFE/);
  assert.match(tags, /encodeURIComponent\(encodeTagParam\(tag\)\)/);
  assert.match(route, /params:\s*\{ tag: encodeTagParam\(tag\) \}/);
  assert.match(route, /props:\s*\{ tag \}/);
  assert.match(route, /const \{ tag \} = Astro\.props/);
  assert.doesNotMatch(route, /params:\s*\{ tag \}/);
});
