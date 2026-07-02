import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = resolve(root, 'scripts/legacy-assets.private.json');
const assets = JSON.parse(await readFile(manifestPath, 'utf8'));
const missing = [];
for (const asset of assets) {
  try {
    await access(resolve(root, 'public', `.${asset.target}`));
  } catch {
    missing.push(asset.target);
  }
}
if (missing.length) {
  console.error(`Missing ${missing.length} localized legacy image(s). Run: npm run fetch:legacy-assets`);
  for (const target of missing.slice(0, 20)) console.error(`  ${target}`);
  if (missing.length > 20) console.error(`  ... and ${missing.length - 20} more`);
  process.exit(1);
}
console.log(`All ${assets.length} localized legacy image(s) are present.`);
