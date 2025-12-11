#!/usr/bin/env node

/**
 * Fix Relative Imports in Components
 * 
 * Converts relative imports to absolute paths in moved components.
 * 
 * Usage:
 *   node scripts/fix-relative-imports.js
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = 'src/presentation/components';
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

let filesModified = 0;

function getAllFiles(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            const ext = path.extname(file);
            if (FILE_EXTENSIONS.includes(ext)) {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
}

function fixRelativeImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let changes = [];

    // Common relative import patterns to fix
    const replacements = [
        // ../icons -> shared/icons
        {
            pattern: /from ['"]\.\.\/icons['"]/g,
            replacement: 'from "@/src/presentation/components/shared/icons"',
            name: '../icons'
        },
        // ./icons -> shared/icons (if in shared folder)
        {
            pattern: /from ['"]\.\/icons['"]/g,
            replacement: 'from "@/src/presentation/components/shared/icons"',
            name: './icons'
        },
        // ../components/... -> absolute path
        {
            pattern: /from ['"]\.\.\/components\/([^'"]+)['"]/g,
            replacement: 'from "@/src/presentation/components/$1"',
            name: '../components/'
        },
        // ./components/... -> absolute path
        {
            pattern: /from ['"]\.\/components\/([^'"]+)['"]/g,
            replacement: 'from "@/src/presentation/components/$1"',
            name: './components/'
        },
    ];

    replacements.forEach(({ pattern, replacement, name }) => {
        if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
            modified = true;
            changes.push(name);
        }
    });

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
    console.log('🔧 Fixing relative imports in components...\n');

    const allFiles = getAllFiles(COMPONENTS_DIR);

    console.log(`📁 Found ${allFiles.length} files to process\n`);

    allFiles.forEach(file => {
        fixRelativeImports(file);
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
