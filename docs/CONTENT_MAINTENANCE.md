# 内容维护：以后怎样增加文章、工具、阅读、生活与历史存档

这个站是静态 Astro 站点。内容文件就是源代码的一部分：写完、校验、构建、预览、提交 GitHub、发布到 Cloudflare Pages。

> 原则：先写本地 Markdown，再发布；GitHub 保存源码，Cloudflare Pages 只保存部署结果。

## 一、添加一篇新博客文章

### 1. 新建 Markdown 文件

在下面目录新增文件：

```text
src/content/writing/
```

文件名统一使用：

```text
YYYY-MM-DD-english-slug.md
```

示例：

```text
src/content/writing/2026-07-05-pcie-completion-timeout.md
```

可直接复制模板：

```text
docs/templates/new-writing.md
```

### 2. 首次先保持草稿

新文章前置字段里先保持：

```yaml
draft: true
```

这样文章不会公开出现在首页、写作、专题、RSS 或站点地图中。完成标题、正文、日期、链接、图片说明检查后，改成：

```yaml
draft: false
```

### 3. 必填字段说明

```yaml
title: "文章标题"
description: "一两句话说明文章内容。"
date: 2026-07-05
updated: null
source: native
sourceUrl: ""
migratedAt: null
domain: technology
format: article
topics: ["PCIe"]
tags: ["PCIe", "Protocol"]
series: ["pcie-high-speed-interconnect"]
legacy: false
cover: ""
coverAlt: ""
mediaKey: "2026-07-05-pcie-completion-timeout"
draft: true
featured: false
```

字段选择：

| 字段 | 用法 |
| --- | --- |
| `date` | 首次公开日期。普通文章只写日期，不写时分秒。 |
| `updated` | 有实质性修订时写最后修订日期，否则严格写 `null`。`null` 不会再被显示为 `1970-01-01`。 |
| `source` | 新文章用 `native`；旧文使用 `CSDN` 或 `Zhihu`。 |
| `sourceUrl` | 旧文必须保留原始链接；新文章可留空。 |
| `migratedAt` | 旧文章迁入本站的日期；新文章为 `null`。 |
| `domain` | `technology`、`reading`、`life`、`nature`、`tool`。 |
| `format` | `article`、`answer`、`note`、`guide`、`reference`、`project-log`、`observation`。 |
| `series` | 关联专题 ID；不属于专题时用空数组 `[]`。 |
| `mediaKey` | 有图片时填写永久、不随 Markdown 文件名变化的媒体目录标识。 |
| `draft` | `true` 不公开，`false` 公开。 |

### 4. 图片、链接和代码

- 自己拍摄或可公开使用的图片放入：`public/images/articles/<mediaKey>/`；自然观察可放在 `public/images/nature/<年份>/<mediaKey>/`。
- 图片目录使用 `mediaKey`，而不是 Markdown 文件名。以后改文章 slug 时，不需要移动图片目录。
- Markdown 中使用从根目录开始的路径，例如：`/images/articles/2026-07-05-pcie-completion-timeout/pcie-layer.webp`。
- 每张图片都要有清楚的替代文本：`![PCIe 分层关系图](/images/articles/2026-07-05-pcie-completion-timeout/pcie-layer.webp)`。
- 不要让公开页面直接依赖 GitHub raw / blob 图片路径；本站图片会随构建发布到 Cloudflare Pages。
- 旧个人文章的图片已改用本站本地路径。首次升级后运行 `npm run fetch:legacy-assets` 下载一次，再运行 `npm run verify:legacy-assets` 确认文件齐全。
- 代码使用 Markdown 代码块；页面会自动渲染成无圆角、可复制的等宽代码区。
- 每篇公开文章都必须至少有一个二级、三级或四级标题。标题元信息下会自动出现默认折叠的“目录”；无需手写目录。发布前运行 `npm run audit:toc`，任何公开文章没有标题都会失败。
- 链接、斜体、下划线、引用、表格都可以直接用标准 Markdown 语法书写；网页渲染后不会显示 `#`、`>`、反引号或横线等 Markdown 控制符。
- 更完整的目录、R2 取舍和旧图迁移说明见 `docs/MEDIA_MANAGEMENT.md`。

### 5. 骑行与跑步文章

骑行和跑步属于 `domain: life`。为了进入对应的专题页，在 Frontmatter 中填写：

```yaml
# 骑行
domain: life
format: note
topics: ["骑行", "运动"]
tags: ["骑行"]
series: ["life-cycling"]

# 跑步
domain: life
format: note
topics: ["跑步", "运动"]
tags: ["跑步"]
series: ["life-running"]
```

生活栏目入口在 `/life/`。骑行和跑步的旧专题详情仍可访问，但不再单独占用顶部导航。

## 二、迁入 CSDN 或知乎文章

### 有完整正文且确认可公开

1. 新建 `src/content/writing/YYYY-MM-DD-slug.md`。
2. 原始 `date` 必须保留，不要改成迁入当天。
3. 写明来源：

```yaml
source: CSDN
sourceUrl: "https://blog.csdn.net/..."
migratedAt: 2026-07-01
legacy: true
```

4. 整理正文排版、补全图片替代文本、确认第三方图片和引用可以公开。
5. 确认后将 `draft` 改成 `false`。
6. 同时更新 `docs/CONTENT_MIGRATION_MANIFEST.csv` 的 `status` 为 `migrated`。

### 只确认标题、日期、链接，正文暂不迁入

这种内容先保留在：

```text
docs/CONTENT_MIGRATION_MANIFEST.csv
```

然后运行：

```powershell
npm run sync:legacy-archive
```

或直接运行：

```powershell
npm run build
```

构建会自动同步 `src/data/legacyArchive.ts`。这样该条目会显示在 `/archive/` 的按年时间线中，并链接回 CSDN 原文；不会假装已经迁入本站正文。

### 知乎内容

知乎页面当前无法稳定获得每篇标题、发布日期与正文，不要根据截图猜测或编造。先在迁移清单中保留账号入口；拿到导出、文章链接或确认过的标题与日期后，再逐条加入时间线或迁入正文。

## 三、添加或修改工具

编辑：

```text
src/content/tools.json
```

最小结构：

```json
{
  "id": "tool-id",
  "name": "工具名称",
  "description": "一句话说明。",
  "category": "pcie-hardware",
  "status": "available",
  "url": "https://example.com/",
  "githubUrl": "",
  "project": "project-id",
  "draft": false
}
```

规则：

- 有公开地址：填 `url`，工具名称会自动成为链接。
- 未发布：`url` 留空；公开页面只显示名称和说明，不显示“待确认”。
- `category` 可用：`diy-project`、`browser-extension`、`pcie-hardware`、`writing-media`、`knowledge-library`、`websites-life`。
- 工具页会按分类自动分组；同一分组内使用 `order` 从小到大排序，不需要手动改页面代码。

## 四、工具页承载公开项目与收藏

“项目”和“收藏”均不再单独占用顶部导航。公开可访问的扩展、网页、资料库、个人网站、个人系统和长期参考统一维护在：

```text
src/content/tools.json
```

工具页按以下分组自动展示：

```text
自己 DIY 项目
Chrome 扩展与网页工具
PCIe / 硬件工具
文字、图片与记录工具
资料库
历史内容来源
```

不公开、没有链接或包含私有数据的项目不要为了展示而补造链接。旧 `/projects/` 地址会自动跳转到 `/tools/#diy-projects`，旧 `/favorites/` 地址会跳转到 `/tools/#historical-sources`，避免历史书签失效。公开项目请维护在 `src/content/tools.json`。

## 五、添加自然观察、书籍资料与历史来源

| 内容 | 文件 |
| --- | --- |
| 自然观察 | `src/content/nature.json` |
| 书架 | `src/content/books.json` |
| 历史内容来源 | `src/content/favorites.json`（显示在工具页） |
| 正在做 | `src/data/now.ts` |

历史来源条目必须写清楚迁移用途；不要只存一个裸链接。自然观察不要公开住址、家庭位置、精确路线或私密定位。

## 六、每次发布前的完整流程

在项目根目录执行：

```powershell
npm ci
npm run check
npm test
npm run audit:toc
npm run build
npm run check:links

npm run preview
```

在浏览器检查无误后，按 `Ctrl+C` 停止预览，然后：

```powershell
git add -A
git commit -m "docs: add a new article"
git push origin main

npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

更完整的 Windows 锁文件、Node 24、Cloudflare Pages 说明见：

```text
docs/BUILD_PREVIEW_DEPLOY.md
docs/Cloudflare-Pages-部署.md
```

## 七、文章评论

每篇公开文章末尾都会自动显示评论区，不需要在 Markdown Frontmatter 中额外配置。

评论使用 Cloudflare Pages Functions + D1：提交后默认进入审核队列，审核通过才显示。邮箱为可选字段，填写后仅保存在 D1 供作者审核时查看，永不公开；不保存原始 IP，也不会写入 GitHub。

首次启用、D1 建表、Pages 绑定、审核 SQL 和本地 Pages Functions 预览方法详见：

```text
docs/COMMENTS_D1.md
```

在添加文章时，请至少写一个 `##`、`###` 或 `####` 分节标题；这样文章页才会有默认折叠的“目录”。


## v0.11 更新

写作页已移除领域与形式筛选；评论支持可选邮箱、命令行管理与可选自动公开模式。参见 `docs/COMMENTS_D1.md`、`docs/V0.11_COMMENTS_ADMIN_MSI.md`。

## v0.12 更新：图片宽度与移动端排版

- 文章图片在桌面端默认居中并限制为正文宽度的约 60%，避免普通截图和插图撑满阅读列；手机端会自动恢复为可用的 100% 宽度。
- 需要放大查看的流程图、宽表格或终端长截图，在 MDX 中使用 `Figure` 组件的 `wide` 参数：

```mdx
<Figure wide src="/images/articles/<mediaKey>/diagram.png" alt="流程图" caption="图 1：流程图" />
```

- 普通 Markdown 图片保持默认窄图样式；不要为了获得全宽而上传超大原图。
- 手机端目前采用：页面 H1 20px、文章 H1 22px、二级标题 18px、三级标题 16px、正文 15px。正文没有降到 14px，以保持中文等宽字体的长期阅读性。


## v0.13：去冗余栏目

正式导航现在是：`主页 / 技术 / 工具 / 阅读 / 自然 / 生活 / 归档 / 关于`。

- 技术文章和技术专题在 `/technology/`。
- 阅读页在 `/reading/`，只显示已公开阅读文章。
- 生活、骑行、跑步文章在 `/life/`。
- 收藏与项目内容并入 `/tools/`。
- 详细映射见 `docs/V0.13_NAVIGATION_CONSOLIDATION.md`。


## v0.14 栏目去重约定

- 阅读页只列出 `domain: reading` 且 `draft: false` 的文章。书籍条目仅保留为内部资料，不再在阅读页重复显示。
- 工具类内容使用 `src/content/tools.json`。`websites-life` 类目只在生活页展示，不在工具页重复展示。
- 技术专题必须至少关联一篇公开文章，才会出现在技术页和生成专题详情页。
- 历史来源只保留 CSDN 和知乎入口；已迁入旧文自身的 `sourceUrl` 已足够记录 旧个人站 来源。


## 七、旧个人文章本地化

已迁入旧个人站的文章现在全部使用本站地址和本站图片路径。首次升级到 v0.15，请运行：

```powershell
.\preview-local.cmd -FetchLegacyAssets
```

该命令会下载旧文所需图片到 `public/images/articles/`。成功后运行：

```powershell
npm run verify:legacy-assets
```

再将图片目录提交到 Git。`scripts/legacy-assets.private.json` 只用于一次性本地下载，已被 `.gitignore` 排除，不要提交。
