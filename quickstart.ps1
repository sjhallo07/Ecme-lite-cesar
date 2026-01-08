param(
    [switch]$Lint,
    [switch]$Help
)

if ($Help) {
    Write-Host "quickstart.ps1 - install deps and run both servers locally." -ForegroundColor Cyan
    Write-Host "";
    Write-Host "Usage:";
    Write-Host "  ./quickstart.ps1 [-Lint]";
    Write-Host "Options:";
    Write-Host "  -Lint    Run ESLint (frontend + backend) after installs, before serving.";
    Write-Host "Notes:";
    Write-Host "  - Requires Node.js 18+ and npm.";
    Write-Host "  - Backend defaults to PORT=3001; override by setting $env:PORT before running.";
    exit 0
}

function Require-Cmd {
    param([string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        Write-Error "Missing required command: $Name" -Category ObjectNotFound
        exit 1
    }
}

function Check-NodeVersion {
    $versionString = (& node -v) -replace '^v',''
    $major = [int]($versionString.Split('.')[0])
    if ($major -lt 18) {
        Write-Error "Node.js 18+ is required. Found v$versionString." -Category InvalidOperation
        exit 1
    }
}

function Install-IfMissing {
    param([string]$Dir)
    if (-not (Test-Path "$Dir/node_modules")) {
        Write-Host "📦 Installing dependencies in $Dir ..." -ForegroundColor Yellow
        Push-Location $Dir
        try {
            npm install | Write-Host
        } finally {
            Pop-Location
        }
    } else {
        Write-Host "✅ Dependencies already present in $Dir (skip install)" -ForegroundColor Green
    }
}

function Run-LintIfRequested {
    if ($Lint) {
        Write-Host "🔍 Running linters (frontend + backend) ..." -ForegroundColor Yellow
        npm run lint:all
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Linting failed" -Category InvalidResult
            exit $LASTEXITCODE
        }
    }
}

$ErrorActionPreference = 'Stop'

$Root = $PSScriptRoot
$Backend = Join-Path $Root 'backend'

Require-Cmd node
Require-Cmd npm
Check-NodeVersion

Install-IfMissing $Root
Install-IfMissing $Backend
Run-LintIfRequested

if (-not $env:PORT) { $env:PORT = '3001' }

Write-Host "🚀 Starting backend dev server (PORT=$($env:PORT)) ..." -ForegroundColor Cyan
$backendProc = Start-Process npm -ArgumentList @('run','dev','--prefix',$Backend) -WorkingDirectory $Root -PassThru -NoNewWindow

try {
    Write-Host "🌐 Starting frontend dev server (Vite) ..." -ForegroundColor Cyan
    & npm run dev -- --host
} finally {
    if ($backendProc -and -not $backendProc.HasExited) {
        Write-Host "🛑 Stopping backend (pid $($backendProc.Id))" -ForegroundColor Yellow
        try { Stop-Process -Id $backendProc.Id -Force -ErrorAction SilentlyContinue } catch {}
    }
}
