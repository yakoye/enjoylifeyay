# 内容维护

## 新建文章

在 `src/content/writing/` 新增：

```text
YYYY-MM-DD-english-slug.md
```

可复制 `docs/templates/new-writing.md`。

```yaml
---
title: "文章标题"
description: "一两句话说明文章内容。"
date: 2026-07-06
publishedAt: 2026-07-06T12:00:00+08:00
updated: null
source: native
sourceUrl: ""
migratedAt: null
section: technology/systems
tags: ["Linux", "命令行"]
legacy: false
cover: ""
coverAlt: ""
mediaKey: "2026-07-06-example"
draft: true
featured: false
---
```

发布前将 `draft` 改为 `false`，并确保正文至少有一个 `##` 至 `####` 标题。

## 分类原则

详细说明见 [内容模型](CONTENT_MODEL.md)。

- `section`：文章唯一归属。例如 PCIe 写 `technology/pcie`，骑行和跑步写 `life/movement`，Word / Excel 技巧写 `tools/software-productivity`。
- `tags`：最多 3 个，写读者会主动寻找的横向主题。例如 `Git`、`Linux`、`Excel`、`速查表`、`骑行`。
- 不填写 `domain`、`format`、`topics` 或空的 `series`。

## 二级页面与站外专题

面向读者的固定页面使用 Markdown：

```text
src/content/site-pages/
src/content/section-pages/
```

站外专题唯一维护文件：

```text
src/content/section-pages/reading/reading-sites.md
```

个人原则正文唯一维护文件：

```text
src/content/writing/2026-07-13-personal-principles-and-reminders.md
```

阅读内容遵循唯一归属：长篇读书内容进入“总结”，原则正文进入独立文章，书架只维护书名、状态和一句简介；栏目页和其他页面只显示索引链接，不复制正文。

每个站点一行，名称即外链；不加排名、评分或重复收录。桌面端说明最多两行，手机端自然换行。

二级栏目只有出现真实内容时才进入父页地图。路由可以先保留，等第一篇文章、工具、书籍或自然观察出现后会自动显示。

## 图片与代码

- 图片放入 `public/images/articles/<mediaKey>/`，Markdown 使用 `/images/articles/...` 路径。
- 每张图片写清楚替代文本。
- 使用标准 Markdown 代码块；浅色与深色主题会自动使用对应代码配色。
- 旧文章图片首次本地化时运行 `npm run fetch:legacy-assets`，随后执行 `npm run verify:legacy-assets`。

## 发布前检查

```powershell
npm run verify
git status
git add -A
git commit -m "content: update articles"
git push origin main
```

推送 `main` 后，GitHub Actions 会分别发布到 Cloudflare 主站和 GitHub Pages 备用站。不要在旧目录维护或提交同一份内容。
