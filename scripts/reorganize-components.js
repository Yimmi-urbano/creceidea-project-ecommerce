#!/usr/bin/env node

/**
 * Component Reorganization Script
 * 
 * Reorganizes components into server/client/shared structure.
 * 
 * Usage:
 *   node scripts/reorganize-components.js
 * 
 * What it does:
 * 1. Analyzes components for 'use client' directive
 * 2. Creates src/components/ structure
 * 3. Moves components to appropriate folders
 * 4. Updates imports
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = 'components';
const NEW_COMPONENTS_DIR = 'src/components';

/**
 * Check if file has 'use client' directive
 */
function isClientComponent(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes("'use client'") || content.includes('"use client"');
}

/**
 * Check if file uses hooks or state
 */
function usesClientFeatures(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const clientPatterns = [
        /useState/,
        /useEffect/,
        /useContext/,
        /useReducer/,
        /useCallback/,
        /useMemo/,
        /useRef/,
        /onClick/,
        /onChange/,
        /onSubmit/,
    ];

    return clientPatterns.some(pattern => pattern.test(content));
}

/**
 * Determine component type
 */
function getComponentType(filePath) {
    if (isClientComponent(filePath) || usesClientFeatures(filePath)) {
        return 'client';
    }

    // Check if it's a shared component (no hooks, no 'use client')
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('export') && !content.includes('async function')) {
        return 'shared';
    }

    return 'server';
}

/**
 * Get all component files
 */
function getAllComponentFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;

    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            getAllComponentFiles(fullPath, files);
        } else if (/\.(tsx|jsx)$/.test(item)) {
            files.push(fullPath);
        }
    });

    return files;
}

/**
 * Create new structure
 */
function createNewStructure() {
    console.log('📁 Creating new component structure...\n');

    const dirs = [
        NEW_COMPONENTS_DIR,
        path.join(NEW_COMPONENTS_DIR, 'server'),
        path.join(NEW_COMPONENTS_DIR, 'client'),
        path.join(NEW_COMPONENTS_DIR, 'shared'),
    ];

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`   Created: ${dir}/`);
        }
    });

    console.log('\n');
}

/**
 * Reorganize components
 */
function reorganizeComponents() {
    console.log('🔄 Analyzing and reorganizing components...\n');

    const files = getAllComponentFiles(COMPONENTS_DIR);
    const stats = { server: 0, client: 0, shared: 0 };

    files.forEach(file => {
        const type = getComponentType(file);
        const relativePath = path.relative(COMPONENTS_DIR, file);
        const newPath = path.join(NEW_COMPONENTS_DIR, type, relativePath);

        // Create directory if needed
        const newDir = path.dirname(newPath);
        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
        }

        // Copy file
        fs.copyFileSync(file, newPath);
        stats[type]++;

        console.log(`   ${type.padEnd(6)} | ${relativePath}`);
    });

    console.log('\n' + '='.repeat(50));
    console.log('📊 Component Distribution:');
    console.log(`   Server Components: ${stats.server}`);
    console.log(`   Client Components: ${stats.client}`);
    console.log(`   Shared Components: ${stats.shared}`);
    console.log(`   Total: ${stats.server + stats.client + stats.shared}`);
    console.log('='.repeat(50));
}

/**
 * Main function
 */
function main() {
    console.log('🚀 Component Reorganization\n');
    console.log('='.repeat(50) + '\n');

    if (!fs.existsSync(COMPONENTS_DIR)) {
        console.log('⚠️  No components/ folder found. Nothing to reorganize.');
        return;
    }

    // Step 1: Create structure
    createNewStructure();

    // Step 2: Reorganize
    reorganizeComponents();

    console.log('\n✅ Reorganization complete!');
    console.log('\n🔍 Next steps:');
    console.log('   1. Review the new structure in src/components/');
    console.log('   2. Update imports in your app');
    console.log('   3. Add "use client" to client components if missing');
    console.log('   4. Test your application');
    console.log('   5. Delete old components/ folder when ready');
}

// Run
try {
    main();
} catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
}
