#!/usr/bin/env node

/**
 * Final Components Migration Script
 * 
 * Updates all imports from @/components to @/src/presentation/components
 * 
 * Usage:
 *   node scripts/migrate-components-final.js
 */

const fs = require('fs');
const path = require('path');

// Import mapping
const IMPORT_MAPPINGS = {
    "@/components": "@/src/presentation/components",
};

// Directories to search
const SEARCH_DIRS = [
    'app',
    'config',
];

// File extensions
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

let filesModified = 0;
let importsReplaced = 0;

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

function replaceImportsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let replacements = [];

    for (const [oldPath, newPath] of Object.entries(IMPORT_MAPPINGS)) {
        // Match import statements
        const importRegex = new RegExp(
            `(import\\s+.*?from\\s+['"])${oldPath.replace(/\//g, '\\/')}`,
            'g'
        );

        if (importRegex.test(content)) {
            content = content.replace(importRegex, `$1${newPath}`);
            modified = true;
            replacements.push(`${oldPath} → ${newPath}`);
            importsReplaced++;
        }
    }

    if (modified) {
        const backupPath = `${filePath}.backup`;
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(filePath, backupPath);
        }

        fs.writeFileSync(filePath, content, 'utf8');
        filesModified++;

        console.log(`✅ Modified: ${filePath}`);
        replacements.forEach(r => console.log(`   ${r}`));

        return true;
    }

    return false;
}

function migrateImports() {
    console.log('🚀 Migrating components imports to src/presentation/components...\n');

    let allFiles = [];
    SEARCH_DIRS.forEach(dir => {
        if (fs.existsSync(dir)) {
            allFiles = allFiles.concat(getAllFiles(dir));
        }
    });

    console.log(`📁 Found ${allFiles.length} files to process\n`);

    allFiles.forEach(file => {
        replaceImportsInFile(file);
    });

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Migration complete!`);
    console.log(`   Files modified: ${filesModified}`);
    console.log(`   Imports replaced: ${importsReplaced}`);
    console.log('='.repeat(50));

    if (filesModified > 0) {
        console.log('\n💡 Backup files created');
        console.log('\n🔍 Next steps:');
        console.log('   1. Test your application');
        console.log('   2. If everything works, delete components/ folder:');
        console.log('      rm -rf components/');
    } else {
        console.log('\n✨ No imports needed updating!');
        console.log('   You can safely delete components/ folder:');
        console.log('   rm -rf components/');
    }
}

try {
    migrateImports();
} catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
}
