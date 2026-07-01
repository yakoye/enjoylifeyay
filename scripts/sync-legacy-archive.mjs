import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = resolve(root, 'docs/CONTENT_MIGRATION_MANIFEST.csv');
const outputPath = resolve(root, 'src/data/legacyArchive.ts');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  row.push(field.replace(/\r$/, ''));
  if (row.some((value) => value.length > 0)) rows.push(row);

  const [header, ...body] = rows;
  return body.map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])));
}

const rows = parseCsv(await readFile(manifestPath, 'utf8'));
const hasDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

// Public archive policy:
// - all CSDN entries remain as original-platform links;
// - all dated old GitHub-blog entries are generated; the archive page removes entries already published locally;
// - drafts, withheld posts and original-only pages stay visible as their historical source links;
// - Zhihu has no reliable per-post dates in the accessible source, so it is exposed as one source entry below.
const entries = rows
  .filter((row) => {
    if (!hasDate(row.originalPublishedAt) || !row.originalUrl) return false;
    return row.source === 'CSDN' || row.source === 'EnjoyLifeBlog';
  })
  .map((row, index) => ({
    id: `${row.source.toLowerCase()}-${index + 1}`,
    title: row.title,
    href: row.originalUrl,
    date: row.originalPublishedAt,
    source: row.source,
  }))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'));

const sourceLinks = rows
  .filter((row) => !hasDate(row.originalPublishedAt) && row.originalUrl)
  .map((row, index) => ({
    id: `${row.source.toLowerCase()}-source-${index + 1}`,
    title: row.title,
    description: row.source === 'Zhihu'
      ? '知乎历史内容入口；待获得可核对标题和日期的导出数据后再写入时间线。'
      : row.reason || '历史来源入口。',
    href: row.originalUrl,
    source: row.source,
  }));

const source = `// 此文件由 scripts/sync-legacy-archive.mjs 从 docs/CONTENT_MIGRATION_MANIFEST.csv 自动生成。\n// 请不要手工修改；更新历史来源后运行 npm run sync:legacy-archive 或 npm run build。\n\nexport type LegacyArchiveEntry = {\n  id: string;\n  title: string;\n  href: string;\n  date: string;\n  source: 'CSDN' | 'EnjoyLifeBlog';\n};\n\nexport type LegacySourceLink = {\n  id: string;\n  title: string;\n  description: string;\n  href: string;\n  source: string;\n};\n\nexport const legacyArchiveEntries: LegacyArchiveEntry[] = ${JSON.stringify(entries, null, 2)};\n\nexport const legacySourceLinks: LegacySourceLink[] = ${JSON.stringify(sourceLinks, null, 2)};\n`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, source, 'utf8');
console.log(`Synced ${entries.length} dated historical entries and ${sourceLinks.length} undated source links.`);
