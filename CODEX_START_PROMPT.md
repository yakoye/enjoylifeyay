# Enjoy Life：后续开发启动提示（v0.19）

先阅读：

1. `README.md`
2. `docs/CONTENT_MAINTENANCE.md`
3. `docs/BUILD_PREVIEW_DEPLOY.md`
4. `docs/TYPOGRAPHY_SYSTEM.md`
5. `docs/V0.19_NAVIGATION_PUBLISH_TIME_AND_PUBLIC_COPY.md`
6. `docs/COMMENTS_D1.md`

## 当前公开导航

```text
主页  技术  工具  阅读  自然  生活  归档  关于
```

副标题：

```text
技术 · 工具 · 阅读 · 自然 · 生活
```

## 内容结构

- **技术**：芯片、PCIe、固件、系统与工程实践。
- **工具**：自己做的 DIY 项目、浏览器扩展、网页工具、PCIe 工具与资料库。
- **阅读**：阅读文章、书架、译文、写作与独立维护的站外专题。
- **自然**：植物、动物、季节、行走与观察、地方记忆。
- **生活**：思考、运动、饮食、旅行、家庭与日常方法。

五个一级栏目均使用“父页 + 简洁地图 + Markdown 二级页”结构：

```text
src/content/section-pages/<section>/
```

二级地图中的一级栏目名必须始终链接回父页。不要只依赖顶部导航返回上一级。

## 写作规则

每篇文章 Frontmatter 必须包含：

```yaml
date: 2026-07-05
publishedAt: 2026-07-05T12:00:00+08:00
```

- `date` 用于时间线与排序。
- `publishedAt` 用于文章详情页，显示到秒。
- 所有公开文章至少有一个 `##` 至 `####` 标题，以生成默认折叠的“目录”。

## 公开文案规则

网页上所有文案只写给读者。开发、迁移、部署、数据、隐私实现和维护操作只放在 `docs/`，不能写进公开页面。

修改后必须运行：

```powershell
npm run check
npm test
npm run audit:toc
npm run audit:public-copy
npm run build
npm run check:links
```

## 视觉规则

- 不要引入卡片墙、Hero、渐变、圆角胶囊、伪终端或大型 UI 框架。
- 保持文字目录、蓝色链接、统一大黑色圆点、细线和等宽字体优先。
- 普通 Markdown、二级页面与站外专题均优先用 Markdown 维护。
- 阅读站外专题唯一维护文件：`src/content/section-pages/reading/reading-sites.md`。
- “简读 · 网页阅读助手”是当前正式名称。
