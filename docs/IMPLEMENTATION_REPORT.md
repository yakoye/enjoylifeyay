# Enjoy Life v0.5 实施报告

日期：2026-07-01

## 修改文件

- 内容迁入：`src/content/writing/*.md`、`src/content/nature.json`、`src/content/books.json`、`src/content/favorites.json`
- 专题关联：`src/pages/series/index.astro`、`src/pages/series/[id].astro`、`src/layouts/ArticleLayout.astro`
- 构建和发布：`package.json`、`package-lock.json`、`scripts/reset-local.ps1`、`scripts/verify-and-deploy.ps1`
- 文档：`README.md`、`docs/BUILD_PREVIEW_DEPLOY.md`、`docs/Cloudflare-Pages-部署.md`、`docs/LEGACY_SOURCE_CATALOG.md`、`docs/CONTENT_MIGRATION_STATUS.md`
- 迁移审计：`docs/CONTENT_MIGRATION_MANIFEST.csv`、`docs/LEGACY_IMPORT_NOTES.md`、`docs/WITHHELD_LEGACY_CONTENT.md`

## 已完成功能

- 保留 890px 桌面阅读宽度、移动端约 16px 边距、文字优先视觉和深浅主题。
- 七类内容集合、草稿过滤、来源与首次发布日期字段校验。
- 数据驱动首页、写作筛选、八个专题、工具目录、项目目录、自然、书架、收藏、归档、标签与 Now。
- 真实 RSS、Sitemap、robots、canonical、Open Graph、Twitter metadata 和文章 JSON-LD。
- Pagefind 本地全文搜索及 Ctrl/Cmd+K 快捷键。
- 代码复制、轻量文章目录、Figure 图片说明、移动端 overflow 保护。
- 构建产物的主要文件和站内链接自动检查。
- 新增 `npm run verify`、Windows 清理脚本和一键验证/发布脚本；所有编译、预览、GitHub 备份和 Wrangler 发布方法均写入 README 与部署文档。

## 内容迁移

- 已从旧 GitHub 博客导入 11 个 Markdown 条目：9 篇公开文章、2 篇草稿。
- 公开文章已进入写作时间流、相关专题、自然观察和书架关联；文章保留首次发布日期、来源名称和旧站原文链接。
- CSDN 91 项历史文章已保留标题、日期、链接、建议领域/形式和迁移状态，集中在 `CONTENT_MIGRATION_MANIFEST.csv` 与 `LEGACY_SOURCE_CATALOG.md`。
- 知乎保留 `wikiye` 内容入口与人工迁移队列；受访问限制，未伪造标题、日期或正文。
- 旧博客的 3 项内容未自动公开：第三方来源的 `极简生活`、转载的 `PCIe-MSI-MSIX简介`、包含个人健康数据的 `关于肥胖`。

## 待人工确认

- `《原则》1、2`：旧站正文为空，需补充后把草稿改为公开。
- `PCIe概念，一句话说明白`：需要按当前 PCIe 规范逐段复核，再公开。
- CSDN 73 项候选原创内容的正文、图片和附件公开范围。
- 知乎回答、图文与视频条目的逐条标题、日期、原始 URL 和正文。
- 旧站历史图片可本地镜像，但应先确认图片、地理信息和公开范围。
- 11 个工具及多数项目的真实在线地址、GitHub 地址和当前状态。

## 已知问题

- 历史文章的图片当前仍引用旧 EnjoyLifeBlog 的公开地址，避免未经确认地批量复制图片资源；如果旧站下线，需要通过确认后的本地镜像替换。
- 旧文章内容未做事实性重写。技术条目、读书摘录和地方资料保留历史状态，后续修订应在 `updated` 中注明。
- Pagefind 中文搜索依赖原始文本索引，不提供英文式词干提取，但中文关键词检索可用。
- Windows 上的 Rollup/Rolldown `.node` 文件可能被 VS Code、开发服务器或安全软件锁定；排障流程写入 `BUILD_PREVIEW_DEPLOY.md`。

## Cloudflare Pages

- 项目名：`enjoylifeyay`
- 正式地址：`https://enjoylifeyay.pages.dev`
- 构建命令：`npm run build`
- 输出目录：`dist`
- Node：24.x（Node 24 LTS）
- 手动发布：`npx wrangler pages deploy dist --project-name enjoylifeyay --branch main`

发布前必须执行 `npm run check`、`npm test`、`npm run build` 和 `npm run check:links`，再使用 `npm run preview` 检查。旧项目 `enjoylife-116` 仅保留迁移历史，不作为 canonical。FamilyJourney 的 R2、D1、照片和家庭数据不得接入本站。
