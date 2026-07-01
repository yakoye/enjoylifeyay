# Cloudflare Pages 部署

正式 Pages 项目：`enjoylifeyay`  
正式地址：https://enjoylifeyay.pages.dev

本站只生成静态文件，不使用 Astro Cloudflare adapter、Pages Functions、SSR、R2 或 D1。

## 构建参数

| 配置项 | 值 |
| --- | --- |
| Framework preset | Astro |
| Production branch | `main` |
| Preview branch | `dev` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | `24.x`（建议 Node 24 LTS） |

正式 URL 的唯一代码配置位置是 `src/config/site.ts`。Canonical、Open Graph、RSS、Sitemap 和 robots 均从该配置生成。

## 每次发布的命令

在 Windows PowerShell 的项目根目录执行：

```powershell
npm ci
npm run check
npm test
npm run build
npm run check:links

npm run preview
# 本地检查后按 Ctrl+C 停止。

npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

这六个命令不可颠倒：`npm run check:links` 必须在 `npm run build` 之后；Wrangler 必须上传当前构建出的 `dist/`。完整说明、GitHub 备份和 Windows `EPERM` 排障见 [`BUILD_PREVIEW_DEPLOY.md`](BUILD_PREVIEW_DEPLOY.md)。

## Node 24 说明

- 本仓库的 `package.json` 要求 Node `>=24.0.0 <25`。
- 使用 Git 集成部署时，请在 Cloudflare Pages 的构建环境选择 Node 24。
- 使用 Wrangler Direct Upload 时，先在本地使用 Node 24 构建 `dist/`，再上传即可。
- Windows 若出现 Rollup / Rolldown `EPERM ... .node`，这是文件被占用，不是 Node 24 不兼容：先关闭开发服务器、VS Code 中的项目窗口和相关 Node 进程，删除 `node_modules` 后再重试 `npm ci`。

## GitHub 与 Direct Upload

建议把 GitHub `main` 作为唯一源码真相：

```powershell
git add -A
git commit -m "feat: import legacy writing and document release workflow"
git push origin main
```

如果 Pages 已连接 GitHub，`main` 推送会自动触发生产部署。手动 Wrangler 发布可作为明确的 Direct Upload；两种方式可以并存，但每次发布前必须先验证本地构建。

首次使用 Wrangler 如未认证：

```powershell
npx wrangler login
```

旧项目 `enjoylife-116` 只作为迁移历史保留，不能继续用作 canonical。不得把 Cloudflare API Token、任何私有项目的 R2/D1 binding 或家庭资料加入本仓库。
