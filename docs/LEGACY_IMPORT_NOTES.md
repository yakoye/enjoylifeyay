# v0.6 历史内容导入说明

## 已导入至写作集合

- 旧 EnjoyLifeBlog 中可确认、可公开展示的 9 篇文章已导入 `src/content/writing/` 并保留首次发布日期、旧站地址与来源标记。
- 另有 2 篇已导入为 `draft: true`，不会出现在公开页面，等待技术或正文补充审核。

## CSDN

- `docs/CONTENT_MIGRATION_MANIFEST.csv` 保留了 91 条 CSDN 历史文章的标题、原链接、首次发布日期、建议领域与迁移状态。
- 本版本不把 CSDN 的正文批量复制进新站：部分条目是转载、下载资源、外部资料或需要图片与内容权属复核。
- 后续迁入 CSDN 原创文章时，优先将正文保存为 Markdown，保留 `source: CSDN`、原始日期与 `sourceUrl`，再将对应台账行改为 `migrated`。

## 知乎

- 知乎个人页当前无法可靠地枚举全部标题、日期和正文。
- 本版本保留来源入口与人工复核项，不根据截图猜测标题或正文。

## 图片

- 已导入的旧博客文章暂时继续引用旧 EnjoyLifeBlog 的公开图片地址，以避免批量复制未知来源图片。
- 在确认每张图片的来源、公开范围与本地文件后，再迁入 `public/images/legacy/` 并将正文链接替换为本地地址。

构建、预览与发布命令见 [`BUILD_PREVIEW_DEPLOY.md`](BUILD_PREVIEW_DEPLOY.md)。


## v0.6 归档补充

CSDN 与旧博客的标题、日期和原文链接已通过 `docs/CONTENT_MIGRATION_MANIFEST.csv` 自动生成到 `/archive/`。正文尚未迁入的条目保留原平台链接，不会被伪装成本站正文。
