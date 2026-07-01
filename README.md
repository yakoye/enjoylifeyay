# EnjoyLife

以技术、阅读、自然、工具与生活为长期主线的 Astro 静态站点。

## 本地开发

要求 Node.js 22 与 npm。

```bash
npm install
npm run dev
```

质量检查与生产构建：

```bash
npm test
npm run check
npm run build
```

构建产物位于 `dist/`。文章保存在 `src/content/writing/`；新内容默认保持 `draft: true`，核对标题、正文、来源、日期与公开链接后再发布。

## 架构边界

- Astro 静态输出、TypeScript、Markdown / MDX、原生 CSS。
- 不使用 React、SSR、数据库、登录、CMS、R2 或 D1。
- `SITE_URL` 未确认时不生成或展示虚构的生产域名。

部署参数见 [Cloudflare Pages 部署说明](docs/Cloudflare-Pages部署.md)。
