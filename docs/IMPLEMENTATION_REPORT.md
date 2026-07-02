# v0.20：Markdown 页面与渲染一致性

## 修改文件

- `src/content.config.ts`、`src/content/site-pages/*.md`：新增静态页面 Markdown 内容集合，并将一级页的标题、说明、引言与“关于”正文迁入 Markdown。
- `src/pages/`：一级页面、关于、搜索、标签和“现在”页从 Markdown 读取读者文案。
- `src/styles/global.css`：普通目录、数据目录和 Markdown 无序列表统一使用较大的黑色圆点；站外专题桌面端保留最多两行说明。
- `astro.config.mjs`：Shiki 同时配置浅色和深色主题。
- `docs/V0.20_MARKDOWN_RENDERING_CONSISTENCY.md`：补充内容位置、列表规则和验收方法。

## 已完成功能

- 站外专题的 Markdown 无序列表恢复可见圆点，不再因两行截断样式丢失列表标记。
- 首页“最近更新”、主页“正在做”、普通目录和 Markdown 内容页的圆点尺寸统一。
- 浅色主题下的文章代码块使用浅灰背景和浅色 token；深色主题下才使用深色代码背景。
- 静态页面内容与二级栏目说明尽量使用 Markdown；需要按日期、标签、分类自动筛选的数据目录继续使用内容集合，但共享同一套展示样式。
- 公开网页文案仍只面向读者；维护与实现说明仅保留在文档中。

## 验收

- `npm run check`
- `npm test`
- `npm run audit:toc`
- `npm run audit:public-copy`
- `npm run build`
- `npm run check:links`

---

# v0.19：二级地图返回、发布时间与读者文案

## 修改文件

- `src/components/SectionMap.astro`：五个一级栏目地图中的一级名称改为父页链接。
- `src/pages/technology/`、`tools/`、`reading/`、`nature/`、`life/` 与 `src/pages/[section]/[slug].astro`：统一传入父页路由。
- `src/content.config.ts`、`src/content/writing/`、`src/layouts/ArticleLayout.astro`：为每篇文章加入 `publishedAt`，并显示到秒的发布时间。
- `src/pages/nature/index.astro`、`src/pages/archive/index.astro`、`src/pages/about/` 与 `src/content/section-pages/`：改为面向读者的公开文案。
- `src/content/tools.json`：将阅读扩展统一命名为“简读 · 网页阅读助手”。
- `scripts/audit-public-copy.mjs`：新增公开文案审计，并接入构建与一键预览流程。

## 已完成功能

- 二级页显示“技术：技术文章”时，“技术”可直接返回技术首页；工具、阅读、自然、生活同样适用。
- 文章详情页显示 `发布：YYYY-MM-DD HH:mm:ss`；发布时间采用中国标准时间格式。
- 历史文章仅保留日期时，先以当天 `00:00:00+08:00` 作为可调整的默认发布时间。
- 自然页使用“植物·动物·季节·行走与观察·地方记忆”。
- 存档页使用“按首次发布日期汇总。”
- 旅行页使用“记录行走、旅行、路线、照片途经的地方、遇见的人和事。”
- 公开页面不再保留开发、迁移、私有资源或维护操作提示；这些说明保留在 `docs/`。

## 内容迁移

本版不新增或虚构历史文章；仅补齐已有文章的发布时间字段与显示方式。

## 待人工确认

旧文章若找到精确发布时间，可直接修改对应 Markdown Frontmatter 的 `publishedAt`。

## 已知问题

历史图片的本地补全仍需在保留私有下载清单的环境中执行；与公开页面无关。

## Cloudflare Pages

- 项目名：`enjoylifeyay`
- 正式地址：`https://enjoylifeyay.pages.dev`
- 构建命令：`npm run build`
- 输出目录：`dist`
- Node：24.x
- 手动发布：`npx wrangler pages deploy dist --project-name enjoylifeyay --branch main`

---

# v0.18：Markdown 内容地图与二级页面

- 五个一级栏目统一改为“父页 + 简洁地图 + 二级页面”的信息架构。
- 二级页面全部由 `src/content/section-pages/` 下的 Markdown 驱动；路由自动生成。
- 新增生活中的“旅行”，并预设思考、运动、饮食、旅行、家庭、日常与方法六个入口。
- 阅读新增“我翻译的书”“我写的书”入口；不虚构书目，未来直接在相应 Markdown 页面维护。
- 站外专题从 JSON 运行时数据迁移到独立 Markdown 页面 `src/content/section-pages/reading/reading-sites.md`，保留用户维护的 96 条链接。
- 所有目录列表统一使用较大的黑色圆点 `•`；站外专题说明桌面端最多两行。
- 原始 JSON 只作为导入备份保留于 `docs/imports/`，不参与公开页面与构建。

# v0.17.1：站外专题描述增强

- 重写 69 个站外专题的一句话描述，突出各站最容易记住的内容、方法或阅读气质。
- 保持六个分类、不排名、不编号、名称直达外链与 `pinned: true` 手动置顶机制。
- 新增维护说明：`docs/V0.17.1_EXTERNAL_READING_DESCRIPTIONS.md`。

---

# v0.17：阅读站外专题

## 已完成

- 阅读页在本站阅读文章后增加“站外专题”，按六个主题分组。
- 收录 69 个用户指定的独立博客、长文专栏与知识档案入口；同一站点只保留一次。
- 每条使用“名称：一句说明”的文本目录形式，名称直接跳转站外页面。
- 支持在 `src/content/reading-sites.json` 中通过 `pinned: true` 手动置顶“常看”网站；无默认排名。
- `DirectoryList` 支持二级或三级分组标题，避免“站外专题”和分类标题层级混乱。

## 维护

- 数据：`src/content/reading-sites.json`
- 使用说明：`docs/V0.17_EXTERNAL_READING.md`
- 发布前通过：`npm run check`、`npm test`、`npm run audit:toc`、`npm run build`、`npm run check:links`。

---

# v0.13：栏目合并与去冗余

## 修改文件

- 顶部导航与站点配置：`src/config/site.ts`
- 新栏目页面：`src/pages/technology/index.astro`、`src/pages/reading/index.astro`、`src/pages/life/index.astro`
- 工具统一入口：`src/pages/tools/index.astro`、`src/components/DirectoryList.astro`
- 旧入口重定向：`src/pages/writing/index.astro`、`src/pages/series/index.astro`、`src/pages/bookshelf/index.astro`、`src/pages/favorites/index.astro`、`src/pages/projects/index.astro`
- 首页与维护说明：`src/pages/index.astro`、`README.md`、`docs/CONTENT_MAINTENANCE.md`、`docs/V0.13_NAVIGATION_CONSOLIDATION.md`

## 已完成功能

- 正式导航统一为：主页、技术、工具、阅读、自然、生活、归档、关于。
- “写作”与“专题”并入技术；技术页同时显示技术文章和技术专题。
- “书架”并入阅读；阅读页同时显示阅读文章、书架和阅读专题。
- 新增生活页；生活、骑行和跑步文章归入同一入口。
- “收藏”和“项目”并入工具；工具页统一展示公开工具、个人系统、项目说明与长期参考。
- 旧入口保留 301 跳转，避免旧书签失效。
- 首页副标题更新为“技术 · 工具 · 阅读 · 自然 · 生活”。

## 内容迁移

历史文章迁移台账保持不变；v0.13 仅调整公开信息架构，不伪造或新增未经确认的旧文内容。

## 待人工确认

- CSDN 与知乎正文仍需逐篇确认版权、原始日期与图片后再迁入 Markdown。
- 长期参考和项目说明可按 `docs/CONTENT_MAINTENANCE.md` 持续补充。

## 已知问题

- 本地预览 `npm run preview` 不运行 Cloudflare Pages Function；评论 D1 接口需线上或 `wrangler pages dev` 才能验证。
- Windows 若出现 Rollup / Rolldown 文件锁定，按 `docs/BUILD_PREVIEW_DEPLOY.md` 执行清理脚本。

## Cloudflare Pages

- 项目名：`enjoylifeyay`
- 正式地址：`https://enjoylifeyay.pages.dev`
- 构建命令：`npm run build`
- 输出目录：`dist`
- Node：24.x
- 手动发布：`npx wrangler pages deploy dist --project-name enjoylifeyay --branch main`

---

# v0.10 补充：评论、目录审计与新文章

- 新增文章《程序员、工程师与 AI 时代的独立创造》（2026-07-01），以阅读摘要与个人补记呈现，保留原文链接但不转载全文。
- 新增 `Comments.astro`、`functions/api/comments.js` 与 `database/comments.sql`：所有公开文章都有极简评论入口，评论默认审核后显示。
- 新增 `docs/COMMENTS_D1.md`：创建 D1、绑定 `COMMENTS_DB`、审核评论与本地 Pages Functions 预览步骤。
- 新增 `npm run audit:toc` 与相应测试；所有公开文章已补齐至少一个二级至四级标题，均会显示默认折叠的“目录”。

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


## v0.11 更新

写作页已移除领域与形式筛选；评论支持可选邮箱、命令行管理与可选自动公开模式。参见 `docs/COMMENTS_D1.md`、`docs/V0.11_COMMENTS_ADMIN_MSI.md`。

# v0.11 补充：评论命令行管理与 MSI / MSI-X 格式验证

- 移除写作页未稳定的领域 / 形式筛选，改为纯按日期文本目录。
- 评论区增加可选邮箱、线性图标、单行自适应留言框；邮箱不在公开页面输出。
- 新增 `COMMENTS_MODERATION=auto` 变量控制自动公开；默认保留审核模式。
- 新增远程 D1 命令：状态、全部、待审、通过、拒绝、删除、邮箱迁移及线上 API 探测。
- 新增 `2024-05-24-pcie-msi-msix-introduction.mdx` 及四个本地图片资源，验证图片、表格、代码块、引用和目录。
- 发布后使用 `npm run comments:probe -- pcie-msi-msix-introduction` 确认线上 Pages Function 能访问 `COMMENTS_DB`。

# v0.12：工具整合、生活写作与图片显示

## 已完成

- 顶部导航移除“项目”；旧 `/projects/` 保留 301 跳转到 `/tools/`，不会让旧书签直接失效。
- 工具页成为公开作品入口，重新按以下五组组织：
  - Chrome 扩展与网页工具；
  - PCIe / 硬件工具；
  - 文字、图片与记录工具；
  - 个人网站与生活工具；
  - 资料库与阅读。
- 新增或补齐公开入口：DictFloat、KeyPass、Quick Note Float、RegCalc64、PCIe Tools 总入口及四个子工具、Rich Editor、quick_note_richtext、FamilyJourney、RegCalcTextTool、轻食记、FitJourney、雅集 · 中华诗词经典、PCI Express Technology 中文版。
- 保留未发布的飞书小助理、简读 · 网页阅读助手、Obsidian 日记系统、人生进度可视化为无链接目录项；页面不显示“待确认”或虚构链接。
- 新增 `/about/me/`，并在“关于”页提供入口。
- 新增两篇生活文章：
  - 《我走过的长路》：骑行专题；
  - 《当我在跑步时》：跑步专题。
- “正在做”改为当前实际维护方向：历史内容迁入、公开工具入口、骑行与跑步记录。
- 浅色主题代码块调整为更清楚的冷灰背景；行内代码也同步加深。
- 归档时间线条目 `margin` 压缩为 `0`，保留日期左、标题右的归档专属排版。
- 文章普通图片在桌面端默认居中并限制为正文宽度的约 60%；手机端恢复为 100%。MDX 的 `Figure wide` 可用于确实需要全宽的流程图或长截图。

## 维护规则

- 以后新增公开扩展、网页工具、资料库和个人网站，统一编辑 `src/content/tools.json`；不要再新建公开“项目”页面。
- 新文章使用 `docs/templates/new-writing.md`，图片目录继续使用稳定的 `mediaKey`，而不是文章文件名。
- 图片显示、目录和 Cloudflare Pages 发布流程详见：
  - `docs/MEDIA_MANAGEMENT.md`
  - `docs/CONTENT_MAINTENANCE.md`
  - `docs/BUILD_PREVIEW_DEPLOY.md`

## 验收

```powershell
npm run check
npm test
npm run audit:toc
npm run build
npm run check:links
```

结果：Astro check 0 errors / 0 warnings；38 项测试通过；13 篇公开写作均可生成目录；构建与内部链接检查通过。


## v0.14 内容去重与栏目整理

### 修改文件

- `src/pages/tools/index.astro`
- `src/pages/technology/index.astro`
- `src/pages/reading/index.astro`
- `src/pages/life/index.astro`
- `src/pages/series/[id].astro`
- `src/content/tools.json`
- `src/content/favorites.json`
- `src/content.config.ts`
- `src/data/now.ts`

### 已完成功能

- 阅读页只展示公开阅读文章，取消书架与专题的重复展示。
- 技术页和专题详情页不再输出无公开文章的空专题链接。
- 工具页把 DIY 项目、Chrome 扩展、PCIe 工具、记录工具、资料库分开；生活类网站移到生活页。
- 删除旧 旧个人站 的站点与源码仓库两个重复历史收藏条目。
- Rich Editor 与 quick_note_richtext 分别采用直接渲染 HTML 的工具入口，并保留源码链接字段。

### 内容迁移

历史来源保留 CSDN 与知乎入口；旧 旧个人站 原文来源继续通过已迁入文章的 `sourceUrl` 保留，不再作为工具页重复收藏。

### 待人工确认

- 继续逐篇确认 CSDN、知乎与旧博客文章的正文、版权和图片。
- 新增技术文章后，按 Frontmatter 关联对应专题。

### 已知问题

- 未发布的扩展没有公开 URL，因此只展示名称和说明。

### Cloudflare Pages

- 继续从项目根目录使用 `npx wrangler pages deploy dist --project-name enjoylifeyay --branch main` 部署。

## v0.14.1 reliability fix

- The v0.14 test suite no longer treats a stale, unreferenced `src/content/projects.json` file as a verification failure after a Windows zip-overlay upgrade. Astro content integration remains removed; `/projects/` continues to redirect to `/tools/#diy-projects`.
- `preview-local.cmd -Install` now invokes the cleanup script automatically before `npm ci`, stops stale Node processes, and retries generated-directory removal to reduce Windows Rollup/Rolldown `EPERM` failures.


## v0.15：旧文章本地化与公开隔离

### 修改文件

- `src/content/writing/`：旧个人文章统一改为本站本地文章，补齐两篇旧生活笔记，公开原先草稿条目；
- `src/layouts/ArticleLayout.astro`：文章页只显示本站发布日期与修订日期；
- `src/styles/tokens.css`、`src/styles/global.css`：同步字体栈、代码块明暗主题背景、文章标题全宽；
- `scripts/fetch-legacy-assets.mjs`、`scripts/verify-legacy-assets.mjs`：一次性下载与核验本地图片；
- `scripts/verify-public-content-private.mjs`：构建前检查公开内容不泄露已退役旧站标识；
- `scripts/sync-legacy-archive.mjs`：归档仅保留本站与 CSDN 历史条目，并移除 C语言速查。

### 已完成功能

- 旧个人站的 14 篇文章都已本地化到 `src/content/writing/`；
- 文章中不再显示旧站来源、原文按钮和迁入日期；
- 旧图片路径统一改为本站 `/images/articles/` 路径；
- 标题可用完整正文宽度，不再受 `22em` 人为限制；
- 代码块在浅色主题使用 `#f6f8fa`，深色主题使用 `#202124`。

### 内容迁移

本地图片需要在可访问旧图网络的环境中运行一次 `npm run fetch:legacy-assets`。下载完成后，将 `public/images/articles/` 提交到 GitHub；私有下载清单已被 `.gitignore` 排除。

### 待人工确认

CSDN 与知乎文章仍按迁移台账逐条确认。

### 已知问题

本发布包不预装历史图片二进制文件；在执行图片下载前，本地预览可打开，但相应旧文图片会缺失。请先使用 `./preview-local.cmd -FetchLegacyAssets` 完成一次下载。

### Cloudflare Pages

图片下载完成并提交后，Pages 会把 `public/images/articles/` 作为静态资源部署；访问者不会再请求已退役旧个人站。

## v0.16：ZPark 骑跑两项记录

- 新增 2020-10-31 生活 / 运动文章《中关村软件园 ZPark 骑跑两项第一名》。
- 文章同时归入骑行、跑步两个专题。
- 使用用户提供的本地 WebP 图片，放入稳定的 `mediaKey` 图片目录。


## v0.17.2：站外专题扩充

- 应用用户维护的 96 条站外阅读数据。
- 保留用户补充的扩展描述；桌面端最多显示两行，并通过悬停全文避免页面横向溢出。
- 验证 ID、URL、分类与 pinned 字段的唯一性和完整性。


## v0.17.3：站外专题描述与两行展示

- 同步用户维护的 96 条站外专题数据，ID 与 URL 均验证唯一。
- 桌面端描述从单行省略调整为最多两行，避免过度截断；手机端保持自然换行。
- 仅进行三处无损的文字清理：Conceptually 句法、Kevin Kelly 重复词、Textfiles 重复入口 URL。
