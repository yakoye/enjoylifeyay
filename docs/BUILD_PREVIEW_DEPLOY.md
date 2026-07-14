# 构建、预览与发布

## 环境与目录

本站按 Node.js 24.x 维护，仓库目录名为：

```powershell
cd enjoylifeyay
node -v
```

预期版本为 `v24.x.x`。依赖必须按 `package-lock.json` 安装：

```powershell
npm ci
```

## 本地开发与预览

开发模式：

```powershell
npm run dev
```

日常完整预览可双击 `preview-local.cmd`，或执行：

```powershell
npm run preview:local
```

首次使用或依赖变化时执行：

```powershell
.\preview-local.cmd -Install
```

停止后台预览：

```powershell
.\stop-local-preview.cmd
```

## 完整校验

提交前统一运行：

```powershell
npm run verify
```

这条命令依次检查 Astro/TypeScript、内容模型、页面契约、文章目录、公开文案、科学资料引用、历史图片、静态构建与产物链接。成功后会生成包含 Pagefind 中文索引的 `dist/`。

科学常识文章需要联网复核全部 PMID、PMCID 和 DOI 时，额外执行：

```powershell
npm run verify:science-references -- --online
```

## 双平台构建差异

Cloudflare Pages 部署在域名根路径：

```powershell
npm run build
```

GitHub Pages 默认项目地址部署在 `/enjoylifeyay/` 子路径，CI 使用：

```powershell
$env:BASE_PATH = "/enjoylifeyay/"
npm run build
Remove-Item Env:BASE_PATH
```

两次构建使用同一份源码，但输出不能混用。站点 canonical、RSS 和 Sitemap 的正式来源始终是 `https://enjoylifeyay.goldke.online`。

## 推荐发布流程

```powershell
cd enjoylifeyay
git pull --ff-only
npm run verify
git status
git add -A
git commit -m "content: update site"
git push origin main
```

推送到 `main` 后，[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) 会先校验，再启动两个互不覆盖的部署任务：

- Cloudflare Pages → `https://enjoylifeyay.goldke.online`
- GitHub Pages → `https://yakoye.github.io/enjoylifeyay/`

GitHub Pages 的 **Source** 必须设为 **GitHub Actions**。仓库 Actions Secrets 必须存在 `CLOUDFLARE_ACCOUNT_ID` 与 `CLOUDFLARE_API_TOKEN`；Token 只授予 Pages 编辑权限，严禁写入仓库。

## Cloudflare 手动兜底

只有自动发布暂时不可用时才需要：

```powershell
npm run build
npm run deploy:pages
```

项目名固定为 `enjoylifeyay`，生产分支固定为 `main`。本机首次使用 Wrangler 时可运行 `npx wrangler login`。

## 发布后检查

至少检查两个域名下的以下页面：

```text
/
/reading/
/reading/articles/
/reading/books/
/reading/principles/
/search/
/archive/
/rss.xml
```

还要确认两篇最新文章可打开、图片无 404、站内链接没有跳出当前部署域名、文章页没有评论区域或 `/api/comments` 请求。

## Windows 文件锁排查

若 `npm ci` 出现 `EPERM`、`rolldown-binding...node` 或 `rollup...node`，先停止当前仓库的 Astro、Vite、Wrangler 和 Node 进程，再运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reset-local.ps1 -StopAllNode
npm ci
```

不要在 `npm ci` 失败后继续构建。仍无法清理时，重启 Windows 后先安装依赖，再打开开发服务器。

## 不提交的内容

- `.env`、Cloudflare API Token、登录凭证；
- `node_modules/`、`dist/`、`.astro/`、`.wrangler/`；
- FamilyJourney 的 R2、D1、私有照片或家庭数据；
- 未核对的公开链接、知乎正文、转载正文或附件资料。

无法确认的内容必须保持占位并设置 `draft: true`。

## 历史文章图片

第一次迁入旧文章图片时运行：

```powershell
.\preview-local.cmd -FetchLegacyAssets
```

图片会进入 `public/images/articles/`。随后重新执行 `npm run verify` 并提交；线上访客不会从 GitHub raw URL 加载这些图片。
