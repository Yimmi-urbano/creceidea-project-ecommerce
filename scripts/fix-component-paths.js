#!/usr/bin/env node

/**
 * Fix Component Subdirectory Imports
 * 
 * Components are organized in client/server/shared subdirectories.
 * This script updates imports to include the correct subdirectory.
 * 
 * Usage:
 *   node scripts/fix-component-paths.js
 */

const fs = require('fs');
const path = require('path');

// Component location mapping
const COMPONENT_LOCATIONS = {
    // Shared components
    'headToolbar': 'shared',
    'toolbar': 'shared',
    'sidebar': 'shared',
    'navbar': 'shared',
    'icons': 'shared',
    'options': 'shared',
    'areachart': 'shared',
    'products/card': 'shared',

    // Client components
    'CategorySelect': 'client',
    'ColorPicker': 'client',
    'SocialLinksManager': 'client',
    'Themes': 'client',
    'UpdateCatalogo': 'client',
    'category/': 'client/category',
    'countViewsSite': 'client',
    'counter': 'client',
    'home/': 'client/home',
    'ordenes': 'client',
    'orderDetails/': 'client/orderDetails',
    'products/SortableImageList': 'client/products',
    'products/cardProductEdit': 'client/products',
    'products/edit-product': 'client/products',
    'products/header': 'client/products',
    'products/new-product': 'client/products',
    'products/paginator': 'client/products',
    'theme-switch': 'client',
    'topproduct': 'client',
    'updateMetaSeo': 'client',
    'uploadLogo': 'client',
    'user/': 'client/user',
    'utils/': 'client/utils',
    'whatsappHome': 'client',
    'withPermission': 'client',
};

const SEARCH_DIRS = ['app', 'config'];
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

let filesModified = 0;

function getAllFiles(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
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

function fixImportsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let changes = [];

    // Fix each component import
    for (const [component, location] of Object.entries(COMPONENT_LOCATIONS)) {
        // Match: @/src/presentation/components/COMPONENT
        const regex = new RegExp(
            `@/src/presentation/components/${component.replace(/\//g, '\\/')}(?!/)`,
            'g'
        );

        if (regex.test(content)) {
            const newPath = `@/src/presentation/components/${location}/${component}`;
            content = content.replace(regex, newPath);
            modified = true;
            changes.push(`${component} → ${location}/${component}`);
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        filesModified++;

        console.log(`✅ Fixed: ${filePath}`);
        changes.forEach(c => console.log(`   ${c}`));

        return true;
    }

    return false;
}

function fixImports() {
    console.log('🔧 Fixing component subdirectory paths...\n');

    let allFiles = [];
    SEARCH_DIRS.forEach(dir => {
        if (fs.existsSync(dir)) {
            allFiles = allFiles.concat(getAllFiles(dir));
        }
    });

    console.log(`📁 Found ${allFiles.length} files to process\n`);

    allFiles.forEach(file => {
        fixImportsInFile(file);
    });

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Fix complete!`);
    console.log(`   Files modified: ${filesModified}`);
    console.log('='.repeat(50));
}

try {
    fixImports();
} catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
}
