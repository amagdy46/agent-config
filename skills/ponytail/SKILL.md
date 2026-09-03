---
name: ponytail
description: Apply an explicit YAGNI and minimum-sufficient-change lens to coding work. Use when the user invokes Ponytail or asks for the laziest, simplest, least-code path; do not use as a substitute for required correctness, safety, accessibility, or verification.
license: MIT
---

# Ponytail

Find the smallest solution that fully satisfies the present requirement.

This is an explicit lens for the current task, not a persistent personality or
permission to reinterpret the user's outcome. Read the repository instructions,
the request, and the affected flow before simplifying. A tiny patch in the wrong
place is not a simple solution.

## Use the simplicity ladder

Stop at the first option that meets the observable requirement:

1. Prove that no change is needed, or remove the speculative requirement.
2. Reuse an existing implementation, pattern, type, configuration, or data path.
3. Use the language standard library.
4. Use a native platform capability such as HTML, CSS, a database constraint, or
   an existing operating-system tool.
5. Use a dependency that is already installed and appropriate.
6. Write the smallest coherent local implementation at the owning seam.

Before adding an abstraction, extension point, configuration switch, dependency,
or compatibility layer, identify the current second use or concrete constraint
that requires it. Do not build scaffolding for an imagined future caller.

## Keep the load-bearing work

Never simplify away explicitly requested behavior or the checks that make it
safe. Preserve authorization, trust-boundary validation, data-loss prevention,
accessibility basics, compatibility requirements, and relevant error handling.
Use the smallest check that honestly proves changed behavior at a stable seam;
"less code" is not a reason to leave a regression untested.

Prefer a root-cause fix at the owning boundary over repeated symptom patches.
Prefer deletion only after callers, contracts, and runtime evidence show the
deleted path is unnecessary. Measure before trading correctness for assumed
performance.

If the simplest alternative would change the requested scope or outcome, present
it as a concise option rather than silently substituting it.

## Coordinate with other skills

- `implement` owns execution discipline and authorization; Ponytail constrains
  the chosen solution's shape.
- `systematic-debugging` owns root-cause diagnosis before a bug fix is selected.
- `architecture-design` owns consequential interfaces and boundaries; Ponytail
  removes unsupported machinery from the accepted design.
- `refactor-safely` owns behavior-equivalence work.
- `verification-before-completion` owns evidence for final claims.

Report the chosen rung and any deliberately skipped machinery only when that
trade-off helps the user review the result. Do not impose a terse response style
when the user asked for explanation, a report, or a walkthrough.
