---
name: architecture-design
description: Design or reshape a module, interface, seam, or subsystem before coding, or restructure existing code without changing behavior. Use for "design this", "architect", "refactor", "restructure", extract/move/rename/dedupe, or unclear ownership; skip routine edits that fit an established shape.
license: MIT
---

# Architecture Design

Build **deep modules**: much behavior behind a small interface, placed at a clean seam, change local. Designing does not authorize implementing; ask before building anything with an unresolved choice.

## Ground

Read the code, tests, contracts, and history; trace how callers use the current shape and where state and side effects live. Separate technical invariants from project convention. Fix fuzzy domain terms first (one name per concept), and look for rules scattered across branches or states the domain forbids. If the repo has a `GLOSSARY.md` or ADRs, use their vocabulary and do not re-litigate them.

## Design caller-first

Write representative caller code first, then derive the interface: invariants, ordering, errors, config, performance. Validate where untrusted data enters; keep transport and storage shapes private.

- **Deletion test:** delete the module in your head. Complexity vanishes means pass-through; it reappears across N callers means it earns its keep.
- **The interface is the test surface.** Needing to test past it means the wrong shape.
- **One adapter is a hypothetical seam, two is real.** Add a seam only for real variation, an external boundary, or a test substitute.

Design it twice. For a consequential choice, sketch two or more structurally different shapes (for example: smallest possible interface; most common caller trivial; ports and adapters). Give independent subagents different constraints when available. Compare on leverage (capability per concept learned), locality (one change, one place), reader load, failure containment, and migration cost. Pick one and say why; offer a hybrid if parts combine. Skip this when one local pattern clearly fits.

Reject a shape when callers coordinate many methods, framework or storage choices leak across modules, layers only forward arguments, modules split by phase instead of knowledge, or extension points lack a present second use.

## Refactor safely

Structure changes, behavior holds.

1. **Pin first.** State the observable contract and pin it: characterization tests, snapshots, golden files, replay, or old-vs-new comparison. Types and lint do not pin runtime behavior; with no automated pin, name the manual check and the residual doubt.
2. Name the problem the new structure removes. Subtract before adding: dead code, wrappers, duplicate validation.
3. Move in small steps, running the pin after each. Search beyond symbols: strings, config, routes, serialized names, docs, fixtures, other repos.
4. **Migrate callers, then delete the legacy API in the same change** when all callers can move together. No dual APIs or shims. For public, persisted, or independently deployed contracts, stage it: version, order, rollback, removal date.
5. Keep features and bug fixes out of the diff unless the user widens the task.

## Deliver

Recommended shape, caller usage, interface or type sketch (unimplemented signatures or pseudocode), module map, invariants, rejected alternatives and trade-offs, verification, migration notes. For a refactor: old and new structure, the pin, evidence it still holds, and remaining uncertainty.
