---
name: research
description: Investigate a defined question using primary sources and produce a cited, time-bounded research artifact. Use for source-backed technical or product research; do not use for ordinary codebase explanation that needs no external or historical evidence.
license: MIT
compatibility: Needs web or other external source access for current primary sources; subagent delegation is optional.
---

# Research

Produce an answer another person can verify without repeating the investigation.

## Frame the investigation

Before searching, record:

- **Question:** the decision or factual question the research must answer.
- **Scope:** included topics, excluded topics, and permitted sources or systems.
- **As of:** the date, time zone when relevant, and any version or revision boundary.
- **Stopping condition:** what evidence is enough and any time, source, or cost limit.

Infer these from the request and nearby context when safe. Ask only when a missing boundary would materially change the work. Never silently widen a workspace, account, date range, or private-data scope.

## Investigate

1. Start with the sources that own the facts: official documentation, specifications, source code, release notes, first-party APIs, and original papers or records. Use secondary sources only to find or contextualize primary evidence, and label them.
2. Keep mechanics, documented intent, and inference separate. A code path proves behavior; it rarely proves why that behavior was chosen.
3. Cite claims close to the text they support. Prefer stable URLs, document identifiers, commit hashes, and repository-relative `path:line` references. Record access or publication dates when freshness matters.
4. Surface contradictory evidence, unavailable sources, and searches that returned no relevant result. Calibrate confidence instead of forcing a single story.

When independent source lanes would save time and delegation is available, delegate at most one level deep: one focused lane per source or subquestion. Give each worker the question, scope, as-of boundary, stopping condition, and required return format. Workers must not delegate again. Keep synthesis and citation checking in the parent session, and independently inspect the evidence behind consequential claims.

Stop when the framed stopping condition is met, additional searches repeat existing evidence, or a declared limit is reached. Do not continue merely to make the source list longer.

## Write the artifact

Save where the user requested or where the current project already keeps research. If neither is known, propose a repository-relative location or return the artifact in the response rather than inventing a global convention.

Use this compact structure, adapting it when the question benefits from another shape:

```markdown
# <Research question>

**Scope:** <included and excluded>
**As of:** <date/version boundary>
**Stopping condition:** <condition or limit>

## Answer
<direct answer and recommendation, with citations>

## Evidence
<claim-by-claim evidence, contradictions, and confidence>

## Gaps
<unknowns, unavailable sources, and material null results>

## Sources consulted
<primary sources first; note what each contributed>
```

Do not publish externally, modify source systems, or turn a research request into implementation. Those actions need their own authorization.
