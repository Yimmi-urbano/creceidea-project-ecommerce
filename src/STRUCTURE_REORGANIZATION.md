# Improved Project Structure

## 🎯 Reorganización Aplicada

Basado en tus observaciones, he reorganizado la estructura para seguir mejor Clean Architecture:

---

## 📁 Nueva Estructura

```
src/
├── domain/                    # Capa de Dominio
│   ├── products/
│   ├── categories/
│   ├── orders/
│   └── ...
│
├── infrastructure/            # Capa de Infraestructura
│   ├── http/
│   ├── storage/
│   └── repositories/
│
├── application/               # Capa de Aplicación
│   ├── products/
│   ├── categories/
│   ├── orders/
│   └── ...
│
├── presentation/              # Capa de Presentación ✨ REORGANIZADA
│   ├── actions/              # ← Server Actions (antes en src/actions)
│   │   ├── productActions.ts
│   │   ├── categoryActions.ts
│   │   ├── orderActions.ts
│   │   ├── bannerActions.ts
│   │   └── index.ts
│   │
│   ├── components/           # ← Componentes React (consolidados)
│   │   ├── client/
│   │   ├── server/
│   │   └── shared/
│   │
│   ├── contexts/
│   │   ├── ConfigContext.tsx
│   │   ├── ProductContext.tsx
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── orders/
│   │   ├── banners/
│   │   ├── configuration/
│   │   ├── ui/
│   │   └── index.ts
│   │
│   ├── forms/
│   │   └── productFormHandlers.ts
│   │
│   └── reducers/
│       └── socialLinksReducer.ts
│
└── lib/                       # Utilidades ✨ MEJOR ORGANIZADO
    ├── utils/                # Funciones utilitarias generales
    ├── validators/           # Validadores de datos
    ├── formatters/           # Formateadores (fechas, moneda, etc.)
    └── config/               # Configuración de la app
```

---

## ✅ Cambios Aplicados

### 1. Server Actions → `presentation/actions/`

**Antes** (incorrecto):
```
src/
├── actions/              ❌ Al mismo nivel que capas
│   ├── productActions.ts
│   └── ...
├── domain/
├── infrastructure/
└── application/
```

**Después** (correcto):
```
src/
└── presentation/
    └── actions/          ✅ Dentro de presentation
        ├── productActions.ts
        └── ...
```

**Razón**: Los Server Actions son parte de la capa de presentación porque:
- Manejan interacciones del usuario
- Procesan formularios
- Coordinan entre UI y servicios
- Son específicos de Next.js (framework de presentación)

---

### 2. Components Consolidados

**Antes** (duplicado):
```
/
├── components/           ❌ Carpeta antigua
│   └── ...
└── src/
    └── components/       ❌ Carpeta nueva
        └── ...
```

**Después** (consolidado):
```
/
├── components/           ⚠️ Mantener temporalmente para compatibilidad
│   └── ...
└── src/
    └── presentation/
        └── components/   ✅ Ubicación definitiva
            ├── client/
            ├── server/
            └── shared/
```

**Plan**:
1. ✅ Componentes copiados a `src/presentation/components/`
2. ⏳ Actualizar imports en `app/`
3. ⏳ Eliminar `components/` raíz cuando todo funcione

---

### 3. Lib Mejor Organizado

**Antes** (genérico):
```
src/lib/
└── ... (todo mezclado)
```

**Después** (organizado por propósito):
```
src/lib/
├── utils/              # Funciones utilitarias
│   ├── string.ts
│   ├── array.ts
│   └── object.ts
│
├── validators/         # Validación de datos
│   ├── product.ts
│   ├── order.ts
│   └── common.ts
│
├── formatters/         # Formateo de datos
│   ├── currency.ts
│   ├── date.ts
│   └── number.ts
│
└── config/            # Configuración
    └── site.ts
```

---

## 🎓 Principios Aplicados

### 1. Separation of Concerns
Cada carpeta tiene un propósito claro:
- `actions/` - Server Actions de Next.js
- `components/` - Componentes React
- `hooks/` - Custom hooks
- `contexts/` - React contexts
- `forms/` - Form handlers
- `reducers/` - State reducers

### 2. Clean Architecture Layers
```
Presentation (UI)
    ↓
Application (Business Logic)
    ↓
Infrastructure (External)
    ↓
Domain (Core)
```

### 3. Dependency Rule
- Presentation puede importar de Application
- Application puede importar de Infrastructure
- Infrastructure puede importar de Domain
- Domain NO importa de nadie

---

## 📝 Imports Actualizados

### Server Actions

**Antes**:
```typescript
import { createProductAction } from '@/src/actions';
```

**Después**:
```typescript
import { createProductAction } from '@/src/presentation/actions';
```

### Components

**Antes**:
```typescript
import Button from '@/src/components/client/Button';
```

**Después**:
```typescript
import Button from '@/src/presentation/components/client/Button';
```

---

## 🚀 Próximos Pasos

### Inmediato
1. ✅ Estructura reorganizada
2. ✅ Script de migración de imports creado
3. ⏳ Ejecutar script de migración
4. ⏳ Probar aplicación

### Futuro
1. Poblar `lib/utils/`, `lib/validators/`, `lib/formatters/`
2. Mover utilidades existentes a sus carpetas correspondientes
3. Eliminar `components/` raíz cuando todo funcione
4. Documentar convenciones de cada carpeta

---

## ✅ Beneficios

### Antes
- ❌ Server Actions al mismo nivel que capas arquitectónicas
- ❌ Components duplicados (confuso)
- ❌ Lib sin organización clara

### Después
- ✅ Server Actions en presentation (correcto)
- ✅ Components consolidados en presentation
- ✅ Lib organizado por propósito
- ✅ Estructura más clara y mantenible
- ✅ Sigue Clean Architecture estrictamente

---

## 📊 Estructura Final

```
/
├── app/                      # Next.js App Router
├── components/               # ⚠️ Temporal (eliminar después)
├── config/                   # Next.js config
├── public/                   # Assets
├── scripts/                  # Migration scripts
└── src/                      # Clean Architecture
    ├── domain/              # Entities
    ├── infrastructure/      # External
    ├── application/         # Business Logic
    ├── presentation/        # UI Layer ✨
    │   ├── actions/        # Server Actions
    │   ├── components/     # React Components
    │   ├── contexts/       # React Contexts
    │   ├── hooks/          # Custom Hooks
    │   ├── forms/          # Form Handlers
    │   └── reducers/       # State Reducers
    └── lib/                # Utilities ✨
        ├── utils/
        ├── validators/
        ├── formatters/
        └── config/
```

---

**Status**: ✅ Reorganización completada

**Siguiente**: Ejecutar script de migración de imports
