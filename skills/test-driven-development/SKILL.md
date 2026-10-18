---
name: test-driven-development
description: Build features and fix bugs test-first with red-green-refactor at agreed seams. Use for TDD, "write a failing test first", regression tests, or any behavior change with a testable seam.
license: MIT
---

# Test-Driven Development

If you did not watch the test fail, you do not know it tests the right thing. Production code follows a red test.

Skip TDD for throwaway prototypes, generated output, docs, and declarative config. Prefer no test to a test that only checks mocks, current internals, timing, or costly infrastructure for a small fix; run the closest executable check instead and say so.

## Seams

A **seam** is the public boundary where a caller observes behavior. Before the first test, write down the seams under test, each with one line on what it catches and misses, and state them in your update before writing tests (an accepted plan's interfaces already name them). With no adequate seam, say so; that is a design finding.

## Tests that earn their place

A test is a specification of behavior seen through the public interface. Judge each against two edits:

- **Break the behavior** (wrong value, skipped effect). The test must go red.
- **Change the internals**, observable results unchanged. The test must stay green.

Take the expected value from the requirement or a worked literal, never by recomputing it the way the code does. Mock only system boundaries (network, time, randomness); prefer real code and fakes. A payload a mocked external service receives is behavior; a call to an internal helper is not. Assert the error type callers branch on, not its wording.

## Vertical cycles

One behavior at a time, a tracer bullet through the seam. Never write a batch of tests, then a batch of code.

1. **Red:** write the smallest test for the next behavior. Run it. Confirm it fails because the behavior is missing; a syntax, fixture, or setup error is not red.
2. **Green:** write the least code that passes. Rerun it, then the project's whole suite; name any failure in your report, even one you did not cause.
3. **Refactor** on green only: names, duplication, structure. New behavior needs a new red.

Pass-on-first-run means the test covers existing behavior; fix the test. When a test fails, fix the code, not the assertion. A hard-to-write test signals a coupled design; simplify the interface.

## Bug fixes

Turn the minimal reproduction into a failing test at the seam where the bug appeared, watch it fail, then fix. Delete code written before its test and restart from the test. If implementation already exists and deleting loses the user's work, add a test that fails against the defect and record honestly whether you saw red.

Report the red and green commands with their outcomes.
