---
name: research
description: Investigate a defined question against primary sources and return a cited, dated answer. Use for "research X", "find out", docs or API facts, comparing options, or as a background lane for another skill; not for plain codebase explanation (explain-codebase).
license: MIT
---

# Research

Produce an answer someone can verify without redoing the work. Runs fine as a background subagent: everything it needs is in the brief.

## Frame

State before searching, inferring from context where safe:

- **Question:** the decision or fact to settle.
- **Scope:** what is in and out; never widen into other accounts, private data, or date ranges.
- **As of:** today's date plus any version boundary.
- **Stop when:** the evidence that suffices, plus any time or cost limit.

Ask only if a missing boundary would change the work. With no human around, state the assumption in the output instead.

## Investigate

1. Go to the owner of each fact: official docs, specs, source, release notes, first-party APIs, original papers. Follow every claim back to its source; use secondary write-ups only to find primary ones, and label them.
2. Keep three things apart: documented fact, observed behavior, inference. Code proves what happens, rarely why.
3. Cite each claim beside the text it supports: stable URL, `path:line`, commit, issue or PR number, with access date when freshness matters.
4. Report contradictions, dead ends, and searches that found nothing. State confidence per claim.
5. Stop at the stopping condition or when new searches only repeat evidence.

When lanes are independent, delegate one subagent per source or subquestion, one level deep, each given the full frame and the return format. Verify the evidence behind consequential claims yourself.

## Return

Match the caller. A user asking for a document gets a file at the repo's existing notes location (or a stated sensible one). A parent agent or lane brief gets a compact reply in the body, no file unless asked, under about 300 words:

```markdown
**Question / as of:** ...
**Answer:** direct answer, with citations
**Evidence:** claim - source - confidence; contradictions
**Gaps:** unknowns, null results
```

Research does not implement, publish, or modify source systems.
