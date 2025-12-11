# Migration Guide - Clean Architecture Refactoring

## 🎯 Overview

This guide helps you migrate existing components to use the new Clean Architecture structure. The refactoring is **100% backward compatible** - all functionality is preserved.

---

## 📋 Quick Reference

### Import Changes

| Old Import | New Import |
|------------|------------|
| `@/hooks/fetchProducts` | `@/src/application/products/productServices` |
| `@/hooks/ConfigContext` | `@/src/presentation/contexts` |
| `@/hooks/contextProduct` | `@/src/presentation/contexts` |
| `@/hooks/bannerService` | `@/src/presentation/hooks` |
| Direct API calls | Use hooks or Server Actions |

---

## 🔄 Migration Patterns

### Pattern 1: Replace Direct Service Calls with Hooks

**Before:**
```typescript
import { getProducts } from '@/hooks/fetchProducts';

function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts(1).then(setProducts);
  }, []);
  
  return <div>{/* render products */}</div>;
}
```

**After:**
```typescript
import { useProducts } from '@/src/presentation/hooks';

function ProductList() {
  const { products, loading, error } = useProducts({ page: 1 });
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  
  return <div>{/* render products */}</div>;
}
```

**Benefits:**
- ✅ Built-in loading and error states
- ✅ Automatic refetch on filter changes
- ✅ Cleaner, more declarative code

---

### Pattern 2: Replace Context Imports

**Before:**
```typescript
import { useConfig } from '@/hooks/ConfigContext';
import { useProductContext } from '@/hooks/contextProduct';
```

**After:**
```typescript
import { useConfig, useProductContext } from '@/src/presentation/contexts';
```

**Benefits:**
- ✅ Cleaner imports
- ✅ Centralized exports
- ✅ Same API, no code changes needed

---

### Pattern 3: Use Server Actions in Forms

**Before:**
```typescript
import { postProduct } from '@/hooks/fetchProducts';

async function handleSubmit(data) {
  await postProduct(data);
  router.refresh();
}
```

**After (Client Component):**
```typescript
import { createProductAction } from '@/src/actions';

async function handleSubmit(data) {
  const result = await createProductAction(data);
  if (result.success) {
    toast.success('Product created!');
  }
}
```

**After (Form Action - Progressive Enhancement):**
```typescript
import { createProductAction } from '@/src/actions';

<form action={createProductAction}>
  <input name="title" required />
  <button type="submit">Create</button>
</form>
```

**Benefits:**
- ✅ Automatic revalidation
- ✅ Works without JavaScript (progressive enhancement)
- ✅ Better error handling

---

### Pattern 4: Replace Banner Service

**Before:**
```typescript
import { getBanners, createBanner } from '@/hooks/bannerService';

const banners = await getBanners();
await createBanner(file, text, action, destino, text_button);
```

**After:**
```typescript
import { useBanners } from '@/src/presentation/hooks';

const { banners, loading, createBanner } = useBanners();
await createBanner(file, text, action, destino, text_button);
```

**Benefits:**
- ✅ Automatic refresh after mutations
- ✅ Loading states included
- ✅ Error handling built-in

---

## 📂 File Organization

### Where to Put New Code

```
src/
├── domain/              # Business entities (types only)
│   ├── products/
│   ├── categories/
│   └── orders/
│
├── application/         # Business logic (services)
│   ├── products/
│   │   ├── productServices.ts
│   │   └── productServices.server.ts
│   └── ...
│
├── infrastructure/      # External concerns
│   ├── http/           # API clients
│   ├── storage/        # localStorage, cookies
│   └── repositories/   # Data access
│
├── presentation/        # UI layer
│   ├── hooks/          # React hooks
│   ├── contexts/       # React contexts
│   ├── forms/          # Form handlers
│   └── reducers/       # State reducers
│
└── actions/            # Server Actions
    ├── productActions.ts
    └── ...
```

---

## ✅ Migration Checklist

### For Each Component

- [ ] Identify old imports from `hooks/`
- [ ] Replace with new imports from `src/`
- [ ] Update service calls to use hooks
- [ ] Add `'use client'` if using hooks/state
- [ ] Test functionality
- [ ] Verify no console errors

### For Each Form

- [ ] Identify mutation logic
- [ ] Replace with Server Actions
- [ ] Update error handling
- [ ] Test form submission
- [ ] Verify revalidation works

---

## 🎓 Best Practices

### 1. Use Hooks for Data Fetching
```typescript
// ✅ Good
const { products, loading } = useProducts({ page: 1 });

// ❌ Avoid
const [products, setProducts] = useState([]);
useEffect(() => { /* fetch */ }, []);
```

### 2. Use Server Actions for Mutations
```typescript
// ✅ Good
const result = await createProductAction(data);

// ❌ Avoid
await fetch('/api/products', { method: 'POST', body: data });
```

### 3. Use Barrel Exports
```typescript
// ✅ Good
import { useProducts, useCategories } from '@/src/presentation/hooks';

// ❌ Avoid
import { useProducts } from '@/src/presentation/hooks/products/useProducts';
import { useCategories } from '@/src/presentation/hooks/categories/useCategories';
```

### 4. Separate Client and Server Code
```typescript
// Client Component
'use client'
import { useProducts } from '@/src/presentation/hooks';

// Server Component
import { getProducts } from '@/src/application/products/productServices.server';
```

---

## 🔍 Common Issues

### Issue 1: "Cannot use hooks in Server Component"
**Solution:** Add `'use client'` directive at the top of the file.

### Issue 2: "Module not found"
**Solution:** Check `tsconfig.json` has path aliases configured.

### Issue 3: "FormData type conflict"
**Solution:** Use `as any` for now, will be fixed in component updates.

---

## 📝 Example Migrations

### Example 1: Product List Component

**Before:**
```typescript
// components/ProductList.tsx
import { getProducts } from '@/hooks/fetchProducts';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getProducts(1).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return <div>{products.map(p => <ProductCard key={p._id} {...p} />)}</div>;
}
```

**After:**
```typescript
// components/ProductList.tsx
'use client'
import { useProducts } from '@/src/presentation/hooks';

export default function ProductList() {
  const { products, loading, error } = useProducts({ page: 1 });
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{products.map(p => <ProductCard key={p._id} {...p} />)}</div>;
}
```

---

### Example 2: Product Form

**Before:**
```typescript
import { postProduct } from '@/hooks/fetchProducts';

async function handleSubmit(e) {
  e.preventDefault();
  const data = { /* form data */ };
  await postProduct(data);
  alert('Product created!');
}
```

**After:**
```typescript
import { createProductAction } from '@/src/actions';

async function handleSubmit(e) {
  e.preventDefault();
  const data = { /* form data */ };
  const result = await createProductAction(data);
  
  if (result.success) {
    toast.success('Product created!');
  } else {
    toast.error(result.error);
  }
}
```

---

## 🚀 Next Steps

1. **Start with Simple Components**: Migrate components that only read data first
2. **Then Forms**: Migrate forms to use Server Actions
3. **Test Thoroughly**: Verify each migration works before moving to the next
4. **Update Incrementally**: No need to migrate everything at once

---

## 📞 Need Help?

- Check `src/WEEK*_PROGRESS.md` files for detailed documentation
- Review `implementation_plan.md` for architecture details
- Look at existing hooks in `src/presentation/hooks/` for examples

---

**Remember**: The new architecture is **100% backward compatible**. Take your time with the migration!
