# Cloudflare Pages 部署

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
| Node version | `22` |

Cloudflare Pages 连接 GitHub 仓库后，推送 `dev` 生成预览部署，合并到 `main` 生成生产部署。仓库根目录的 `.nvmrc` 和 `package.json#engines` 共同固定 Node 主版本。

## 首次部署

1. 在本地执行 `npm ci`（首次生成 lockfile 前使用 `npm install`）。
2. 执行 `npm test`、`npm run check` 和 `npm run build`。
3. 在 Cloudflare Pages 按上表填写构建参数。
4. 已确认正式域名后设置构建环境变量 `SITE_URL`，值为包含协议的站点根地址。
5. 检查首页、写作列表、公开文章、全部导航占位页和 404。

不得把 Cloudflare API Token、任何私有项目的 R2/D1 binding 或家庭资料加入本仓库。
