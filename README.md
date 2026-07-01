# Enjoy Life

一个以“技术 · 阅读 · 自然 · 工具 · 生活”为主线的极简个人知识与生活档案站。

正式地址：<https://enjoylifeyay.pages.dev>

## v0.11.2：一键本地检查与预览

- 新增 `preview-local.cmd`：双击后自动完成检查、测试、目录审计、构建、链接检查，启动本地预览并打开浏览器。
- 新增 `scripts/local-preview.ps1` 与 `scripts/stop-local-preview.ps1`：预览默认使用 `http://127.0.0.1:4321/`，可自动停止上一次由本站脚本启动的预览。
- 依赖已安装时，普通预览会跳过重复的 `npm ci`；首次使用、清理后或依赖变更时使用 `preview-local.cmd -Install`。
- 新增 `stop-local-preview.cmd`：无需寻找 Node 进程，即可关闭本脚本启动的本地预览。
- 详细说明见 [`docs/V0.11.2_ONE_CLICK_LOCAL_PREVIEW.md`](docs/V0.11.2_ONE_CLICK_LOCAL_PREVIEW.md)。

## v0.11.1：Windows 本地清理脚本修复

- 修复 `scripts/reset-local.ps1 -StopAllNode` 在电脑上没有任何 `node.exe` 进程时仍显示 `taskkill ... node.exe not found` 的问题。
- 现在没有 Node 进程时会正常显示：`No node.exe processes are running; continuing.`，随后继续清理 `node_modules`、`dist` 和 `.astro`。
- 该提示不是构建失败；它只说明当前没有需要结束的 Node 开发服务器。

## v0.11：MSI / MSI-X 测试文章与评论命令行管理

本版在 v0.10 基础上完成：

- 写作页移除领域 / 形式筛选。当前文章量不大，按日期的稳定文本目录更直接；不再保留点击无反应的 UI。
- 新增《PCIe MSI / MSI-X：Capability、Table 与 Linux 驱动接口》（2024-05-24）：包含本地图片、图片说明、表格、行内代码、代码块、引用、二级 / 三级标题与折叠目录，用于完整验证技术文章框架。
- 评论区改为极简单行输入：昵称、邮箱、留言均有线性图标；留言随输入自动增高。
- 邮箱改为可选：只存入 D1，绝不公开显示。
- 新增远程 D1 命令行管理：查看待审核、通过、拒绝、删除、状态统计、API 探测；无需每次进入 Cloudflare 后台。
- 新增 `COMMENTS_MODERATION=auto` 可选自动公开模式。默认仍是 `pending` 审核模式。
- 从 v0.10 升级时请先执行一次：

  ```powershell
  npm run comments:migrate
  ```

  为已有 D1 表增加可选邮箱列。

完整评论说明见 [`docs/COMMENTS_D1.md`](docs/COMMENTS_D1.md)。

## v0.9：标题栏宽度、目录文字与窄屏导航

本版在 v0.8 基础上完成：

- 顶部标题栏的内部内容宽度与正文统一为 `890px`；不再比正文列更宽。
- 宽屏下仍保持左侧站点、正中导航、右侧搜索与主题切换的三栏结构。
- `Enjoy Life` 的文字标签在窄屏（`<=620px`）自动隐藏，只保留站点图标，避免遮挡“主页”等导航文字。
- 长文章的折叠目录入口从 `[ToC]` 改为中文“目录”；默认仍为折叠状态。

## v0.8：标题节奏、目录、书架日期与生活运动专题

本版在 v0.7 基础上完成：

- 页面一级标题统一为 `26px`；首页 `Enjoy Life` 同样为 `26px`，仍保持标题与副标题之间的紧凑节奏。
- `写作 / 专题 / 工具 / 自然 / 书架 / 收藏 / 项目 / 归档 / 关于` 的标题与页面说明间距由约 `12px` 收紧为约 `3px`。
- 删除内容区域的装饰性横线；保留顶栏与页脚的功能性细分隔。
- 修复 Markdown 中 `updated: null` 被日期校验误转换为 `1970-01-01` 的问题；没有实际修订日期时不再显示“最后修订”。
- 长文在标题元信息下方提供默认折叠的 `[ToC]`；点击展开目录，再次点击收起。
- 书架“读过”条目在桌面端右侧显示完成日期，书名、说明与作者保持紧凑文本目录样式。
- 新增“骑行”和“跑步”两个生活与运动专题，后续新文章在 Frontmatter 的 `series` 中填入 `life-cycling` 或 `life-running` 即可归档。
- 写作筛选改为打包后的浏览器模块脚本，支持领域、形式来回切换、浏览器前进后退与 URL 参数同步。

## v0.7：布局收紧、完整归档入口、图标与图片管理

本版在 v0.6 基础上完成：

- 顶部标题栏采用三栏结构：左侧站点图标与 `Enjoy Life`、中间居中的文字导航、右侧搜索与主题切换；`归档` 已加入导航，位置在“项目”和“关于”之间。
- 使用已提供的 `favicon.ico` 生成浏览器标签图标、32px PNG、Apple Touch Icon 与 Web Manifest；图标 URL 采用版本参数，减少 Chrome 继续显示旧地球图标的缓存概率。
- `/archive/` 保持唯一的“日期在左、标题在右”的年度归档视图；其他列表页继续使用 v0.4/v0.5 的紧凑文本目录排版。
- 主页、写作、专题等页面移除装饰性横线；修正标题默认上边距叠加造成的大空白。
- 写作筛选改为页面内明确初始化的原生脚本，点击领域、形式会立即筛选条目，并同步 URL 参数。
- 专题文章数改为简洁的 `（2篇）`，不再显示“已公开文章”。
- 补充图片长期管理方案：新文章使用不随 Markdown 文件名变化的 `mediaKey`；旧 EnjoyLifeBlog 图片可通过脚本迁入 `public/images/`，随后由 Cloudflare Pages 提供给访问者。

## 最常用：一键检查并打开本地网页

日常改完 Markdown、图片、CSS 或页面后，直接双击仓库根目录的：

```text
preview-local.cmd
```

它会自动完成检查、测试、目录审计、构建、链接检查，并打开：

```text
http://127.0.0.1:4321/
```

第一次使用、刚清理本地依赖、或修改了 `package.json` / `package-lock.json` 后，使用：

```powershell
preview-local.cmd -Install
```

停止预览：

```text
stop-local-preview.cmd
```

也可以用 npm：

```powershell
npm run preview:local
npm run preview:local:install
npm run preview:local:stop
```

完整说明见 [`docs/V0.11.2_ONE_CLICK_LOCAL_PREVIEW.md`](docs/V0.11.2_ONE_CLICK_LOCAL_PREVIEW.md)。

## 本地开发

需要持续编辑时可以启动开发服务器：

```powershell
npm ci
npm run dev
```

终端会给出本地地址；停止时按 `Ctrl+C`。正式发布前仍必须按下面的完整流程执行。

## 最常用：每次构建、预览、发布

在项目根目录执行：

```powershell
npm ci
npm run check
npm test
npm run audit:toc
npm run build
npm run check:links

npm run preview
# 浏览器检查完成后按 Ctrl+C 停止预览。

npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

建议在部署前先提交 GitHub 源码：

```powershell
git add -A
git commit -m "docs: update site content"
git push origin main
```

完整 Windows、Node 24、锁文件和 Cloudflare Pages 说明见：

- [`docs/BUILD_PREVIEW_DEPLOY.md`](docs/BUILD_PREVIEW_DEPLOY.md)
- [`docs/Cloudflare-Pages-部署.md`](docs/Cloudflare-Pages-部署.md)

## 以后怎样添加一篇博客

1. 复制 [`docs/templates/new-writing.md`](docs/templates/new-writing.md)。
2. 放到 `src/content/writing/`，文件名使用 `YYYY-MM-DD-english-slug.md`。
3. 为有图片的文章写一个长期不变的 `mediaKey`，例如 `2026-07-05-pcie-completion-timeout`。
4. 先保持 `draft: true`；本地确认后再改成 `draft: false`。
5. 图片放入 `public/images/articles/<mediaKey>/`，Markdown 使用 `/images/...` 路径。
6. 骑行文章填写 `series: ["life-cycling"]`；跑步文章填写 `series: ["life-running"]`。
7. 执行构建与链接检查，确认后提交 GitHub，再发布到 Cloudflare Pages。

完整字段、旧文迁入、工具 / 项目 / 自然 / 书架 / 收藏维护方法见：

- [`docs/CONTENT_MAINTENANCE.md`](docs/CONTENT_MAINTENANCE.md)
- [`docs/MEDIA_MANAGEMENT.md`](docs/MEDIA_MANAGEMENT.md)
- [`docs/COMMENTS_D1.md`](docs/COMMENTS_D1.md)

## 迁入旧 EnjoyLifeBlog 图片

先只预览计划：

```powershell
npm run import:legacy-images -- --dry-run
```

确认后下载旧站图片、保存到本站 `public/images/legacy/`，并自动把 Markdown 中旧链接改成本站路径：

```powershell
npm run import:legacy-images -- --write
```

然后再次执行：

```powershell
npm run check
npm test
npm run audit:toc
npm run build
npm run check:links
npm run preview
```

详见 [`docs/MEDIA_MANAGEMENT.md`](docs/MEDIA_MANAGEMENT.md)。

## 内容位置

| 内容 | 文件或目录 |
| --- | --- |
| 写作文章 | `src/content/writing/*.md` / `*.mdx` |
| 专题 | `src/content/series.json` |
| 工具 | `src/content/tools.json` |
| 项目 | `src/content/projects.json` |
| 自然 | `src/content/nature.json` |
| 书架 | `src/content/books.json` |
| 收藏 | `src/content/favorites.json` |
| 正在做 | `src/data/now.ts` |
| 本站公开图片 | `public/images/` |
| 历史来源总台账 | `docs/CONTENT_MIGRATION_MANIFEST.csv` |
| 归档页面生成数据 | `src/data/legacyArchive.ts`（自动生成，不手改） |

## 历史内容与归档

- `/archive/` 是面向访客的完整历史时间线，按年份展示本站文章、旧 EnjoyLifeBlog 与 CSDN 历史条目。
- `docs/CONTENT_MIGRATION_MANIFEST.csv` 是历史来源唯一维护台账。
- 修改台账后执行：

```powershell
npm run sync:legacy-archive
```

或直接执行 `npm run build`；构建会自动同步归档数据。

相关文档：

- [`docs/CONTENT_MIGRATION_STATUS.md`](docs/CONTENT_MIGRATION_STATUS.md)
- [`docs/LEGACY_SOURCE_CATALOG.md`](docs/LEGACY_SOURCE_CATALOG.md)
- [`docs/CONTENT_MAINTENANCE.md`](docs/CONTENT_MAINTENANCE.md)

## 技术与部署

- Node.js：`24.x`
- Astro 静态输出
- Markdown / MDX
- Pagefind 本地全文搜索
- Cloudflare Pages Functions + D1（审核制评论）
- GitHub 源码备份
- Cloudflare Pages 静态发布

Cloudflare Pages 设置：

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


## v0.11 评论与 MSI 测试文章

- 写作页已移除未稳定的领域 / 形式筛选，保留清晰的按日期写作列表。
- 新增《PCIe MSI / MSI-X：Capability、Table 与 Linux 驱动接口》，用于验证图片、表格、代码块、引用、目录与评论。
- 评论支持可选邮箱；邮箱不公开。
- 评论命令行管理：

```powershell
npm run comments:migrate
npm run comments:pending
npm run comments:approve -- <评论ID>
npm run comments:delete -- <评论ID>
npm run comments:probe -- pcie-msi-msix-introduction
```

完整说明见 [`docs/COMMENTS_D1.md`](docs/COMMENTS_D1.md) 与 [`docs/V0.11_COMMENTS_ADMIN_MSI.md`](docs/V0.11_COMMENTS_ADMIN_MSI.md)。

## v0.11.3：Windows 路径修复

Windows 下运行 `npm test` 或 `npm run audit:toc` 时，如果旧版报出类似 `C:\\C:\\Users\...` 的重复盘符路径错误，请覆盖本版。该问题已通过 `fileURLToPath()` 修复。详见 `docs/V0.11.3_WINDOWS_PATH_FIX.md`。
