# 文章评论：Cloudflare Pages Functions + D1

从 v0.11 开始，每篇公开文章末尾有极简评论区：昵称、邮箱、留言均为单行文本样式；留言框会随输入自动增高。

```text
评论
昵称（可选）   邮箱（可选）
留言
提交评论
```

没有头像、没有卡片、没有公开回复链。邮箱可选，若填写仅保存在 D1 中供站长以后联系使用，绝不在文章页输出。

## 一、为什么之前“看不到评论”

你截图中的 **Queries** 页面是 D1 的查询统计，不是评论数据表。它只能说明有 SQL 被执行过，不能当作评论列表。

另外，D1 绑定已在 Pages 项目里设置后，Cloudflare 要求 **重新部署** 才会让当前 Pages Function 使用新绑定。Pages Functions 的 `functions/` 目录必须位于运行 `wrangler pages deploy` 命令时的项目根目录；这样 Wrangler 才会随部署上传它。官方说明：D1 绑定可在 Pages Settings → Bindings 添加，绑定变更后应重新部署。 

先在项目根目录重新部署：

```powershell
npm run build
npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

然后浏览器直接打开任意文章的 API，例如：

```text
https://enjoylifeyay.pages.dev/api/comments?article=pcie-msi-msix-introduction
```

结果判断：

- `404`：本次发布没有携带 Pages Function。确认命令在项目根目录执行，且根目录存在 `functions/api/comments.js`。
- `configured:false`：Function 已运行，但当前部署仍没有读到 `COMMENTS_DB`。确认绑定名完全是 `COMMENTS_DB`，然后重新部署。
- `configured:true, comments:[]`：接口和 D1 正常；当前文章暂时没有已通过评论。
- 返回已通过评论数组：评论链路完整正常。

## 二、首次创建 D1

```powershell
npx wrangler login
npx wrangler d1 create enjoylife-comments
npx wrangler d1 execute enjoylife-comments --remote --file=./database/comments.sql
```

然后在 Cloudflare Dashboard：

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

保存后重新部署。

## 三、从 v0.10 升级到 v0.11：添加可选邮箱列

旧数据库中没有 `email` 列。第一次升级到 v0.11，请在项目根目录执行一次：

```powershell
npm run comments:migrate
```

它会远程检查 `comments` 表并在需要时添加邮箱列。执行成功后再次部署新版函数。

## 四、命令行管理评论（推荐）

不需要每次打开后台。以下命令都直接操作 **远程 D1**：

```powershell
# 查看各状态数量
npm run comments:status

# 查看待审核评论（最常用）
npm run comments:pending

# 查看全部评论
npm run comments:list

# 通过一条评论
npm run comments:approve -- <评论ID>

# 拒绝一条评论（保留记录）
npm run comments:reject -- <评论ID>

# 管理员彻底删除一条评论
npm run comments:delete -- <评论ID>

# 探测线上评论 API 与当前绑定是否真的生效
npm run comments:probe -- pcie-msi-msix-introduction
```

先运行 `npm run comments:pending` 复制 ID，再运行 `approve`、`reject` 或 `delete`。

D1 官方支持通过 `wrangler d1 execute` 执行远程 SQL；`--remote` 指向已部署站点使用的远程 D1，而不是你电脑里的本地测试数据库。

## 五、审核模式：默认审核，或自动公开

默认是安全的人工审核：新评论保存为 `pending`，你用命令行审批即可。

若你希望评论在通过基础反垃圾限制后直接显示，可在 Pages：

```text
Workers & Pages → enjoylifeyay → Settings → Variables and Secrets → Add
```

添加文本变量：

```text
Name: COMMENTS_MODERATION
Value: auto
Environment: Production
```

保存后重新部署。此时新评论会直接写为 `approved`；honeypot 与每 IP 24 小时 5 次限流仍然有效。

建议：站点刚公开、评论量少时可继续 `pending`；你确认没有垃圾评论后再切到 `auto`。

## 六、本地测试

普通 Astro 预览不会运行 Pages Function：

```powershell
npm run preview
```

要本地测试评论 Function：

```powershell
npm run build
npx wrangler pages dev dist --d1 COMMENTS_DB=<你的D1数据库ID>
```

这默认使用本地 D1 状态。生产评论管理请用上面的 `npm run comments:*` 命令。

## 七、隐私与反垃圾

数据库保存：文章 slug、昵称、可选邮箱、评论正文、状态、提交时间、IP 哈希。

不保存原始 IP；邮箱不公开；评论正文使用 `textContent` 渲染，不会作为 HTML 注入页面。现有防护包括 honeypot、长度限制和 24 小时限流。垃圾评论明显增多时，再考虑 Cloudflare Turnstile。
