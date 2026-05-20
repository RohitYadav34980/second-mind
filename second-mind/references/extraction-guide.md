# Knowledge Extraction Guide

How to extract structured knowledge from unstructured text: git logs, chat transcripts, code comments, issues, documentation.

The agent uses these principles to understand the **why** behind code decisions and architectural choices.

---

## Extraction Principles

1. **Look for intent signals** — Phrases that reveal why something was done
2. **Preserve context** — Include enough surrounding text to understand later
3. **Extract relationships** — Connect decisions, alternatives, and consequences
4. **Flag uncertainty** — Mark what's guessed vs. stated explicitly
5. **Timestamp everything** — Keep dates/times to build timeline

---

## Decision Extraction

### Key Phrases
```
"we decided"
"going with"
"chose X over Y"
"will use"
"agreed to"
"settled on"
"committed to"
"we're switching to"
"migrating from X to"
"deprecating"
"replaced"
"standardized on"
```

### Pattern
```
[Who] decided [What] because [Reason]
Alternative was [Other option]: [Why we didn't pick it]
This enables [Consequence 1] but constrains [Consequence 2]
```

### Example extraction
```
Raw text:
  "After weeks of trying Postgres, we realized it didn't work for our 
   real-time use case. We switched to DynamoDB because it scales horizontally 
   without sharding complexity. Trade-off: we lost flexible queries, but gained 
   infinite write throughput."

Extracted decision:
  Title: "Database: PostgreSQL → DynamoDB"
  Context: "Real-time use case requiring unlimited write throughput"
  Options: 
    - PostgreSQL: flexible queries but sharding required
    - DynamoDB: unlimited throughput but limited query patterns
  Decision: "DynamoDB"
  Rationale: "Scales horizontally, no sharding complexity needed"
  Consequences: 
    Enables: "Unlimited write scaling"
    Constrains: "Limited to key-based and index queries"
```

---

## Failure / Abandonment Extraction

### Key Phrases
```
"tried X but"
"doesn't work because"
"abandoned"
"gave up on"
"attempted"
"failed to"
"didn't work out"
"turned out to be"
"mistake to"
"shouldn't have"
```

### Pattern
```
[We] tried [What] but [What went wrong]
Lesson: [What we learned]
```

### Example extraction
```
Raw text:
  "We tried mocking the database in tests, but it bit us hard in production. 
   Mocked tests passed, but the actual migration failed because we didn't 
   catch a subtle schema difference. Now we always run integration tests 
   against a real database."

Extracted failure:
  What was tried: "Mocked database in unit tests"
  Why it failed: "Mocks diverged from production, migration issues not caught"
  Lesson: "Integration tests must use real database"
  Decision: "All tests touching DB → real database, not mocks"
```

---

## Rationale Extraction

### Key Phrases
```
"because"
"since"
"the reason"
"this allows"
"avoids"
"prevents"
"enables"
"solves"
"simplifies"
"reduces"
"improves"
```

### Pattern
```
[Decision] because [Reason 1], [Reason 2], [Reason 3]
```

### Example extraction
```
Raw text:
  "We use TypeScript because it catches errors at compile time, 
   reduces runtime surprises, and makes refactoring safer when 
   the codebase scales."

Extracted rationale:
  - "Catches errors at compile time (vs. runtime)"
  - "Reduces surprise bugs in production"
  - "Enables safer refactoring as codebase grows"
```

---

## Open Questions / Uncertainty Extraction

### Key Phrases
```
"?"
"not sure"
"need to figure out"
"TBD"
"unclear"
"haven't decided yet"
"should we"
"considering"
"debating"
"open question"
"still unsure"
```

### Pattern
```
[Situation]: [Question]?
Implications: [What depends on this decision]
```

### Example extraction
```
Raw text:
  "We're still not sure whether to cache aggressively or keep 
   everything fresh. The trade-off is latency vs. consistency, 
   and we haven't found the right balance yet for our use case."

Extracted question:
  Question: "Aggressive caching vs. fresh data — what's the right balance?"
  Context: "Affects latency and consistency"
  Impact: "Blocks cache strategy design"
```

---

## Pivot / Direction Change Extraction

### Key Phrases
```
"actually"
"changed our mind"
"switching to"
"moving away from"
"instead"
"turns out"
"learned"
"reconsidered"
"pivot"
```

### Pattern
```
We were [Original direction] but [New direction] because [Reason]
```

### Example extraction
```
Raw text:
  "We started with a monolithic architecture, but as we hit scaling issues, 
   we've been gradually moving to microservices. Each service owns its data, 
   which eliminates the database bottleneck we kept hitting."

Extracted pivot:
  Phase 1: "Monolithic architecture"
  Phase 2: "Microservices with data ownership per service"
  Trigger: "Scaling bottlenecks in centralized database"
  Benefit: "Eliminated DB bottleneck, independent service scaling"
```

---

## Future Ideas / Roadmap Extraction

### Key Phrases
```
"eventually"
"later we could"
"would be nice to"
"roadmap"
"one day"
"future"
"next phase"
"after this"
"once we stabilize"
```

### Pattern
```
In the future, [What] to [Goal] because [Why]
Blocked by: [What needs to happen first]
```

### Example extraction
```
Raw text:
  "Eventually we want to open-source the CLI, but we need to clean up 
   the config layer first. Once we do that, it'll be much easier for 
   external users to extend and contribute."

Extracted future idea:
  Goal: "Open-source the CLI"
  Why: "Enable external contributions and extensions"
  Blocked by: "Config layer cleanup"
  Priority: "Medium (post-stabilization)"
```

---

## Component / Architecture Extraction

### Key Phrases
```
"this component"
"handles"
"responsible for"
"talks to"
"calls"
"depends on"
"feeds into"
"layer"
"module"
```

### Pattern
```
[Component A] [relationship] [Component B] to [purpose]
```

### Example extraction
```
Raw text:
  "The auth service validates JWT tokens and caches them in Redis. 
   It's called by every API route before the business logic runs. 
   If the token is missing or invalid, it rejects the request."

Extracted architecture:
  Component: "AuthService"
  Purpose: "JWT validation and caching"
  Dependencies: "Redis (caching)"
  Callers: "Every API route"
  Responsibilities:
    - Validate JWT tokens
    - Cache valid tokens in Redis
    - Reject invalid/missing tokens
```

---

## Extraction Checklist

When processing text (git log, chat, issue):

- [ ] **Decisions**: Any choice made? Add it.
- [ ] **Failures**: Anything that failed? Why?
- [ ] **Rationale**: Why was the decision made?
- [ ] **Pivots**: Did direction change?
- [ ] **Open questions**: Anything unresolved?
- [ ] **Future**: What's planned?
- [ ] **Architecture**: New components or relationships?
- [ ] **Constraints**: What's hard or impossible?
- [ ] **Trade-offs**: What was given up?

---

## Extraction Rules

### For Text → Decision
1. At least one explicit decision word present ("decided", "chose", "switched to")
2. Context provided (why this decision was needed)
3. At least one alternative mentioned or implied
4. Rationale stated or inferrable
5. Timestamp available

**If missing any of these**: Mark as `[Proposed]` in the decision, flag the gap.

### For Text → Question
1. Starts with uncertainty marker ("?", "not sure", "TBD", "unclear")
2. Question is specific enough to be answerable
3. Related to a decision or architecture choice
4. Relevant to current or near-future work

**If too vague**: Note it but don't extract; ask for clarification.

### For Text → Future Idea
1. Explicitly mentions "future", "eventually", "one day", "roadmap", "later"
2. Goal is clear (even if timeline is not)
3. Why this matters is stated or inferrable

**If just a vague wish**: Don't extract; note as backlog candidate only if aligned with strategy.

---

## Examples in Context

### Git commit message
```
commit abc123
"Refactor: extract auth middleware

Moved JWT validation to separate middleware layer because:
- Auth logic was scattered across 15 routes
- Makes it testable independently  
- Allows reuse across projects

Tried putting it in a shared utility first, but that led to 
import cycles. Middleware approach is cleaner."

Extracted decisions:
1. "Auth as middleware vs. utility function"
   - Decided: middleware
   - Why: eliminates import cycles, cleaner separation
   - Alternative tried: utility function (caused cycles)

2. "Extract auth from scattered route handlers"
   - Enables: independent testing, reuse across projects
```

### Chat excerpt
```
User: We're hitting rate limits with the Stripe API. Considering 
      batching requests, but unsure if it'll break our real-time 
      transaction model.
AI: What if you buffered for 100ms?
User: Maybe. We're leaning toward just buying higher limits for now.
      Easier than redesigning the flow.

Extracted:
- Problem: "Stripe API rate limiting"
- Options considered: 
  * Batch requests (uncertain: might break real-time model)
  * Buffer for 100ms (proposed, not decided)
  * Buy higher limits (leaning toward this)
- Decision: "Likely buying higher limits"
- Status: "Proposed, not yet finalized"
- Open question: "Will batching work with real-time model?"
```
