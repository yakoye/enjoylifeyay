# v0.9 补充

- 顶栏内部最大宽度与正文统一为 `890px`，不再沿用较宽的 `1000px`。
- 小于等于 `620px` 时，站点名仅隐藏文字、保留 favicon 图标，避免覆盖主导航。
- 文章默认折叠目录入口改为中文“目录”。
- 已在打包前通过 `npm run check`、`npm test`、`npm run build`、`npm run check:links`。
- 详见 [`V0.9_HEADER_TOC_MOBILE.md`](V0.9_HEADER_TOC_MOBILE.md)。

# v0.8 补充

- 标题、页面间距、横线、书架日期、目录、生活运动专题和筛选行为已按 v0.8 调整。
- 详见 [`V0.8_TYPOGRAPHY_TOC_LIFE.md`](V0.8_TYPOGRAPHY_TOC_LIFE.md)。

# Enjoy Life v0.6 实施报告

日期：2026-07-01

## 本版目标

把已经整理在文档中的 CSDN、旧 GitHub 博客与知乎来源，真正放到公开网站可访问的位置；同时完成文本目录风格的完整历史归档、工具链接、站点图标，以及未来文章维护说明。

## 修改文件

- 归档：`src/components/ArchiveTimeline.astro`、`src/pages/archive/index.astro`、`src/data/legacyArchive.ts`、`scripts/sync-legacy-archive.mjs`
- 工具与项目：`src/content/tools.json`、`src/content/projects.json`
- 图标与布局：`public/favicon.ico`、`src/layouts/BaseLayout.astro`、`src/components/SiteHeader.astro`、`src/styles/global.css`
- 构建与测试：`package.json`、`package-lock.json`、`tests/search-reading-contract.test.mjs`
- 文档：`README.md`、`docs/CONTENT_MAINTENANCE.md`、`docs/templates/new-writing.md`、`docs/BUILD_PREVIEW_DEPLOY.md`、`docs/CONTENT_MIGRATION_STATUS.md`、`docs/V0.6_ARCHIVE_AND_MIGRATION.md`

## 已完成功能

### 存档与历史来源

- 新增 `ArchiveTimeline.astro`，`/archive/` 改为按年显示的文本时间线。
- 每条条目采用：左侧 `MM-DD`、右侧蓝色标题；无红色字体、无卡片、无状态徽章。
- 本站已迁入文章打开本站正文；CSDN 和旧 GitHub 原文在新标签页打开。
- `docs/CONTENT_MIGRATION_MANIFEST.csv` 通过 `scripts/sync-legacy-archive.mjs` 自动生成 `src/data/legacyArchive.ts`。
- 每次 `npm run build` 自动同步历史归档，不需要手动维护两套数据。
- 当前归档显示 105 条带日期历史记录，并保留知乎与 Excel 附件的无日期来源入口。

### 工具与项目

- 补入公开 Chrome Web Store 链接：DictFloat、KeyPass Float、Quick Note Float、RegCalc64。
- 补入 PCIe Tools 公开索引及深层工具链接：lspci Explorer、LTSSM Visualizer、PCIe Register Query、Register Bitfield Parser。
- 新增 `PCIe Tools` 项目条目；工具页和项目页均自动使用真实链接。
- 未发布项目仍显示名称和简介，但不会再出现“公开地址待确认”。

### 站点图标与视觉

- 使用用户提供的 `favicon.ico`，写入 `public/favicon.ico`。
- 浏览器标签页使用该图标；顶部导航在站点名称前显示小型图标。
- 保留 890px 正文、1000px 导航、等宽优先字体、蓝色链接、无卡片、无红色标题的文本目录视觉。

### 搜索与构建

- `npm run build` 改为：

  ```text
  npm run sync:legacy-archive && astro build && pagefind --site dist --force-language zh --silent
  ```

- Pagefind 使用统一 `zh` 索引并静默普通提示；中文搜索继续使用分词，不受 `zh-cn stemming` 说明影响。

### 文档与长期维护

- 新增 `docs/CONTENT_MAINTENANCE.md`：后续新增文章、迁入旧文、更新工具 / 项目 / 自然 / 书架 / 收藏的完整方法。
- 新增 `docs/templates/new-writing.md`：新文章模板。
- 更新 README、构建预览发布文档、Cloudflare Pages 文档和迁移状态文档。

## 内容迁移

- 旧 GitHub 博客：11 篇已导入 Markdown，其中 9 篇公开、2 篇草稿；14 篇有日期文章都已出现在公开归档中。
- CSDN：91 条标题、日期与原文链接通过迁移台账生成到公开归档。
- 知乎：保留内容页入口；没有可靠的逐篇元数据时不伪造正文。

## 待人工确认

- 将 CSDN 候选文章逐篇迁入 Markdown 前，确认正文原创性、图片和附件公开范围。
- 从知乎导出或收集每篇准确的标题、日期、原文 URL 后，再写入时间线或迁入正文。
- 对草稿 `《原则》1、2` 与 `PCIe概念，一句话说明白` 完成内容复核后再公开。

## 验收内容

本版应通过：

```powershell
npm ci
npm run check
npm test
npm run build
npm run check:links
```

预览：

```powershell
npm run preview
```

发布：

```powershell
npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

## Cloudflare Pages

- 项目名：`enjoylifeyay`
- 正式地址：`https://enjoylifeyay.pages.dev`
- 构建命令：`npm run build`
- 输出目录：`dist`
- Node：24.x
- 手动发布：`npx wrangler pages deploy dist --project-name enjoylifeyay --branch main`

## 已知问题与限制

- 知乎页面无法稳定、可靠地读取每篇文章标题、日期和正文；当前不编造数据，只保留账号入口。
- CSDN 91 条文章当前是可访问的历史链接目录，不是 91 篇已迁入的 Markdown 正文。
- 旧博客引用的图片仍是旧公开地址；后续若旧站下线，需要确认公开范围后再本地镜像。
- 用户本地 Windows 若出现 Rollup / Rolldown `EPERM` 文件锁，应按 `docs/BUILD_PREVIEW_DEPLOY.md` 先清理 `node_modules` 再执行 `npm ci`。

## v0.7：布局、归档入口与媒体管理补充

### 修改文件

- `src/components/SiteHeader.astro`
- `src/components/WritingFilters.astro`
- `src/pages/index.astro`
- `src/pages/writing/index.astro`
- `src/pages/series/index.astro`
- `src/styles/global.css`
- `src/styles/typography.css`
- `src/layouts/BaseLayout.astro`
- `src/config/site.ts`
- `src/content.config.ts`
- `scripts/import-legacy-images.mjs`
- `docs/MEDIA_MANAGEMENT.md`
- `docs/V0.7_LAYOUT_MEDIA.md`

### 已完成功能

- 顶栏左右品牌与动作区固定、导航居中，主导航已加入“归档”。
- 浏览器 favicon 使用站长给出的图标资源；同时提供 PNG / Apple Touch / Web Manifest 声明。
- 归档保留左日期、右标题；其余页面不继承归档时间线排版。
- 装饰性横线移除，主页和列表间距收紧。
- 写作筛选从页面尾部脚本改为组件内脚本，领域和形式点击会实际筛选并更新 URL。
- 增加稳定 `mediaKey` 与旧图本地迁入脚本。

### 内容迁移

归档仍基于 `docs/CONTENT_MIGRATION_MANIFEST.csv` 自动生成，现有历史来源索引不变。旧博客正文中的图片尚未在本打包环境下载；提供了站长本地执行的一次性迁入命令，避免由打包环境伪造或遗漏二进制图片。

### Cloudflare Pages

`public/images/` 会在 Astro 构建时进入 `dist/`，再随 `npx wrangler pages deploy dist --project-name enjoylifeyay --branch main` 发布。第一阶段不需要 R2；R2 仅在公开图片规模增长到不适合版本库维护时再单独启用。
