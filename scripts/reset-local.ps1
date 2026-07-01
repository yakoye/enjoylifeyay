[CmdletBinding()]
param(
  [switch]$StopAllNode
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

if ($StopAllNode) {
  # Do not call taskkill directly: when no node.exe process exists, taskkill
  # writes an error and PowerShell treats the native command failure as noise.
  # Get-Process with SilentlyContinue makes the no-process case a normal path.
  $nodeProcesses = @(Get-Process -Name 'node' -ErrorAction SilentlyContinue)

  if ($nodeProcesses.Count -eq 0) {
    Write-Host 'No node.exe processes are running; continuing.'
  } else {
    Write-Host "Stopping $($nodeProcesses.Count) node.exe process(es)..."

    foreach ($nodeProcess in $nodeProcesses) {
      try {
        Stop-Process -Id $nodeProcess.Id -Force -ErrorAction Stop
      } catch {
        Write-Warning "Could not stop node.exe process $($nodeProcess.Id): $($_.Exception.Message)"
      }
    }

    Start-Sleep -Seconds 2
  }
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
