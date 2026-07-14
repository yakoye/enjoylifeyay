import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => readFile(path.join(root, relative), 'utf8');

test('阅读首页保留四个入口并显示最近文章索引', async () => {
  const page = await read('src/pages/reading/index.astro');
  assert.match(page, /getVisibleSectionPages\('reading'\)/);
  assert.match(page, /WritingList/);
  assert.match(page, /getCollection\('writing'/);
  assert.match(page, /最近文章/);

  const expected = [
    ['reading-articles.md', 'articles', '总结', '1'],
    ['reading-books.md', 'books', '书架', '2'],
    ['reading-principles.md', 'principles', '原则', '3'],
    ['reading-sites.md', 'sites', '站外专题', '4'],
  ];

  for (const [file, slug, title, order] of expected) {
    const content = await read(`src/content/section-pages/reading/${file}`);
    assert.match(content, new RegExp(`routeSlug:\\s*${slug}`));
    assert.match(content, new RegExp(`title:\\s*${title}`));
    assert.match(content, new RegExp(`order:\\s*${order}`));
  }
});

test('阅读旧占位入口退出信息架构', async () => {
  for (const file of ['reading-translated-books.md', 'reading-my-books.md']) {
    await assert.rejects(access(path.join(root, 'src/content/section-pages/reading', file)));
  }
});

test('原则栏目显示标题和文章列表，正文只存在于独立文章', async () => {
  const [sectionPage, article, model] = await Promise.all([
    read('src/content/section-pages/reading/reading-principles.md'),
    read('src/content/writing/2026-07-13-personal-principles-and-reminders.md'),
    read('src/config/content-model.ts'),
  ]);
  assert.match(sectionPage, /title:\s*原则/);
  assert.match(sectionPage, /kind:\s*writing/);
  assert.match(sectionPage, /writingSections:\s*\["reading\/principles"\]/);
  assert.doesNotMatch(sectionPage, /## 学习与记忆/);
  assert.match(model, /['"]reading\/principles['"]/);
  for (const heading of ['学习与记忆', '思考与求真', '判断与决策', '反思与复盘', '健康', '最后提醒']) {
    assert.match(article, new RegExp(`## ${heading}`));
  }
  assert.match(article, /同一观点只保留在最适合的位置/);
});

test('书架只按状态展示书名和简介，不复制或链接总结正文', async () => {
  const [route, component] = await Promise.all([
    read('src/pages/[section]/[slug].astro'),
    read('src/components/BookshelfList.astro'),
  ]);
  assert.match(route, /BookshelfList/);
  assert.doesNotMatch(component, /relatedWriting|href=|finishedAt|startedAt|author/);
  assert.match(component, /读过/);
  assert.match(component, /待读/);
  assert.match(component, /item\.data\.note/);
});

test('全站思维导图记录唯一归属和阅读四分区', async () => {
  const map = await read('docs/网站内容思维导图.md');
  assert.match(map, /```mermaid/);
  assert.match(map, /总结/);
  assert.match(map, /书架/);
  assert.match(map, /原则/);
  assert.match(map, /站外专题/);
  assert.match(map, /一个内容只有一个正文归属/);
});
