# Enjoy Life

一个以“技术 · 阅读 · 自然 · 工具 · 生活”为长期主线的极简个人知识与生活档案站。

正式地址：https://enjoylifeyay.pages.dev

## v0.5：历史内容迁入与发布流程

v0.5 已把旧 GitHub 博客中可确认且适合公开的内容迁入 Astro 内容集合：9 篇公开文章、2 篇草稿，并补齐自然观察、书架、收藏和专题关联。CSDN 的 91 项历史文章元数据已整理成可审查目录；知乎入口因访问限制保留为人工迁移队列，不虚构标题或正文。

- 迁移状态：[`docs/CONTENT_MIGRATION_STATUS.md`](docs/CONTENT_MIGRATION_STATUS.md)
- 历史来源目录：[`docs/LEGACY_SOURCE_CATALOG.md`](docs/LEGACY_SOURCE_CATALOG.md)
- 不公开内容说明：[`docs/WITHHELD_LEGACY_CONTENT.md`](docs/WITHHELD_LEGACY_CONTENT.md)
- 构建、预览与发布：[`docs/BUILD_PREVIEW_DEPLOY.md`](docs/BUILD_PREVIEW_DEPLOY.md)

## 本地开发

要求 Node.js **24.x** 与 npm。`.nvmrc`、`package.json` 和 Cloudflare Pages 配置均以 Node 24 为准。

```powershell
node -v
npm ci
npm run dev
```

开发服务器命令是 `npm run dev`；停止时在终端按 `Ctrl+C`。

## 完整校验、预览与发布

每次准备发布时，按顺序执行：

```powershell
npm ci
npm run check
npm test
npm run build
npm run check:links

npm run preview
# 本地确认后按 Ctrl+C 停止预览。

npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

命令含义、GitHub 备份顺序、Cloudflare 配置、Windows `EPERM` 文件锁处理方案见 [`docs/BUILD_PREVIEW_DEPLOY.md`](docs/BUILD_PREVIEW_DEPLOY.md)。

依赖已安装时，也可使用：

```powershell
npm run verify
```

PowerShell 辅助脚本：

```powershell
# 仅清理 node_modules、dist、.astro；遇到锁定可加 -StopAllNode
powershell -ExecutionPolicy Bypass -File .\scripts\reset-local.ps1

# 运行检查、测试、构建、链接检查；增加 -Install 会先 npm ci；增加 -Deploy 会直接发布
powershell -ExecutionPolicy Bypass -File .\scripts\verify-and-deploy.ps1 -Install
```

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

## 架构边界

- Astro 静态输出、TypeScript、Markdown / MDX、原生 CSS、Pagefind。
- 不使用 React、SSR、数据库、登录、CMS、R2 或 D1。
- 正式 URL 只在 `src/config/site.ts` 修改。
- FamilyJourney 的私有资源与本站完全隔离。
- 不要提交 `node_modules/`、`dist/`、`.astro/`、`.env` 或任何 Cloudflare Token。

部署参数见 [`docs/Cloudflare-Pages-部署.md`](docs/Cloudflare-Pages-部署.md)。

## 文字目录视觉

全站维持“文本文件 / 技术知识目录”方向：

- 顶部横栏保留站点名、文字导航、搜索与主题切换。
- 桌面端正文最大宽度 890px，顶部导航最大宽度 1000px；移动端左右保留 16px。
- 工具、项目、专题、收藏、书架使用紧凑的分组文本目录，不使用卡片、状态徽章或“公开地址待确认”。
- 文章与自然观察列表使用“标题左侧、日期右侧；手机端日期落到标题下方”的规则。
- 全站使用等宽优先字体栈；富文本仍支持链接、斜体、下划线、行内代码、代码块、引用、表格和图片说明。

完整规范见 [`docs/TYPOGRAPHY_SYSTEM.md`](docs/TYPOGRAPHY_SYSTEM.md)。
