# 🔍 Configuración de ESLint - CreceIdea E-commerce

## 📋 Descripción

Esta configuración de ESLint está optimizada para **prevenir errores críticos** en tu aplicación Next.js con TypeScript. Incluye reglas estrictas para:

- ✅ **Prevención de errores de tipado** (TypeScript strict mode)
- ✅ **Detección de variables no usadas**
- ✅ **Convenciones de nombres** (naming conventions)
- ✅ **Organización de imports**
- ✅ **Mejores prácticas de React/Next.js**
- ✅ **Accesibilidad** (jsx-a11y)

---

## 🚀 Scripts Disponibles

### 1. **Lint con auto-fix** (recomendado para desarrollo)

```bash
npm run lint
# o
npm run lint:fix
```

Ejecuta ESLint y **corrige automáticamente** los errores que puede resolver.

### 2. **Lint sin auto-fix** (recomendado para CI/CD)

```bash
npm run lint:check
```

Solo **verifica** los errores sin modificar archivos. Ideal para pipelines de CI/CD.

### 3. **Formateo con Prettier**

```bash
npm run format
```

Formatea todos los archivos según las reglas de Prettier.

### 4. **Verificar formateo**

```bash
npm run format:check
```

Verifica si los archivos están formateados correctamente sin modificarlos.

---

## 🎯 Reglas Principales

### **TypeScript Strict**

- `@typescript-eslint/no-explicit-any`: ❌ Prohíbe el uso de `any`
- `@typescript-eslint/no-unsafe-*`: ❌ Previene operaciones inseguras con tipos
- `@typescript-eslint/explicit-function-return-type`: ⚠️ Requiere tipos de retorno explícitos
- `@typescript-eslint/no-floating-promises`: ❌ Previene promesas sin manejar

### **Variables No Usadas**

- `unused-imports/no-unused-imports`: ❌ Elimina imports no utilizados
- `unused-imports/no-unused-vars`: ❌ Detecta variables declaradas pero no usadas

### **Naming Conventions**

- Variables: `camelCase`, `PascalCase`, `UPPER_CASE`
- Funciones: `camelCase`, `PascalCase`
- Tipos/Interfaces: `PascalCase` (sin prefijo `I`)
- Enums: `PascalCase`
- Enum members: `UPPER_CASE` o `PascalCase`

### **Imports**

- Organización automática por grupos (builtin → external → internal)
- Orden alfabético dentro de cada grupo
- Líneas en blanco entre grupos
- Detección de imports duplicados y ciclos

### **React/Next.js**

- `react-hooks/rules-of-hooks`: ❌ Valida reglas de hooks
- `react-hooks/exhaustive-deps`: ⚠️ Verifica dependencias de hooks
- `react/jsx-key`: ❌ Requiere `key` en listas

---

## 🛠️ Configuración de VS Code (Recomendado)

Crea o actualiza `.vscode/settings.json`:

```json
{
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
		"source.organizeImports": true
	},
	"editor.formatOnSave": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

### Extensiones recomendadas:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

---

## 🔧 Solución de Problemas Comunes

### Error: "Unexpected any"

```typescript
// ❌ Incorrecto
const data: any = fetchData();

// ✅ Correcto
interface UserData {
	id: string;
	name: string;
}
const data: UserData = fetchData();
```

### Error: "Missing return type"

```typescript
// ❌ Incorrecto
function getUser(id: string) {
	return { id, name: 'John' };
}

// ✅ Correcto
function getUser(id: string): { id: string; name: string } {
	return { id, name: 'John' };
}
```

### Error: "Unused variable"

```typescript
// ❌ Incorrecto
const unusedVar = 'hello';

// ✅ Correcto - Usa guión bajo para variables intencionalmente no usadas
const _unusedVar = 'hello';
```

### Error: "No floating promises"

```typescript
// ❌ Incorrecto
fetchData();

// ✅ Correcto
void fetchData();
// o
fetchData().catch(console.error);
// o
await fetchData();
```

---

## 📦 Archivos de Configuración

- `.eslintrc.json` - Configuración principal de ESLint
- `.eslintignore` - Archivos/carpetas a ignorar
- `.prettierrc` - Configuración de Prettier
- `tsconfig.json` - Configuración de TypeScript (strict mode)

---

## 🎨 Integración con CI/CD

Ejemplo para GitHub Actions:

```yaml
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

## 📚 Recursos

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Next.js ESLint](https://nextjs.org/docs/basic-features/eslint)
- [Prettier](https://prettier.io/)

---

## 🚨 Notas Importantes

1. **Modo Strict**: La configuración usa TypeScript en modo `strict`. Esto puede generar muchos errores inicialmente, pero previene bugs en producción.

2. **Auto-fix**: ESLint puede corregir automáticamente muchos errores, pero algunos requieren intervención manual.

3. **Gradual Adoption**: Si tienes muchos errores, puedes:

   - Cambiar reglas de `error` a `warn` temporalmente
   - Usar `// eslint-disable-next-line` para casos específicos
   - Ir corrigiendo archivos gradualmente

4. **Performance**: El linting puede ser lento en proyectos grandes. Considera usar `--cache` en CI/CD.

---

**¡Listo!** 🎉 Ahora tu proyecto tiene una configuración robusta de ESLint que te ayudará a mantener un código limpio y libre de errores.
