export type AIType =
  | 'claude'
  | 'cursor'
  | 'windsurf'
  | 'antigravity'
  | 'copilot'
  | 'kiro'
  | 'roocode'
  | 'codex'
  | 'qoder'
  | 'gemini'
  | 'trae'
  | 'opencode'
  | 'continue'
  | 'codebuddy'
  | 'droid'
  | 'kilocode'
  | 'warp'
  | 'augment'
  | 'all';

export interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  assets: Asset[];
}

export interface Asset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface PlatformConfig {
  root: string;
  skillPath: string;
  displayName: string;
}

export const AI_TYPES: AIType[] = [
  'claude',
  'cursor',
  'windsurf',
  'antigravity',
  'copilot',
  'roocode',
  'kiro',
  'codex',
  'qoder',
  'gemini',
  'trae',
  'opencode',
  'continue',
  'codebuddy',
  'droid',
  'kilocode',
  'warp',
  'augment',
  'all'
];

export const PLATFORM_CONFIGS: Record<Exclude<AIType, 'all'>, PlatformConfig> = {
  claude: { root: '.claude', skillPath: 'skills/second-mind', displayName: 'Claude Code' },
  cursor: { root: '.cursor', skillPath: 'skills/second-mind', displayName: 'Cursor' },
  windsurf: { root: '.windsurf', skillPath: 'skills/second-mind', displayName: 'Windsurf' },
  antigravity: { root: '.agents', skillPath: 'skills/second-mind', displayName: 'Antigravity' },
  copilot: { root: '.github', skillPath: 'prompts/second-mind', displayName: 'GitHub Copilot' },
  kiro: { root: '.kiro', skillPath: 'steering/second-mind', displayName: 'Kiro' },
  codex: { root: '.codex', skillPath: 'skills/second-mind', displayName: 'Codex' },
  roocode: { root: '.roo', skillPath: 'skills/second-mind', displayName: 'RooCode' },
  qoder: { root: '.qoder', skillPath: 'skills/second-mind', displayName: 'Qoder' },
  gemini: { root: '.gemini', skillPath: 'skills/second-mind', displayName: 'Gemini CLI' },
  trae: { root: '.trae', skillPath: 'skills/second-mind', displayName: 'Trae' },
  opencode: { root: '.opencode', skillPath: 'skills/second-mind', displayName: 'OpenCode' },
  continue: { root: '.continue', skillPath: 'skills/second-mind', displayName: 'Continue' },
  codebuddy: { root: '.codebuddy', skillPath: 'skills/second-mind', displayName: 'CodeBuddy' },
  droid: { root: '.factory', skillPath: 'skills/second-mind', displayName: 'Droid' },
  kilocode: { root: '.kilocode', skillPath: 'skills/second-mind', displayName: 'KiloCode' },
  warp: { root: '.warp', skillPath: 'skills/second-mind', displayName: 'Warp' },
  augment: { root: '.augment', skillPath: 'skills/second-mind', displayName: 'Augment' }
};
