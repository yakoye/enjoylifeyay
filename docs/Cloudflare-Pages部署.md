# Cloudflare Pages 部署

- 正式 Pages 项目：`enjoylifeyay`
- 主站地址：<https://enjoylifeyay.goldke.online>
- 平台地址：<https://enjoylifeyay.pages.dev>

本站只生成静态文件，不使用 Astro Cloudflare adapter、Pages Functions、SSR、R2、D1 或评论服务。

## 自动发布

Cloudflare 项目是 Direct Upload 项目，因此由 GitHub Actions 调用 Wrangler 发布。推送到 `main` 后，工作流会运行：

```text
npm ci
npm run verify
npm run build
wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

仓库需要两个 Actions Secrets：

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Token 只授予 Cloudflare Pages 编辑权限，不写入源码、文档或构建日志。

## 固定参数

| 配置项 | 值 |
| --- | --- |
| Pages project | `enjoylifeyay` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output | `dist` |
| Node | `24.x` |

正式 URL 的唯一代码配置位置是 `src/config/site.ts`。Canonical、Open Graph、RSS、Sitemap 和 robots 均以自定义域名为准。

手动兜底命令：

```powershell
npm run build
npm run deploy:pages
```

旧项目 `enjoylife-116` 只作为迁移历史保留。不得把 Cloudflare API Token、任何私有项目的 R2/D1 binding 或家庭资料加入本仓库。
