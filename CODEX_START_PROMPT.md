# Enjoy Life：后续开发启动提示（v0.21.1）

先阅读：

1. `README.md`
2. `docs/CONTENT_MODEL.md`
3. `docs/CONTENT_MAINTENANCE.md`
4. `docs/BUILD_PREVIEW_DEPLOY.md`
5. `docs/TYPOGRAPHY_SYSTEM.md`

## 当前公开导航

```text
主页  技术  工具  阅读  自然  生活  归档  关于
```

## 内容模型

文章只维护：

```yaml
section: technology/pcie
tags: ["PCIe", "Linux"]
```

- `section` 是唯一内容归属。
- `tags` 用于跨栏目检索；每篇最多 3 个。
- 不新增 `domain`、`format`、`topics` 等重复字段。
- 同一领域不等于系列。只有至少三篇、有明确总标题与连续关系的内容才做独立 Markdown 系列页。

## 公开文案规则

网页上所有文案只写给读者。开发、迁移、部署、数据和维护规则只放在 `docs/`。

## 视觉规则

- 保持文字目录、蓝色链接、统一大黑色圆点、细线和等宽字体优先。
- 不引入卡片墙、Hero、渐变、圆角胶囊、伪终端或大型 UI 框架。
- 普通 Markdown、二级页面与站外专题优先由 Markdown 维护。
- “简读 · 网页阅读助手”是当前正式名称。
