# 内容维护：以后怎样增加文章、工具、项目与历史存档

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
| `source` | 新文章用 `native`；旧文使用 `CSDN`、`Zhihu` 或 `EnjoyLifeBlog`。 |
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
- 已迁入旧 EnjoyLifeBlog 文章若仍有旧图片链接，先运行 `npm run import:legacy-images -- --dry-run`，确认后运行 `npm run import:legacy-images -- --write`。
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

专题入口在 `/series/` 的“生活与运动”分组中。即使暂时没有公开文章，专题入口也会保留，方便以后持续补充。

## 二、迁入 CSDN、知乎或旧 GitHub 博客文章

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

构建会自动同步 `src/data/legacyArchive.ts`。这样该条目会显示在 `/archive/` 的按年时间线中，并链接回 CSDN 或旧博客原文；不会假装已经迁入本站正文。

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
- `category` 可用：`pcie-hardware`、`browser-extension`、`developer-productivity`、`writing-media`、`life`。
- 工具页会按分类自动分组，不需要手动改页面代码。

## 四、添加或修改项目

编辑：

```text
src/content/projects.json
```

项目页展示“为什么做、如何演进”的目录。公开地址填 `url`；私有项目保留公开说明，但 `url`、仓库地址和任何私有数据保持空。

## 五、添加自然观察、书架、收藏

| 内容 | 文件 |
| --- | --- |
| 自然观察 | `src/content/nature.json` |
| 书架 | `src/content/books.json` |
| 收藏 | `src/content/favorites.json` |
| 正在做 | `src/data/now.ts` |

收藏条目必须写自己的中文说明；不要只存一个裸链接。自然观察不要公开住址、家庭位置、精确路线或私密定位。

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

评论使用 Cloudflare Pages Functions + D1：提交后默认进入审核队列，审核通过才显示。评论不收集邮箱、不保存原始 IP，也不会写入 GitHub。

首次启用、D1 建表、Pages 绑定、审核 SQL 和本地 Pages Functions 预览方法详见：

```text
docs/COMMENTS_D1.md
```

在添加文章时，请至少写一个 `##`、`###` 或 `####` 分节标题；这样文章页才会有默认折叠的“目录”。
