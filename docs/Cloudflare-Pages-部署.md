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
| Node version | `22.12.0` 或更高的 Node 22 |

正式 URL 的唯一代码配置位置是 `src/config/site.ts`。Canonical、Open Graph、RSS、Sitemap 和 robots 均从该配置生成。

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
