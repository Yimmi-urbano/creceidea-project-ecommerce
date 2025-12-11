# Week 8 Final Cleanup - Implementation Guide

## 🎯 Overview

Week 8 completes the refactoring by cleaning up old folders and reorganizing components. Three automated scripts make this process safe and reversible.

---

## 📋 Step-by-Step Process

### Step 1: Migrate Imports (Script #1)

**Purpose**: Update all import statements to use new `src/` structure

**Command**:
```bash
node scripts/migrate-imports.js
```

**What it does**:
- ✅ Scans all `.ts`, `.tsx`, `.js`, `.jsx` files
- ✅ Replaces old imports with new ones
- ✅ Creates `.backup` files before modifying
- ✅ Logs all changes

**Example transformations**:
```typescript
// Before
import { getProducts } from '@/hooks/fetchProducts';
import { useConfig } from '@/hooks/ConfigContext';

// After
import { getProducts } from '@/src/application/products/productServices';
import { useConfig } from '@/src/presentation/contexts';
```

**After running**:
1. Review console output
2. Test your application: `npm run dev`
3. Run build: `npm run build`
4. If everything works, delete `.backup` files:
   ```bash
   find . -name "*.backup" -delete
   ```

---

### Step 2: Delete Old Folders (Script #2)

**Purpose**: Remove old folder structure after successful migration

**Command**:
```bash
node scripts/cleanup-old-folders.js
```

**What it does**:
- ✅ Verifies new `src/` structure exists
- ✅ Creates timestamped backup folder
- ✅ Waits 5 seconds (chance to cancel)
- ✅ Deletes old folders:
  - `hooks/`
  - `domain/` (root)
  - `application/` (root)
  - `infrastructure/` (root)
  - `types/`

**Safety features**:
- Creates backup before deletion
- Verifies new structure exists
- 5-second countdown to cancel
- Can restore from backup if needed

**After running**:
1. Test application thoroughly
2. Run: `npm run build`
3. If everything works, delete backup:
   ```bash
   rm -rf backup-*
   ```

---

### Step 3: Reorganize Components (Script #3)

**Purpose**: Organize components into server/client/shared structure

**Command**:
```bash
node scripts/reorganize-components.js
```

**What it does**:
- ✅ Analyzes each component
- ✅ Detects `'use client'` directive
- ✅ Detects hooks and client features
- ✅ Creates `src/components/` structure:
  ```
  src/components/
  ├── server/      # Server Components
  ├── client/      # Client Components
  └── shared/      # Shared components
  ```
- ✅ Copies components to appropriate folders
- ✅ Shows distribution statistics

**Classification logic**:
- **Client**: Has `'use client'` OR uses hooks/state
- **Server**: Async functions, no client features
- **Shared**: Pure components, no hooks

**After running**:
1. Review `src/components/` structure
2. Add `'use client'` to client components if missing
3. Update imports in `app/` pages
4. Test application
5. Delete old `components/` folder when ready

---

## 🚀 Complete Migration Process

### Full Workflow

```bash
# 1. Migrate imports
node scripts/migrate-imports.js
npm run dev  # Test
npm run build  # Verify

# 2. Delete old folders
node scripts/cleanup-old-folders.js
npm run dev  # Test
npm run build  # Verify

# 3. Reorganize components
node scripts/reorganize-components.js
# Update imports in app/
npm run dev  # Test
npm run build  # Verify

# 4. Final cleanup
find . -name "*.backup" -delete
rm -rf backup-*
rm -rf components/  # After verifying new structure works
```

---

## ⚠️ Important Notes

### Before Running Scripts

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Before migration scripts"
   ```

2. **Create a branch**:
   ```bash
   git checkout -b refactor/cleanup-week8
   ```

3. **Ensure dependencies are installed**:
   ```bash
   npm install
   ```

### Safety Measures

- ✅ All scripts create backups
- ✅ Scripts verify before deleting
- ✅ Can restore from backups
- ✅ Non-destructive (copies, not moves)

### Rollback Plan

If something goes wrong:

```bash
# Restore from .backup files
find . -name "*.backup" -exec sh -c 'mv "$1" "${1%.backup}"' _ {} \;

# Restore from backup folder
cp -r backup-TIMESTAMP/* .

# Or use git
git checkout .
git clean -fd
```

---

## 📊 Expected Results

### Before Migration
```
/
├── hooks/              ❌ Old
├── domain/             ❌ Old
├── application/        ❌ Old
├── infrastructure/     ❌ Old
├── types/              ❌ Old
├── components/         ⚠️  Unorganized
├── app/
├── config/
└── src/                ✅ New (but not used)
```

### After Migration
```
/
├── app/                ✅ Next.js
├── config/             ✅ Next.js
├── public/             ✅ Assets
└── src/                ✅ Clean Architecture
    ├── components/
    │   ├── server/
    │   ├── client/
    │   └── shared/
    ├── domain/
    ├── infrastructure/
    ├── application/
    ├── presentation/
    └── actions/
```

---

## 🎓 Script Details

### migrate-imports.js

**Mappings**:
- `@/hooks/*` → `@/src/presentation/*` or `@/src/application/*`
- `@/domain/*` → `@/src/domain/*`
- `@/application/*` → `@/src/application/*`
- `@/infrastructure/*` → `@/src/infrastructure/repositories/*`
- `@/types` → `@/src/domain`

**Files processed**: `app/`, `components/`, `config/`

**Backup**: Creates `.backup` files

---

### cleanup-old-folders.js

**Verifies**:
- `src/domain` exists
- `src/application` exists
- `src/infrastructure` exists
- `src/presentation` exists
- `src/actions` exists

**Deletes**:
- `hooks/`
- `domain/` (root)
- `application/` (root)
- `infrastructure/` (root)
- `types/`

**Backup**: Creates `backup-TIMESTAMP/` folder

---

### reorganize-components.js

**Analyzes**:
- `'use client'` directive
- Hook usage (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Async functions

**Creates**:
- `src/components/server/`
- `src/components/client/`
- `src/components/shared/`

**Output**: Statistics on component distribution

---

## ✅ Verification Checklist

After running all scripts:

- [ ] Application runs: `npm run dev`
- [ ] Build succeeds: `npm run build`
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Forms still work
- [ ] Data fetching works
- [ ] Server Actions work
- [ ] No broken imports

---

## 🎉 Success Criteria

Migration is complete when:

1. ✅ All imports updated to `src/`
2. ✅ Old folders deleted
3. ✅ Components organized in `src/components/`
4. ✅ Application builds without errors
5. ✅ All functionality works
6. ✅ No `.backup` files remain
7. ✅ No `backup-*` folders remain

---

**Status**: Ready to execute

**Estimated time**: 30-60 minutes (including testing)

**Risk level**: Low (all scripts create backups)
