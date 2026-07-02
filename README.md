# Enjoy Life

一个以“技术 · 工具 · 阅读 · 自然 · 生活”为主线的极简个人知识与生活档案站。

正式地址：<https://enjoylifeyay.pages.dev>

## 正式栏目

```text
主页  技术  工具  阅读  自然  生活  归档  关于
```

栏目分工：

- **技术**：PCIe、芯片、固件、开发环境与工程实践；技术专题也放在这里。
- **工具**：自己做的项目、浏览器扩展、PCIe 工具、记录工具与资料库。
- **阅读**：已经公开的阅读文章，按时间排列。
- **自然**：植物、动物、季节、地方记忆与自然观察。
- **生活**：饮食、影集与家庭、运动，以及生活与思考。
- **归档**：按日期汇总本站文章与尚未迁入的历史技术条目。

旧入口会自动跳转；内容去重和旧图本地化规则见 [`docs/V0.15_PRIVATE_LEGACY_MIGRATION.md`](docs/V0.15_PRIVATE_LEGACY_MIGRATION.md)。

## 最常用：一键检查并打开本地网页

日常改完 Markdown、图片、CSS 或页面后，双击仓库根目录的：

```text
preview-local.cmd
```

或在 PowerShell 中执行：

```powershell
.\preview-local.cmd
```

它会自动执行：

```text
check → test → ToC 审计 → build → 链接检查 → 打开 http://127.0.0.1:4321/
```

第一次使用、刚清理过 `node_modules`、或修改了 `package.json / package-lock.json` 后，使用：

```powershell
.\preview-local.cmd -Install
```

本次 v0.15 首次迁移旧文章图片时，使用：

```powershell
.\preview-local.cmd -FetchLegacyAssets
```

它会先把旧文图片下载为本站 `public/images/articles/` 本地文件，再继续检查、构建和打开网页。

停止本地预览：

```text
stop-local-preview.cmd
```

只有出现 Rollup / Rolldown 的 `EPERM` 文件占用错误时，才使用：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reset-local.ps1 -StopAllNode
```


## v0.15：旧文章与图片本地化

旧个人站的文章已迁入本站。第一次使用 v0.15 时，先运行：

```powershell
npm run fetch:legacy-assets
npm run verify:legacy-assets
```

图片会保存到 `public/images/articles/`，随后由 Cloudflare Pages 提供访问。`scripts/legacy-assets.private.json` 仅用于一次性本地下载，已加入 `.gitignore`，不要提交到 GitHub。

## 持续本地开发

需要边编辑边刷新时，可以使用 Astro 开发服务器：

```powershell
npm ci
npm run dev
```

终端会显示本地地址；停止时按 `Ctrl+C`。正式发布前仍应使用“一键检查并打开本地网页”或完整构建流程。

## 手动检查、预览与发布

在项目根目录执行：

```powershell
npm ci

npm run check
npm test
npm run audit:toc
npm run verify:public-content
npm run verify:legacy-assets
npm run build
npm run check:links

npm run preview
# 浏览器检查完成后按 Ctrl+C 停止预览。

npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

建议发布前先提交源码：

```powershell
git add -A
git commit -m "docs: update site content"
git push origin main
```

## 以后怎样新增内容

### 新增文章

1. 复制 [`docs/templates/new-writing.md`](docs/templates/new-writing.md)。
2. 放到 `src/content/writing/`，文件名用 `YYYY-MM-DD-english-slug.md`。
3. 写清 `domain`：
   - `technology` → 技术
   - `reading` → 阅读
   - `life` → 生活
   - `nature` → 自然
   - `tool` → 工具相关记录
4. 初始使用 `draft: true`；本地检查后改为 `draft: false`。
5. 图片目录使用稳定的 `mediaKey`：`public/images/articles/<mediaKey>/`。
6. 每篇公开文章至少写一个 `##`、`###` 或 `####` 标题，文章页会自动生成默认折叠的“目录”。

骑行文章建议使用：

```yaml
domain: life
series: ["life-cycling"]
```

跑步文章建议使用：

```yaml
domain: life
series: ["life-running"]
```

### 新增工具、网站、资料库或长期参考

| 内容 | 维护文件 | 页面位置 |
| --- | --- | --- |
| 公开工具、扩展、自己 DIY 项目、资料库 | `src/content/tools.json` | 工具 |
| 饮食、影集与家庭、运动网站 | `src/content/tools.json`（`category: "websites-life"`） | 生活 |
| 历史内容来源（CSDN / 知乎） | `src/content/favorites.json` | 工具 / 历史内容来源 |
| 自然观察 | `src/content/nature.json` | 自然 |
| 正在做 | `src/data/now.ts` | 主页与 `/now/` |

完整字段说明见：

- [`docs/CONTENT_MAINTENANCE.md`](docs/CONTENT_MAINTENANCE.md)
- [`docs/MEDIA_MANAGEMENT.md`](docs/MEDIA_MANAGEMENT.md)
- [`docs/COMMENTS_D1.md`](docs/COMMENTS_D1.md)
- [`docs/BUILD_PREVIEW_DEPLOY.md`](docs/BUILD_PREVIEW_DEPLOY.md)

## 技术与部署

- Node.js：`24.x`
- Astro 静态输出
- Markdown / MDX
- Pagefind 本地全文搜索
- Cloudflare Pages Functions + D1（评论）
- GitHub 源码备份
- Cloudflare Pages 静态发布

Cloudflare Pages 配置：

| 配置项 | 值 |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |
| Node version | `24.x` |

## 重要边界

- 不提交 `node_modules/`、`dist/`、`.astro/`、`.env`、Token 或任何密钥。
- FamilyJourney 的 R2、D1、照片、家庭数据、私有仓库与本站严格隔离。
- 旧文迁入必须保留首次日期和原始来源；不确定的正文、图片版权或知乎标题不要猜测。
- 站点保持“文本目录”视觉：文字优先、蓝色链接、克制细线、无卡片墙、无红色标题和状态徽章。


## v0.14 内容去重规则

- **阅读**只显示已经公开的阅读文章；书架条目和阅读专题不在阅读页重复列出。
- **技术专题**只展示至少有一篇公开文章的专题，避免链接到空目录。
- **工具**只放自己做的项目、Chrome 扩展、PCIe 工具、记录工具、资料库与历史来源。
- **生活**独立放饮食、影集与家庭、运动相关的网站；这些链接不会在工具页重复出现。
- `Rich Editor` 与 `quick_note_richtext` 使用可直接渲染 HTML 的 CDN 链接；源码链接仍保存在 `tools.json` 的 `githubUrl` 字段中。



## v0.14.1：本地预览可靠性

- 仅改文章、工具数据或 CSS：运行 `./preview-local.cmd`。
- 覆盖新版本、依赖异常或需要完全重装依赖：运行 `./preview-local.cmd -Install`。该命令会先自动清理旧的 `node_modules`、`dist`、`.astro`，并关闭残留 Node 进程。
- 若 Windows 仍报 `EPERM`，关闭 VS Code / 资源管理器项目窗口并重启后再次运行 `./preview-local.cmd -Install`。
- 详见 `docs/V0.14.1_PREVIEW_RELIABILITY_FIX.md`。

## v0.16：ZPark 骑跑两项记录

新增 2020-10-31 的生活文章《中关村软件园 ZPark 骑跑两项第一名》。照片存放在：

```text
public/images/articles/2020-10-31-zpark-duathlon-first/
```

该文章同时归入“骑行”和“跑步”专题；以后骑跑两项记录也可以同时写入：

```yaml
series: ["life-cycling", "life-running"]
```
