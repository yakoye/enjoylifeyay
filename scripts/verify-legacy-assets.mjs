import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const writingDir = resolve(root, 'src/content/writing');
const entries = await readdir(writingDir, { withFileTypes: true });
const assets = new Set();

for (const entry of entries) {
  if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;
  const source = await readFile(resolve(writingDir, entry.name), 'utf8');
  for (const match of source.matchAll(/\/images\/articles\/legacy-[^)\s"'<>]+/g)) {
    assets.add(match[0]);
  }
}

if (assets.size === 0) {
  console.error('No localized legacy image references were found in public writing.');
  process.exit(1);
}

const missing = [];
for (const target of assets) {
  try {
    await access(resolve(root, 'public', `.${target}`));
  } catch {
    missing.push(target);
  }
}

if (missing.length) {
  console.error(`Missing ${missing.length} localized legacy image(s). Run: npm run fetch:legacy-assets`);
  for (const target of missing.slice(0, 20)) console.error(`  ${target}`);
  if (missing.length > 20) console.error(`  ... and ${missing.length - 20} more`);
  process.exit(1);
}

console.log(`All ${assets.size} localized legacy image(s) referenced by public writing are present.`);
