import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (relative) => readFile(join(root, relative), 'utf8');

test('v0.24 一级目录与二级页面都保留清楚的返回路径', async () => {
  const directory = await read('src/components/TopicPreview.astro');
  const breadcrumbs = await read('src/components/Breadcrumbs.astro');
  assert.match(directory, /href=\{href\}/);
  assert.match(breadcrumbs, /面包屑导航/);

  for (const section of ['technology', 'tools', 'reading', 'nature', 'life']) {
    const parent = await read(`src/pages/${section}/index.astro`);
    assert.match(parent, /TopicPreview/);
  }

  const child = await read('src/pages/[section]/[slug].astro');
  assert.match(child, /<Breadcrumbs items=/);
  assert.match(child, /href: `\/\$\{data\.section\}\//);
});
test('v0.19 每篇文章保留发布日期和可显示的发布时间', async () => {
  const schema = await read('src/content.config.ts');
  const articleLayout = await read('src/layouts/ArticleLayout.astro');
  const files = (await readdir(join(root, 'src/content/writing'))).filter((name) => /\.mdx?$/.test(name));

  assert.match(schema, /publishedAt:\s*date/);
  assert.match(articleLayout, /发布：\{formatDateTime\(publishedAt\)\}/);
  assert.match(articleLayout, /timeZone: 'Asia\/Shanghai'/);

  for (const filename of files) {
    const source = await read(`src/content/writing/${filename}`);
    const frontmatter = source.split('\n---', 1)[0];
    assert.match(frontmatter, /^date:\s*\d{4}-\d{2}-\d{2}$/m, `${filename} 缺少 date`);
    assert.match(frontmatter, /^publishedAt:\s*\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/m, `${filename} 缺少 publishedAt`);
  }
});

test('v0.20 公开页面使用读者文案，并由 Markdown 页面维护', async () => {
  await access(join(root, 'scripts/audit-public-copy.mjs'));
  const pkg = JSON.parse(await read('package.json'));
  const [nature, archive, travel, about, schema] = await Promise.all([
    read('src/content/site-pages/nature.md'),
    read('src/content/site-pages/archive.md'),
    read('src/content/section-pages/life/life-travel.md'),
    read('src/content/site-pages/about.md'),
    read('src/content.config.ts'),
  ]);

  assert.match(pkg.scripts['audit:public-copy'], /audit-public-copy/);
  assert.match(nature, /植物·动物·季节·行走与观察·地方记忆/);
  assert.match(archive, /按首次发布日期汇总。/);
  assert.match(travel, /记录行走、旅行、路线、照片途经的地方、遇见的人和事。/);
  assert.match(schema, /const sitePages = defineCollection/);
  assert.doesNotMatch(about, /技术栈|后台管理系统|Git 仓库为版本/);
});
