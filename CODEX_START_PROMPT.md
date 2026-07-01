# 给后续开发者的启动提示词

请先阅读：

1. `README.md`
2. `docs/BUILD_PREVIEW_DEPLOY.md`
3. `docs/CONTENT_MIGRATION_STATUS.md`
4. `docs/LEGACY_SOURCE_CATALOG.md`
5. `docs/TYPOGRAPHY_SYSTEM.md`
6. `docs/COMMENTS_D1.md`
7. `docs/V0.10_COMMENTS_TOC_ARTICLE.md`
8. `PERSONAL_SITE_CODEX_HANDOFF.md`

当前项目已经完成 v0.10：文本目录视觉、完整按年存档、旧博客公开文章、CSDN 历史外链、知乎入口、公开工具链接、Pagefind 中文构建、Node 24 发布流程、全文章目录审计，以及 Cloudflare Pages Functions + D1 的审核制评论均已落地。

后续开发原则：

- 不要重做现有文本目录视觉，不要引入卡片、Hero、渐变、圆角胶囊、伪终端或复杂 UI 框架。
- 不要虚构 CSDN、知乎、工具、项目、书籍、图片、日期或链接。
- 旧文章必须保留 `date`、`source`、`sourceUrl`；未核对内容保持 `draft: true`。
- 工具和项目没有真实公开链接时，列表不显示占位状态。
- 只允许公开确认过的内容；FamilyJourney、R2、D1、家庭照片和私人数据不得进入本仓库。
- Node 24 为目标环境。

每次修改后必须运行：

```powershell
npm run check
npm test
npm run audit:toc
npm run build
npm run check:links
```

完整发布命令见 `docs/BUILD_PREVIEW_DEPLOY.md`。

## v0.7 补充

优先遵循 `docs/V0.7_LAYOUT_MEDIA.md` 和 `docs/MEDIA_MANAGEMENT.md` 的顶栏、归档和媒体规则。

## v0.11 当前状态

- 写作页不再保留领域 / 形式筛选；按日期文本目录为正式方案。
- 评论 D1 绑定名称固定为 `COMMENTS_DB`；可选变量 `COMMENTS_MODERATION=auto` 让新评论自动公开。
- 评论管理员使用 `npm run comments:pending`、`npm run comments:approve -- <ID>`、`npm run comments:delete -- <ID>`，不要求网页后台。
- 文章 `2024-05-24-pcie-msi-msix-introduction.mdx` 是本地图片、表格、代码、引用、目录的综合回归测试文。


## v0.11.2：本地一键预览

日常本地查看站点时，使用根目录 `preview-local.cmd`；第一次安装依赖或依赖变化时使用 `preview-local.cmd -Install`。脚本会检查、测试、构建、启动 `http://127.0.0.1:4321/` 并自动打开浏览器。停止时使用 `stop-local-preview.cmd`。
