[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$runtimeDir = Join-Path $projectRoot '.astro'
$pidFile = Join-Path $runtimeDir 'local-preview.pid'

if (-not (Test-Path $pidFile)) {
  Write-Host 'No managed local preview is running.'
  exit 0
}

$rawPid = (Get-Content -LiteralPath $pidFile -Raw).Trim()
if ($rawPid -notmatch '^\d+$') {
  Remove-Item -Force $pidFile -ErrorAction SilentlyContinue
  Write-Host 'Removed an invalid local preview PID file.'
  exit 0
}

$previewProcess = Get-Process -Id ([int]$rawPid) -ErrorAction SilentlyContinue
if ($null -eq $previewProcess) {
  Remove-Item -Force $pidFile -ErrorAction SilentlyContinue
  Write-Host 'The previous local preview is no longer running.'
  exit 0
}

Write-Host "Stopping managed local preview (PID $rawPid) ..."
& taskkill /F /T /PID $rawPid 2>$null | Out-Null
Remove-Item -Force $pidFile -ErrorAction SilentlyContinue
Write-Host 'Local preview stopped.'
