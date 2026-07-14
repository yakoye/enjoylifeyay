import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const root = fileURLToPath(new URL('..', import.meta.url));
const writingDir = join(root, 'src/content/writing');

test('v0.15 旧个人文章已本地化且公开内容不暴露旧站标识', async () => {
  const files = (await readdir(writingDir)).filter((name) => /\.mdx?$/.test(name));
  const merged = await Promise.all(files.map(async (name) => readFile(join(writingDir, name), 'utf8')));
  const publicText = merged.join('\n');
  assert.doesNotMatch(publicText, new RegExp([['globe', 'treklog', '\\.github\\.io'].join(''), ['Enjoy', 'LifeBlog'].join('')].join('|')));
  for (const filename of [
    '2021-06-10-self-breakthrough-shi-yigong.md',
    '2023-11-11-principles-notes.md',
    '2024-04-03-minimal-life.md',
    '2024-05-06-about-weight.md',
    '2024-05-08-pcie-concepts-one-sentence.md',
  ]) await access(join(writingDir, filename));
  assert.match(await readFile(join(writingDir, '2023-11-11-principles-notes.md'), 'utf8'), /draft: false/);
  assert.match(await readFile(join(writingDir, '2024-05-08-pcie-concepts-one-sentence.md'), 'utf8'), /draft: false/);
});

test('v0.15 提供一次性本地旧图下载与发布前完整性检查', async () => {
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  const gitignore = await readFile(join(root, '.gitignore'), 'utf8');
  assert.match(pkg.scripts['fetch:legacy-assets'], /fetch-legacy-assets/);
  assert.match(pkg.scripts['verify:legacy-assets'], /verify-legacy-assets/);
  assert.match(pkg.scripts.verify, /verify:legacy-assets/);
  assert.match(pkg.scripts.verify, /verify:public-content/);
  // The one-time source manifest intentionally stays out of distributable archives
  // so that retired legacy-host URLs are not committed or published.
  assert.match(await readFile(join(root, 'scripts/fetch-legacy-assets.mjs'), 'utf8'), /legacy-assets\.private\.json/);
  const verifyScript = await readFile(join(root, 'scripts/verify-legacy-assets.mjs'), 'utf8');
  assert.doesNotMatch(verifyScript, /legacy-assets\.private\.json/);
  assert.match(verifyScript, /src[\\/]content[\\/]writing/);
  assert.match(gitignore, /scripts\/legacy-assets\.private\.json/);
});

test('v0.15 文章标题可使用完整正文宽度，代码块适配明暗主题', async () => {
  const globalCss = await readFile(join(root, 'src/styles/global.css'), 'utf8');
  const tokens = await readFile(join(root, 'src/styles/tokens.css'), 'utf8');
  assert.match(globalCss, /\.article-header h1[\s\S]*max-width: none/);
  assert.match(tokens, /"Noto Sans SC"[\s\S]*"Maple Mono NL NF CN"/);
  assert.match(tokens, /--code-background: #f6f8fa/);
  assert.match(tokens, /--code-background: #202124/);
});
