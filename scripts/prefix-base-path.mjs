import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const textExtensions = new Set(['.html', '.css', '.json', '.xml', '.webmanifest']);

export function normalizeBasePath(value = '/') {
  const trimmed = String(value).trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

export function prefixRootRelativeUrls(content, value = '/') {
  const base = normalizeBasePath(value);
  if (base === '/') return content;
  const baseWithoutEdges = base.slice(1, -1);
  const prefixSegment = (segment) => {
    const quoted = segment.replace(/(["'`])\/(?!\/)/g, (match, quote, offset, source) => {
      const remainder = source.slice(offset + match.length);
      if (remainder === baseWithoutEdges || remainder.startsWith(`${baseWithoutEdges}/`)) return match;
      return `${quote}${base}`;
    });
    return quoted.replace(/url\((['"]?)\/(?!\/)/g, (match, quote, offset, source) => {
      const remainder = source.slice(offset + match.length);
      if (remainder === baseWithoutEdges || remainder.startsWith(`${baseWithoutEdges}/`)) return match;
      return `url(${quote}${base}`;
    });
  };

  return content
    .split(/(<script\b[^>]*>[\s\S]*?<\/script>)/gi)
    .map((segment) => /^<script\b/i.test(segment) ? segment : prefixSegment(segment))
    .join('');
}

async function listTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listTextFiles(fullPath));
    else if (textExtensions.has(path.extname(entry.name).toLowerCase())) files.push(fullPath);
  }
  return files;
}

async function main() {
  const base = normalizeBasePath(process.env.BASE_PATH || '/');
  if (base === '/') {
    console.log('Base path is /; generated files do not need rewriting.');
    return;
  }
  const dist = path.resolve('dist');
  const files = await listTextFiles(dist);
  let changed = 0;
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const output = prefixRootRelativeUrls(source, base);
    if (output === source) continue;
    await writeFile(file, output, 'utf8');
    changed += 1;
  }
  console.log(`Prefixed ${changed} generated file(s) with ${base}.`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
