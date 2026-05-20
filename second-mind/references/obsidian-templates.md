# Obsidian Vault Templates

Exact templates for every file type in the Second Mind vault. Use these for consistency across all vault files.

---

## Template 1: Decision (ADR-style)

**File:** `decisions/<YYYY-MM-DD>-<slug>.md`

```markdown
---
date: <YYYY-MM-DD>
status: decided | proposed | superseded
tags: [decision, <topic>]
related: [[<link1>]], [[<link2>]]
supersedes: <slug or null>
superseded_by: <slug or null>
---

# Decision: <Title>

## Context
<2-3 sentences describing the situation or problem that forced this decision.>

## Options Considered
- **Option A** — <brief description>
  - Pros: <list>
  - Cons: <list>

- **Option B** — <brief description>
  - Pros: <list>
  - Cons: <list>

## Decision
<1 sentence: what was chosen.>

## Rationale
<Why this option over the others. What makes it the best fit for this project and context.>

## Consequences
<What this enables. What this constrains. What becomes harder or impossible because of this choice.>

## Related Decisions
- [[<related-decision-1>]]
- [[<related-decision-2>]]
```

---

## Template 2: Session

**File:** `sessions/<YYYY-MM-DD-HHMM>.md`

```markdown
---
date: <YYYY-MM-DD>
time: <HH:MM>
tags: [session]
---

# Session — <Date>

## What was worked on
<2-3 sentences summarizing the session focus.>

## Decisions made
- [[<decision-file-1>]] — <brief context>
- [[<decision-file-2>]] — <brief context>

## What was built or changed
- <File/component 1>: <what changed>
- <File/component 2>: <what changed>

## What is broken or unfinished
- <Issue 1> — <why it's blocked or unfinished>
- <Issue 2> — <why it's blocked or unfinished>

## Open questions raised
- <Question 1>
- <Question 2>

## Next steps
- [ ] <Action 1>
- [ ] <Action 2>
```

---

## Template 3: Component

**File:** `knowledge-base/components/<ComponentName>.md`

```markdown
---
tags: [component, <domain>]
related: [[architecture]], [[<other-components>]]
---

# <ComponentName>

## Purpose
<1-2 sentences: why does this component exist? What problem does it solve?>

## Responsibilities
- <Responsibility 1>
- <Responsibility 2>
- <Responsibility 3>

## Key Files
- `src/path/to/file.py` — <brief role>
- `src/path/to/file.py` — <brief role>

## How it works
<Explain the flow: inputs → processing → outputs. Include key functions or classes.>

## Dependencies
- [[<internal-component-1>]] — <why>
- [[<internal-component-2>]] — <why>
- External: <external-lib> — <why>

## Known limitations
- <Limitation 1>
- <Limitation 2>

## Future improvements
- <Idea 1>
- <Idea 2>
```

---

## Template 4: Story

**File:** `story.md`

```markdown
---
tags: [story, history]
last_updated: <date>
---

# Project Story

## Origin
<Why was this project started? What problem was it trying to solve? What motivated the team?

Write as a short paragraph — imagine telling this to someone at a coffee shop.>

## Phase 1 — <Name>
<What was built? What was tried? What worked? What failed? What did you learn?

Prose paragraphs, not bullets. Timeline: when did this happen?>

## Key Pivot: <Description>
<Something fundamental changed. What was it? Why did it happen? What enabled it?>

## Phase 2 — <Name>
<Continue chronologically. What was the focus? What did you build? What changed about how you work?>

## Phase N — <Name>
<Continue as many phases as apply.>

## Where we are now
<Conclusion to the story so far. Current state as the natural next chapter.

This should read like the end of one chapter, with hints about where the story goes next.>

## What's next
<What's the next chapter of this story? Don't bullet-point; write it as prose summary.>
```

---

## Template 5: Roadmap

**File:** `roadmap.md`

```markdown
---
tags: [roadmap, future]
last_updated: <date>
---

# Roadmap

## Now — What we are building
<What is the current focus? Why? How long will this phase take? What are you optimizing for?

Write as prose — explain the reasoning.>

## Next — What comes after
<The logical next step once current work is stable. Why this? What problem does it solve?

Include timing estimate (rough quarter or month).>

## Later — Bigger goals
<Longer-term ambitions. Not a wishlist — explain the "why" for each.

Example:
- Migrate from X to Y because [reasoning]
- Add [feature] because [problem it solves]
- Open-source the [component] because [why it's valuable]
>

## Explicitly out of scope
<Things considered and deliberately ruled out. Why? What would need to change to reconsider them?>

## Dependencies and assumptions
<What external factors could change the roadmap? Market, team capacity, regulations, ecosystem shifts?>
```

---

## Template 6: START-HERE (Onboarding)

**File:** `START-HERE.md`

```markdown
---
generated: <timestamp>
tags: [onboarding, newcomer]
---

# Welcome to <Project Name>

## What is this?
<2-3 sentences in plain English. No jargon, no assumptions.

Answer: What does this thing do in a sentence a 12-year-old would understand?>

## Why does it exist?
<The problem it solves, told as a short story. Not a feature list.

Example: "We built this because [person/team] kept [problem], and there was no [tool/solution] to fix it.">

## Key concepts you need to know

### Concept 1
<One-line plain-English definition.>
See [[relevant-file]] for depth.

### Concept 2
<One-line plain-English definition.>
See [[relevant-file]] for depth.

(Continue for 3-5 core concepts.)

## How it is built — the 5-minute tour

### Layer 1: <Name>
<One paragraph explaining this layer simply, with links.>
[[architecture]] has the full picture.

### Layer 2: <Name>
<Continue...>

### Layer 3: <Name>
<Continue...>

## The choices that shaped this project

### Choice 1: <Decision>
<One sentence: why this choice was made.>
See [[decisions/YYYY-MM-DD-slug]] for full reasoning.

### Choice 2: <Decision>
<Continue...>

(3-5 key decisions.)

## Where to go next — reading order

Start here, then follow this path:

1. [[story]] — Understand how we got here (5 min read)
2. [[knowledge-base/architecture]] — Understand what was built (10 min)
3. [[knowledge-base/tech-stack]] — Understand the tools (5 min)
4. [[decisions/decision-log]] — Understand why things are the way they are (reference)
5. [[roadmap]] — Understand where this is going (5 min)
6. [[context/current-state]] — Understand what to work on right now (5 min)

## Current status
<One or two sentences: Is it stable? What is actively being worked on? Any gotchas?>
```

---

## Template 7: _index.md (Map of Content)

**File:** `_index.md`

```markdown
---
tags: [index, map]
---

# Map of Content

Welcome to the Second Mind vault. Everything is here.

## 🚀 Start here

- [[START-HERE]] — Newcomer's guide (read this first if you're new)
- [[story]] — How we got here
- [[roadmap]] — Where we're going

## 📚 Knowledge Base

The what and why of this project.

- [[knowledge-base/architecture]] — System design, layers, patterns
- [[knowledge-base/tech-stack]] — Technologies used and why
- [[knowledge-base/data-models]] — Core data structures
- [[knowledge-base/integrations]] — External APIs and services
- **Components** — [[knowledge-base/components/]]
  - [[knowledge-base/components/ComponentA]]
  - [[knowledge-base/components/ComponentB]]
  - _(add one entry per component file)_

## 📋 Decisions

What we decided and why.

- [[decisions/decision-log]] — Chronological index of all decisions
- Recent decisions:
  - [[decisions/YYYY-MM-DD-slug-1]]
  - [[decisions/YYYY-MM-DD-slug-2]]
  - [[decisions/YYYY-MM-DD-slug-3]]

_(Update this to always show the 3-5 most recent decision files.)_

## 🧭 Context

Where we are and what's next.

- [[context/current-state]] — What is working, broken, in progress
- [[context/open-questions]] — Unresolved questions and blockers
- [[context/next-steps]] — Immediate next actions

## 📝 Sessions

Chat session logs.

- [[sessions/latest]] — Most recent session
- Previous sessions:
  - [[sessions/YYYY-MM-DD-HHMM]]
  - [[sessions/YYYY-MM-DD-HHMM]]
  - _(Add links as sessions accumulate.)_

## 📊 Project Overview

- [[overview]] — Synthesized project summary (regenerated each time)

---

**Last updated:** <timestamp>
```

---

## Usage Notes

1. **YAML frontmatter** required on all files (even if sparse)
2. **Wikilinks** for all internal references: `[[filename]]` or `[[filename#section]]`
3. **Prose** for narrative templates (story, roadmap, onboarding) — no bullet points
4. **ADR-style** decisions — always include Rationale and Consequences
5. **Tags** for categorization — consistent across similar files
6. **Markdown formatting** — keep it simple, Obsidian-friendly (bold, italic, headers, lists, code fences)
7. **Timestamps** — ISO format (YYYY-MM-DD or YYYY-MM-DD HH:MM)
