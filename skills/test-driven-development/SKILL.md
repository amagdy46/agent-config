---
name: test-driven-development
description: Develop behavior through deliberate red-green cycles at stable seams. Use when the user asks for TDD or test-first work, or when an implementation workflow explicitly composes this skill for behavior that has a suitable test seam; do not activate merely because any code is being edited.
---

# Test-Driven Development

Use TDD deliberately, not as a blanket ceremony. It fits behavior changes with a stable, executable seam and quick feedback. It may not fit throwaway prototypes, generated output, documentation-only work, declarative configuration, exploratory spikes, or changes whose only available test would be brittle or disproportionate.

## Choose the seam

A seam is the public boundary through which a caller observes behavior. Before writing a test, identify:

- the behavior and source of truth for its expected result;
- the public boundary under test;
- the smallest test level that faithfully reaches that behavior;
- external boundaries that must be controlled.

Use a seam already established by the design and repository. If the correct boundary is materially ambiguous, agree it with the user or resolve the design first. When this skill was composed from an accepted plan, treat the plan's defined seams and interfaces as that agreement.

Prefer behavior assertions through public interfaces. Avoid private-method tests, assertions about internal call order, snapshots without a meaningful oracle, and expected values recomputed with the same algorithm as the implementation. Mock only genuine system boundaries such as remote services, time, randomness, or costly infrastructure; prefer realistic fakes or test instances when practical.

If no adequate seam exists, say so. Use the closest honest executable check or propose a design seam rather than creating a test that produces false confidence.

## Work in vertical cycles

For one behavior at a time:

1. **Red:** write the smallest test that specifies the next observable behavior.
2. Run the narrow test and confirm it fails because the behavior is absent or wrong. A syntax, fixture, or setup failure is not useful red evidence.
3. **Green:** write only enough production code to satisfy that behavior.
4. Run the narrow test, then proportionate nearby checks.
5. **Refactor:** improve names or structure while behavior stays green; do not add behavior without a new red cycle.
6. Continue with the next vertical slice, letting each cycle inform the next.

Do not write a horizontal batch of imagined tests followed by a batch of implementation. Do not weaken assertions, rewrite the expected behavior to match a wrong implementation, or retain speculative production code not demanded by a test or requirement.

## Existing implementation

If implementation already exists before this workflow begins, do not delete user work merely to manufacture test-first history. Establish the intended behavior, add a test that would fail against the known defect or missing behavior, and record honestly whether failing-before evidence was observed. For a bug fix, keep the regression at the seam where the bug actually appeared.

Report the exact red and green commands and outcomes. TDD evidence proves the behavior under those checks; it does not by itself prove the entire feature or system is complete.
