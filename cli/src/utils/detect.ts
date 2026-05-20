import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { AIType } from '../types/index.js';
import { PLATFORM_CONFIGS } from '../types/index.js';

interface DetectionResult {
  detected: AIType[];
  suggested: AIType | null;
}

export function detectAIType(cwd: string = process.cwd()): DetectionResult {
  const detected: AIType[] = [];

  for (const [key, config] of Object.entries(PLATFORM_CONFIGS)) {
    if (existsSync(join(cwd, config.root))) {
      detected.push(key as AIType);
    }
  }

  // Suggest based on what's detected
  let suggested: AIType | null = null;
  if (detected.length === 1) {
    suggested = detected[0];
  } else if (detected.length > 1) {
    suggested = 'all';
  }

  return { detected, suggested };
}

export function getAITypeDescription(aiType: AIType): string {
  if (aiType === 'all') {
    return 'All AI assistants';
  }
  const config = PLATFORM_CONFIGS[aiType];
  if (!config) {
    return String(aiType);
  }
  return `${config.displayName} (${config.root}/${config.skillPath}/)`;
}
