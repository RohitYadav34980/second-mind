#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { installCommand } from './commands/install.js';
import { uninstallCommand } from './commands/uninstall.js';
import type { AIType } from './types/index.js';
import { AI_TYPES } from './types/index.js';

let currentDir: string;
try {
  const filename = fileURLToPath(import.meta.url);
  currentDir = dirname(filename);
} catch {
  currentDir = __dirname;
}

const pkgPath = join(currentDir, '../package.json');
let pkg = { version: '1.0.0' };
try {
  pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
} catch {
  // Ignore
}

const program = new Command();

program
  .name('second-mind')
  .description('CLI to install Second Mind skill for AI coding assistants')
  .version(pkg.version);

program
  .command('install')
  .description('Install Second Mind skill to current project')
  .option('-a, --ai <type>', `AI assistant type (${AI_TYPES.join(', ')})`)
  .option('-f, --force', 'Overwrite existing files')
  .option('-g, --global', 'Install globally to home directory (~/) instead of current project')
  .action(async (options) => {
    if (options.ai && !AI_TYPES.includes(options.ai)) {
      console.error(`Invalid AI type: ${options.ai}`);
      console.error(`Valid types: ${AI_TYPES.join(', ')}`);
      process.exit(1);
    }
    await installCommand({
      ai: options.ai as AIType | undefined,
      force: options.force,
      global: options.global,
    });
  });

program
  .command('uninstall')
  .description('Remove Second Mind skill from current project or globally')
  .option('-a, --ai <type>', `AI assistant type (${AI_TYPES.join(', ')})`)
  .option('-g, --global', 'Uninstall from home directory (~/) instead of current project')
  .action(async (options) => {
    if (options.ai && !AI_TYPES.includes(options.ai)) {
      console.error(`Invalid AI type: ${options.ai}`);
      console.error(`Valid types: ${AI_TYPES.join(', ')}`);
      process.exit(1);
    }
    await uninstallCommand({
      ai: options.ai as AIType | undefined,
      global: options.global,
    });
  });

// Run install by default if no subcommand is provided
const args = process.argv.slice(2);
const availableCommands = ['install', 'uninstall', '-h', '--help', '-v', '--version'];
if (args.length === 0 || !availableCommands.includes(args[0])) {
  // If the first arg is not a command, prepend 'install' to default to the installer
  process.argv.splice(2, 0, 'install');
}

program.parse();
