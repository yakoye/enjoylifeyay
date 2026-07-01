import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('仓库记录完整的 Windows 构建、预览与 Wrangler 发布流程', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const guide = await readFile(new URL('../docs/BUILD_PREVIEW_DEPLOY.md', import.meta.url), 'utf8');
  for (const command of [
    'npm ci',
    'npm run check',
    'npm test',
    'npm run build',
    'npm run check:links',
    'npm run preview',
    'npx wrangler pages deploy dist --project-name enjoylifeyay --branch main',
  ]) {
    assert.ok(readme.includes(command), `README 缺少 ${command}`);
    assert.ok(guide.includes(command), `发布指南缺少 ${command}`);
  }
  await access(new URL('../scripts/reset-local.ps1', import.meta.url));
  await access(new URL('../scripts/verify-and-deploy.ps1', import.meta.url));
});

test('v0.5 保留旧博客公开文章与来源台账', async () => {
  const catalog = await readFile(new URL('../docs/LEGACY_SOURCE_CATALOG.md', import.meta.url), 'utf8');
  const manifest = await readFile(new URL('../docs/CONTENT_MIGRATION_MANIFEST.csv', import.meta.url), 'utf8');
  const writingDir = new URL('../src/content/writing/', import.meta.url);
  assert.match(catalog, /CSDN：BjarneCpp/);
  assert.match(catalog, /知乎：wikiye/);
  assert.match(manifest, /EnjoyLifeBlog,自我突围 施一公.*?,migrated,/);
  await access(new URL('2024-06-12-pcie-low-power.md', writingDir));
  await access(new URL('2024-04-25-common-flowers.md', writingDir));
});
