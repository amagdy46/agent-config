---
name: refactor-safely
description: Restructure, rename, extract, inline, deduplicate, or move existing code while preserving observable behavior. Use for focused refactors and structural cleanup; do not use when the intended outcome changes product behavior or fixes a known defect.
license: MIT
---

# Refactor Safely

A refactor changes structure while holding the relevant behavior contract constant. If the work reveals a desired feature or bug fix, separate it from the structural change unless the user explicitly expands the task.

## Establish the pin

Before moving structure:

1. Trace the affected behavior, public and internal callers, side effects, data formats, and integration boundaries.
2. State the observable contract that must remain unchanged.
3. Create or identify a meaningful behavior pin: characterization tests, snapshots, golden files, baseline replay, contract tests, or an old-versus-new equivalence harness. Type checking and linting alone do not pin runtime behavior.

When no automated pin is practical, document the exact manual observation, its limitations, and the residual uncertainty. Do not claim equivalence from inspection alone.

## Choose the target shape

Name the problem the new structure removes: repeated policy, invalid states, tangled ownership, duplicated branching, broad mutable state, pass-through layers, or scattered representation knowledge. State the target module layout, types, interfaces, and call graph.

Prefer a domain-shaped structure when it deletes branches or impossible-state handling. Subtract before adding: remove dead code, redundant wrappers, stale references, and duplicate validation that are already proved unnecessary. Do not introduce abstractions for speculative reuse.

If the target changes a consequential interface or crosses several ownership boundaries, design that shape explicitly before editing.

## Move without changing behavior

- Work in small, reviewable steps and run the pin after each meaningful slice.
- Search beyond symbol references: strings, configuration, generated code, serialized names, routes, documentation, fixtures, deployment definitions, and consumers in other languages or repositories may encode the old shape.
- For an internal API whose callers can move together, inventory and migrate every caller, then delete the legacy path in the same change. Avoid indefinite dual APIs and compatibility shims.
- For public, externally consumed, persisted, or asynchronously deployed contracts, preserve compatibility or plan a staged migration with versioning, ordering, rollback, and eventual removal. Do not infer permission to break consumers.
- Keep cleanup relevant to the target. Revert speculative edits that do not reduce reader load or simplify the contract.

Do not rewrite history, force-push, rebase shared work, or split/reorder commits unless the user asked for that Git operation.

## Prove equivalence

Run the strongest relevant verification against the real artifact: focused and broad tests, baseline replay, output comparison, integration smoke test, or interactive exercise. Inspect the final diff for accidental behavior, data, configuration, and dependency changes.

Report the old and new structure, the behavior pin, verification evidence, caller or migration handling, reader-load improvement, and any remaining uncertainty. A successful refactor should make an important question easier to answer without adding new behavior.
