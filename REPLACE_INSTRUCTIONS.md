# v0.24.1 替换说明

把压缩包内文件复制到 `enjoylifeyay` 项目根目录，保留目录结构并覆盖同名文件。

本修复只处理包含 `/` 等路径保留字符的标签导致 Astro 构建失败的问题，不改变文章页、栏目页和目录的现有视觉设计。

替换后执行：

```powershell
npm run check
npm test
npm run build
```
