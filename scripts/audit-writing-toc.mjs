import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const directory = new URL('../src/content/writing/', import.meta.url);
const filenames = (await readdir(directory)).filter((name) => /\.mdx?$/.test(name)).sort();
let failures = 0;

for (const filename of filenames) {
  const content = await readFile(join(directory.pathname, filename), 'utf8');
  const isDraft = /^draft:\s*true\s*$/m.test(content);
  if (isDraft) continue;
  const count = (content.match(/^#{2,4}\s+\S+/gm) || []).length;
  const title = content.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || filename;
  const marker = count > 0 ? 'OK' : 'MISSING';
  console.log(`${marker}\t${count}\t${title}`);
  if (count === 0) failures += 1;
}

if (failures > 0) {
  console.error(`\n${failures} 篇公开文章缺少二级至四级标题，无法生成目录。`);
  process.exitCode = 1;
}
