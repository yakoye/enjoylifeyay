import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const path = new URL('../docs/CONTENT_MIGRATION_MANIFEST.csv', import.meta.url);
const text = await readFile(path, 'utf8');
const lines = text.trim().split(/\r?\n/);
const parse = (line) => {
  const values = []; let value = ''; let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && quoted && line[i + 1] === '"') { value += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { values.push(value); value = ''; }
    else value += char;
  }
  values.push(value); return values;
};

const header = parse(lines[0]);
assert.deepEqual(header, ['source','title','originalUrl','originalPublishedAt','suggestedDomain','suggestedFormat','status','reason']);
const allowedStatus = new Set(['migrated', 'needs-manual-review', 'skipped-copyright']);
const counts = new Map();
for (const [index, line] of lines.slice(1).entries()) {
  const row = parse(line);
  assert.equal(row.length, header.length, `第 ${index + 2} 行字段数量错误`);
  const [source, title, url, date, , , status, reason] = row;
  assert.ok(source && title && url && reason, `第 ${index + 2} 行缺少必填字段`);
  assert.ok(['CSDN', 'Zhihu'].includes(source), `第 ${index + 2} 行来源不应再公开旧个人站`);
  assert.ok(allowedStatus.has(status), `第 ${index + 2} 行状态非法`);
  if (date) assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
  counts.set(source, (counts.get(source) || 0) + 1);
}
assert.equal(counts.get('CSDN'), 90);
assert.ok((counts.get('Zhihu') || 0) >= 1);
console.log(`Migration manifest valid: ${lines.length - 1} rows`);
