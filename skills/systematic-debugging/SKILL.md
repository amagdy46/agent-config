---
name: systematic-debugging
description: Diagnose bugs, failures, regressions, and unexpected behavior by building a reproducible signal and testing evidence-backed hypotheses. Use for diagnosis requests and before attempting a bug fix; preserve a diagnosis-only boundary when the user has not asked for a fix.
---

# Systematic Debugging

Find the cause before changing the behavior. Match the work to the user's requested mode:

- **Diagnose:** investigate and report the most strongly supported cause. Do not implement a fix.
- **Fix:** investigate first, then make the smallest justified change and prove the original symptom is gone.

Do not treat a request to explain a failure as permission to edit source, configuration, infrastructure, or external systems.

## Establish the signal

Write down the reported symptom, expected behavior, affected surface, and known conditions. Read complete errors and traces; inspect relevant recent changes, configuration, state, and working examples.

Build the narrowest repeatable check that exercises the real failure path. Prefer, in order of fit rather than dogma:

- an existing focused test or command;
- a request, CLI, or browser reproduction;
- a replayable fixture, trace, or minimal harness;
- a measured profiler or query-plan comparison for performance issues.

Run it and confirm it fails for the user's symptom, not a nearby problem. For intermittent failures, increase the reproduction rate and record it. If no runnable reproduction is possible, state what evidence is missing and request a redacted artifact, access, or narrowly scoped instrumentation instead of guessing.

Never expose secrets while collecting evidence. Redact credentials, tokens, cookies, personal data, and sensitive payload fields from commands and quoted output.

## Locate the cause

Minimize the reproduction when useful, removing one condition at a time. Trace incorrect values or state backward through callers and across process, API, queue, database, or filesystem boundaries. At each boundary, compare what entered with what left and verify the configuration actually in effect.

Form a small ranked set of falsifiable hypotheses. For each, state the evidence for it and the observation that would disprove it. Test one variable at a time with the least invasive probe. Prefer debuggers and existing telemetry; tag any temporary instrumentation so it can be found and removed.

Do not add a guard merely because it silences a symptom. Check whether restart-only failures point to persisted state, caches, locks, or serialization. Compare against a nearby working path before inventing a new pattern.

## Stop at the authorized boundary

For diagnosis-only work, stop after reporting:

1. the reproduction or best available signal;
2. the supported root cause, or ranked remaining hypotheses;
3. evidence and confidence;
4. the smallest plausible remedy and how it would be verified, clearly labeled as a proposal.

Do not patch, refactor, or clean up the code in this mode.

For an authorized fix:

1. Convert the reproduction into a regression check at a seam that represents the real failure, when such a seam exists.
2. Observe it fail for the intended reason.
3. Apply one focused root-cause fix without unrelated cleanup.
4. Observe the regression check pass and rerun the original reproduction.
5. Remove temporary instrumentation and artifacts; run proportionate nearby checks.

A poor test at an artificial seam is worse than documenting that no adequate seam exists. If several well-formed hypotheses or fix attempts fail, stop stacking changes. Reassess the reproduction, environmental assumptions, and architecture, then report the impasse before widening scope.
