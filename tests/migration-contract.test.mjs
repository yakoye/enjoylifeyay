import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('迁移清单覆盖三个来源并使用受控状态', async () => {
  const csv = await readFile(new URL('../docs/CONTENT_MIGRATION_MANIFEST.csv', import.meta.url), 'utf8');
  const lines = csv.trim().split(/\r?\n/);
  assert.equal(lines[0], 'source,title,originalUrl,originalPublishedAt,suggestedDomain,suggestedFormat,status,reason');
  assert.ok(lines.length >= 107, `清单数据不足：${lines.length - 1}`);
  assert.ok(lines.filter((line) => line.startsWith('EnjoyLifeBlog,')).length >= 14);
  assert.ok(lines.filter((line) => line.startsWith('CSDN,')).length >= 91);
  assert.ok(lines.some((line) => line.startsWith('Zhihu,')));
  for (const line of lines.slice(1)) {
    assert.match(line, /,(migrated|needs-manual-review|skipped-copyright),/);
  }
});

test('迁移状态报告给出数量和未迁入原因', async () => {
  const report = await readFile(new URL('../docs/CONTENT_MIGRATION_STATUS.md', import.meta.url), 'utf8');
  for (const heading of ['已迁入篇数', '按来源统计', '按领域统计', '待人工确认篇数', '无法迁入原因', '重复内容合并说明', '已忽略的转载']) {
    assert.match(report, new RegExp(heading));
  }
});
