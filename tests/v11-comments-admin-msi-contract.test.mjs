import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

test('MSI/MSI-X 测试文章有本地图片资源', async () => {
  const article = await readFile(new URL('../src/content/writing/2024-05-24-pcie-msi-msix-introduction.mdx', import.meta.url), 'utf8');
  assert.match(article, /Figure/);
  assert.match(article, /pci_alloc_irq_vectors/);
  await stat(new URL('../public/images/articles/pcie-msi-msix-introduction/msi-capability-32bit.png', import.meta.url));
  await stat(new URL('../public/images/articles/pcie-msi-msix-introduction/msix-table.png', import.meta.url));
});
