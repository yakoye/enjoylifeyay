import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('生产构建生成 Pagefind 静态索引', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(pkg.scripts.build, /pagefind --site dist --force-language zh --silent/);
  assert.ok(pkg.devDependencies.pagefind);
});

test('搜索页使用本地 Pagefind 并显示结构化结果', async () => {
  const page = await readFile(new URL('../src/pages/search/index.astro', import.meta.url), 'utf8');
  assert.match(page, /\/pagefind\/pagefind\.js/);
  assert.match(page, /result\.meta\.type/);
  assert.match(page, /result\.meta\.description/);
  assert.match(page, /result\.meta\.date/);
});

test('全站支持 Ctrl 或 Cmd 加 K 进入搜索', async () => {
  const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
  assert.match(layout, /event\.(ctrlKey|metaKey)/);
  assert.match(layout, /event\.key\.toLowerCase\(\) === ['"]k['"]/);
});

test('文章支持目录、结构化数据、复制代码和 Figure', async () => {
  const article = await readFile(new URL('../src/layouts/ArticleLayout.astro', import.meta.url), 'utf8');
  assert.match(article, /application\/ld\+json/);
  assert.match(article, /class="article-toc"/);
  await access(new URL('../src/components/CopyCode.astro', import.meta.url));
  await access(new URL('../src/components/Figure.astro', import.meta.url));
});
