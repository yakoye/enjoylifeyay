[CmdletBinding()]
param(
  [switch]$StopAllNode
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

function Remove-GeneratedDirectory {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,
    [int]$Attempts = 3
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    return
  }

  Write-Host "Removing $Path ..."

  for ($attempt = 1; $attempt -le $Attempts; $attempt++) {
    if ($Path -eq 'node_modules') {
      # cmd rmdir copes better with deeply nested npm paths on Windows.
      & cmd.exe /d /c "rmdir /s /q $Path" 2>$null | Out-Null
    } else {
      Remove-Item -LiteralPath $Path -Recurse -Force -ErrorAction SilentlyContinue
    }

    if (-not (Test-Path -LiteralPath $Path)) {
      return
    }

    if ($attempt -lt $Attempts) {
      Write-Warning "$Path is still present; retrying in $attempt second(s)."
      Start-Sleep -Seconds $attempt
    }
  }

  throw "$Path is still present after $Attempts attempts. Close VS Code/File Explorer windows that opened node_modules, pause any antivirus scan for this folder, or reboot Windows and run this script again."
}

if ($StopAllNode) {
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

Remove-GeneratedDirectory -Path 'node_modules'
Remove-GeneratedDirectory -Path 'dist'
Remove-GeneratedDirectory -Path '.astro'

Write-Host 'Local generated directories were removed.' -ForegroundColor Green
