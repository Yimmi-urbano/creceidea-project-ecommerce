# 🪝 Configuración de Pre-commit Hooks (Opcional)

Esta configuración es **opcional** pero **altamente recomendada** para garantizar que todo el código que se suba al repositorio cumpla con los estándares de calidad.

---

## 🎯 ¿Qué son los Pre-commit Hooks?

Los pre-commit hooks son scripts que se ejecutan **automáticamente antes de cada commit**. Esto asegura que:

- ✅ El código esté formateado correctamente
- ✅ No haya errores de ESLint
- ✅ No se suban archivos con problemas

---

## 📦 Instalación

### Paso 1: Instalar dependencias

```bash
npm install --save-dev husky lint-staged
```

### Paso 2: Inicializar Husky

```bash
npx husky init
```

### Paso 3: Crear el hook de pre-commit

```bash
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit
```

### Paso 4: Configurar lint-staged

Agrega esto a tu `package.json`:

```json
{
	"lint-staged": {
		"*.{ts,tsx}": ["eslint --fix", "prettier --write"],
		"*.{js,jsx}": ["eslint --fix", "prettier --write"],
		"*.{json,css,md}": ["prettier --write"]
	}
}
```

---

## 🚀 Uso

Una vez configurado, cada vez que hagas un commit:

```bash
git add .
git commit -m "feat: add new feature"
```

Husky ejecutará automáticamente:

1. ESLint en los archivos modificados
2. Prettier para formatear el código
3. Solo permitirá el commit si todo está correcto

---

## 🛠️ Comandos Útiles

### Saltar el hook (solo en casos excepcionales)

```bash
git commit -m "mensaje" --no-verify
```

### Ejecutar lint-staged manualmente

```bash
npx lint-staged
```

### Desinstalar Husky

```bash
npm uninstall husky lint-staged
rm -rf .husky
```

---

## 📝 Configuración Completa de package.json

```json
{
	"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start",
		"lint": "eslint . --ext .ts,.tsx -c .eslintrc.json --fix",
		"lint:check": "eslint . --ext .ts,.tsx -c .eslintrc.json",
		"format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,css,md}\"",
		"format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,css,md}\"",
		"prepare": "husky install"
	},
	"lint-staged": {
		"*.{ts,tsx}": ["eslint --fix", "prettier --write"],
		"*.{js,jsx}": ["eslint --fix", "prettier --write"],
		"*.{json,css,md}": ["prettier --write"]
	},
	"devDependencies": {
		"husky": "^9.0.0",
		"lint-staged": "^15.0.0",
		"eslint": "^8.57.0",
		"prettier": "^3.0.0"
	}
}
```

---

## ✅ Ventajas

1. **Prevención Automática**: No se pueden subir archivos con errores
2. **Consistencia**: Todo el equipo usa las mismas reglas
3. **Ahorro de Tiempo**: No hay que corregir errores en PRs
4. **Calidad**: El código en el repositorio siempre está limpio

---

## ⚠️ Consideraciones

- **Tiempo de Commit**: Los commits pueden tardar unos segundos más
- **Archivos Grandes**: En archivos muy grandes, el linting puede ser lento
- **Conflictos**: Si hay muchos errores, el commit será rechazado

---

## 🎓 Mejores Prácticas

1. **Commits Pequeños**: Haz commits frecuentes con pocos archivos
2. **Fix Before Commit**: Ejecuta `npm run lint:fix` antes de hacer commit
3. **No Abuses de --no-verify**: Solo úsalo en emergencias
4. **Comunica al Equipo**: Asegúrate de que todos tengan Husky instalado

---

## 🔄 Integración con CI/CD

Además de los pre-commit hooks, configura tu CI/CD para ejecutar:

```yaml
# .github/workflows/lint.yml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint:check
      - run: npm run format:check
```

---

**¡Listo!** Con esta configuración, tu código siempre estará limpio y libre de errores. 🎉
