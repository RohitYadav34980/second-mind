# Second Mind

> Living, Obsidian-compatible knowledge brain for Claude projects

**Second Mind** scans your entire codebase, extracts decisions from chat history, and builds a complete knowledge vault that restores full context at every session start. Never lose project context again.

## Features

✨ **Six Powerful Modes**
- **INIT** — Scan entire project, build complete vault from scratch
- **RESTORE** — Restore full context at session start with one command
- **QUICK CAPTURE** — Lightweight extraction of decisions mid-session
- **END-OF-SESSION** — Auto-extract everything you did and update brain
- **OVERVIEW** — Generate fresh project overview on demand
- **ONBOARDING** — Create 10-minute newcomer guides automatically

🧠 **Complete Knowledge Capture**
- Decisions with rationale and trade-offs (ADR-style)
- Architecture diagrams and component documentation
- Technology choices and why they were made
- Open questions and current blockers
- Timeline of project evolution (as prose narrative)
- Future roadmap with reasoning

📚 **Obsidian-Compatible**
- All files are plain Markdown with wikilink support
- No special tools or plugins needed
- Works in any Markdown editor
- Syncs with Obsidian, Logseq, or Foam

🔄 **Context Restoration**
- Never explain your project twice
- Full context loaded at session start
- Knows what's broken, what's being worked on, what's next
- Tracks decisions so newcomers understand the why

## Quick Start

### Installation

```bash
npx second-mind
```

This single command will automatically download and install the Second Mind skill into your agentic IDEs (e.g., Claude Code, Antigravity) so you can start using it immediately.

### Initialize Brain

```
/brain initialize
```

Answer 3 questions, then agent:
- Scans your entire codebase
- Extracts decisions from git history
- Builds complete vault at `./brain/`
- Creates newcomer guide

### Restore Context

```
/brain restore
```

Get instant briefing: what you were working on, current blockers, next steps.

### Update After Session

```
/brain update
```

Analyzes everything you just did and updates the brain.

## Vault Structure

```
brain/
├── START-HERE.md              # Newcomer onboarding (10-min read)
├── story.md                   # How project evolved (prose narrative)
├── roadmap.md                 # Future goals with reasoning
├── overview.md                # Fresh project overview (regenerated)
│
├── knowledge-base/
│   ├── architecture.md        # System design and layers
│   ├── tech-stack.md          # Technologies and why chosen
│   ├── data-models.md         # Core data structures
│   ├── integrations.md        # External APIs and services
│   └── components/            # One file per major component
│
├── decisions/
│   ├── decision-log.md        # Chronological index
│   └── YYYY-MM-DD-slug.md     # Individual ADR files
│
├── sessions/
│   ├── latest.md              # Most recent session
│   └── YYYY-MM-DD-HHMM.md    # Timestamped archives
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

## How It Works

### Agent-Driven

Second Mind runs entirely through Claude's native tools:
- **Glob** — Find project files
- **Grep** — Extract TODOs, classes, functions, decisions
- **Read** — Load README, config, docs
- **Write** — Create vault files

No external scripts or dependencies.

### Knowledge Extraction

Automatically detects:
- **Decisions** — "we chose X because", "switched to Y"
- **Failures** — "tried X but", "abandoned", "didn't work"
- **Questions** — "?", "not sure", "need to figure out"
- **Rationale** — "because", "allows", "prevents"
- **Future** — "eventually", "roadmap", "later"

See `references/extraction-guide.md` for full detection rules.

### Quality Rules

- Never invent information — mark unknowns as `_Gap: ..._`
- Always include rationale with decisions
- Track superseded decisions (old stays, marked as superseded)
- Use exact names (never paraphrase identifiers)
- Prose for narrative docs (story, roadmap, onboarding)

## Documentation

- **[Setup Guide](./docs/setup.md)** — Step-by-step installation
- **[Usage Guide](./docs/usage.md)** — All 6 modes explained
- **[Architecture](./docs/architecture.md)** — How Second Mind works internally
- **[Contributing](./CONTRIBUTING.md)** — How to contribute
- **[Skill Reference](./skills/SKILL.md)** — Detailed skill definition

## Examples

### Example 1: Initialize Brain for Existing Project

```
Project: React app + Node backend

Command: /brain initialize

Agent scans:
- 247 source files
- 89 TODOs extracted
- 34 dependencies documented
- 12 decisions in git history

Result:
✓ Created 23 vault files
✓ Captured 12 decisions
✓ 89 open questions flagged
✓ Generated onboarding guide
```

### Example 2: Restore Context

```
Command: /brain restore

Output:
🧠 Second Mind — Session Restore

📅 Last session: 2026-05-18 14:30
🎯 You were working on: Auth refactor

Current status:
  ✅ Working: Token validation, caching layer
  🔧 In progress: OIDC migration
  ❌ Broken: Redis sync issue

❓ Open questions:
  - Should we use RS256 or HS256?
  - How to handle token rotation?

👉 Suggested first step: Fix Redis sync, then test token rotation
```

## API Reference

### Mode: INIT

Scan entire project and build vault.

```
/brain initialize
# or
/brain setup
# or
/brain scan
```

Returns: Number of files scanned, decisions captured, questions flagged.

### Mode: RESTORE

Restore full context.

```
/brain restore
# or
/brain catch me up
# or
/brain what was I doing?
```

Returns: Session summary with current blockers and next steps.

### Mode: QUICK CAPTURE

Capture a decision mid-session.

```
/brain capture: We decided to migrate to TypeScript because it catches more bugs early
```

Returns: Confirmation that decision was saved.

### Mode: END-OF-SESSION

Extract and save session work.

```
/brain update
# or
/brain save session
# or
/brain end session
```

Returns: Session ID, count of decisions, count of files updated.

### Mode: OVERVIEW

Generate fresh project overview.

```
/brain overview
# or
/brain generate overview
```

Returns: Path to generated `overview.md`.

### Mode: ONBOARDING

Generate newcomer guide.

```
/brain onboarding
# or
/brain generate newcomer guide
```

Returns: Path to generated `START-HERE.md`.

## Publishing Registries

**Second Mind is available on:**

- **npm** — `npm install -g second-mind`
- **PyPI** — `pip install second-mind`
- **Claude Skills Registry** — [link]
- **GitHub Releases** — [link]

## Requirements

- Node.js 16+ (for npm installation)
- Python 3.8+ (for pip installation)
- Git (optional, for scanning git history)
- Claude Code or Claude.ai with code access

## License

MIT — See [LICENSE](./LICENSE)

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- How to report bugs
- How to suggest features
- How to submit pull requests
- Development setup

## Community

- **Issues** — [GitHub Issues](https://github.com/yourusername/second-mind/issues)
- **Discussions** — [GitHub Discussions](https://github.com/yourusername/second-mind/discussions)
- **Twitter** — [@secondmindai](https://twitter.com/secondmindai)

## Roadmap

### v1.1 (June 2026)
- [ ] Git blame integration (who made each decision)
- [ ] Team mode (multiple users per brain)
- [ ] Slack/Discord notifications on blockers

### v1.2 (July 2026)
- [ ] Plugin system for custom extractors
- [ ] Export to Confluence, Notion, Markdown
- [ ] Neural search across brain

### v2.0 (Q3 2026)
- [ ] Multi-project brains
- [ ] Analytics dashboard
- [ ] Decision analytics (what decisions led to what outcomes)

---

**Made with ❤️ for teams who want to remember their decisions**

[⬆ back to top](#second-mind)
