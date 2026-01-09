#!/bin/bash
# Script para deploy a GitHub Pages

# Build del proyecto
npm run build

# Crear rama gh-pages si no existe
git checkout gh-pages 2>/dev/null || git checkout -b gh-pages

# Mover archivos de dist/ a la raíz
rm -rf dist
git checkout main -- dist
cp -r dist/* .
rm -rf dist

# Agregar archivos a git
git add -f index.html assets favicon.ico placeholder.svg robots.txt

# Commit y push
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# Volver a main
git checkout main
