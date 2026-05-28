# Usage Guide

This guide explains how to use the seven operational modes of **Second Mind** to capture codebase knowledge, build a technical code wiki, track architectural decisions, and restore context between chat sessions.

---

## Commands Overview

You trigger Second Mind directly in your conversation with the AI assistant. Type the command in either of these formats:

- `/second-mind <command>`
- `second-mind <command>`

| Mode | Command | Action |
|------|---------|--------|
| **1. Init** | `init` | Performs a full codebase and git scan to generate your vault structure. |
| **2. Wiki** | `wiki` | Explicitly generates or updates all technical guides in your code wiki (`guides/`). |
| **3. Restore** | `restore` | Reads the vault and briefs you at the start of a session. |
| **4. Capture** | `capture <insight>` | Logs a quick decision or insight mid-session. |
| **5. Update** | `update` | Saves your progress and updates decisions/guides at the end of a session. |
| **6. Overview** | `overview` | Generates a fresh synthesis of the vault inside `overview.md`. |
| **7. Onboarding** | `onboarding` | Builds a plain-English 10-minute newcomer onboarding guide. |

---

## The 7 Modes in Detail

### 1. `init` — Setup & Scan
Run this when introducing Second Mind to a project for the first time.

* **User Command**: `second-mind init`
* **Workflow**:
  1. The assistant asks three setup questions:
     - Project type: *Team or Solo?*
     - Git: *Should `./mind/` be committed to git?*
     - Integrations: *Do you have issues/PRs tracked on GitHub, GitLab, or Linear?*
  2. The assistant scans files (respecting exclusions like `node_modules` or `.git`), extracts components, parses READMEs, config files, and checks git commit history.
  3. The directory structure is generated inside `./mind/` (including `guides/`) with initialized logs.

* **Example Response**:
  > 🧠 **Second Mind** — Vault initialized! Created 18 markdown files (including code wiki guides), captured 3 historical architectural decisions, and detected 5 code TODOs as open questions.

---

### 2. `wiki` — Code Wiki Generation
Explicitly generates, validates, and updates all technical guides in your codebase wiki.

* **User Command**: `second-mind wiki`
* **Workflow**:
  1. The assistant scans files for databases, schemas, endpoints, middleware, configs, and coding patterns.
  2. It executes web/Google searches to research dependencies, verify third-party API contracts, and collect best-practice configurations.
  3. It writes or updates the structured guide files in `./mind/guides/` (database.md, auth-security.md, api-integrations.md, deployment.md, workflows.md, standards.md) following Berkeley and IBM documentation guidelines.

* **Example Response**:
  > 🧠 **Second Mind** — Code Wiki updated! Generated/updated guides/database.md, guides/auth-security.md, and guides/api-integrations.md with verified structures.

---

### 3. `restore` — Context Retrieval
Run this command first whenever starting a new conversation session.

* **User Command**: `second-mind restore`
* **Workflow**:
  1. The assistant loads `sessions/latest.md`, `current-state.md`, `open-questions.md`, and `next-steps.md`.
  2. It formats and prints a high-fidelity brief summarizing the state of the project.

* **Example Output**:
  ```markdown
  🧠 Second Mind — Session Restore

  📅 Last session: 2026-05-19 18:30
  🎯 You were working on: Implementing the new PostgreSQL connection pool.

  Current status:
    ✅ Working: DB container configurations are ready.
    🔧 In progress: Writing connection timeout tests.
    ❌ Broken: None.

  ❓ Open questions:
    - Should we increase pool size to 20 for production?
    - How are we handling TLS handshakes in local docker environment?

  👉 Suggested first step: Complete connection timeout assertions in pool_test.go.
  ```

---

### 4. `capture` — Decision Logging
Use this mid-session to record an architectural decision, rationale, or system design change.

* **User Command**: `second-mind capture We chose esbuild over webpack because it bundles CJS outputs in 40ms.`
* **Workflow**:
  1. The assistant extracts the core decision, proposal, and rationale.
  2. It asks for confirmation.
  3. It appends the entry to `decisions/decision-log.md` and generates a dedicated ADR file if it represents a significant architectural choice.

---

### 5. `update` — Save Progress
Run this command right before closing your IDE or ending a chat session.

* **User Command**: `second-mind update`
* **Workflow**:
  1. The assistant analyzes the entire active conversation.
  2. It extracts decisions, code changes, outstanding bugs, and remaining tasks.
  3. It updates `current-state.md`, `open-questions.md`, and `next-steps.md`.
  4. It generates or updates any affected technical wiki guides in `guides/` (using Google Search to verify new configuration/library details).
  5. It logs a timestamped session file under `sessions/` and overwrites `sessions/latest.md`.

---

### 6. `overview` — Synthesis
Run this when you want a clean, single-page summary of the current vault contents.

* **User Command**: `second-mind overview`
* **Workflow**:
  1. The assistant reads the entire `./mind/` directory.
  2. It compiles code structure, tech-stack notes, and active context into `mind/overview.md`.
  3. The "Project Story" is written entirely in narrative prose for readability.

---

### 7. `onboarding` — Newcomer Guide
Run this to create a plain-English guide for new developers joining the codebase.

* **User Command**: `second-mind onboarding`
* **Workflow**:
  1. The assistant synthesizes system architecture, roadmap, and current issues.
  2. It creates `mind/START-HERE.md` matching a 10-minute reading checklist.
  3. Jargon is simplified and technical abbreviations are defined.

---

## Obsidian Integration

The vault generated inside `./mind/` is 100% compatible with **Obsidian**.

1. Open Obsidian on your computer.
2. Select **Open folder as vault**.
3. Choose the `./mind/` folder in your project root.

Because Second Mind enforces **Wikilinks** (`[[architecture]]`, `[[decisions/2026-05-20-slug]]`), Obsidian will automatically construct an interactive **Graph View** showing how your decisions, architecture documents, and development components are linked.

---

## Quality Rules

Second Mind operates under strict quality rules:
- **Never Invent**: Gaps are explicitly marked with `_Not found — to be defined._` rather than hallucinated.
- **Wikilinks**: All files reference each other using the `[[filename]]` format.
- **Superseded Decisions**: When a choice replaces an older decision, the old file is kept but updated with a `[Superseded by [[new-decision]]]` label.
