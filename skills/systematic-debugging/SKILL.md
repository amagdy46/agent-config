---
name: systematic-debugging
description: Find the root cause of bugs, test failures, regressions, flaky or slow behavior before fixing. Use for "debug this", "diagnose", "why does X fail", anything broken, throwing, or slow, and before proposing any fix.
license: MIT
---

# Systematic Debugging

No fix before the root cause. Diagnosis-only requests end with a report; edit only when the user asks for the fix. Redact credentials, tokens, and personal data from every command and quoted output.

## 1. Build a tight red loop

This is the skill; every later step consumes it. Build one command that goes **red** on the user's exact symptom, run it at least once, and show its output. **Tight** means fast, deterministic, and runnable unattended.

Try, in order: a failing test at the seam that reaches the bug; a curl/CLI run against a fixture; a headless browser script; a replayed captured trace; a throwaway harness; a fuzz loop; a bisection harness (`git bisect run`); old-versus-new diff. A human-driven script is the last resort.

- Read complete errors, traces, and recent changes first.
- Flaky bug: raise the reproduction rate (loop 100x, add stress, pin seeds and time) until it is debuggable.
- Performance: baseline with a profiler or query plan, then bisect.
- No loop possible: keep going with the evidence that exists (logs, traces, core dumps, metrics, history, `git log`), keeping confirmed causes separate from hypotheses. Ask only for the one missing artifact, access or instrumentation that would settle the next check, and list what you tried.

## 2. Confirm and minimise

Check the loop shows the user's failure, not a neighbour. Cut inputs, config, and steps one at a time, rerunning after each, until every remaining element is load-bearing.

## 3. Hypothesise

Write 3-5 ranked hypotheses, each falsifiable: "if X is the cause, changing Y makes the bug vanish". A hypothesis with no prediction is a vibe; sharpen or discard it. Show the list to the user before testing, and proceed on your ranking if they are away. Compare against a nearby working path and list every difference.

## 4. Instrument

Each probe answers one prediction; change one variable at a time. Prefer a debugger over logs. At each boundary (process, API, queue, database), log what enters and what leaves, and check the config in effect. Trace bad values backward to where they first went wrong. Tag temporary logs with a unique prefix such as `[DEBUG-a4f2]`. A failure that appears only after restart points to persisted state, caches, locks, or serialization.

## 5. Fix at the root

Fix the first place the system went wrong. Ask whether the state that triggered the symptom is legitimate: if so, handle it there; if it should never exist, find what produced it. A guard, retry, swallowed error, or clamp that silences the symptom hides the bug. Search for the same fault elsewhere and fix every instance.

1. Turn the minimal repro into a regression test at a seam that matches the real failure; with none, report that gap as a finding.
2. Watch it fail, apply one focused fix, watch it pass.
3. Rerun the original loop on the un-minimised scenario.

Three failed fixes mean a wrong model or architecture: stop stacking changes, reassess the loop and assumptions, and report before widening scope.

## 6. Clean up

Remove tagged instrumentation (grep the prefix) and throwaway harnesses. State the confirmed hypothesis in the commit or report so the next debugger learns. Use the verification-before-completion skill before claiming it fixed.
