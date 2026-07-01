# Node 24 compatibility

This repository is configured for Node 24:

```text
package.json engines: >=24.0.0 <25
.nvmrc: 24
```

Astro requires Node 22.12.0 or newer and supports even-numbered Node releases. Node 24 is an LTS release. The site is static and does not use a Node runtime in production; Node is needed only to install dependencies, build `dist/`, run local previews, and execute quality checks.

## Windows: Rollup EPERM

If `npm ci` reports an error similar to:

```text
EPERM: operation not permitted, unlink ... rollup.win32-x64-msvc.node
```

that means Windows has locked the native Rollup file. It is not an Astro or Node 24 compatibility problem.

1. Stop `npm run dev`, `astro dev`, `wrangler pages dev`, and other Node processes.
2. Close VS Code windows that opened this project.
3. Delete `node_modules`, `dist`, and `.astro`.
4. Run `npm ci` again.

PowerShell:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
cmd /c rmdir /s /q node_modules
Remove-Item -Recurse -Force dist, .astro -ErrorAction SilentlyContinue
npm ci
```

Then run:

```powershell
npm run check
npm test
npm run build
npm run check:links
```
