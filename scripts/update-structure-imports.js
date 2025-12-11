#!/usr/bin/env node

/**
 * Import Migration Script - FINAL VERSION
 * 
 * Updates imports to reflect reorganized structure:
 * - src/actions → src/presentation/actions
 * - src/components → src/presentation/components
 * 
 * Usage:
 *   node scripts/update-structure-imports.js
 */

const fs = require('fs');
const path = require('path');

// Import mapping: old path -> new path
const IMPORT_MAPPINGS = {
    // Actions moved to presentation
    "@/src/actions": "@/src/presentation/actions",

    // Components moved to presentation
    "@/src/components": "@/src/presentation/components",
};

// Directories to search
const SEARCH_DIRS = [
    'app',
    'components',
    'config',
    'src',
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

    for (const [oldPath, newPath] of Object.entries(IMPORT_MAPPINGS)) {
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

/**
 * Main migration function
 */
function migrateImports() {
    console.log('🚀 Starting structure reorganization imports update...\n');

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
        console.log('\n💡 Backup files created with .backup extension');
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
