import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const required = ['index.html','writing/index.html','series/index.html','tools/index.html','nature/index.html','bookshelf/index.html','favorites/index.html','projects/index.html','about/index.html','search/index.html','archive/index.html','now/index.html','tags/index.html','404.html','rss.xml','robots.txt','sitemap-index.xml','pagefind/pagefind.js'];
await Promise.all(required.map((file) => access(join(root, file))));

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
};

const missing = [];
for (const file of await walk(root)) {
  const html = await readFile(file, 'utf8');
  const pagePath = `/${relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, '')}`;
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:|javascript:|#)/.test(href)) continue;
    const url = new URL(href, `https://enjoylifeyay.pages.dev${pagePath}`);
    let target = decodeURIComponent(url.pathname).replace(/^\//, '');
    if (!target || target.endsWith('/')) target += 'index.html';
    else if (!extname(target)) target += '/index.html';
    try { await access(join(root, target)); }
    catch { missing.push(`${relative(root, file)} -> ${href}`); }
  }
}
assert.deepEqual(missing, [], `发现站内死链：\n${missing.join('\n')}`);
console.log(`Built link check passed: ${required.length} required targets, 0 broken internal links`);
