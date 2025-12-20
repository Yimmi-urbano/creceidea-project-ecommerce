# 🔧 Guía de Corrección - Errores Restantes

**Total de errores**: 223  
**Objetivo**: Reducir a menos de 100

---

## 📋 Plan de Acción por Prioridad

### 🔴 **PRIORIDAD ALTA** (Corregir primero)

#### 1. Variables No Usadas (~80 errores)
**Impacto**: Bajo | **Esfuerzo**: Bajo | **Tiempo**: 2-3 horas

**Cómo corregir**:
```typescript
// ❌ Antes
const unusedVar = 'hello';
const router = useRouter();

// ✅ Después (si no se usa)
const _unusedVar = 'hello'; // Prefijo _ indica "no usado intencionalmente"
// Eliminar: const router = useRouter();

// ✅ O mejor: eliminar completamente
```

**Script para encontrarlos**:
```bash
npm run lint:check 2>&1 | grep "is defined but never used"
```

---

#### 2. Unsafe Arguments (~60 errores)
**Impacto**: Alto | **Esfuerzo**: Medio | **Tiempo**: 4-5 horas

**Cómo corregir**:
```typescript
// ❌ Antes
function processData(data: any) {
  return someFunction(data.value); // unsafe argument
}

// ✅ Después
interface DataType {
  value: string;
}

function processData(data: DataType): ReturnType {
  return someFunction(data.value);
}
```

**Archivos principales**:
- `app/dashboard/orders/page.tsx`
- `app/login/page.tsx`
- `src/presentation/components/client/Orders.tsx`

---

### 🟡 **PRIORIDAD MEDIA**

#### 3. Async sin Await (~30 errores)
**Impacto**: Bajo | **Esfuerzo**: Bajo | **Tiempo**: 1-2 horas

**Cómo corregir**:
```typescript
// ❌ Antes
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // No hay await aquí
  doSomething();
};

// ✅ Opción 1: Eliminar async
const handleSubmit = (e: React.FormEvent): void => {
  e.preventDefault();
  doSomething();
};

// ✅ Opción 2: Agregar await
const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();
  await doSomething();
};
```

---

#### 4. Accesibilidad (a11y) (~20 errores)
**Impacto**: Alto (UX) | **Esfuerzo**: Medio | **Tiempo**: 2-3 horas

**Errores comunes**:

**a) Click events sin keyboard listeners**:
```typescript
// ❌ Antes
<div onClick={handleClick}>Click me</div>

// ✅ Después
<div 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabIndex={0}
>
  Click me
</div>

// ✅ Mejor: usar button
<button onClick={handleClick}>Click me</button>
```

**b) Elementos no interactivos**:
```typescript
// ❌ Antes
<div onClick={handleClick} className="clickable">

// ✅ Después
<button onClick={handleClick} className="clickable">
```

---

### 🟢 **PRIORIDAD BAJA**

#### 5. Strict Boolean Expressions (~15 errores)
**Impacto**: Bajo | **Esfuerzo**: Bajo | **Tiempo**: 1 hora

**Cómo corregir**:
```typescript
// ❌ Antes
if (item.description) {
  // ...
}

// ✅ Después
if (item.description !== null && item.description !== undefined && item.description.trim() !== '') {
  // ...
}

// ✅ O usar optional chaining
if (item.description?.trim()) {
  // ...
}
```

---

#### 6. Otros Errores Menores (~18 errores)

**a) @ts-ignore → @ts-expect-error**:
```typescript
// ❌ Antes
// @ts-ignore
const value = someComplexType;

// ✅ Después
// @ts-expect-error - Tipo complejo que será corregido en #123
const value = someComplexType;
```

**b) Redundant type constituents**:
```typescript
// ❌ Antes
type MyType = string | number | any;

// ✅ Después
type MyType = string | number | unknown;
// O mejor: definir el tipo exacto
type MyType = string | number | CustomType;
```

---

## 🎯 Estrategia de Corrección

### Semana 1: Variables no usadas (80 → 0)
```bash
# Día 1-2: Hooks y servicios
find src/presentation/hooks -name "*.ts" -o -name "*.tsx"

# Día 3-4: Componentes
find src/presentation/components -name "*.tsx"

# Día 5: App y páginas
find app -name "*.tsx"
```

### Semana 2: Unsafe arguments (60 → 30)
```bash
# Priorizar archivos con más errores
npm run lint:check 2>&1 | grep "no-unsafe-argument" | cut -d: -f1 | sort | uniq -c | sort -rn
```

### Semana 3: Async sin await + A11y (50 → 20)
```bash
# Async sin await
npm run lint:check 2>&1 | grep "require-await"

# A11y
npm run lint:check 2>&1 | grep "jsx-a11y"
```

### Semana 4: Limpieza final (20 → <10)
```bash
# Todos los errores restantes
npm run lint:check 2>&1 | grep "error"
```

---

## 📊 Tracking de Progreso

### Template para commits:
```bash
git commit -m "fix(eslint): remove unused variables in hooks [10/80]"
git commit -m "fix(eslint): add types to unsafe arguments in Orders [5/60]"
git commit -m "fix(eslint): add keyboard listeners for a11y [3/20]"
```

### Checklist semanal:
```markdown
## Semana 1
- [ ] Hooks: 0/25 archivos
- [ ] Componentes: 0/35 archivos
- [ ] Páginas: 0/20 archivos

## Semana 2
- [ ] Orders: 0/15 errores
- [ ] Products: 0/20 errores
- [ ] Dashboard: 0/25 errores

## Semana 3
- [ ] Async fixes: 0/30
- [ ] A11y fixes: 0/20

## Semana 4
- [ ] Cleanup: 0/20
```

---

## 🛠️ Herramientas Útiles

### 1. Encontrar archivos con más errores:
```bash
npm run lint:check 2>&1 | grep "error" | cut -d: -f1 | sort | uniq -c | sort -rn | head -20
```

### 2. Ver errores de un archivo específico:
```bash
npm run lint:check 2>&1 | grep "path/to/file.tsx"
```

### 3. Contar errores por tipo:
```bash
npm run lint:check 2>&1 | grep -o "@typescript-eslint/[a-z-]*" | sort | uniq -c | sort -rn
```

### 4. Auto-fix lo que se pueda:
```bash
npm run lint:fix
```

---

## 💡 Tips y Mejores Prácticas

### ✅ **DO's**
1. **Corregir por archivo completo**: No dejes archivos a medias
2. **Hacer commits pequeños**: Un tipo de error a la vez
3. **Probar después de corregir**: Asegúrate de que funciona
4. **Documentar decisiones**: Usa comentarios para casos especiales
5. **Revisar warnings**: Algunos pueden convertirse en errores

### ❌ **DON'Ts**
1. **No uses `@ts-ignore`**: Usa `@ts-expect-error` con explicación
2. **No ignores a11y**: Es importante para usuarios
3. **No dejes `any`**: Define tipos específicos
4. **No uses `--no-verify`**: Los hooks están para ayudar
5. **No corrijas todo de golpe**: Hazlo gradualmente

---

## 🎓 Recursos de Aprendizaje

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

### ESLint
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [TypeScript ESLint](https://typescript-eslint.io/rules/)

### Accesibilidad
- [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [WebAIM](https://webaim.org/)

---

## 📈 Métricas de Éxito

### Objetivo Mensual:
- **Mes 1**: 223 → 150 errores (73 correcciones)
- **Mes 2**: 150 → 100 errores (50 correcciones)
- **Mes 3**: 100 → <50 errores (50+ correcciones)

### KPIs:
- ✅ Errores corregidos por semana: >15
- ✅ Nuevos errores introducidos: <5
- ✅ Cobertura de tipos: >80%
- ✅ A11y score: >90%

---

## 🚀 Siguiente Paso Inmediato

**Acción**: Corregir variables no usadas en hooks

```bash
# 1. Ver archivos con errores
npm run lint:check 2>&1 | grep "hooks" | grep "never used"

# 2. Abrir primer archivo
# 3. Renombrar o eliminar variables
# 4. Guardar (auto-fix se ejecuta)
# 5. Commit
git add .
git commit -m "fix(eslint): remove unused variables in useCategories"

# 6. Repetir con siguiente archivo
```

---

**¡Éxito en la corrección!** 🎉
