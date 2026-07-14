# EnjoyLife

以“技术 · 工具 · 阅读 · 自然 · 生活”为主线的个人知识与生活档案站。项目使用 Astro 生成纯静态网页，不使用 React、SSR、数据库、登录、CMS 或评论系统。

## 线上地址

- 主站（Cloudflare Pages）：<https://enjoylifeyay.goldke.online>
- 备用站（GitHub Pages 默认地址）：<https://yakoye.github.io/enjoylifeyay/>

两个地址由同一次 `main` 分支提交分别构建、分别发布，任何一边部署失败都不会覆盖另一边的线上版本。页面 canonical 始终指向主站。

## 唯一维护仓库

以后只在名为以下名称的仓库中维护：

```text
enjoylifeyay
```

其他副本只作为历史备份，不再从其他副本提交或部署，以免内容相互覆盖。

## 日常更新与自动发布

开始修改前先同步远端：

```powershell
cd enjoylifeyay
git pull --ff-only
```

首次使用或依赖变化时执行 `npm ci`。完成文章或代码修改后：

```powershell
npm run verify
git status
git add -A
git commit -m "content: update articles"
git push origin main
```

`git push origin main` 会触发 [GitHub Actions](.github/workflows/deploy.yml)：

1. 先运行完整校验；
2. 使用根路径构建并发布到 Cloudflare Pages；
3. 使用 `/enjoylifeyay/` 基础路径单独构建并发布到 GitHub Pages。

在 GitHub 仓库的 **Actions** 页面可以查看两边的发布结果。不要提交 `node_modules/`、`dist/`、`.astro/`、`.wrangler/`、`.env` 或任何密钥。

## 第一次启用自动发布

仓库管理员只需配置一次：

1. GitHub 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. GitHub 仓库 **Settings → Secrets and variables → Actions** 新建：
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`
3. Cloudflare Token 只授予该账户的 Pages 编辑权限，不把 Token 写进代码或文档。

Cloudflare 项目名固定为 `enjoylifeyay`，自定义域名继续由该项目管理。紧急情况下可在本机完成根路径构建后手动发布：

```powershell
npm run build
npm run deploy:pages
```

## 本地开发

```powershell
npm ci
npm run dev
```

也可以双击 `preview-local.cmd`，它会先检查、构建，再打开本地网页。首次安装依赖可运行：

```powershell
.\preview-local.cmd -Install
```

停止后台预览可双击 `stop-local-preview.cmd`，或运行 `npm run preview:local:stop`。

## 内容入口

| 内容 | 唯一维护位置 |
| --- | --- |
| 文章（含总结、原则） | `src/content/writing/` |
| 站外专题 | `src/content/section-pages/reading/reading-sites.md` |
| 一级页面文字 | `src/content/site-pages/` |
| 二级栏目页面 | `src/content/section-pages/` |
| 工具与项目 | `src/content/tools.json` |
| 自然观察 | `src/content/nature.json` |
| 书架 | `src/content/books.json` |

文章的 `section` 决定唯一栏目，`tags` 用于跨栏目检索且最多 3 个。原则正文只保留在对应文章中；栏目页只显示索引，不复制正文。完整规则见 [内容模型](docs/CONTENT_MODEL.md) 和 [内容维护](docs/CONTENT_MAINTENANCE.md)。

## 新增文章

在 `src/content/writing/` 新建 `YYYY-MM-DD-english-slug.md`，可复制 `docs/templates/new-writing.md`。发布前确认：

- `draft: false`；不能确认的正文或链接必须保留 `draft: true`，不得编造；
- `section` 只填一个有效栏目；
- `tags` 最多 3 个；
- 正文不要重复 frontmatter 中的文章标题；
- 至少有一个 `##` 至 `####` 分节标题。

## 更多说明

- [构建、预览与发布](docs/BUILD_PREVIEW_DEPLOY.md)
- [内容维护](docs/CONTENT_MAINTENANCE.md)
- [更新记录](docs/CHANGELOG.md)
