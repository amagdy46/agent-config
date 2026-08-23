---
name: ci-pr-lifecycle
description: Inspect or drive a branch, pull request, and continuous-integration lifecycle with explicit mutation boundaries. Use for PR readiness, CI status, authorized retries, pushes, or PR creation and updates; never merge.
---

# CI and PR Lifecycle

Choose one mode from the user's request. Do not turn inspection into mutation.

## Check mode

Check mode is read-only. Inspect the current revision, working-tree changes, branch and base relationship, existing pull request, review state, and remote checks. Identify whether the evidence corresponds to the current head revision.

Classify each required check as pending, successful, failing, cancelled, skipped, or unavailable. A local test run is useful context but is not remote CI evidence. A stale check from an earlier revision does not establish readiness.

Return the pull request identity, head revision, base, material diff scope, review state, terminal check summary, and concrete blockers. If checks are still running, say the state is non-terminal; wait or monitor only when the user requested that behavior.

## Drive mode

Drive mode includes any external write: pushing, creating or editing a pull request, retrying or cancelling a check, posting comments, changing labels or reviewers, or marking readiness. Each action requires authorization from the current request or a subsequent explicit instruction. Authorization for one mutation does not authorize the others.

Before a push or pull-request change:

- confirm the intended branch, base, and current revision;
- preserve unrelated user work and inspect the complete diff;
- run the repository's required local verification and report failures honestly;
- derive title, description, and verification claims from the actual diff and fresh evidence.

After every remote mutation, read back the remote state. For a new revision, follow required checks to terminal results when the request is to drive the lifecycle. Report the final remote revision and the terminal result, not merely that a request to start work was accepted.

## Retry discipline

Inspect the failing job and its logs before retrying. Retry only when authorized and when the failure is plausibly transient or the revision/environment has changed. Do not repeatedly rerun an unchanged deterministic failure. Unless the user sets a different bound, perform at most one retry for the same failing job on the same revision, then report the persistent failure and needed next action.

Stop on missing access, ambiguous target, branch divergence that changes the intended update, or a required check that cannot reach a terminal state. Never merge, enable automatic merge, or bypass required checks, even when the rest of the lifecycle is green.
