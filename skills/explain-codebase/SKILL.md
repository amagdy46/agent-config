---
name: explain-codebase
description: Explain how existing code works, and when asked why it is shaped that way. Use for "how does X work", walkthroughs, "where should this live", "why is this here", and design rationale. Read-only.
license: MIT
---

# Explain codebase

Build the user's mental model of existing code without changing anything. No edits, tickets, or files on disk unless asked.

## How (mechanics)

Anchor on real entry points and read the code; names and folder shapes mislead. Trace trigger, receiving boundary, validation and decisions, state change, side effects, failure and cleanup, following callers, callees, types, config, and tests as needed. For a cross-cutting subsystem, split into slices (request path, state model, integrations) and reconcile overlaps; use parallel read-only subagents if available. Scale effort to the question: one function needs no history sweep.

For a placement question, show which layer owns the invariant or side effect and why the current design implies it.

## Why (rationale)

Start from the code anchor: `git blame -L`, `git log --follow`, then PR and issue discussion for the substantive commits (`gh pr view`), and docs, ADRs, or chat if reachable. Report what the record states; mark the rest as inference ("appears to"), with competing explanations. Record searches that found nothing. Code never proves intent.

## Explain

Lead with what the thing is and its job here. Then give one concrete request or event walked from trigger to effect, where state and responsibilities live, and sharp edges. One stable name per concept. Add a diagram only where prose cannot show a relationship, built in stages when there are three or more parts.

Cite `path:line` or symbol, and commits or PRs only where they carry a claim. Keep direct evidence, inference, and unknowns distinct. If the target is ambiguous, state your reading and proceed. For critique, explain the current design first, then separate observed problems from preference.

Return the explanation, not a log of how you investigated.
