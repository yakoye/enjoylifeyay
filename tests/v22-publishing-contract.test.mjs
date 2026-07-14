import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const file = (path) => new URL(`../${path}`, import.meta.url);
const missing = async (path) => assert.rejects(access(file(path)), `${path} 应已退出仓库`);

test('站点不再包含评论功能和覆盖复制残留', async () => {
  for (const path of [
    'src/components/Comments.astro',
    'functions/api/comments.js',
    'scripts/comments-admin.mjs',
    'database/comments.sql',
    'database/migrations/0002-add-comment-email.sql',
    'docs/COMMENTS_D1.md',
    'src/content/writing/site-notes.md',
    'src/content/section-pages/reading/reading-my-books.md',
    'src/content/section-pages/reading/reading-translated-books.md',
  ]) await missing(path);

  const [layout, pkg] = await Promise.all([
    readFile(file('src/layouts/ArticleLayout.astro'), 'utf8'),
    readFile(file('package.json'), 'utf8'),
  ]);
  assert.doesNotMatch(layout, /Comments|评论/);
  assert.doesNotMatch(pkg, /comments:/);
});

test('两篇新增文章遵守唯一栏目、标签和标题层级约束', async () => {
  const [principles, science] = await Promise.all([
    readFile(file('src/content/writing/2026-07-13-personal-principles-and-reminders.md'), 'utf8'),
    readFile(file('src/content/writing/2026-07-14-scientific_facts_body_behavior_psychology.md'), 'utf8'),
  ]);
  assert.match(principles, /^section: reading\/principles$/m);
  assert.match(science, /^section: reading\/articles$/m);
  assert.match(science, /^tags: \["科学常识", "身体", "心理学"\]$/m);
  assert.doesNotMatch(principles.split('---').slice(2).join('---'), /^# /m);
  assert.doesNotMatch(science.split('---').slice(2).join('---'), /^# /m);
});

test('仓库提供互不影响的 Cloudflare 与 GitHub Pages 自动部署', async () => {
  const [workflow, astro, site, gitignore] = await Promise.all([
    readFile(file('.github/workflows/deploy.yml'), 'utf8'),
    readFile(file('astro.config.mjs'), 'utf8'),
    readFile(file('src/config/site.ts'), 'utf8'),
    readFile(file('.gitignore'), 'utf8'),
  ]);
  assert.match(workflow, /npm run verify/);
  assert.match(workflow, /CLOUDFLARE_API_TOKEN/);
  assert.match(workflow, /CLOUDFLARE_ACCOUNT_ID/);
  assert.match(workflow, /pages deploy dist --project-name enjoylifeyay --branch main/);
  assert.match(workflow, /BASE_PATH:\s*\/enjoylifeyay\//);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(astro, /BASE_PATH/);
  assert.match(site, /https:\/\/enjoylifeyay\.goldke\.online/);
  assert.match(gitignore, /^\.wrangler\/$/m);
  await access(file('scripts/prefix-base-path.mjs'));
});

test('README 记录唯一开发目录和推送后双平台自动发布', async () => {
  const readme = await readFile(file('README.md'), 'utf8');
  for (const marker of [
    'D:\\work\\code\\code_o\\github_ye\\enjoylifeyay',
    'git pull --ff-only',
    'npm run verify',
    'git push origin main',
    'https://enjoylifeyay.goldke.online',
    'https://yakoye.github.io/enjoylifeyay/',
    'GitHub Actions',
  ]) assert.ok(readme.includes(marker), `README 缺少 ${marker}`);
});
