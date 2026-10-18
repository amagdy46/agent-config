---
name: ci-pr-lifecycle
description: Check or drive a branch, PR, and CI through to a finished state. Use for "is this ready", "CI status", "open a PR", "push and watch CI", "retry the failed job", or finishing a branch. Never merges without an explicit ask.
license: MIT
---

# CI and PR Lifecycle

Pick the mode from the request. Checking never mutates; driving writes only what was asked.

## Check (read-only)

Read the head revision, working tree, base, existing PR, reviews, and remote checks. Confirm the checks ran on the current head; stale checks and local test runs do not count as CI. Classify each required check as pending, passing, failing, cancelled, skipped, or unavailable. Report PR, head, base, diff scope, review state, check summary, and blockers. Pending is non-terminal: wait only if asked.

## Drive

Pushes, PR creation or edits, comments, labels, reviewers, and check retries each need a go-ahead from the request. One approval covers only that action.

Before pushing or opening a PR:

1. Confirm branch, base, and head; keep unrelated user changes out.
2. Run the repo's required checks and the tests; if they fail, stop and report.
3. Review the full diff. Write the PR body from it and from fresh evidence:
   - **Summary:** the smallest view that makes the point (pseudocode, call tree, file tree, or diff sketch).
   - **Evidence:** before and after output, screenshot, or test run.
   - **Merge danger:** one-way or two-way door, and blast radius.
   Match the repo's PR template if it has one, and its domain terms.

After each remote write, read the state back. Follow the required checks on the new head to a terminal result and report that, not that a run was started.

## Failures

Read the failing job's logs before retrying. Retry only when authorized and the failure looks transient or something changed; at most once per job per revision, then report the persistent failure and the next step. Stop on missing access, an ambiguous target, divergence that changes the update, or checks that never finish.

## Finishing a branch

When work is done and tests are green, offer: push and open a PR, keep the branch, or (only if asked) merge locally or discard. Discarding needs the branch, commits, and worktree named and an explicit confirmation. Clean up a worktree only after its work is integrated, with the repo's worktree tool, never forced.

Never merge, enable auto-merge, or bypass required checks unless the user explicitly asks, even when everything is green; propose it and wait.
