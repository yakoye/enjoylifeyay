# 文章评论：Cloudflare Pages Functions + D1

从 v0.10 开始，每篇公开文章的正文末尾都有一个极简评论区：

```text
评论
评论需审核后显示；不收集邮箱。
昵称（可选）
留言
提交评论
```

没有头像、没有背景卡片、没有外框、没有邮箱字段，也没有公开的回复链。

## 一、保存方式与隐私边界

评论不写入 GitHub，也不写入 Markdown。

它使用同一个 Cloudflare Pages 项目的 Pages Functions 与 D1 数据库：

```text
访客文章页
  → /api/comments Pages Function
  → COMMENTS_DB D1 数据库
  → 管理者审核
  → 仅 approved 评论公开显示
```

数据库仅保存：

- 文章 slug；
- 昵称（空白时显示“匿名”）；
- 评论正文；
- 审核状态；
- 提交日期；
- 用于限流的 IP 哈希。

不保存邮箱，不保存原始 IP，不展示头像。评论默认 `pending`，必须由你审核后才会在文章页显示。

## 二、首次启用：创建 D1 数据库

在项目根目录登录 Cloudflare 后执行：

```powershell
npx wrangler login
npx wrangler d1 create enjoylife-comments
```

第二条命令会输出数据库 ID。保存好它。

然后把本项目的评论表结构写入远端数据库：

```powershell
npx wrangler d1 execute enjoylife-comments --remote --file=./database/comments.sql
```

`database/comments.sql` 已包含表、审核状态和限流索引，不需要自行写 SQL 建表。

## 三、把数据库绑定到 Pages 项目

进入 Cloudflare Dashboard：

```text
Workers & Pages
→ enjoylifeyay
→ Settings
→ Bindings
→ Add
→ D1 database bindings
```

填写：

```text
Variable name: COMMENTS_DB
D1 database: enjoylife-comments
```

保存后，重新部署一次本站。Pages Function 会从 `context.env.COMMENTS_DB` 使用该绑定。

> 不要把数据库 ID、Cloudflare Token 或登录凭据写入文章、GitHub 仓库或公开页面。

## 四、构建、预览与部署

普通静态页面预览仍然使用：

```powershell
npm run preview
```

它只检查 Astro 构建结果；因为没有运行 Pages Functions，本地评论区会提示“评论服务暂时不可用”，这是正常的。

要连同评论 API 一起本地启动，请先构建，再使用 Wrangler 的 Pages 本地开发：

```powershell
npm run build
npx wrangler pages dev dist --d1 COMMENTS_DB=<你的D1数据库ID>
```

Wrangler 默认使用本地 D1 存储来进行本地开发；本地测试评论不会自动写入生产数据库。

正式发布仍然使用：

```powershell
npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

仓库根目录的 `functions/api/comments.js` 会作为 Pages Function 一起部署；`functions/` 必须一直保留在项目根目录，不能放进 `dist/`。

## 五、审核评论

评论提交后状态为 `pending`，不会立即公开。

打开 Cloudflare Dashboard：

```text
Workers & Pages
→ D1 SQL Database
→ enjoylife-comments
→ Console
```

查看待审核评论：

```sql
SELECT
  id,
  article_slug,
  author,
  body,
  datetime(created_at, 'unixepoch') AS submitted_at
FROM comments
WHERE status = 'pending'
ORDER BY created_at ASC;
```

通过一条评论：

```sql
UPDATE comments
SET status = 'approved'
WHERE id = '复制这里的评论 ID';
```

拒绝一条评论：

```sql
UPDATE comments
SET status = 'rejected'
WHERE id = '复制这里的评论 ID';
```

审核后无需重新构建或重新部署；访客刷新文章页即可看到最新的已通过评论。

## 六、基础反垃圾策略

当前版本已经启用：

- 隐藏 honeypot 字段；
- 每个 IP 哈希 24 小时最多提交 5 次；
- 长度限制：昵称 40 字符、评论 1500 字符；
- 评论默认人工审核；
- 页面端使用 `textContent` 渲染，评论内容不会作为 HTML 注入页面。

这足够用于第一阶段的个人站。

当垃圾评论明显增多时，再增加 Cloudflare Turnstile；不要在评论量还很小的时候过早增加 CAPTCHA 和复杂登录流程。
