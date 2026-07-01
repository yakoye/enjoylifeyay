import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

test('评论提供可选邮箱、自适应留言和命令行管理入口', async () => {
  const comments = await readFile(new URL('../src/components/Comments.astro', import.meta.url), 'utf8');
  const api = await readFile(new URL('../functions/api/comments.js', import.meta.url), 'utf8');
  const admin = await readFile(new URL('../scripts/comments-admin.mjs', import.meta.url), 'utf8');
  assert.match(comments, /邮箱（可选）/);
  assert.match(comments, /autoResize/);
  assert.match(api, /COMMENTS_MODERATION/);
  assert.match(api, /email/);
  assert.match(admin, /migrate-email/);
  assert.match(admin, /comments:probe/);
});

test('MSI/MSI-X 测试文章有本地图片资源', async () => {
  const article = await readFile(new URL('../src/content/writing/2024-05-24-pcie-msi-msix-introduction.mdx', import.meta.url), 'utf8');
  assert.match(article, /Figure/);
  assert.match(article, /pci_alloc_irq_vectors/);
  await stat(new URL('../public/images/articles/pcie-msi-msix-introduction/msi-capability-32bit.png', import.meta.url));
  await stat(new URL('../public/images/articles/pcie-msi-msix-introduction/msix-table.png', import.meta.url));
});
