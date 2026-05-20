import { rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import type { AIType } from '../types/index.js';
import { AI_TYPES, PLATFORM_CONFIGS } from '../types/index.js';
import { detectAIType, getAITypeDescription } from '../utils/detect.js';
import { logger } from '../utils/logger.js';

interface UninstallOptions {
  ai?: AIType;
  global?: boolean;
}

async function removeSkillDir(baseDir: string, aiType: Exclude<AIType, 'all'>): Promise<string[]> {
  const config = PLATFORM_CONFIGS[aiType];
  if (!config) return [];

  const skillDir = join(baseDir, config.root, config.skillPath);
  const removed: string[] = [];

  try {
    await stat(skillDir);
    await rm(skillDir, { recursive: true, force: true });
    removed.push(`${config.root}/${config.skillPath}`);
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }

  return removed;
}

export async function uninstallCommand(options: UninstallOptions): Promise<void> {
  logger.title('Second Mind Uninstaller');

  const isGlobal = !!options.global;
  const baseDir = isGlobal ? homedir() : process.cwd();
  const locationLabel = isGlobal ? '~/ (global)' : process.cwd();

  let aiType = options.ai;
  const { detected: initialDetected } = detectAIType(baseDir);

  if (!aiType) {
    const detected = initialDetected;

    if (detected.length === 0) {
      logger.warn('No installed AI skill directories detected.');
      return;
    }

    logger.info(`Detected installations: ${detected.map(t => chalk.cyan(t)).join(', ')}`);

    const choices = [
      ...detected.map(type => ({
        title: getAITypeDescription(type),
        value: type,
      })),
      { title: 'All detected', value: 'all' as AIType },
    ];

    const response = await prompts({
      type: 'select',
      name: 'aiType',
      message: 'Select which AI skill to uninstall:',
      choices,
    });

    if (!response.aiType) {
      logger.warn('Uninstall cancelled');
      return;
    }

    aiType = response.aiType as AIType;
  }

  const { confirmed } = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: `Remove Second Mind skill for ${chalk.cyan(getAITypeDescription(aiType))} from ${locationLabel}?`,
    initial: false,
  });

  if (!confirmed) {
    logger.warn('Uninstall cancelled');
    return;
  }

  const spinner = ora('Removing skill files...').start();

  try {
    const allRemoved: string[] = [];

    if (aiType === 'all') {
      for (const type of initialDetected) {
        const removed = await removeSkillDir(baseDir, type);
        allRemoved.push(...removed);
      }
    } else {
      const removed = await removeSkillDir(baseDir, aiType);
      allRemoved.push(...removed);
    }

    if (allRemoved.length === 0) {
      spinner.warn('No skill files found to remove');
      return;
    }

    spinner.succeed('Skill files removed!');

    console.log();
    logger.info('Removed:');
    allRemoved.forEach(folder => {
      console.log(`  ${chalk.red('-')} ${folder}`);
    });

    console.log();
    logger.success('Second Mind uninstalled successfully!');
    console.log();
  } catch (error) {
    spinner.fail('Uninstall failed');
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
}
