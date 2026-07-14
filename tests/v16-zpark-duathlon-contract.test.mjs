import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const articlePath = join(root, 'src/content/writing/2020-10-31-zpark-duathlon-first.mdx');
const imagePath = join(root, 'public/images/articles/2020-10-31-zpark-duathlon-first/zpark-duathlon-finish-2020-10-31.webp');

test('v0.16 adds the ZPark cycling-running record with a local image', async () => {
  const article = await readFile(articlePath, 'utf8');
  await access(imagePath);
  assert.match(article, /title: "中关村软件园 ZPark 骑跑两项第一名"/);
  assert.match(article, /date: 2020-10-31/);
  assert.match(article, /section: life\/movement/);
  assert.match(article, /tags: \["骑行", "跑步", "比赛"\]/);
  assert.match(article, /\/images\/articles\/2020-10-31-zpark-duathlon-first\/zpark-duathlon-finish-2020-10-31\.webp/);
  assert.match(article, /获得第一名/);
});
