---
name: typescript-testing
description: Choose and design the smallest honest test layer for TypeScript backend, frontend, or shared-library behavior. Use when deciding where a TypeScript test belongs or shaping its seam; defer runner-specific syntax and configuration to the repository or an installed framework-testing skill.
---

# TypeScript Testing

Choose the lowest-cost layer that can observe the requested behavior without replacing the behavior with mocks. Inspect nearby tests, test configuration, package metadata, and public interfaces before choosing.

## Choose the layer

Use the first layer that can fail for the intended reason:

| Layer | Fits | Does not prove |
| --- | --- | --- |
| Pure unit | Deterministic domain logic, transformations, reducers, hooks with no runtime boundary | Framework wiring or serialization |
| Component or module integration | Dependency injection, middleware, controllers, persistence adapters, or UI rendering and interaction | A deployed process or browser journey |
| Boundary contract | Provider-consumer compatibility across a process or ownership boundary | End-to-end business flow |
| End to end | Routing, browser behavior, authentication flow, or a journey spanning several real components | Every internal edge case |

Escalate only when the smaller layer cannot observe the failure. For a regression, test at the first public seam where the defect was visible. Do not add a browser test for behavior a component or module test proves faithfully.

When the task is specifically provider-consumer compatibility, use a contract-testing workflow. When runner mechanics matter, use the repository's established Vitest-, Jest-, or Playwright-like guidance rather than duplicating it here.

## Shape an honest test

- Name the observable behavior and its independent oracle before arranging fixtures.
- Exercise a public API, rendered interaction, request boundary, or exported type. Avoid private methods and internal call choreography.
- Use real collaborators within the selected layer. Replace only boundaries that are unavailable, nondeterministic, destructive, or outside the test's ownership.
- Prefer typed builders with meaningful defaults over broad fixture objects. Keep deliberate type failures explicit and localized; do not weaken production types to make test data easy.
- Control clocks, randomness, network responses, and process state explicitly, then restore them. Each test must remain order-independent.
- Assert outcomes and externally meaningful side effects. Call counts are useful only when the count is itself contractual behavior.
- Treat snapshots as reviewable data, not as an oracle generator. Keep them small and require a reason for any update.

Static type checks prove type relationships, not runtime behavior. Use compile-time assertions for public type contracts and runtime tests for parsing, validation, rendering, and execution.

## Verify proportionately

Run the repository's narrowest supported target while iterating. Confirm that a new regression test fails for the expected missing or broken behavior before accepting it as evidence. After it passes, run the affected package or suite and any required type, lint, build, or browser checks.

Report which layer was chosen, why a smaller layer was insufficient, what was controlled, and the fresh outcomes. Do not infer whole-system confidence from a narrower check.
