---
name: second-mind
description: Builds and maintains a living, Obsidian-compatible technical code wiki and guides for your codebase. Automatically scans codebases, captures decisions, and generates high-fidelity technical guides (Database, Auth, APIs, Deployment, and Workflows) while leveraging search tools to verify API contracts, dependencies, and user requirements. Trigger with commands like "second-mind init", "second-mind restore", "second-mind wiki", "second-mind capture", "second-mind update", "second-mind overview", or "second-mind onboarding".
---

# Second Mind

Build and maintain a living Obsidian-compatible technical code wiki and guides that restore full project context at every session start.

The vault scans your codebase, git history, issues, and chat logs—then builds a complete knowledge base and technical wiki from scratch using native agent tools, backed by Google search to verify API specifications, workflows, and configurations. Every session updates the vault automatically so you never lose context.

## When to Use This Skill

- When starting a new project and you want to initialize a structured developer wiki.
- When you want to explicitly generate or update all technical guides in your code wiki.
- Before closing a development session to save progress, decision history, and current blocker states.
- When starting a new session to get immediately caught up on where you left off.
- When introducing a new database, API endpoint, or authentication flow and you need to document it.
- When generating a 10-minute START-HERE newcomer onboarding guide.

## What This Skill Does

1. **Vault Initialization (`init` mode)**: Scans files, git history, and configurations to build a structured `./mind/` vault folder containing roadmap, story, index, and guides.
2. **Code Wiki & Guides Generation (`wiki` mode)**: Builds or explicitly updates dedicated, high-fidelity guides for database schemas (with RLS), auth middleware, API parameters (inputs/outputs/exceptions), hosting, workflows, and standards.
3. **Context Restoration (`restore` mode)**: Reads the latest session state and briefs you on what was working, broken, and suggestions for next steps.
4. **Google Search Verification**: Uses search tool to research dependencies, verify third-party API contracts, and gather best practices to ensure high-fidelity documentation.
5. **Session Progress Logging (`update` mode)**: Analyzes the session's chat transcript to update current status, next steps, open questions, and affected wiki guides.
6. **Overview and Onboarding Creation (`overview` & `onboarding` modes)**: Generates onboarding guides and system overviews from the vault.

## How to Use

### Basic Usage

To initialize the vault and guides for a project:
```
/second-mind init
```

To explicitly generate or update all technical guides in your code wiki:
```
/second-mind wiki
```

To restore the context of the project at the start of a session:
```
/second-mind restore
```

To update the vault and log your session changes at the end of a session:
```
/second-mind update
```

### Advanced Usage

To capture an architectural decision or insight mid-session:
```
/second-mind capture Switched to PostgreSQL for JSONB support
```

To generate a fresh project overview markdown:
```
/second-mind overview
```

To generate a START-HERE.md newcomer onboarding guide:
```
/second-mind onboarding
```

### Detailed Mode Instructions

- **`init`**: Checks if the vault exists. Prompts 3 setup questions (team/solo, commit to git, issues tracker URL). Scans codebase using Glob/Grep and searches Google to collect API contracts and schema structures. Creates directories and writes guides, context, roadmap, and story files.
- **`wiki`**: Explicitly scans the codebase, reads configuration files, and uses Google Search to research third-party APIs or dependency schemas. Writes or updates all files in `./mind/guides/` (database.md, auth-security.md, api-integrations.md, deployment.md, workflows.md, standards.md) following Berkeley & IBM guidelines.
- **`restore`**: Read-only. Loads `latest.md` and context files (`current-state.md`, `open-questions.md`, `next-steps.md`) and outputs a structured session briefing.
- **`capture`**: Extracts the key decision/insight from the message. Appends to `decision-log.md`. For major decisions, writes an ADR (Architecture Decision Record) file.
- **`update`**: Analyzes the active conversation transcript. Extracts decisions, changes made, blockers, questions, and next steps. Generates timestamped session file, overwrites `latest.md`, updates current-state and next-steps, updates affected guides in `guides/`, and commits to git.
- **`overview`**: Reads and synthesizes all vault files to write a fresh `./mind/overview.md` with a prose-only project story.
- **`onboarding`**: Reads vault files to generate a plain-English `./mind/START-HERE.md` onboarding guide readable in under 10 minutes.

### Vault Structure

All files live at `./mind/` in the project root:
```
./mind/
│
├── START-HERE.md                    # Newcomer entry point (plain language)
├── story.md                         # Narrative of how project evolved
├── roadmap.md                       # Future goals with context
├── overview.md                      # Generated fresh each time — never cached
│
├── _index.md                        # Map of Content — links to every section
│
├── guides/                          # Code Wiki & Guides (Supabase-style)
│   ├── database.md                  # Database, schema, and queries
│   ├── auth-security.md             # Authentication and security
│   ├── api-integrations.md          # API contracts and third-party APIs
│   ├── deployment.md                # Deployment and hosting details
│   ├── workflows.md                 # Local setup and workflow procedures
│   └── standards.md                 # Code documentation standards
│
├── knowledge-base/
│   ├── architecture.md              # System design, layers, patterns, rationale
│   ├── tech-stack.md                # Every technology + why chosen
│   ├── data-models.md               # Core data structures and schemas
│   ├── integrations.md              # External APIs, services, dependencies
│   └── components/
│       └── <ComponentName>.md       # One file per major component/module
│
├── decisions/
│   ├── decision-log.md              # Chronological index of all decisions
│   └── <YYYY-MM-DD>-<slug>.md       # Individual ADR-style decision files
│
├── sessions/
│   ├── latest.md                    # Always most recent (overwritten each time)
│   └── <YYYY-MM-DD-HHMM>.md        # Timestamped session files
│
├── context/
│   ├── current-state.md             # What is working, broken, in progress
│   ├── open-questions.md            # Unresolved questions and blockers
│   └── next-steps.md                # Immediate next actions
│
└── _meta/
    ├── initialized.json             # Init timestamp, project name, config
    └── scan-history.json            # Log of every scan and session update
```

### Quality Rules

Apply to every file generated:
1. **Never invent.** If info not found, write `_Not found — to be defined._`
2. **Mark uncertainty.** Unconfirmed items get `[Proposed]` prefix.
3. **Track superseded.** Old decisions stay marked `[Superseded by #slug]`.
4. **Exact names.** Never paraphrase identifiers, env vars, URLs, library names.
5. **Prose for narrative.** story.md, START-HERE.md, overview "Project Story" = readable prose, no bullets.
6. **Flag gaps.** If section has no data: `_Gap: [what is missing] — needs discussion._`
7. **Wikilinks everywhere.** References to vault docs use `[[filename]]` syntax.
8. **Verify with Web Search.** When generating or updating guides (`guides/` files), perform a web search to verify third-party API contracts, documentation, or tech stack schemas.
9. **Precise Input/Output/Exception Definitions.** When documenting APIs or integrations in `api-integrations.md`, define all parameters, types, default values, returned data models, and handled error exceptions explicitly, adhering to Berkeley & IBM documentation guidelines.
10. **Defined Ownership and Versioning.** All codebase guides must include a YAML frontmatter specifying the owner, last updated date, version, and a chronological history of major edits.

### How the Agent Works

All modes use native coding tools:
- **Glob** — Find all source files (respecting exclusions)
- **Grep** — Extract TODOs, function names, class definitions, dependencies
- **Read** — Load README, config files, docs, .env.example
- **Write** — Create all vault files in ./mind/
- **Search Web** — Lookup third-party APIs, libraries, workflows, and specifications to verify documentation details
- **Bash** — Run git commands (if commit enabled)

#### Command Detection
When the user types a command, the agent detects it and routes to the corresponding mode:
```
User input format: <command>

Commands:
  init        → MODE 1: Initialize vault
  wiki        → MODE 2: Generate/update technical guides
  restore     → MODE 3: Restore context
  capture     → MODE 4: Capture decision
  update      → MODE 5: End-of-session
  overview    → MODE 6: Generate overview
  onboarding  → MODE 7: Generate onboarding docs
```

#### Execution Flow by Command

##### `init`
```
1. Ask 3 setup questions → write _meta/initialized.json
2. Glob: find all source files (skip exclusions)
3. Grep: extract TODOs, classes, functions from code
4. Read: README, package.json, requirements.txt, .env.example, /docs/
5. Search the web to verify API structures and schemas for dependencies found in package.json/requirements.txt
6. Build knowledge-base/ and guides/ files from scanned data and research
7. Build context/ files from TODOs and dependencies
8. Write story.md, roadmap.md, _index.md
9. Generate START-HERE.md using ONBOARDING logic
10. Write _meta/scan-history.json
11. Git commit if enabled
```

##### `wiki`
```
1. Glob: find all source files (skip exclusions)
2. Grep: extract database queries, auth middleware patterns, API endpoints, deployment scripts from code
3. Read: README, package.json, requirements.txt, .env.example, config files
4. Search the web to verify package API schemas, Postgres/SQL best practices, JWT session conventions, or cloud configs
5. Build/update all guides in `./mind/guides/` (database.md, auth-security.md, api-integrations.md, deployment.md, workflows.md, standards.md) following Berkeley & IBM guidelines
6. Update the Guides section in `_index.md`
7. Report: "Guides updated: guides/database.md, guides/auth-security.md, etc."
```

##### `restore`
```
1. Read: sessions/latest.md
2. Read: context/{current-state,open-questions,next-steps}.md
3. Format and present as formatted brief to user
```

##### `capture`
```
1. Extract decision/insight from user message following extraction guidelines
2. Append to decisions/decision-log.md with timestamp and quick-capture tag
3. If significant architectural decision:
   → Create decisions/<YYYY-MM-DD>-<slug>.md using ADR template
4. Confirm to user
```

##### `update`
```
1.  Analyze entire conversation transcript (this session)
2.  Extract: decisions made, what was built, blockers, questions, next steps
3.  Search the web if new libraries, integrations, or APIs were introduced during the session to verify details
4.  Write: sessions/<YYYY-MM-DD-HHMM>.md (session template)
5.  Overwrite: sessions/latest.md (copy of above)
6.  Update: context/{current-state,open-questions,next-steps}.md
7.  Update/create affected wiki guides in `guides/` following Berkeley & IBM guidelines
8.  Append: decisions/decision-log.md with this session's decisions
9.  Create: individual decisions/<YYYY-MM-DD>-<slug>.md for major choices
10. Update: story.md if significant pivot or milestone
11. Update: _meta/scan-history.json (append session entry)
12. Git commit if enabled
```

## Example

**User**: `/second-mind restore`

**Output**:
```
🧠 Second Mind — Session Restore

📅 Last session: 2026-05-28 18:30
🎯 You were working on: Implementing JWT authentication middleware

Current status:
  ✅ Working: Database schema migrations for users
  🔧 In progress: JWT token generation and validation middleware
  ❌ Broken: Refresh token cookie security policy

❓ Open questions:
  - Do we need to support auth providers like GitHub or Google?

👉 Suggested first step: Verify the JWT token cookie options under guides/auth-security.md
```

## Tips

- Let the agent use the search tool during documentation generation to pull exact library specifications.
- Commit the `./mind/` folder to git so that documentation is treated as code.
- Ensure all API endpoints in `guides/api-integrations.md` explicitly detail inputs, output contracts, and exceptions.
- Add files to the `.npmignore` or `.gitignore` if you do not want private session logs exposed.
