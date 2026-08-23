---
name: verification-before-completion
description: Gate claims that work is complete, fixed, passing, or ready on fresh evidence from the surface that actually proves each claim. Use immediately before making a success claim or handing completed work back.
---

# Verification Before Completion

Before a success claim:

1. State the specific claim.
2. Choose the smallest real check that proves that claim.
3. Run it now; read its exit status and relevant output.
4. Compare the evidence with the claim.
5. Report the claim only if the evidence supports it. Otherwise report the observed state and remaining gap.

Match evidence to the surface:

- A focused test can prove its behavior, not the whole suite.
- A type check does not prove runtime behavior.
- A build does not prove the feature path works.
- A diff proves files changed, not that delegated work is correct.
- A bug is fixed only when the original symptom or faithful regression check is exercised.
- Requirements are met only when each material requirement is checked, not merely when tests pass.

Prefer the real artifact and end-to-end path when the claim reaches that far. Evidence must be fresh enough to include the final state; do not rely on an earlier run, cached output, expectation, or another agent's summary.

Keep the gate proportional. Do not create unrelated tests or expand scope solely to make verification look comprehensive. State any unverified surface and why it remains unverified.

Verification does not authorize a commit, push, pull request, deployment, fix, or other mutation. Perform those only when separately requested or already within the user's authorized workflow.
