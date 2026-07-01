const json = (payload, init = {}) => Response.json(payload, {
  headers: {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=UTF-8',
    ...init.headers,
  },
  ...init,
});

const cleanText = (value, maxLength) => String(value ?? '')
  .replace(/\r\n?/g, '\n')
  .replace(/\u0000/g, '')
  .trim()
  .slice(0, maxLength);

const isValidArticleSlug = (value) => /^[a-z0-9][a-z0-9-]{0,119}$/i.test(value);

const formatComment = (row) => ({
  id: row.id,
  author: row.author || '匿名',
  body: row.body,
  createdAt: new Date(Number(row.created_at) * 1000).toISOString().slice(0, 10),
});

const getClientIp = (request) => request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || '';

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function unavailable() {
  return json({
    configured: false,
    comments: [],
    message: '评论服务尚未完成配置。',
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const article = new URL(request.url).searchParams.get('article') || '';

  if (!isValidArticleSlug(article)) {
    return json({ configured: true, comments: [], message: '文章标识无效。' }, { status: 400 });
  }

  if (!env.COMMENTS_DB) return unavailable();

  try {
    const result = await env.COMMENTS_DB.prepare(
      'SELECT id, author, body, created_at FROM comments WHERE article_slug = ? AND status = ? ORDER BY created_at ASC, id ASC',
    ).bind(article, 'approved').all();

    return json({ configured: true, comments: (result.results || []).map(formatComment) });
  } catch (error) {
    console.error('comments get failed', error);
    return unavailable();
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.COMMENTS_DB) {
    return json({ ok: false, message: '评论服务尚未完成配置。' }, { status: 503 });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return json({ ok: false, message: '请求格式错误。' }, { status: 415 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: '评论内容无法读取。' }, { status: 400 });
  }

  const article = cleanText(payload.article, 120);
  const author = cleanText(payload.author, 40) || '匿名';
  const body = cleanText(payload.body, 1500);
  const honeypot = cleanText(payload.website, 200);

  // Bots that fill invisible fields receive a neutral success response and are not stored.
  if (honeypot) {
    return json({ ok: true, pending: true, message: '评论已提交，审核后显示。' }, { status: 202 });
  }

  if (!isValidArticleSlug(article)) {
    return json({ ok: false, message: '文章标识无效。' }, { status: 400 });
  }

  if (!body) {
    return json({ ok: false, message: '请填写评论内容。' }, { status: 400 });
  }

  const createdAt = Math.floor(Date.now() / 1000);
  const ipHash = await sha256(getClientIp(request) || 'unknown');

  try {
    const recent = await env.COMMENTS_DB.prepare(
      'SELECT COUNT(*) AS count FROM comments WHERE ip_hash = ? AND created_at >= ?',
    ).bind(ipHash, createdAt - 24 * 60 * 60).first();

    if (Number(recent?.count || 0) >= 5) {
      return json({ ok: false, message: '评论提交过于频繁，请明天再试。' }, { status: 429 });
    }

    await env.COMMENTS_DB.prepare(
      'INSERT INTO comments (id, article_slug, author, body, status, created_at, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ).bind(crypto.randomUUID(), article, author, body, 'pending', createdAt, ipHash).run();

    return json({ ok: true, pending: true, message: '评论已提交，审核通过后显示。' }, { status: 202 });
  } catch (error) {
    console.error('comments post failed', error);
    return json({ ok: false, message: '评论暂时无法保存，请稍后再试。' }, { status: 503 });
  }
}
