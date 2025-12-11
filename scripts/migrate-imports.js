#!/usr/bin/env node

/**
 * Import Migration Script - UPDATED
 * 
 * Automatically updates imports from old structure to new src/ structure.
 * 
 * Usage:
 *   node scripts/migrate-imports.js
 * 
 * What it does:
 * 1. Finds all .ts, .tsx, .js, .jsx files
 * 2. Replaces old import paths with new ones
 * 3. Creates backup before modifying
 * 4. Logs all changes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import mapping: old path -> new path
const IMPORT_MAPPINGS = {
    // Hooks - Services
    "@/hooks/fetchProducts": "@/src/application/products/productServices",
    "@/hooks/ConfigContext": "@/src/presentation/contexts",
    "@/hooks/contextProduct": "@/src/presentation/contexts",
    "@/hooks/bannerService": "@/src/presentation/hooks",
    "@/hooks/colorService": "@/src/application/configuration/configurationServices",
    "@/hooks/logoService": "@/src/infrastructure/repositories/uploadRepository",
    "@/hooks/serviceUpdateSeo": "@/src/application/configuration/configurationServices",
    "@/hooks/socialsLinksService": "@/src/application/configuration/configurationServices",
    "@/hooks/fetchOrders": "@/src/application/orders/orderServices",
    "@/hooks/formHandlers": "@/src/presentation/forms/productFormHandlers",
    "@/hooks/socialLinksReducer": "@/src/presentation/reducers/socialLinksReducer",

    // Hooks - Utility hooks (NEW)
    "@/hooks/useResizableSidebar": "@/src/presentation/hooks/ui/useResizableSidebar",
    "@/hooks/useIsMobile": "@/src/presentation/hooks/ui/useIsMobile",
    "@/hooks/useIsOrders": "@/src/presentation/hooks/orders/useIsOrders",
    "@/hooks/useOrderDetails": "@/src/presentation/hooks/orders/useOrderDetails",
    "@/hooks/useThemes": "@/src/presentation/hooks/configuration/useThemes",
    "@/hooks/useUpdateCatalog": "@/src/presentation/hooks/configuration/useUpdateCatalog",
    "@/hooks/useWhatsappHome": "@/src/presentation/hooks/configuration/useWhatsappHome",

    // Domain (root level)
    "@/domain/payments_methods": "@/src/domain/payments_methods",
    "@/domain/installed_modules": "@/src/domain/installed_modules",
    "@/domain/upload": "@/src/domain/upload",

    // Application (root level)
    "@/application/payments_methods": "@/src/application/payments_methods",
    "@/application/installed_modules": "@/src/application/installed_modules",
    "@/application/upload": "@/src/application/upload",

    // Infrastructure (root level)
    "@/infrastructure/payments_methods": "@/src/infrastructure/repositories/payments_methods",
    "@/infrastructure/installed_modules": "@/src/infrastructure/repositories/installed_modules",
    "@/infrastructure/upload": "@/src/infrastructure/repositories/upload",

    // Types
    "@/types": "@/src/domain",
};

// Directories to search
const SEARCH_DIRS = [
    'app',
    'components',
    'config',
    'src/components', // Also check new components
];

// File extensions to process
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

let filesModified = 0;
let importsReplaced = 0;

/**
 * Get all files recursively
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            // Skip node_modules and .next
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
            }
        } else {
            const ext = path.extname(file);
            if (FILE_EXTENSIONS.includes(ext)) {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
}

/**
 * Replace imports in a file
 */
function replaceImportsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let replacements = [];

    // Check each mapping
    for (const [oldPath, newPath] of Object.entries(IMPORT_MAPPINGS)) {
        // Match import statements
        const importRegex = new RegExp(
            `(import\\s+.*?from\\s+['"])${oldPath.replace(/\//g, '\\/')}(['"])`,
            'g'
        );

        if (importRegex.test(content)) {
            content = content.replace(importRegex, `$1${newPath}$2`);
            modified = true;
            replacements.push(`${oldPath} → ${newPath}`);
            importsReplaced++;
        }
    }

    if (modified) {
        // Create backup
        const backupPath = `${filePath}.backup`;
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(filePath, backupPath);
        }

        // Write modified content
        fs.writeFileSync(filePath, content, 'utf8');
        filesModified++;

        console.log(`✅ Modified: ${filePath}`);
        replacements.forEach(r => console.log(`   ${r}`));

        return true;
    }

    return false;
}

/**
 * Main migration function
 */
function migrateImports() {
    console.log('🚀 Starting import migration (UPDATED)...\n');

    // Get all files
    let allFiles = [];
    SEARCH_DIRS.forEach(dir => {
        if (fs.existsSync(dir)) {
            allFiles = allFiles.concat(getAllFiles(dir));
        }
    });

    console.log(`📁 Found ${allFiles.length} files to process\n`);

    // Process each file
    allFiles.forEach(file => {
        replaceImportsInFile(file);
    });

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Migration complete!`);
    console.log(`   Files modified: ${filesModified}`);
    console.log(`   Imports replaced: ${importsReplaced}`);
    console.log('='.repeat(50));

    if (filesModified > 0) {
        console.log('\n💡 Backup files created with .backup extension');
        console.log('   Review changes and delete backups when satisfied');
        console.log('\n🔍 Next steps:');
        console.log('   1. Test your application');
        console.log('   2. Run: npm run build');
        console.log('   3. If everything works, delete .backup files');
    } else {
        console.log('\n✨ No imports needed to be updated!');
    }
}

// Run migration
try {
    migrateImports();
} catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
}
