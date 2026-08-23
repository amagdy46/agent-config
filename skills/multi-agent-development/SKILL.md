---
name: multi-agent-development
description: Coordinate substantial development through bounded, dependency-aware delegation. Use when the user requests multi-agent, parallel, swarm, or delegated implementation and the work contains separable tasks; do not use for a small change or tightly coupled work that one agent should own.
---

# Multi-Agent Development

Own the program as coordinator. Delegate bounded work, preserve the user's scope and authority, and accept only integrated, freshly verified results.

## Decide the execution shape

Before spawning, state the done predicate and map each task's inputs, outputs, dependencies, writable surfaces, and verification.

- Run tasks concurrently only when they neither depend on one another nor write the same files, generated artifacts, branches, worktrees, services, or other mutable state.
- Keep shared-file, integration-sensitive, and producer-to-consumer work serial. A dependency is also a context relay: downstream briefs must include the accepted upstream result.
- Partition by independent ownership for implementation. Use identical briefs only for read-only exploration or competing proposals, with the selection rule declared first.
- Prefer a few coherent tasks over many tiny ones. Delegation overhead must be justified by parallelism, specialist focus, or context isolation.
- Give every writer an exclusive workspace or disjoint file/module ownership. Never assume concurrent edits will merge cleanly.

Record a compact task table with owner, scope, dependencies, state, and evidence. Execute dependency-ready tasks in waves and recompute readiness after each completion.

## Protect context and bound the tree

Keep architecture, cross-task decisions, integration, and final acceptance in the coordinator.

- Use a fresh implementer for each task when the host permits, with only a curated, self-contained brief rather than the coordinator's full history.
- Add a sub-coordinator only when one coordinator cannot reliably manage a distinct track. Bound the hierarchy to coordinator -> sub-coordinator -> implementers/reviewers; implementers and reviewers do not delegate.
- Make completions queue events. Finish the current coordination decision, then drain results together and update task state. Summarize evidence; do not accumulate raw agent transcripts in the main context.
- Reuse the same implementer for corrections so it retains task-local context. Use fresh reviewers so review is independent.
- Account for every spawned task as accepted, returned for correction, blocked, superseded, or abandoned. Never silently redo missing work and erase the coverage gap.

## Write complete briefs

Do not spawn until a worker could act without access to this conversation. Every brief includes:

```text
GOAL         one concrete outcome
SCOPE        owned paths/surfaces and explicit exclusions
CONTEXT      relevant requirements, interfaces, conventions, and accepted upstream results
ACCEPTANCE   observable criteria, one per line
VERIFY       exact focused checks and required broader checks
CONSTRAINTS  compatibility, safety, style, and side-effect limits
START        base revision/workspace and current known state
REPORT       status; files changed; decisions; commands and results; risks/blockers
```

Tell writers they share the repository with other work, must preserve unrelated changes, and must not edit outside ownership. Answer material questions before implementation; if the brief is wrong or incomplete, repair it rather than forcing progress.

## Run each task through its gates

For every implementation task:

1. The implementer inspects the assigned surface, implements only the brief, runs focused checks, reviews its diff, and reports evidence and concerns.
2. A fresh, read-only specification reviewer compares the actual changes with the complete brief. It reports missing requirements, extra scope, and concrete evidence.
3. If specification issues exist, the same implementer corrects them and the specification reviewer re-reviews. Repeat until clear or genuinely blocked.
4. Only after specification approval, a fresh, read-only quality reviewer checks correctness risks, maintainability, tests, boundaries, and fit with repository conventions.
5. The implementer fixes accepted quality issues; the quality reviewer re-reviews. Repeat until approved or genuinely blocked.

Review is evidence, not authority. The coordinator validates findings against repository context, rejects unsupported or out-of-scope suggestions, and never lets a reviewer mutate the work it judges. A worker's self-review does not replace independent review.

## Integrate and verify

After each wave, inspect the actual combined diff, confirm ownership did not overlap, relay accepted interfaces to dependents, and run the relevant integration checks. Do not accept summaries in place of repository evidence.

Before completion, the coordinator:

- reconciles every task and review outcome;
- reviews the complete change against the original request and excluded scope;
- runs fresh end-to-end or repository-level checks appropriate to the risk;
- confirms no stale review was invalidated by later edits;
- reports changed behavior, files, verification results, and remaining risks.

## Degrade without pretending

If the host lacks subagents, isolation, concurrent execution, or read-only reviewers, keep the same dependency map, briefs, ownership boundaries, ordered review criteria, and integration checks while executing serially in the current session. Separate implementation, specification review, and quality review into distinct passes and explicitly report that independent-agent review or parallelism was unavailable. Do not simulate concurrency through overlapping edits.

If delegation fails mid-run, preserve accepted evidence, reconcile partial changes, and continue serially when safe. Ask the user only when a blocker requires a material scope, product, or permission decision.

## Authority boundaries

Permission to implement or delegate does not imply permission to commit, push, open or update a pull request, merge, deploy, publish, delete, or modify external tracking systems. Perform such actions only when the user explicitly requests them or they are already an explicit part of the accepted workflow.
