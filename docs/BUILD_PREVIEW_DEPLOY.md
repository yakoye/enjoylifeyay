# 构建、预览与发布（Windows PowerShell）

本仓库按 **Node.js 24.x** 维护。请在仓库根目录执行命令：

```powershell
cd C:\Users\color\Documents\EnjoyLife
node -v
```

预期版本为 `v24.x.x`。`npm ci` 依赖 `package-lock.json`，不要把它删掉。

## 一次完整的本地校验

首次安装依赖，或更新 `package-lock.json` 后，先执行：

```powershell
npm ci
```

`npm ci` 成功后，按顺序执行：

```powershell
npm run check
npm test
npm run build
npm run check:links
```

命令含义：

| 命令 | 作用 | 成功标志 |
| --- | --- | --- |
| `npm ci` | 严格按锁文件安装依赖 | 命令正常结束，`node_modules/.bin/astro` 存在 |
| `npm run check` | Astro 与 TypeScript 检查 | 没有 `astro is not recognized` 或类型错误 |
| `npm test` | 内容模型、路由、SEO、迁移台账与视觉规则测试 | 全部测试通过 |
| `npm run build` | 生成静态站和 Pagefind 搜索索引 | 生成 `dist/` 与 `dist/pagefind/` |
| `npm run check:links` | 检查构建结果中的主要站内链接 | 不报 `dist/index.html not found` 或死链错误 |

也可以在依赖已经安装后使用一条命令完成四项校验：

```powershell
npm run verify
```

`npm run verify` 等同于：

```powershell
npm run check
npm test
npm run build
npm run check:links
```

## 本地预览

只有 `npm run build` 成功后再预览：

```powershell
npm run preview
```

终端会显示本地地址，通常为 `http://localhost:4321/`。预览进程会持续占用当前终端；确认后按 `Ctrl+C` 停止。

至少检查：

```text
/
/writing/
/series/
/tools/
/nature/
/bookshelf/
/favorites/
/projects/
/about/
/search/
/archive/
/rss.xml
/sitemap-index.xml
```

## GitHub 备份

本地检查通过后，先把源码提交到 GitHub：

```powershell
git status
git add -A
git commit -m "feat: import legacy writing and document release workflow"
git push origin main
```

GitHub 是源码备份；Cloudflare Pages 是部署结果。不要只部署、不提交源码。

## Cloudflare Pages 手动发布

确认 `dist/` 已由当前代码构建后执行：

```powershell
npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

项目名必须为 `enjoylifeyay`，生产分支必须为 `main`。首次使用 Wrangler 时，如出现登录提示，先执行：

```powershell
npx wrangler login
```

然后重新执行发布命令。发布成功后检查：

```text
https://enjoylifeyay.pages.dev/
```

> 若 Cloudflare Pages 已连接 GitHub 并把 `main` 设为 Production branch，`git push origin main` 本身也会触发自动部署。手动 Wrangler 发布和 Git 集成可以并存，但发布前仍必须先完成本地构建。

## 推荐的完整发布顺序

```powershell
cd C:\Users\color\Documents\EnjoyLife

npm ci
npm run check
npm test
npm run build
npm run check:links

npm run preview
# 在浏览器检查完成后，按 Ctrl+C 停止预览。

git add -A
git commit -m "feat: import legacy writing and document release workflow"
git push origin main

npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
```

## Windows：`EPERM` / `rolldown-binding...node` / `rollup...node` 文件锁

下面的错误表示 Windows 正在占用旧 `node_modules` 中的原生模块，**不是 Node 24 不兼容**：

```text
EPERM: operation not permitted, unlink
...rolldown-binding.win32-x64-msvc.node
```

出现后不要继续运行 `npm run check`、`npm run build` 或部署；它们会因为 `npm ci` 未完成而连锁失败。

先关闭当前项目的 VS Code 窗口、`npm run dev` / `npm run preview` / Wrangler 终端，以及打开了 `node_modules` 的资源管理器窗口。然后在新的 PowerShell 中运行：

```powershell
cd C:\Users\color\Documents\EnjoyLife

Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Select-Object ProcessId, CommandLine |
  Format-Table -Wrap
```

若命令行中显示 EnjoyLife、Astro、Vite 或 Wrangler，使用对应进程号结束它：

```powershell
taskkill /F /T /PID <进程号>
```

若当前没有其他重要 Node 项目在运行，可结束全部 Node 进程：

```powershell
taskkill /F /T /IM node.exe
Start-Sleep -Seconds 2
```

然后清理本地生成目录：

```powershell
cmd /c rmdir /s /q node_modules
Remove-Item -Recurse -Force dist, .astro -ErrorAction SilentlyContinue
Test-Path node_modules
```

最后一条必须输出 `False`。之后再执行：

```powershell
npm ci
```

仓库还提供辅助脚本：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\reset-local.ps1
```

若仍然无法删除，最省时间的处理是重启电脑，重启后不要先打开 VS Code 或启动开发服务器，先执行清理和 `npm ci`。如果 Windows Defender 的“受控文件夹访问”阻止 Documents 目录写入，可以把仓库移到例如 `D:\code\EnjoyLife`，或为 `node.exe` 放行。

## 不要上传的内容

不要把以下内容提交或发布到公开仓库：

- `.env`、Cloudflare API Token、登录凭证；
- FamilyJourney 的 R2、D1、私有照片、家庭数据；
- 未核对的知乎正文、转载正文、附件型资料；
- `node_modules/`、`dist/`、`.astro/`。
