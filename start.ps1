# START.ps1 - Iniciar MissTNA Web Development Environment
# En PowerShell: .\start.ps1

$ErrorActionPreference = 'Continue'

Write-Host ""
Write-Host "╔═════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  🚀 MissTNA Web Platform - Dev Setup   ║" -ForegroundColor Green
Write-Host "╚═════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Blue
$nodeVersion = node --version
if ($nodeVersion) {
    Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
}
else {
    Write-Host "✗ Node.js no encontrado" -ForegroundColor Red
    exit 1
}

# Verificar npm
Write-Host "Verificando npm..." -ForegroundColor Blue
$npmVersion = npm --version
if ($npmVersion) {
    Write-Host "✓ npm $npmVersion" -ForegroundColor Green
}
else {
    Write-Host "✗ npm no encontrado" -ForegroundColor Red
    exit 1
}

# Verificar Python
Write-Host "Verificando Python..." -ForegroundColor Blue
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ $pythonVersion" -ForegroundColor Green
}
catch {
    Write-Host "⚠ Python no encontrado (opcional)" -ForegroundColor Yellow
}

Write-Host ""

# Instalar dependencias si es necesario
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias de npm..." -ForegroundColor Blue
    npm install
    Write-Host "✓ Dependencias instaladas" -ForegroundColor Green
    Write-Host ""
}

# Iniciar Next.js dev server
Write-Host "╔═════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Iniciando Servidor de Desarrollo      ║" -ForegroundColor Cyan
Write-Host "╚═════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "  📍 Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "  📡 API:       http://localhost:3000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "CONSEJO: Abre otra terminal PowerShell y ejecuta:" -ForegroundColor Yellow
Write-Host "  python local_api.py" -ForegroundColor Yellow
Write-Host "Para sincronizar datos locales de los bots." -ForegroundColor Yellow
Write-Host ""

npm run dev
