import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = resolve(root, 'scripts/legacy-assets.private.json');
const dryRun = process.argv.includes('--dry-run');

let assets;
try {
  assets = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {
  throw new Error('Missing scripts/legacy-assets.private.json. This private one-time source manifest is intentionally not part of the public release. Existing local article images remain usable; restore your private manifest only when you need to re-download legacy assets.');
}

let downloaded = 0;
let skipped = 0;
let failed = 0;
for (const asset of assets) {
  const targetPath = resolve(root, 'public', `.${asset.target}`);
  try {
    await access(targetPath);
    skipped += 1;
    continue;
  } catch {}

  if (dryRun) {
    console.log(`FETCH ${asset.target}`);
    continue;
  }

  try {
    const response = await fetch(asset.source, { redirect: 'follow' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    await mkdir(dirname(targetPath), { recursive: true });
    await writeFile(targetPath, bytes);
    downloaded += 1;
    console.log(`OK    ${asset.target}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL  ${asset.target}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`Legacy assets: ${downloaded} downloaded, ${skipped} already present, ${failed} failed.`);
if (failed) process.exitCode = 1;
