# Enjoy Life：后续开发启动提示

先阅读：

1. `README.md`
2. `docs/V0.14_CONTENT_DEDUP_TOOLS_LIFE.md`
3. `docs/CONTENT_MAINTENANCE.md`
4. `docs/BUILD_PREVIEW_DEPLOY.md`
5. `docs/COMMENTS_D1.md`
6. `docs/TYPOGRAPHY_SYSTEM.md`

## 当前正式信息架构

```text
主页  技术  工具  阅读  自然  生活  归档  关于
```

站点副标题：

```text
技术 · 工具 · 阅读 · 自然 · 生活
```

- **技术**：技术文章与有公开文章的技术专题。
- **工具**：自己 DIY 项目、Chrome 扩展与网页工具、PCIe / 硬件工具、文字图片记录工具、资料库和历史内容来源。
- **阅读**：只显示已公开的阅读文章，不重复显示书架或专题目录。
- **自然**：自然观察与地方记录。
- **生活**：饮食、影集与家庭、运动、生活与思考。
- **归档**：全量按日期历史记录。

旧入口必须保留：

```text
/writing/   -> /technology/#technical-writing
/series/    -> /technology/#technology-series
/bookshelf/ -> /reading/
/favorites/ -> /tools/#historical-sources
/projects/  -> /tools/#diy-projects
```

## 必须遵守

- 不要重做文本目录视觉；不要引入卡片、Hero、渐变、圆角胶囊、伪终端或大型 UI 框架。
- 不要让阅读页、工具页、生活页重复展示同一个公开条目。
- 技术专题必须至少有一篇 `draft: false` 的关联文章才允许出现在公开页面。
- `Rich Editor` 与 `quick_note_richtext` 的 `url` 必须是直接渲染的 HTML 工具地址；源码只放 `githubUrl`。
- 每次修改后运行 `npm run check`、`npm test`、`npm run audit:toc`、`npm run build`、`npm run check:links`。

## v0.16 追加记录

已新增生活 / 运动文章《中关村软件园 ZPark 骑跑两项第一名》（2020-10-31），并将用户提供的照片以本地 WebP 静态资源保存。该文章同时挂在骑行和跑步专题。后续修改请保持 `mediaKey` 目录稳定，不要改成外链图片。
