import { readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const targets = [
  resolve(root, 'src/content/writing'),
  resolve(root, 'src/layouts'),
  resolve(root, 'src/pages'),
  resolve(root, 'src/components'),
  resolve(root, 'src/data'),
];
const retiredHost = ['globe', 'treklog', '.github.io'].join('');
const retiredLabel = ['Enjoy', 'LifeBlog'].join('');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
const forbidden = new RegExp([retiredHost, retiredLabel].map(escapeRegExp).join('|'), 'iu');
const files = [];
async function walk(dir) {
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const full = resolve(dir, name.name);
    if (name.isDirectory()) await walk(full);
    else if (/\.(astro|md|mdx|ts|json)$/u.test(name.name)) files.push(full);
  }
}
for (const dir of targets) await walk(dir);
const leaked = [];
for (const file of files) {
  const text = await readFile(file, 'utf8');
  if (forbidden.test(text)) leaked.push(file.slice(root.length + 1));
}
if (leaked.length) {
  console.error('A retired legacy-site identifier leaked into public content:');
  for (const file of leaked) console.error(`  ${file}`);
  process.exit(1);
}
console.log('Public content contains no retired legacy-site identifier.');
