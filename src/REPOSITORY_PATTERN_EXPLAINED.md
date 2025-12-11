# Diferencia entre Repositorios Client y Server

## 🎯 Resumen Rápido

**Hay 2 repositorios para cada módulo:**
- `orderRepository.ts` - Para **Client Components** (navegador)
- `orderRepository.server.ts` - Para **Server Components** y **Server Actions**

---

## 📊 Comparación

| Aspecto | Client Repository | Server Repository |
|---------|------------------|-------------------|
| **Archivo** | `orderRepository.ts` | `orderRepository.server.ts` |
| **Usado en** | Client Components | Server Components + Server Actions |
| **HTTP Client** | Axios (`apiClient`) | Fetch (`serverApiClient`) |
| **Directiva** | Ninguna | `'use server'` |
| **Caché** | No (manejado por React Query/SWR) | Sí (Next.js cache) |
| **Cookies** | Automático (navegador) | Manual (next/headers) |
| **Ejecución** | Navegador | Servidor Node.js |

---

## 🔍 ¿Por qué 2 repositorios?

### 1. **Entornos Diferentes**

**Client Repository** (`orderRepository.ts`):
```typescript
// Se ejecuta en el NAVEGADOR
import apiClient from '@/src/infrastructure/http/apiClient'; // Axios

export const fetchOrders = async (): Promise<Order[]> => {
    const response = await apiClient.get(API_ENDPOINTS.ORDERS);
    return response.data;
};
```

**Server Repository** (`orderRepository.server.ts`):
```typescript
// Se ejecuta en el SERVIDOR
'use server'
import { serverGet } from '@/src/infrastructure/http/serverApiClient'; // Fetch

export async function fetchOrders(revalidate: number = 30): Promise<Order[]> {
    return serverGet<Order[]>(API_ENDPOINTS.ORDERS, {
        revalidate,  // ← Cache de Next.js
        tags: ['orders'],
    });
}
```

---

### 2. **Optimizaciones de Next.js 14**

**Server Repository** tiene ventajas:
- ✅ **Cache automático** con `revalidate`
- ✅ **Tags** para invalidación selectiva
- ✅ **Menos JavaScript** al cliente
- ✅ **Mejor SEO** (datos pre-renderizados)
- ✅ **Más seguro** (API keys en servidor)

---

## 📝 Cuándo usar cada uno

### Usa `orderRepository.ts` (Client)

```typescript
// En Client Components
'use client'
import { fetchOrders } from '@/src/infrastructure/repositories/orderRepository';

function OrderList() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);
  
  return <div>{/* render */}</div>;
}
```

**Casos de uso**:
- Componentes con interactividad (onClick, onChange)
- Hooks de React (useState, useEffect)
- Actualizaciones en tiempo real
- Formularios con validación client-side

---

### Usa `orderRepository.server.ts` (Server)

```typescript
// En Server Components
import { fetchOrders } from '@/src/infrastructure/repositories/orderRepository.server';

async function OrderList() {
  const orders = await fetchOrders(300); // Cache 5 min
  
  return <div>{/* render */}</div>;
}
```

**Casos de uso**:
- Páginas estáticas o semi-estáticas
- Datos que no cambian frecuentemente
- SEO importante
- Reducir JavaScript del cliente

---

## 🔧 Problema que encontraste

### Endpoint incorrecto

**Antes** (incorrecto):
```typescript
ORDERS: 'https://api-orders.creceidea.pe/api/orders'
```

**Después** (correcto):
```typescript
ORDERS: 'https://api-orders.creceidea.pe/api/orders/list'
ORDER_BY_ID: 'https://api-orders.creceidea.pe/api/orders/id'
```

### ¿Por qué falló?

1. El endpoint `/api/orders` no existe en la API
2. La API espera `/api/orders/list` para listar
3. La API espera `/api/orders/id/{orderId}` para detalles

---

## ✅ Solución Aplicada

### 1. Actualizado `apiConfig.ts`
```typescript
ORDERS: 'https://api-orders.creceidea.pe/api/orders/list',
ORDER_BY_ID: 'https://api-orders.creceidea.pe/api/orders/id',
```

### 2. Actualizado `orderRepository.ts`
```typescript
export const fetchOrderById = async (orderId: string) => {
    const response = await apiClient.get(`${API_ENDPOINTS.ORDER_BY_ID}/${orderId}`);
    return response.data;
};
```

### 3. Actualizado `orderRepository.server.ts`
```typescript
export async function fetchOrderById(orderId: string, revalidate = 30) {
    return serverGet(`${API_ENDPOINTS.ORDER_BY_ID}/${orderId}`, {
        revalidate,
        tags: ['orders', `order-${orderId}`],
    });
}
```

---

## 🎓 Patrón Establecido

Para **TODOS** los módulos tenemos esta estructura:

```
src/infrastructure/repositories/
├── productRepository.ts          # Client
├── productRepository.server.ts   # Server
├── categoryRepository.ts         # Client
├── categoryRepository.server.ts  # Server
├── orderRepository.ts            # Client
├── orderRepository.server.ts     # Server
└── ...
```

**Beneficios**:
- Código optimizado para cada entorno
- Mejor performance
- Mejor SEO
- Más seguro
- Aprovecha Next.js 14 al máximo

---

## 🚀 Ahora debería funcionar

Prueba de nuevo:
```bash
# La ruta /dashboard/orders ahora debería cargar datos
```

El endpoint correcto (`/api/orders/list`) ya está configurado en ambos repositorios.
