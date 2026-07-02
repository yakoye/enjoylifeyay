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
// - Local writing is shown directly by the archive page.
// - Dated CSDN entries remain as original-platform links until their full text is migrated.
// - The retired old personal site is intentionally not exposed in the generated archive.
// - Zhihu has no reliable per-post dates in the accessible source, so it remains one source entry below.
const entries = rows
  .filter((row) => hasDate(row.originalPublishedAt) && row.originalUrl && row.source === 'CSDN' && row.title !== 'C语言速查')
  .map((row, index) => ({
    id: `csdn-${index + 1}`,
    title: row.title,
    href: row.originalUrl,
    date: row.originalPublishedAt,
    source: 'CSDN',
  }))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'));

const sourceLinks = rows
  .filter((row) => !hasDate(row.originalPublishedAt) && row.originalUrl && row.source === 'Zhihu')
  .map((row, index) => ({
    id: `zhihu-source-${index + 1}`,
    title: row.title,
    description: '知乎上的历史回答与记录。',
    href: row.originalUrl,
    source: row.source,
  }));

const source = `// 此文件由 scripts/sync-legacy-archive.mjs 从 docs/CONTENT_MIGRATION_MANIFEST.csv 自动生成。
// 请不要手工修改；更新历史来源后运行 npm run sync:legacy-archive 或 npm run build。

export type LegacyArchiveEntry = {
  id: string;
  title: string;
  href: string;
  date: string;
  source: 'CSDN';
};

export type LegacySourceLink = {
  id: string;
  title: string;
  description: string;
  href: string;
  source: string;
};

export const legacyArchiveEntries: LegacyArchiveEntry[] = ${JSON.stringify(entries, null, 2)};

export const legacySourceLinks: LegacySourceLink[] = ${JSON.stringify(sourceLinks, null, 2)};
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, source, 'utf8');
console.log(`Synced ${entries.length} dated CSDN entries and ${sourceLinks.length} undated source links.`);
