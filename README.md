<div align="center">

# Second Mind

**A living knowledge vault for agentic IDE projects — built as a portable skill.**

*Never lose project context again. Scan your codebase, capture decisions, restore instantly.*

[![npm version](https://img.shields.io/npm/v/second-mind?color=crimson&style=flat-square&logo=npm)](https://www.npmjs.com/package/second-mind)
[![Built for Claude Code](https://img.shields.io/badge/Claude%20Code-compatible-blueviolet?style=flat-square&logo=anthropic&logoColor=white)](https://claude.ai/code)
[![Works in Antigravity](https://img.shields.io/badge/Antigravity-skill%20ready-00c2a8?style=flat-square)](https://antigravity.dev)
[![Works in Cursor](https://img.shields.io/badge/Cursor-compatible-0ea5e9?style=flat-square)](https://cursor.sh)
[![Works in Windsurf](https://img.shields.io/badge/Windsurf-compatible-4f46e5?style=flat-square)](https://codeium.com/windsurf)
[![Obsidian Compatible](https://img.shields.io/badge/Obsidian-compatible-7c3aed?style=flat-square&logo=obsidian&logoColor=white)](https://obsidian.md)
[![Node.js >= 16](https://img.shields.io/badge/node-%3E%3D16-brightgreen?style=flat-square&logo=nodedotjs)](https://nodejs.org)

</div>

<div align="center">

### [Setup Guide](docs/setup.md) &nbsp;•&nbsp; [Usage Guide](docs/usage.md)

</div>

---
## Quick Start
 
### Install

Install Second Mind into your AI assistant(s):

```bash
# Interactive installation (auto-detects active environments)
npx second-mind install

# Install for a specific AI assistant (e.g. Claude Code)
npx second-mind install --ai claude

# Install globally to your home directory (~/)
npx second-mind install --global
```

### Initialize your mind
 
```bash
/second-mind init
```
 
Answer 3 questions. The agent will:
- Scan your entire codebase
- Extract decisions from git history
- Build a complete vault at `./mind/`
- Generate a newcomer guide
 
### Uninstall the skill

```bash
# Interactive uninstall
npx second-mind uninstall

# Uninstall for a specific AI assistant globally
npx second-mind uninstall --ai claude --global
```
### Restore context next session
 
```bash
/second-mind restore
```
 
### Save your work at end of session
 
```bash
/second-mind update
```
 
---


### Core Commands

Once installed, simply type these commands to your agent:

| Command | What it does |
|---------|--------------|
| `/second-mind init` | Scans the project, extracts history, and builds your vault from scratch. |
| `/second-mind restore` | Run this when starting a new chat to get instantly caught up on your progress. |
| `/second-mind capture` | Manually captures a quick decision mid-session. |
| `/second-mind update` | Run this before closing your chat to save your session's progress. |
| `/second-mind overview` | Generate fresh project overview |
| `/second-mind onboarding` | Generates a fresh `START-HERE.md` 10-minute newcomer guide. |

---

## Vault Structure
 
```
mind/
├── START-HERE.md              # Newcomer onboarding (10-min read)
├── story.md                   # How the project evolved (prose)
├── roadmap.md                 # Future goals with reasoning
├── overview.md                # Fresh project overview (regenerated)
│
├── knowledge-base/
│   ├── architecture.md        # System design and layers
│   ├── tech-stack.md          # Technologies + why chosen
│   ├── data-models.md         # Core data structures
│   ├── integrations.md        # External APIs and services
│   └── components/            # One file per major component
│
├── decisions/
│   ├── decision-log.md        # Chronological index
│   └── YYYY-MM-DD-slug.md    # Individual ADR files
│
├── sessions/
│   ├── latest.md              # Most recent session
│   └── YYYY-MM-DD-HHMM.md   # Timestamped archives
│
├── context/
│   ├── current-state.md       # What works, what's broken
│   ├── open-questions.md      # Unresolved issues
│   └── next-steps.md          # Immediate actions
│
└── _meta/
    ├── initialized.json       # Setup timestamp, project name
    └── scan-history.json      # Log of all scans
```
 
---


## How It Works
 
Second Mind runs entirely through your agent's native tools — no external scripts, no background daemons.
 
| Tool | Used for |
|------|----------|
| **Glob** | Finding project files |
| **Grep** | Extracting TODOs, classes, functions, decisions |
| **Read** | Loading README, configs, docs |
| **Write** | Creating and updating vault files |
 
### What gets extracted automatically
 
Second Mind recognises patterns like:
 
- **Decisions** — *"we chose X because", "switched to Y"*
- **Failures** — *"tried X but", "abandoned", "didn't work"*
- **Questions** — *"?", "not sure", "need to figure out"*
- **Rationale** — *"because", "allows", "prevents"*
- **Future plans** — *"eventually", "roadmap", "later"*
### Quality rules
 
- Never invents information — unknowns are marked as `_Gap: ..._`
- Always records rationale alongside decisions
- Superseded decisions are kept but flagged, never deleted
- Uses exact identifiers, never paraphrases code names
---

## Compatibility
 
Second Mind works as a skill in any agentic IDE that supports tool use:
 
| IDE | Status |
|-----|--------|
| [Claude Code](https://claude.ai/code) | ✅ First-class support |
| [Antigravity](https://antigravity.dev) | ✅ First-class support |
| [Cursor](https://cursor.sh) | ✅ Compatible |
| [Windsurf](https://codeium.com/windsurf) | ✅ Compatible |
| [Aider](https://aider.chat) | ✅ Compatible |
| Claude.ai (with code access) | ✅ Compatible |
 
---

## Requirements
 
- Node.js 16+ *(for npm install)*
- Git *(optional — enables git history scanning)*
- An agentic IDE with file tool access
---

## CLI Reference

The CLI provides commands to manage the skill installation. Run `npx second-mind --help` for full details.

### `second-mind install`
Installs the Second Mind skill to your project or home directory.
* **Options**:
  * `-a, --ai <type>`: Install only for a specific AI assistant (e.g., `claude`, `cursor`, `gemini`, `antigravity`, `all`).
  * `-f, --force`: Overwrite existing files.
  * `-g, --global`: Install globally to home directory (`~/`) instead of current project directory.

### `second-mind uninstall`
Removes the installed skill from your system.
* **Options**:
  * `-a, --ai <type>`: Specific AI assistant to uninstall.
  * `-g, --global`: Uninstall from home directory (`~/`).
 
---
 
## Documentation
 
| Doc | Description |
|-----|-------------|
| [Setup Guide](docs/setup.md) | Step-by-step installation for all IDEs |
| [Usage Guide](docs/usage.md) | All 6 modes with examples |
| [Skill Reference](second-mind/SKILL.md) | Full skill definition |
| [Contributing](CONTRIBUTING.md) | How to contribute |
| [Changelog](CHANGELOG.md) | What's changed |
 
---


## Contributing
 
Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for how to report bugs, suggest features, and submit pull requests.
 
---


<div align="center">
  Made with ❤️ for developers who want to remember <b>why</b> they built things that way.
 
[⬆ Back to top](#-second-mind)

  
  ![Visitor Count](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FRohitYadav34980%2Fsecond-mind&countColor=%23263759)
</div>
