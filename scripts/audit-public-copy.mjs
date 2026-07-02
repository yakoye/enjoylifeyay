import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import process from 'node:process';

const roots = [
  'src/pages',
  'src/components',
  'src/layouts',
  'src/content/section-pages',
  'src/data',
];
const extensions = new Set(['.astro', '.md', '.mdx', '.ts', '.tsx']);
const ignored = new Set([
  'src/data/legacyArchive.ts',
]);
const patterns = [
  /公开地址待确认/u,
  /内容正在整理中/u,
  /RSS 准备中/u,
  /这里不提前虚构/u,
  /待获得可核对/u,
  /迁入本站/u,
  /私有项目/u,
  /项目根目录/u,
  /Git 仓库为版本/u,
  /Cloudflare Pages。公开内容/u,
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (extensions.has(full.slice(full.lastIndexOf('.')))) files.push(full);
  }
  return files;
}

const failures = [];
for (const root of roots) {
  for (const file of await walk(root)) {
    if (ignored.has(file)) continue;
    const text = await readFile(file, 'utf8');
    for (const pattern of patterns) {
      if (pattern.test(text)) failures.push(`${relative('.', file)}: ${pattern}`);
    }
  }
}

if (failures.length) {
  console.error('Public-copy audit found developer-facing placeholder text:');
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}
console.log('Public-copy audit passed.');
