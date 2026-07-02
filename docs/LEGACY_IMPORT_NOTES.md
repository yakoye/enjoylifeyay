# 历史文章本地化说明

旧个人站的文章已经整理进 `src/content/writing/`。公开页面只使用本站文章地址与本站静态图片路径；不再显示旧站域名、旧仓库或原文跳转。

## 图片

旧文图片路径已经转换为 `public/images/articles/<mediaKey>/`。第一次升级后运行：

```powershell
npm run fetch:legacy-assets
npm run verify:legacy-assets
```

下载源清单只保留在本地的 `scripts/legacy-assets.private.json`，被 `.gitignore` 排除；不要提交、不要部署。

## CSDN 与知乎

- CSDN：历史标题、日期与链接保存在 `docs/CONTENT_MIGRATION_MANIFEST.csv`，待逐篇核对后再迁入；
- 知乎：先保留账号入口，获得可靠文章数据后再逐条迁入。
