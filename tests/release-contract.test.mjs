import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

test('仓库提供构建产物链接检查器', async () => {
  await access(new URL('../scripts/check-built-links.mjs', import.meta.url));
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(pkg.scripts['check:links'], /check-built-links/);
});

test('实施报告覆盖交付、迁移、问题与部署', async () => {
  const report = await readFile(new URL('../docs/IMPLEMENTATION_REPORT.md', import.meta.url), 'utf8');
  for (const heading of ['修改文件', '已完成功能', '内容迁移', '待人工确认', '已知问题', 'Cloudflare Pages']) {
    assert.match(report, new RegExp(heading));
  }
});

test('README 记录 v1 开发、检查和内容维护命令', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  for (const command of ['npm run dev', 'npm test', 'npm run check', 'npm run build', 'npm run check:links']) {
    assert.ok(readme.includes(command));
  }
});
