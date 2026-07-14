import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (relative) => readFile(join(root, relative), 'utf8');

test('v0.21 文章只维护唯一 section 与最多三个 tags', async () => {
  const directory = join(root, 'src/content/writing');
  const filenames = (await readdir(directory)).filter((name) => /\.mdx?$/.test(name));
  assert.equal(filenames.includes('site-notes.md'), false);
  for (const filename of filenames) {
    const source = await read(`src/content/writing/${filename}`);
    const frontmatter = source.split('\n---', 1)[0];
    assert.match(frontmatter, /^section:\s*[a-z-]+\/[a-z-]+$/m, `${filename} 缺少 section`);
    assert.match(frontmatter, /^tags:\s*\[/m, `${filename} 缺少 tags`);
    for (const obsolete of ['domain:', 'format:', 'topics:', 'series:']) {
      assert.doesNotMatch(frontmatter, new RegExp(`^${obsolete}`, 'm'), `${filename} 不应保留 ${obsolete}`);
    }
  }
});

test('v0.21 标签只为至少两篇公开文章生成索引和页面', async () => {
  const [index, route, tags, model, articleLayout] = await Promise.all([
    read('src/pages/tags/index.astro'),
    read('src/pages/tags/[tag].astro'),
    read('src/lib/tags.ts'),
    read('src/config/content-model.ts'),
    read('src/layouts/ArticleLayout.astro'),
  ]);
  await access(join(root, 'src/pages/tags/[tag].astro'));
  assert.match(tags, /MIN_PUBLIC_TAG_COUNT = 2/);
  assert.match(index, /getPublicTags/);
  assert.match(route, /getStaticPaths/);
  assert.match(articleLayout, /publicTagSet\.has\(tag\)/);
  assert.match(model, /tools\/software-productivity/);
});

test('v0.21 二级地图按实际内容显示，旧系列 URL 仍可返回对应栏目', async () => {
  const [visibility, redirects, maintenance, changelog] = await Promise.all([
    read('src/lib/section-pages.ts'),
    read('src/config/content-model.ts'),
    read('docs/CONTENT_MAINTENANCE.md'),
    read('docs/CHANGELOG.md'),
  ]);
  assert.match(visibility, /showInMap/);
  assert.match(visibility, /matchesWritingSectionPage/);
  assert.match(redirects, /pcie-high-speed-interconnect/);
  assert.match(redirects, /life-running/);
  assert.match(maintenance, /section/);
  assert.match(changelog, /v0\.21/);
});
