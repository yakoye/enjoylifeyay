[CmdletBinding()]
param(
  # Force npm ci even when dependencies are already installed.
  [switch]$Install,

  # Use a stable local address so the script can open it automatically.
  [ValidateRange(1024, 65535)]
  [int]$Port = 4321,

  # Build and verify without opening a browser or starting the preview server.
  [switch]$NoPreview,

  # Start the server but do not launch the default browser.
  [switch]$NoBrowser,

  # Download one-time local copies of migrated legacy images before verification.
  [switch]$FetchLegacyAssets
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$hostName = '127.0.0.1'
$siteUrl = "http://${hostName}:$Port/"
$runtimeDir = Join-Path $projectRoot '.astro'
$pidFile = Join-Path $runtimeDir 'local-preview.pid'
$logFile = Join-Path $runtimeDir 'local-preview.log'
$astroBinary = Join-Path $projectRoot 'node_modules\\.bin\\astro.cmd'

function Invoke-NpmCommand {
  param([string[]]$Arguments)

  & npm @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "npm $($Arguments -join ' ') failed with exit code $LASTEXITCODE"
  }
}

function Test-TcpPort {
  param(
    [string]$HostName,
    [int]$TcpPort
  )

  $client = New-Object System.Net.Sockets.TcpClient
  try {
    $async = $client.BeginConnect($HostName, $TcpPort, $null, $null)
    $connected = $async.AsyncWaitHandle.WaitOne(300)
    if (-not $connected) {
      return $false
    }

    $client.EndConnect($async)
    return $true
  } catch {
    return $false
  } finally {
    $client.Close()
  }
}

function Stop-ManagedPreview {
  if (-not (Test-Path $pidFile)) {
    return
  }

  $rawPid = (Get-Content -LiteralPath $pidFile -Raw).Trim()
  if ($rawPid -notmatch '^\d+$') {
    Remove-Item -Force $pidFile -ErrorAction SilentlyContinue
    return
  }

  $previewProcess = Get-Process -Id ([int]$rawPid) -ErrorAction SilentlyContinue
  if ($null -ne $previewProcess) {
    Write-Host "Stopping the previous managed local preview (PID $rawPid) ..."
    & taskkill /F /T /PID $rawPid 2>$null | Out-Null
    Start-Sleep -Milliseconds 700
  }

  Remove-Item -Force $pidFile -ErrorAction SilentlyContinue
}

function Get-ListeningProcessId {
  param([int]$TcpPort)

  try {
    $connection = Get-NetTCPConnection -LocalPort $TcpPort -State Listen -ErrorAction Stop |
      Select-Object -First 1
    if ($null -ne $connection) {
      return [int]$connection.OwningProcess
    }
  } catch {
    # Get-NetTCPConnection may be unavailable in a minimal PowerShell environment.
  }

  return $null
}

function Show-PreviewLog {
  if (Test-Path $logFile) {
    Write-Host ''
    Write-Host 'Last local preview log lines:' -ForegroundColor Yellow
    Get-Content -LiteralPath $logFile -Tail 40
  }
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw 'npm was not found. Install Node.js 24.x and reopen PowerShell before using this script.'
}

$nodeVersion = (& node -v).Trim()
if ($nodeVersion -notmatch '^v24\.') {
  Write-Warning "This repository is maintained with Node.js 24.x. Current version: $nodeVersion"
}

# A normal content edit does not need another npm ci. The script installs automatically
# on first use and can be forced with -Install after dependency changes. Forced installs
# first stop stale Node processes and remove generated directories to avoid Windows EPERM
# failures when npm tries to replace Rollup/Rolldown native bindings.
if ($Install) {
  $resetScript = Join-Path $PSScriptRoot 'reset-local.ps1'
  Write-Host 'Preparing a clean dependency install ...' -ForegroundColor Cyan
  try {
    & $resetScript -StopAllNode
  } catch {
    throw "Could not clean old local dependencies. $($_.Exception.Message)"
  }
}

if ($Install -or -not (Test-Path $astroBinary)) {
  Write-Host 'Installing dependencies with npm ci ...'
  try {
    Invoke-NpmCommand @('ci')
  } catch {
    throw "npm ci failed after cleanup. If Windows still reports EPERM / rollup / rolldown file locking, close VS Code and File Explorer windows that opened the project, reboot Windows, then rerun .\preview-local.cmd -Install. Details: $($_.Exception.Message)"
  }
} else {
  Write-Host 'Dependencies already exist; skipping npm ci. Use -Install to force a clean install.'
}

if ($FetchLegacyAssets) {
  Write-Host ''
  Write-Host 'Downloading localized legacy article images ...' -ForegroundColor Cyan
  Invoke-NpmCommand @('run', 'fetch:legacy-assets')
}

Write-Host ''
Write-Host 'Running local verification ...' -ForegroundColor Cyan
Invoke-NpmCommand @('run', 'check')
Invoke-NpmCommand @('test')
Invoke-NpmCommand @('run', 'audit:toc')
Invoke-NpmCommand @('run', 'verify:public-content')
try {
  Invoke-NpmCommand @('run', 'verify:legacy-assets')
} catch {
  Write-Warning 'Localized legacy images are not complete yet. The preview can still open, but do not deploy before running: npm run fetch:legacy-assets'
}
Invoke-NpmCommand @('run', 'build')
Invoke-NpmCommand @('run', 'check:links')

if ($NoPreview) {
  Write-Host ''
  Write-Host 'Build and verification completed successfully. Preview was skipped by -NoPreview.' -ForegroundColor Green
  exit 0
}

New-Item -ItemType Directory -Force -Path $runtimeDir | Out-Null
Stop-ManagedPreview

$occupiedPid = Get-ListeningProcessId -TcpPort $Port
if ($null -ne $occupiedPid) {
  throw "Port $Port is already in use by PID $occupiedPid. Stop that server first, or choose another port: powershell -ExecutionPolicy Bypass -File .\\scripts\\local-preview.ps1 -Port 4322"
}

Remove-Item -Force $logFile -ErrorAction SilentlyContinue
$previewCommand = "npm run preview -- --host $hostName --port $Port > `"$logFile`" 2>&1"
Write-Host ''
Write-Host "Starting local preview at $siteUrl ..." -ForegroundColor Cyan
$previewProcess = Start-Process -FilePath 'cmd.exe' -ArgumentList @('/c', $previewCommand) -WorkingDirectory $projectRoot -PassThru -WindowStyle Hidden
Set-Content -LiteralPath $pidFile -Value $previewProcess.Id -NoNewline

$deadline = (Get-Date).AddSeconds(25)
while ((Get-Date) -lt $deadline) {
  if (Test-TcpPort -HostName $hostName -TcpPort $Port) {
    Write-Host "Local preview is ready: $siteUrl" -ForegroundColor Green
    Write-Host 'To stop it later, run: powershell -ExecutionPolicy Bypass -File .\\scripts\\stop-local-preview.ps1'

    if (-not $NoBrowser) {
      Start-Process $siteUrl
    }

    exit 0
  }

  if ($previewProcess.HasExited) {
    break
  }

  Start-Sleep -Milliseconds 250
}

Remove-Item -Force $pidFile -ErrorAction SilentlyContinue
Write-Error "The local preview did not become available at $siteUrl within 25 seconds."
Show-PreviewLog
exit 1
