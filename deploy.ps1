# Script de Deploy a GitHub Pages para Windows PowerShell

# Este script automatiza el despliegue del proyecto Giacomo a GitHub Pages
# Uso: .\deploy.ps1

Write-Host "🚀 Iniciando despliegue a GitHub Pages..." -ForegroundColor Green

# 1. Build del proyecto
Write-Host "📦 Build del proyecto..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}

# 2. Crear rama gh-pages temporal
Write-Host "🌿 Preparando rama gh-pages..." -ForegroundColor Yellow
git checkout main
git checkout --orphan gh-pages-temp

# 3. Limpiar y copiar archivos
Write-Host "📁 Copiando archivos..." -ForegroundColor Yellow
git reset --hard
Remove-Item -Path * -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path .git -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path .github -Recurse -Force -ErrorAction SilentlyContinue

# Copiar archivos de dist/ a la raíz
Copy-Item -Path "..\gh-pages-temp\dist\*" -Destination "." -Recurse -Force -ErrorAction Stop

# 4. Agregar archivos a git
Write-Host "➕ Agregando archivos a git..." -ForegroundColor Yellow
git add index.html assets favicon.ico placeholder.svg robots.txt

# 5. Commit
Write-Host "💾 Creando commit..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Deploy to GitHub Pages - $timestamp"

# 6. Renombrar rama y hacer push
Write-Host "📤 Haciendo push a GitHub..." -ForegroundColor Yellow
git branch -M gh-pages
git push origin gh-pages --force

# 7. Volver a main
Write-Host "🔄 Volviendo a rama main..." -ForegroundColor Yellow
git checkout main

# 8. Limpiar rama temporal
git branch -D gh-pages-temp -ErrorAction SilentlyContinue

Write-Host "✅ Despliegue completado!" -ForegroundColor Green
Write-Host "🌐 Sitio disponible en: https://desarrollo33-lab.github.io/giacomo/" -ForegroundColor Cyan
Write-Host "⏳ Espera 1-2 minutos para que GitHub Pages procese el despliegue" -ForegroundColor Yellow
