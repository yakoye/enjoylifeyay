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
  await access(new URL('../scripts/local-preview.ps1', import.meta.url));
  await access(new URL('../scripts/stop-local-preview.ps1', import.meta.url));
  await access(new URL('../preview-local.cmd', import.meta.url));
  await access(new URL('../stop-local-preview.cmd', import.meta.url));
});

test('v0.15 将旧个人文章本地化并保留 CSDN 与知乎迁移台账', async () => {
  const catalog = await readFile(new URL('../docs/LEGACY_SOURCE_CATALOG.md', import.meta.url), 'utf8');
  const manifest = await readFile(new URL('../docs/CONTENT_MIGRATION_MANIFEST.csv', import.meta.url), 'utf8');
  const writingDir = new URL('../src/content/writing/', import.meta.url);
  assert.match(catalog, /CSDN：BjarneCpp/);
  assert.match(catalog, /知乎：wikiye/);
  assert.doesNotMatch(manifest, new RegExp(['Enjoy', 'LifeBlog'].join('')));
  await access(new URL('2024-06-12-pcie-low-power.md', writingDir));
  await access(new URL('2024-04-03-minimal-life.md', writingDir));
  await access(new URL('2024-05-06-about-weight.md', writingDir));
});

test('v0.11.2 提供一键检查、构建并打开本地预览的 Windows 脚本', async () => {
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const previewScript = await readFile(new URL('../scripts/local-preview.ps1', import.meta.url), 'utf8');
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const guide = await readFile(new URL('../docs/BUILD_PREVIEW_DEPLOY.md', import.meta.url), 'utf8');

  assert.equal(packageJson.scripts['preview:local'], 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\local-preview.ps1');
  assert.equal(packageJson.scripts['preview:local:install'], 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\local-preview.ps1 -Install');
  assert.equal(packageJson.scripts['preview:local:stop'], 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\stop-local-preview.ps1');

  for (const fragment of [
    "Invoke-NpmCommand @('run', 'check')",
    "Invoke-NpmCommand @('test')",
    "Invoke-NpmCommand @('run', 'audit:toc')",
    "Invoke-NpmCommand @('run', 'build')",
    "Invoke-NpmCommand @('run', 'check:links')",
    'http://${hostName}:$Port/',
    'Start-Process $siteUrl',
  ]) {
    assert.ok(previewScript.includes(fragment), `一键预览脚本缺少 ${fragment}`);
  }

  for (const text of [readme, guide]) {
    assert.ok(text.includes('preview-local.cmd'));
    assert.ok(text.includes('stop-local-preview.cmd'));
    assert.ok(text.includes('preview-local.cmd -Install'));
  }
});
