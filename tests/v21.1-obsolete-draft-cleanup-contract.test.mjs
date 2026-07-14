import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const read = (relativePath) => readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');

test('v0.21.1 cleans only the retired internal validation draft before content validation', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  const script = await read('scripts/clean-obsolete-content.mjs');

  assert.equal(packageJson.scripts['clean:obsolete-content'], 'node scripts/clean-obsolete-content.mjs');
  assert.equal(packageJson.scripts.precheck, 'npm run clean:obsolete-content');
  assert.match(packageJson.scripts.prebuild, /npm run clean:obsolete-content/);
  assert.match(script, /src[\\/',]?[\\/']?content[\\/',]?[\\/']?writing[\\/',]?[\\/']?site-notes\.md/);
  assert.match(script, /never scans, rewrites, or deletes user-authored posts/);
});
