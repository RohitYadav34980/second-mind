#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const homedir = os.homedir();
const skillDirs = [
    path.join(homedir, '.gemini', 'antigravity', 'skills'),
    path.join(homedir, '.claude', 'skills')
];

const sourceDir = path.join(__dirname, '..', 'second-mind');

if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Could not find the skill source directory at ${sourceDir}`);
    process.exit(1);
}

let installedCount = 0;

for (const destDir of skillDirs) {
    if (!fs.existsSync(destDir)) {
        try {
            fs.mkdirSync(destDir, { recursive: true });
        } catch (err) {
            console.warn(`Warning: Could not create directory ${destDir}`);
            continue;
        }
    }

    const targetDir = path.join(destDir, 'second-mind');
    try {
        if (fs.existsSync(targetDir)) {
            console.log(`Overwriting existing skill at ${targetDir}...`);
            fs.rmSync(targetDir, { recursive: true, force: true });
        }
        
        fs.cpSync(sourceDir, targetDir, { recursive: true });
        console.log(`✅ Successfully installed Second Mind skill to ${targetDir}`);
        installedCount++;
    } catch (err) {
        console.error(`❌ Failed to install to ${targetDir}:`, err.message);
    }
}

if (installedCount > 0) {
    console.log('\nInstallation complete! You can now use the second-mind skill in your agentic IDEs.');
} else {
    console.error('\nFailed to install the skill to any known directories.');
    process.exit(1);
}
