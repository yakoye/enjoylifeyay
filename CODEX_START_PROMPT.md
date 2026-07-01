# Enjoy Life：后续开发启动提示

先阅读：

1. `README.md`
2. `docs/V0.13_NAVIGATION_CONSOLIDATION.md`
3. `docs/CONTENT_MAINTENANCE.md`
4. `docs/BUILD_PREVIEW_DEPLOY.md`
5. `docs/COMMENTS_D1.md`
6. `docs/TYPOGRAPHY_SYSTEM.md`
7. `PERSONAL_SITE_CODEX_HANDOFF.md`

## 当前正式信息架构

```text
主页  技术  工具  阅读  自然  生活  归档  关于
```

站点副标题：

```text
技术 · 工具 · 阅读 · 自然 · 生活
```

- `技术`：技术文章与技术专题。
- `工具`：公开扩展、网页工具、个人网站、资料库、个人系统与长期收藏。
- `阅读`：阅读文章、书架与阅读专题。
- `自然`：自然观察和地方记录。
- `生活`：生活、骑行、跑步。
- `归档`：全量按日期历史记录。

旧入口必须保留重定向：

```text
/writing/   -> /technology/
/series/    -> /technology/#technology-series
/bookshelf/ -> /reading/#bookshelf
/favorites/ -> /tools/#references
/projects/  -> /tools/#projects
```

## 必须遵守

- 不要重做当前文本目录视觉；不要引入卡片、Hero、渐变、圆角胶囊、伪终端或大型 UI 框架。
- 桌面正文最大宽度 890px；移动端左右 16px；中文正文两端对齐，列表、表格、代码、引用保持左对齐。
- 不要虚构文章、日期、来源、项目链接、书籍或图片。
- 旧文保留 `date`、`source` 与 `sourceUrl`；未确认内容维持草稿或迁移台账状态。
- 公开工具、个人网站、资料库、个人系统统一维护在 `src/content/tools.json`；长期参考维护在 `src/content/favorites.json`，显示在工具页。
- 私人项目、家庭数据、FamilyJourney 私有 R2/D1、照片和密钥不能进入本站仓库。
- Node 24 是目标环境。

每次修改后必须运行：

```powershell
npm run check
npm test
npm run audit:toc
npm run build
npm run check:links
```
