# Performance Optimization Guide

## ✅ Optimizaciones Implementadas

### 1. **Next.js Configuration** (`next.config.js`)

#### Cache Optimization
- ✅ Aumentado `cacheMaxMemorySize` de 100MB a 512MB
- ✅ Habilitado `reactStrictMode` para detectar problemas de rendimiento
- ✅ Configurado `compress: true` para compresión gzip/brotli

#### Image Optimization
- ✅ Formatos modernos: AVIF y WebP
- ✅ Múltiples tamaños de dispositivo para responsive images
- ✅ Cache TTL de 60 segundos
- ✅ Soporte para SVG con seguridad

#### Bundle Optimization
- ✅ **SWC Minification**: Más rápido que Terser
- ✅ **Modularize Imports**: Importaciones tree-shakeable de lucide-react
- ✅ **Code Splitting**: Chunks separados para vendor, common, nextui, y lucide
- ✅ **Remove Console**: Elimina console.log en producción (excepto error/warn)

#### Experimental Features
- ✅ `optimizePackageImports`: Optimiza @nextui-org/react, lucide-react, recharts
- ✅ `scrollRestoration`: Restaura posición de scroll en navegación

#### HTTP Headers
- ✅ Cache de imágenes: 1 año (immutable)
- ✅ Cache de assets estáticos: 1 año (immutable)

### 2. **Eliminación de Page Reloads**

#### Problema Anterior
```tsx
// ❌ ANTES: Recarga completa de página
window.location.reload();
```

#### Solución Implementada
```tsx
// ✅ AHORA: Re-render eficiente con key prop
const [refreshKey, setRefreshKey] = useState(0);

const closeModal = () => {
  setIsModalOpen(false);
  setRefreshKey(prev => prev + 1); // Trigger re-render
};

<BannerList key={refreshKey} ... />
```

**Beneficios:**
- No recarga toda la página
- Mantiene el estado de la aplicación
- Más rápido (solo re-renderiza el componente necesario)
- Mejor experiencia de usuario

---

## 📋 Recomendaciones Adicionales

### 3. **Lazy Loading de Componentes**

Implementar lazy loading para componentes pesados:

```tsx
import dynamic from 'next/dynamic';

// Lazy load de componentes pesados
const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor'),
  { 
    loading: () => <Skeleton className="h-64" />,
    ssr: false // Si no necesita SSR
  }
);

const Charts = dynamic(
  () => import('@/components/Charts'),
  { loading: () => <ChartSkeleton /> }
);
```

**Aplicar en:**
- `react-quill` (editor de texto)
- `recharts` (gráficos)
- Modales grandes
- Componentes de configuración complejos

### 4. **Optimización de Imágenes**

Usar el componente `next/image` en lugar de `<img>`:

```tsx
// ❌ ANTES
<img src={banner.image} alt="Banner" />

// ✅ MEJOR
import Image from 'next/image';

<Image 
  src={banner.image} 
  alt="Banner"
  width={1920}
  height={600}
  priority={index < 2} // Priorizar primeras 2 imágenes
  placeholder="blur"
  blurDataURL="data:image/..." // Placeholder mientras carga
/>
```

### 5. **Memoization de Componentes**

Usar `React.memo` para componentes que no cambian frecuentemente:

```tsx
import { memo } from 'react';

const BannerCard = memo(({ banner, onEdit, onDelete }) => {
  // Component code
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.banner._id === nextProps.banner._id;
});
```

**Aplicar en:**
- Cards de productos
- Items de lista
- Componentes de configuración

### 6. **useCallback y useMemo**

Optimizar funciones y cálculos costosos:

```tsx
import { useCallback, useMemo } from 'react';

// Memoizar funciones
const handleDelete = useCallback((id: string) => {
  deleteBanner(id);
}, []);

// Memoizar cálculos
const sortedBanners = useMemo(() => {
  return banners.sort((a, b) => a.order - b.order);
}, [banners]);
```

### 7. **Debounce en Búsquedas**

Implementar debounce para inputs de búsqueda:

```tsx
import { useMemo } from 'react';
import { debounce } from 'lodash';

const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    // Perform search
  }, 300),
  []
);
```

### 8. **Virtual Scrolling**

Para listas largas (productos, órdenes), usar virtualización:

```bash
npm install react-window
```

```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={products.length}
  itemSize={120}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <ProductCard product={products[index]} />
    </div>
  )}
</FixedSizeList>
```

### 9. **Prefetching de Rutas**

Usar prefetch en links importantes:

```tsx
import Link from 'next/link';

<Link href="/dashboard/products" prefetch>
  Productos
</Link>
```

### 10. **API Route Optimization**

Implementar caching en API routes:

```tsx
export async function GET(request: Request) {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  });
}
```

---

## 🔍 Monitoreo de Rendimiento

### Herramientas Recomendadas

1. **Next.js Analytics**
```bash
npm install @vercel/analytics
```

2. **Lighthouse CI**
```bash
npm install -D @lhci/cli
```

3. **Bundle Analyzer**
```bash
npm install -D @next/bundle-analyzer
```

```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

Ejecutar: `ANALYZE=true npm run build`

### Métricas a Monitorear

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms
- **Bundle Size**: Mantener < 200KB initial load

---

## 📊 Resultados Esperados

### Antes de Optimizaciones
- ❌ Page reloads completos
- ❌ Bundle size grande
- ❌ Imágenes sin optimizar
- ❌ Sin code splitting efectivo
- ❌ Cache limitado (100MB)

### Después de Optimizaciones
- ✅ Re-renders eficientes con key prop
- ✅ Bundle optimizado con chunks separados
- ✅ Imágenes en AVIF/WebP
- ✅ Code splitting por vendor/common/nextui/lucide
- ✅ Cache aumentado (512MB)
- ✅ Compresión habilitada
- ✅ Tree-shaking de lucide-react
- ✅ Console.log removidos en producción

### Mejoras Estimadas
- **Tiempo de carga inicial**: -30% a -40%
- **Navegación entre páginas**: -50% a -60%
- **Bundle size**: -20% a -30%
- **Tiempo de build**: -15% a -25% (SWC)

---

## 🚀 Próximos Pasos

1. **Implementar lazy loading** en componentes pesados
2. **Migrar `<img>` a `<Image>`** de Next.js
3. **Agregar memoization** en componentes de lista
4. **Implementar virtual scrolling** para listas largas
5. **Configurar Bundle Analyzer** para monitorear tamaño
6. **Agregar prefetching** en rutas críticas
7. **Implementar debounce** en búsquedas
8. **Configurar Lighthouse CI** para CI/CD

---

## 📝 Notas

- Todas las optimizaciones son **backward compatible**
- No se requieren cambios en el código existente (excepto eliminar `window.location.reload()`)
- Las optimizaciones son **progresivas** - se pueden aplicar gradualmente
- El impacto será más notable en **producción** que en desarrollo

---

**Última actualización**: 2025-12-12
**Versión**: 1.0.0
