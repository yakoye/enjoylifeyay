import { spawnSync } from 'node:child_process';

const [action = 'pending', maybeId = '', maybeArticle = 'pcie-msi-msix-introduction'] = process.argv.slice(2);
const database = process.env.COMMENTS_DB_NAME || 'enjoylife-comments';
const siteUrl = (process.env.SITE_URL || 'https://enjoylifeyay.pages.dev').replace(/\/$/, '');
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const allowed = new Set(['status', 'list', 'pending', 'approved', 'approve', 'reject', 'delete', 'migrate-email', 'probe']);

if (!allowed.has(action)) {
  console.error(`Unknown action: ${action}`);
  process.exit(1);
}

const run = (args, options = {}) => {
  const result = spawnSync(npx, args, { stdio: options.capture ? 'pipe' : 'inherit', encoding: 'utf8', shell: false });
  if (result.status !== 0) process.exit(result.status || 1);
  return result.stdout || '';
};

const sqlLiteral = (value) => `'${String(value).replaceAll("'", "''")}'`;
const validId = (value) => /^[A-Za-z0-9-]{1,80}$/.test(value);
const runSql = (sql) => run(['wrangler', 'd1', 'execute', database, '--remote', '--command', sql]);
const runSqlJson = (sql) => {
  const output = run(['wrangler', 'd1', 'execute', database, '--remote', '--command', sql, '--json'], { capture: true });
  try { return JSON.parse(output); } catch { return output; }
};

const query = {
  list: `SELECT id, article_slug, author, CASE WHEN email <> '' THEN email ELSE '' END AS email, status, datetime(created_at, 'unixepoch') AS submitted_at, substr(replace(body, char(10), ' '), 1, 140) AS body FROM comments ORDER BY created_at DESC LIMIT 100;`,
  pending: `SELECT id, article_slug, author, CASE WHEN email <> '' THEN email ELSE '' END AS email, datetime(created_at, 'unixepoch') AS submitted_at, substr(replace(body, char(10), ' '), 1, 280) AS body FROM comments WHERE status = 'pending' ORDER BY created_at ASC;`,
  approved: `SELECT id, article_slug, author, datetime(created_at, 'unixepoch') AS submitted_at, substr(replace(body, char(10), ' '), 1, 280) AS body FROM comments WHERE status = 'approved' ORDER BY created_at DESC;`,
  status: `SELECT status, COUNT(*) AS count FROM comments GROUP BY status ORDER BY status;`,
};

if (action in query) {
  runSql(query[action]);
  process.exit(0);
}

if (action === 'migrate-email') {
  const schema = JSON.stringify(runSqlJson('PRAGMA table_info(comments);'));
  if (/"name"\s*:\s*"email"/.test(schema) || /\bemail\b/.test(schema)) {
    console.log('comments.email already exists; no migration needed.');
    process.exit(0);
  }
  runSql("ALTER TABLE comments ADD COLUMN email TEXT NOT NULL DEFAULT '';");
  console.log('Added comments.email.');
  process.exit(0);
}

if (action === 'probe') {
  const article = maybeId || maybeArticle;
  if (!/^[a-z0-9][a-z0-9-]{0,119}$/i.test(article)) {
    console.error('Usage: npm run comments:probe -- <article-slug>');
    process.exit(1);
  }
  const response = await fetch(`${siteUrl}/api/comments?article=${encodeURIComponent(article)}`, { cache: 'no-store' });
  console.log(`HTTP ${response.status} ${response.statusText}`);
  console.log(await response.text());
  process.exit(response.ok ? 0 : 1);
}

if (!validId(maybeId)) {
  console.error(`Usage: npm run comments:${action} -- <comment-id>`);
  process.exit(1);
}

const id = sqlLiteral(maybeId);
if (action === 'approve') runSql(`UPDATE comments SET status = 'approved' WHERE id = ${id};`);
if (action === 'reject') runSql(`UPDATE comments SET status = 'rejected' WHERE id = ${id};`);
if (action === 'delete') runSql(`DELETE FROM comments WHERE id = ${id};`);
