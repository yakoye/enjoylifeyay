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

## Node 24 说明

- 本仓库的 `package.json` 要求 Node `>=24.0.0 <25`。
- 使用 Git 集成部署时，请在 Cloudflare Pages 的构建环境选择 Node 24。
- 使用 Wrangler Direct Upload 时，先在本地使用 Node 24 构建 `dist/`，再上传即可。
- Windows 若出现 Rollup `EPERM ... rollup.win32-x64-msvc.node`，这是文件被占用，不是 Node 24 不兼容：关闭开发服务器、VS Code 中的项目窗口和相关 Node 进程，删除 `node_modules` 后重试 `npm ci`。

## 发布前检查

```bash
npm ci
npm test
npm run check
npm run build
npm run check:links
```

使用 Wrangler 手动部署：

```bash
npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

旧项目 `enjoylife-116` 只作为迁移历史保留，不能继续用作 canonical。不得把 Cloudflare API Token、任何私有项目的 R2/D1 binding 或家庭资料加入本仓库。
