# Enjoy Life

一个以“技术 · 阅读 · 工具 · 自然 · 生活”为长期主线的极简个人知识与生活档案站。

正式地址：https://enjoylifeyay.pages.dev

## 本地开发

要求 Node.js 22.12+、npm。

```bash
npm install
npm run dev
```

完整质量检查：

```bash
npm test
npm run check
npm run build
npm run check:links
```

`npm run build` 生成 Astro 静态站、RSS、Sitemap，并在 `dist/pagefind/` 建立本地全文搜索索引。

## 内容维护

- 写作：`src/content/writing/*.md` 或 `*.mdx`
- 专题：`src/content/series.json`
- 工具：`src/content/tools.json`
- 项目：`src/content/projects.json`
- 自然：`src/content/nature.json`
- 书架：`src/content/books.json`
- 收藏：`src/content/favorites.json`
- 正在做：`src/data/now.ts`

新内容默认保持 `draft: true`。旧文章必须保留首次发布日期、来源和原始 URL；标题、正文、图片、日期或链接没有确认时，不得公开。

迁移进度见 [`docs/CONTENT_MIGRATION_STATUS.md`](docs/CONTENT_MIGRATION_STATUS.md)，逐项台账见 [`docs/CONTENT_MIGRATION_MANIFEST.csv`](docs/CONTENT_MIGRATION_MANIFEST.csv)。

## 架构边界

- Astro 静态输出、TypeScript、Markdown / MDX、原生 CSS、Pagefind。
- 不使用 React、SSR、数据库、登录、CMS、R2 或 D1。
- 正式 URL 只在 `src/config/site.ts` 修改。
- FamilyJourney 的私有资源与本站完全隔离。

部署参数见 [`docs/Cloudflare-Pages-部署.md`](docs/Cloudflare-Pages-部署.md)。

## v0.4 文字目录视觉

v0.4 已将全站视觉调整为“文本文件 / 技术知识目录”方向：

- 顶部横栏保留站点名、文字导航、搜索与主题切换。
- 桌面端正文最大宽度 890px，顶部导航最大宽度 1000px；移动端左右保留 16px。
- 工具、项目、专题、收藏、书架使用紧凑的分组文本目录，不使用卡片、状态徽章或“公开地址待确认”。
- 文章与自然观察列表使用“标题左侧、日期右侧；手机端日期落到标题下方”的规则。
- 全站使用等宽优先字体栈；富文本仍支持链接、斜体、下划线、行内代码、代码块、引用、表格和图片说明。

完整规范见 [`docs/TYPOGRAPHY_SYSTEM.md`](docs/TYPOGRAPHY_SYSTEM.md)。
