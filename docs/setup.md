# Setup Guide

This guide provides step-by-step instructions to install and configure **Second Mind** for your AI coding assistant and IDE.

---

## Prerequisites

- **Node.js**: Version 16 or higher is required to run the CLI installer.
- **Git** *(Optional)*: Recommended for automated decision extraction from commit logs.

---

## 1. Install the CLI Package

Second Mind is installed using a dedicated command-line tool. You can run it directly via `npx`:

```bash
# Interactive installation (recommends best locations based on active environments)
npx second-mind install

# Install for a specific AI assistant environment (e.g. Claude Code)
npx second-mind install --ai claude

# Install globally to your home directory (~/) instead of current directory
npx second-mind install --global

# Force overwrite of existing files (useful for clean reinstalls)
npx second-mind install --force
```

---

## 2. Platform-Specific Integration

### Claude Code
Claude Code automatically discovers user skills defined inside the `~/.claude/skills/` directory.

1. Run the installer:
   ```bash
   npx second-mind install --ai claude --global
   ```
2. Restart Claude Code.
3. Verify discovery:
   - Ask Claude: *"What skills do you have access to?"*
   - It should list `second-mind`.

---

### Antigravity
Antigravity automatically discovers skills placed inside the `.agents/skills/` directory.

1. Run the installer locally in your project workspace:
   ```bash
   npx second-mind install --ai antigravity
   ```
2. Antigravity will detect and automatically activate the `second-mind` instructions.

---

### Cursor
Since Cursor does not have a native directory-based skill auto-discovery system, you can load Second Mind by referencing the installed instruction file:

1. Run the installer:
   ```bash
   npx second-mind install --ai cursor
   ```
   This creates the skill instructions at `.cursor/skills/second-mind/SKILL.md`.
2. Go to **Cursor Settings** > **Features** > **Rules for AI**.
3. Point Cursor to the `.cursor/skills/second-mind/SKILL.md` rules, or paste its contents into the rules text box.

---

### Windsurf
Similar to Cursor, Windsurf uses system rules files.

1. Run the installer:
   ```bash
   npx second-mind install --ai windsurf
   ```
   This creates the skill files at `.windsurf/skills/second-mind/SKILL.md`.
2. Configure Windsurf:
   - Create or edit the `.windsurfrules` file in your project root.
   - Reference the instruction file:
     ```json
     {
       "rules": [
         "Refer to instructions in .windsurf/skills/second-mind/SKILL.md for Second Mind commands."
       ]
     }
     ```

---

### Aider & Other CLI Agents
For general CLI coding agents, you can load Second Mind as custom system prompts:

1. Run the installer:
   ```bash
   npx second-mind install --ai aider
   ```
   This creates the files at `.aider/skills/second-mind/SKILL.md`.
2. Load Aider with the skill file as a system prompt:
   ```bash
   aider --system-prompt .aider/skills/second-mind/SKILL.md
   ```

---

## 3. Post-Installation Verification

Once installed and loaded into your assistant, verify that the integration is working:
1. Start a new session with your AI assistant.
2. Type:
   ```
   second-mind
   ```
   or
   ```
   /second-mind
   ```
3. The assistant should respond by describing the available commands (`init`, `restore`, `capture`, `update`, `overview`, `onboarding`).
