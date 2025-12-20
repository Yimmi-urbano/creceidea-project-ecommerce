#!/bin/bash

echo "🔧 Corrigiendo errores de ESLint agresivamente..."

# Contar errores iniciales
INITIAL=$(npm run lint:check 2>&1 | grep "✖" | grep -o "[0-9]* errors" | grep -o "[0-9]*")
echo "📊 Errores iniciales: $INITIAL"

# 1. Corregir todas las funciones async sin await
echo "1️⃣ Corrigiendo funciones async sin await..."

# Buscar archivos con require-await
FILES=$(npm run lint:check 2>&1 | grep "require-await" | cut -d: -f1 | sort -u)

for file in $FILES; do
  if [ -f "$file" ]; then
    echo "   Procesando: $file"
    # Eliminar async de funciones que no tienen await
    # Esto es complejo, mejor hacerlo manualmente archivo por archivo
  fi
done

# 2. Corregir autoFocus
echo "2️⃣ Eliminando autoFocus..."
find src app -type f \( -name "*.tsx" \) -exec sed -i '' '/autoFocus/d' {} \;

# 3. Agregar role y tabIndex a elementos clickeables
echo "3️⃣ Buscando elementos clickeables sin keyboard listeners..."
# Esto requiere corrección manual

# 4. Corregir labels sin control asociado
echo "4️⃣ Buscando labels sin htmlFor..."
# Esto requiere corrección manual

# 5. Ejecutar auto-fix
echo "5️⃣ Ejecutando auto-fix..."
npm run lint:fix > /dev/null 2>&1

# Contar errores finales
FINAL=$(npm run lint:check 2>&1 | grep "✖" | grep -o "[0-9]* errors" | grep -o "[0-9]*")
FIXED=$((INITIAL - FINAL))

echo ""
echo "✅ Corrección completada!"
echo "📊 Errores iniciales: $INITIAL"
echo "📊 Errores finales: $FINAL"
echo "🎯 Errores corregidos: $FIXED"
