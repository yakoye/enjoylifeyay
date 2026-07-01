[CmdletBinding()]
param(
  [switch]$Install,
  [switch]$Deploy
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

function Invoke-NpmCommand {
  param([string[]]$Arguments)
  & npm @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "npm $($Arguments -join ' ') failed with exit code $LASTEXITCODE"
  }
}

if ($Install) {
  Invoke-NpmCommand @('ci')
}

Invoke-NpmCommand @('run', 'check')
Invoke-NpmCommand @('test')
Invoke-NpmCommand @('run', 'build')
Invoke-NpmCommand @('run', 'check:links')

if ($Deploy) {
  & npx wrangler pages deploy dist --project-name enjoylifeyay --branch main
  if ($LASTEXITCODE -ne 0) {
    throw "Wrangler deployment failed with exit code $LASTEXITCODE"
  }
}

Write-Host 'Verification completed successfully.'
