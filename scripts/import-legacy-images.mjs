/**
 * 将已迁入 Markdown 中、仍指向旧 EnjoyLifeBlog 的图片复制到本站 public/images。
 *
 * 默认只预览，不下载、不改 Markdown：
 *   npm run import:legacy-images -- --dry-run
 *
 * 确认后执行下载和替换：
 *   npm run import:legacy-images -- --write
 *
 * 可按一篇文章的稳定 mediaKey 处理：
 *   npm run import:legacy-images -- --write --media-key=legacy-2024-06-12-pcie-low-power
 *
 * 图片输出目录与 Markdown 文件名无关：
 *   public/images/legacy/<mediaKey>/<stable-hash>.<ext>
 * 因此以后重命名文章 slug 或 Markdown 文件时，不需要移动图片目录。
 */
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);
const writingDir = new URL('../src/content/writing/', import.meta.url);
const publicDir = new URL('../public/', import.meta.url);
const args = new Set(process.argv.slice(2));
const write = args.has('--write');
const dryRun = args.has('--dry-run') || !write;
const keyArg = process.argv.find((arg) => arg.startsWith('--media-key='));
const requestedMediaKey = keyArg ? keyArg.slice('--media-key='.length) : '';
const legacyHost = 'https://globetreklog.github.io/EnjoyLifeBlog/img/';

const fileList = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = new URL(entry.name, directory);
    if (entry.isDirectory()) return fileList(path);
    return /\.(md|mdx)$/i.test(entry.name) ? [path] : [];
  }));
  return nested.flat();
};

const readMediaKey = (source) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return '';
  return match[1].match(/^mediaKey:\s*["']?([^"'\r\n]+)["']?\s*$/m)?.[1].trim() || '';
};

const imageUrls = (source) => {
  const urls = new Set();
  const pattern = /!\[[^\]]*\]\((https?:\/\/[^\s)]+)(?:\s+['"][^)]*['"])?\)/g;
  for (const match of source.matchAll(pattern)) {
    if (match[1].startsWith(legacyHost)) urls.add(match[1]);
  }
  return [...urls];
};

const extensionFor = (url, contentType = '') => {
  const fromUrl = extname(new URL(url).pathname).toLowerCase();
  if (/^\.(png|jpe?g|webp|gif|avif|svg)$/i.test(fromUrl)) return fromUrl === '.jpeg' ? '.jpg' : fromUrl;
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('jpeg')) return '.jpg';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('gif')) return '.gif';
  if (contentType.includes('avif')) return '.avif';
  if (contentType.includes('svg')) return '.svg';
  return '.img';
};

const localPathFor = (mediaKey, url, contentType) => {
  const hash = createHash('sha256').update(url).digest('hex').slice(0, 12);
  const extension = extensionFor(url, contentType);
  return `/images/legacy/${mediaKey}/image-${hash}${extension}`;
};

const files = await fileList(writingDir);
let imageCount = 0;
let changedFiles = 0;
let failed = 0;

for (const file of files) {
  let source = await readFile(file, 'utf8');
  const mediaKey = readMediaKey(source);
  if (!mediaKey || (requestedMediaKey && mediaKey !== requestedMediaKey)) continue;
  const urls = imageUrls(source);
  if (!urls.length) continue;

  console.log(`\n${relative(rootPath, fileURLToPath(file))}  [${mediaKey}]`);
  let next = source;
  let changed = false;

  for (const url of urls) {
    imageCount += 1;
    if (dryRun) {
      console.log(`  PLAN ${url} -> /images/legacy/${mediaKey}/image-<stable-hash>.<ext>`);
      continue;
    }

    try {
      const response = await fetch(url, { redirect: 'follow' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) throw new Error(`unexpected content-type: ${contentType || 'unknown'}`);
      const localUrl = localPathFor(mediaKey, url, contentType);
      const output = new URL(localUrl.slice(1), publicDir);
      await mkdir(dirname(fileURLToPath(output)), { recursive: true });
      await writeFile(output, new Uint8Array(await response.arrayBuffer()));
      next = next.split(url).join(localUrl);
      changed = true;
      console.log(`  SAVED ${localUrl}`);
    } catch (error) {
      failed += 1;
      console.error(`  FAILED ${url}\n         ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (write && changed) {
    await writeFile(file, next);
    changedFiles += 1;
  }
}

console.log(`\n${dryRun ? 'Dry run' : 'Import'} complete: ${imageCount} images scanned, ${changedFiles} Markdown files updated, ${failed} failures.`);
if (failed > 0 && write) process.exitCode = 1;
