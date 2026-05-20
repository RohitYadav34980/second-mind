import { mkdir, rm, access, cp } from 'node:fs/promises';
import { join } from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import type { AIType } from '../types/index.js';
import { PLATFORM_CONFIGS } from '../types/index.js';

const execAsync = promisify(exec);

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function copySkillFolder(
  sourceSkillDir: string,
  targetSkillDir: string
): Promise<void> {
  await mkdir(targetSkillDir, { recursive: true });

  try {
    await cp(sourceSkillDir, targetSkillDir, { recursive: true });
  } catch {
    if (process.platform === 'win32') {
      await execAsync(`xcopy "${sourceSkillDir}" "${targetSkillDir}" /E /I /Y`);
    } else {
      await execAsync(`cp -r "${sourceSkillDir}/." "${targetSkillDir}"`);
    }
  }
}

export async function copyFolders(
  sourceDir: string,
  targetDir: string,
  aiType: AIType
): Promise<string[]> {
  const copiedFolders: string[] = [];

  const sourceSkillPath = join(sourceDir, 'second-mind');
  if (!(await exists(sourceSkillPath))) {
    throw new Error(`Could not find skill folder 'second-mind' inside ${sourceDir}`);
  }

  const platforms = aiType === 'all'
    ? (Object.keys(PLATFORM_CONFIGS) as Exclude<AIType, 'all'>[])
    : [aiType as Exclude<AIType, 'all'>];

  for (const plat of platforms) {
    const config = PLATFORM_CONFIGS[plat];
    const targetSkillPath = join(targetDir, config.root, config.skillPath);

    try {
      if (await exists(targetSkillPath)) {
        await rm(targetSkillPath, { recursive: true, force: true });
      }

      await copySkillFolder(sourceSkillPath, targetSkillPath);
      copiedFolders.push(`${config.root}/${config.skillPath}`);
    } catch (error) {
      console.warn(`Failed to copy to ${targetSkillPath}: ${error}`);
    }
  }

  return copiedFolders;
}
