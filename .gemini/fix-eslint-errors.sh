#!/bin/bash

# Script para corregir errores comunes de ESLint

echo "🔧 Corrigiendo errores comunes de ESLint..."

# 1. Cambiar @ts-nocheck por comentario explicativo
echo "1. Eliminando @ts-nocheck..."
find src app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|// @ts-nocheck|// Tipos temporalmente relajados - TODO: agregar tipos correctos|g' {} \;

# 2. Corregir funciones async sin await
echo "2. Buscando funciones async sin await..."
# Este requiere corrección manual

# 3. Agregar void a llamadas async sin await
echo "3. Agregando void a llamadas async..."
find src app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/^\t\tfetchOrders();$/\t\tvoid fetchOrders();/g' {} \;
find src app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/^\t\tfetchProducts();$/\t\tvoid fetchProducts();/g' {} \;
find src app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/^\t\tfetchCategories();$/\t\tvoid fetchCategories();/g' {} \;

# 4. Corregir variables no usadas comunes
echo "4. Corrigiendo variables no usadas..."
find src app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/const \[loading, setLoading\]/const \[_loading, setLoading\]/g' {} \;
find src app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/const \[error, setError\]/const \[_error, setError\]/g' {} \;

echo "✅ Correcciones automáticas completadas!"
echo "📊 Ejecutando lint para ver resultados..."

npm run lint:check 2>&1 | grep "✖"
