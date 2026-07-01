# 给后续开发者的启动提示词

请先阅读：

1. `README.md`
2. `docs/BUILD_PREVIEW_DEPLOY.md`
3. `docs/CONTENT_MIGRATION_STATUS.md`
4. `docs/LEGACY_SOURCE_CATALOG.md`
5. `docs/TYPOGRAPHY_SYSTEM.md`
6. `PERSONAL_SITE_CODEX_HANDOFF.md`

当前项目已经完成 v0.6：文本目录视觉、完整按年存档、9 篇公开旧博客文章、2 篇草稿、CSDN 91 条历史外链、知乎入口、公开工具链接、Pagefind 中文构建与 Windows Node 24 发布流程均已落地。

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
npm run build
npm run check:links
```

完整发布命令见 `docs/BUILD_PREVIEW_DEPLOY.md`。

## v0.7 补充

优先遵循 `docs/V0.7_LAYOUT_MEDIA.md` 和 `docs/MEDIA_MANAGEMENT.md` 的顶栏、归档和媒体规则。
