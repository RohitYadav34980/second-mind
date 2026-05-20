import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import type { AIType } from '../types/index.js';
import { AI_TYPES } from '../types/index.js';
import { copyFolders } from '../utils/extract.js';
import { detectAIType, getAITypeDescription } from '../utils/detect.js';
import { logger } from '../utils/logger.js';

let currentDir: string;
try {
  const filename = fileURLToPath(import.meta.url);
  currentDir = dirname(filename);
} catch {
  currentDir = __dirname;
}

function getBundledDir(): string {
  let dir = join(currentDir, '..');
  if (existsSync(join(dir, 'second-mind', 'SKILL.md'))) {
    return dir;
  }
  dir = join(currentDir, '..', '..', '..');
  if (existsSync(join(dir, 'second-mind', 'SKILL.md'))) {
    return dir;
  }
  return process.cwd();
}

interface InstallOptions {
  ai?: AIType;
  force?: boolean;
  global?: boolean;
}

export async function installCommand(options: InstallOptions): Promise<void> {
  logger.title('Second Mind Installer');

  let aiType = options.ai;

  // Auto-detect or prompt for AI type
  if (!aiType) {
    const { detected, suggested } = detectAIType();

    if (detected.length > 0) {
      logger.info(`Detected active AI assistant environments: ${detected.map(t => chalk.cyan(t)).join(', ')}`);
    }

    const response = await prompts({
      type: 'select',
      name: 'aiType',
      message: 'Select AI assistant to install for:',
      choices: AI_TYPES.map(type => ({
        title: getAITypeDescription(type),
        value: type,
      })),
      initial: suggested ? AI_TYPES.indexOf(suggested) : 0,
    });

    if (!response.aiType) {
      logger.warn('Installation cancelled');
      return;
    }

    aiType = response.aiType as AIType;
  }

  const isGlobal = !!options.global;
  const modeLabel = isGlobal ? ' (global)' : '';
  logger.info(`Installing for: ${chalk.cyan(getAITypeDescription(aiType))}${modeLabel}`);

  const spinner = ora('Installing files...').start();
  const targetDir = isGlobal ? homedir() : process.cwd();

  try {
    spinner.text = 'Installing from bundled assets...';
    const bundledDir = getBundledDir();
    const copiedFolders = await copyFolders(bundledDir, targetDir, aiType);

    spinner.succeed('Installed from bundled assets!');

    console.log();
    logger.info('Installed skill directories:');
    copiedFolders.forEach(folder => {
      console.log(`  ${chalk.green('+')} ${folder}`);
    });

    console.log();
    logger.success('Second Mind installed successfully!');

    console.log();
    console.log(chalk.bold('Next steps:'));
    console.log(chalk.dim('  1. Restart your AI coding assistant'));
    console.log(chalk.dim('  2. Try typing command: "/second-mind init" or "second-mind init"'));
    console.log();
  } catch (error) {
    spinner.fail('Installation failed');
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
}
