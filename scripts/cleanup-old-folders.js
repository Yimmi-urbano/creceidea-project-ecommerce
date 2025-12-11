#!/usr/bin/env node

/**
 * Cleanup Old Folders Script
 * 
 * Safely deletes old folder structure after migration.
 * 
 * Usage:
 *   node scripts/cleanup-old-folders.js
 * 
 * What it does:
 * 1. Verifies new structure exists
 * 2. Creates backup of old folders
 * 3. Deletes old folders
 * 4. Logs all actions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Folders to delete
const OLD_FOLDERS = [
    'hooks',
    'domain',
    'application',
    'infrastructure',
    'types',
];

// Required new folders (verification)
const REQUIRED_NEW_FOLDERS = [
    'src/domain',
    'src/application',
    'src/infrastructure',
    'src/presentation',
    'src/actions',
];

/**
 * Check if new structure exists
 */
function verifyNewStructure() {
    console.log('🔍 Verifying new structure exists...\n');

    const missing = [];

    REQUIRED_NEW_FOLDERS.forEach(folder => {
        if (!fs.existsSync(folder)) {
            missing.push(folder);
        }
    });

    if (missing.length > 0) {
        console.error('❌ New structure incomplete! Missing folders:');
        missing.forEach(f => console.error(`   - ${f}`));
        console.error('\n⚠️  Cannot proceed with cleanup.');
        process.exit(1);
    }

    console.log('✅ New structure verified!\n');
}

/**
 * Create backup of old folders
 */
function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = `backup-${timestamp}`;

    console.log(`📦 Creating backup in ${backupDir}/...\n`);

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    OLD_FOLDERS.forEach(folder => {
        if (fs.existsSync(folder)) {
            const dest = path.join(backupDir, folder);
            console.log(`   Backing up ${folder}/`);

            // Copy folder recursively
            execSync(`cp -r ${folder} ${dest}`);
        }
    });

    console.log(`\n✅ Backup created: ${backupDir}/\n`);
    return backupDir;
}

/**
 * Delete old folders
 */
function deleteOldFolders() {
    console.log('🗑️  Deleting old folders...\n');

    let deletedCount = 0;

    OLD_FOLDERS.forEach(folder => {
        if (fs.existsSync(folder)) {
            console.log(`   Deleting ${folder}/`);
            fs.rmSync(folder, { recursive: true, force: true });
            deletedCount++;
        } else {
            console.log(`   ⏭️  ${folder}/ not found (already deleted?)`);
        }
    });

    console.log(`\n✅ Deleted ${deletedCount} folders\n`);
}

/**
 * Main cleanup function
 */
function cleanup() {
    console.log('🧹 Starting cleanup process...\n');
    console.log('='.repeat(50) + '\n');

    // Step 1: Verify new structure
    verifyNewStructure();

    // Step 2: Create backup
    const backupDir = createBackup();

    // Step 3: Confirm deletion
    console.log('⚠️  WARNING: About to delete old folders!');
    console.log('   Folders to delete:', OLD_FOLDERS.join(', '));
    console.log(`   Backup created: ${backupDir}/`);
    console.log('\n   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');

    // Wait 5 seconds
    execSync('sleep 5');

    // Step 4: Delete old folders
    deleteOldFolders();

    console.log('='.repeat(50));
    console.log('✅ Cleanup complete!');
    console.log('='.repeat(50));
    console.log(`\n💡 Backup saved in: ${backupDir}/`);
    console.log('   You can delete this backup after verifying everything works');
    console.log('\n🔍 Next steps:');
    console.log('   1. Test your application thoroughly');
    console.log('   2. Run: npm run build');
    console.log('   3. If everything works, delete backup folder');
    console.log('   4. Run component reorganization script');
}

// Run cleanup
try {
    cleanup();
} catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
}
