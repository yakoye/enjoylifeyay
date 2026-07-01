[CmdletBinding()]
param(
  [switch]$StopAllNode
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

if ($StopAllNode) {
  Write-Host 'Stopping all node.exe processes...'
  taskkill /F /T /IM node.exe 2>$null | Out-Null
  Start-Sleep -Seconds 2
}

foreach ($path in @('node_modules', 'dist', '.astro')) {
  if (Test-Path $path) {
    Write-Host "Removing $path ..."
    if ($path -eq 'node_modules') {
      cmd /c rmdir /s /q node_modules
    } else {
      Remove-Item -Recurse -Force $path -ErrorAction SilentlyContinue
    }
  }
}

if (Test-Path 'node_modules') {
  throw "node_modules is still present. Close VS Code/dev servers, identify the locking process, or rerun with -StopAllNode. See docs/BUILD_PREVIEW_DEPLOY.md."
}

Write-Host 'Local generated directories were removed.'
