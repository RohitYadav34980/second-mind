---
name: second-mind
description: Builds and maintains a living Obsidian-compatible knowledge vault for your codebase. Use when the user asks to "initialize brain", "restore context", "capture this decision", "update brain", or "generate project overview". Provides automated context restoration and persistent documentation.
---

# Second Mind Skill

**Build and maintain a living Obsidian-compatible knowledge vault that restores full project context at every session start.**

The vault scans your codebase, git history, issues, and chat logs—then builds a complete knowledge base from scratch using native agent tools. Every session updates the brain automatically so you never lose context.

---

## THE 6 MODES

Detect mode from trigger phrases and presence of `_meta/initialized.json`:

| Mode | Trigger | Purpose |
|------|---------|---------|
| **INIT** | `initialized.json` missing OR "initialize brain", "setup second mind", "scan project" | First-time setup: scan codebase, chats, git, issues → build complete vault |
| **RESTORE** | "restore context", "catch me up", "what was I doing?" | Read latest session + current state → brief the user on where they left off |
| **QUICK CAPTURE** | "capture this", "save this decision", "note this" | Lightweight: extract insight/decision from message → append to brain without full scan |
| **END-OF-SESSION** | "update brain", "save session", "end session" | Analyze this conversation → write session file + update context + increment decisions |
| **OVERVIEW** | "generate overview", "full project overview", "project summary" | Synthesize all brain files → generate fresh overview.md |
| **ONBOARDING** | "generate onboarding", "newcomer guide", "explain the project" | Write START-HERE.md for someone with zero context → readable in 10 minutes |

**Mode detection priority (test in order):**
```
1. initialized.json missing?                    → INIT (always)
2. User says "catch me up" / "restore"         → RESTORE
3. User says "capture" / "note this"           → QUICK CAPTURE
4. User says "update brain" / "end session"    → END-OF-SESSION
5. User says "overview" / "summary"            → OVERVIEW
6. User says "onboarding" / "newcomer"         → ONBOARDING
```

---

## VAULT STRUCTURE

All files live at `./brain/` in the project root.

```
./brain/
│
├── START-HERE.md                    # Newcomer entry point (plain language)
├── story.md                         # Narrative of how project evolved
├── roadmap.md                       # Future goals with context
├── overview.md                      # Generated fresh each time — never cached
│
├── _index.md                        # Map of Content — links to every section
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

---

## MODE 1: INIT

### User interaction:
Ask 3 questions before scanning:
```
Setting up your Second Mind. Three quick questions:

1. Is this a team project or solo? (team/solo)
2. Should I commit ./brain/ to git? (yes/no — default yes)
3. Do you have issues or PRs tracked somewhere? (GitHub/GitLab/Linear URL, or press Enter to skip)
```

### Execution sequence:
```
1.  Write answers → initialized.json
2.  Create ./brain/ directory structure
3.  Use Glob and Grep tools to scan the codebase → extract modules, components, TODOs, dependencies
4.  Scan README + /docs → extract purpose, setup, architecture notes
5.  Scan config files → extract tech stack, env vars
6.  If .git/ exists → use command line tools to read git history logs for extraction
7.  If issues URL provided → fetch and extract open issues, past discussions
8.  Scan available chat logs or ask the user for past chat exports if necessary
9.  Combine all scans → use your native synthesis and reasoning to process the data
10. Build knowledge-base/ from scanned data
11. Build decisions/ — one entry per decision found in git + chats
12. Build context/current-state.md from TODOs, commits, chat context
13. Build context/open-questions.md from unanswered questions
14. Build context/next-steps.md from planned work
15. Write story.md — prose narrative of project evolution
16. Write roadmap.md — future goals
17. Synthesize context to write START-HERE.md using Write tool
18. Build _index.md with wikilinks to every file
19. If git commit enabled: git add brain/ && git commit -m "chore: init second mind brain"
20. Write _meta/initialized.json + scan-history.json
21. Report: "Brain initialized. Created X files, captured Y decisions, Z open questions."
```

**Exclusions:** node_modules/, .git/, venv/, __pycache__/, dist/, build/, .next/, coverage/, .env, *.lock, *.log

---

## MODE 2: RESTORE

Read-only. No files written.

### Execution:
```
1. Read: sessions/latest.md
2. Read: context/current-state.md
3. Read: context/open-questions.md
4. Read: context/next-steps.md
5. Deliver brief in this format:
```

Output to user:
```
🧠 Second Mind — Session Restore

📅 Last session: [date and time from latest.md]
🎯 You were working on: [task from latest.md]

Current status:
  ✅ Working: [from current-state.md]
  🔧 In progress: [from current-state.md]
  ❌ Broken: [from current-state.md]

❓ Open questions:
  - [from open-questions.md, up to 5]

👉 Suggested first step: [top item from next-steps.md]
```

---

## MODE 3: QUICK CAPTURE

Lightweight extraction. No full scan.

### Execution:
```
1. Extract key decision or insight from user message
2. Show to user: "Capturing this — confirm? [text]"
3. On confirm:
   a. Append to decisions/decision-log.md with date + #quick-capture tag
   b. If significant architectural/product decision:
      → Create decisions/<YYYY-MM-DD>-<slug>.md (ADR template)
   c. Confirm: "Captured. Saved to decisions/decision-log.md"
```

---

## MODE 4: END-OF-SESSION

Analyze full conversation and update brain.

### Execution:
```
1.  Analyze entire conversation
2.  Extract: decisions made this session
3.  Extract: what was built/changed
4.  Extract: what is broken/unfinished
5.  Extract: new open questions
6.  Extract: updated next steps
7.  Write: sessions/<YYYY-MM-DD-HHMM>.md (session template)
8.  Overwrite: sessions/latest.md (copy of above)
9.  Update: context/current-state.md
10. Update: context/open-questions.md (add new, mark resolved)
11. Update: context/next-steps.md
12. Append: decisions/decision-log.md with this session's decisions
13. Create: individual decisions/<YYYY-MM-DD>-<slug>.md for major choices
14. Update: story.md if significant pivot or milestone
15. Update: _meta/scan-history.json (append session entry)
16. If git enabled: git add brain/ && git commit -m "brain: session <YYYY-MM-DD>"
17. Report: "Session saved. [N] decisions captured, [N] files updated."
```

---

## MODE 5: OVERVIEW

Synthesize all brain files and write fresh overview.md.

### Execution:
```
1. Read all files in ./brain/
2. Synthesize files and use Write tool to create ./brain/overview.md using template
3. Report: "Overview generated at brain/overview.md"
```

**Project Story section must be prose paragraphs — no bullet points.**

---

## MODE 6: ONBOARDING

Write START-HERE.md for newcomers.

### Execution:
```
1. Read: story.md, architecture.md, tech-stack.md, decision-log.md, roadmap.md, current-state.md
2. Synthesize files and use Write tool to create ./brain/START-HERE.md using template
3. Apply rules:
   - No jargon without explanation
   - Every technical term gets one-line plain-English definition
   - For someone with zero context
   - Welcoming tone, not condescending
   - Readable in under 10 minutes
   - Must answer "why does this exist?" before technical content
4. Report: "Onboarding doc generated at brain/START-HERE.md"
```

---

## QUALITY RULES

Apply to every file generated:

1. **Never invent.** If info not found, write `_Not found — to be defined._`
2. **Mark uncertainty.** Unconfirmed items get `[Proposed]` prefix.
3. **Track superseded.** Old decisions stay marked `[Superseded by #slug]`.
4. **Exact names.** Never paraphrase identifiers, env vars, URLs, library names.
5. **Prose for narrative.** story.md, START-HERE.md, overview "Project Story" = readable prose, no bullets.
6. **Flag gaps.** If section has no data: `_Gap: [what is missing] — needs discussion._`
7. **Wikilinks everywhere.** References to brain docs use `[[filename]]` syntax.

---

## HOW THE AGENT WORKS

The agent implements all 6 modes by using its native coding tools directly:

**Tool Stack:**
- **Glob** — Find all source files (respecting exclusions)
- **Grep** — Extract TODOs, function names, class definitions, dependencies
- **Read** — Load README, config files, docs, .env.example
- **Write** — Create all vault files in ./brain/

**Process for each mode:**

### INIT
1. Ask 3 setup questions → write initialized.json
2. Glob: find all source files (skip exclusions)
3. Grep: extract TODOs, classes, functions from code
4. Read: README, package.json, requirements.txt, .env.example, /docs/
5. Build knowledge-base/ files from extracted data
6. Build context/ files from TODOs and dependencies
7. Write story.md, roadmap.md, _index.md
8. Run ONBOARDING mode logic → write START-HERE.md
9. Commit to git if enabled

### RESTORE
1. Read: sessions/latest.md, context/{current-state,open-questions,next-steps}.md
2. Format and present to user in-chat

### QUICK CAPTURE
1. Extract decision/insight from user message
2. Write to decisions/decision-log.md
3. If significant: create decisions/<YYYY-MM-DD>-<slug>.md

### END-OF-SESSION
1. Analyze full conversation transcript
2. Extract: decisions, what was built, blockers, questions, next steps
3. Write: sessions/<YYYY-MM-DD-HHMM>.md
4. Overwrite: sessions/latest.md
5. Update: context/{current-state,open-questions,next-steps}.md
6. Append: decisions/decision-log.md
7. Git commit if enabled

### OVERVIEW
1. Read all brain files
2. Synthesize into fresh overview.md
3. Extract recent decisions, key sections

### ONBOARDING
1. Read: story.md, architecture.md, tech-stack.md, decisions/decision-log.md, roadmap.md, current-state.md
2. Write START-HERE.md in plain language (10-minute read)
3. Apply quality checks: no jargon, links included, readable

**References used by agent:**
- [[references/obsidian-templates.md]] — File templates
- [[references/scan-exclusions.md]] — Files to skip
- [[references/extraction-guide.md]] — How to extract decisions/insights from text

---

## CHAT LOG HANDLING

At INIT, if no path is auto-detected:

```
Where are your past chat logs?
(Provide folder path or drag export files here)
Supported: JSON export, plain text .txt, .md conversation files
```

---

## WIKILINK CONVENTION

All cross-document references use Obsidian wikilink syntax:
```markdown
See [[architecture]] for details.
This implements [[decisions/2025-05-19-auth-jwt]].
Related: [[knowledge-base/components/AuthService]]
```

Obsidian renders these as clickable links; plain markdown readers show them as text.
