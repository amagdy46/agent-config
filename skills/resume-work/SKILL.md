---
name: resume-work
description: Take over work from a supplied handoff, trail, branch, or prior-session artifact by reconciling it with live state and continuing at the true resume point. Use on a clear takeover request; do not use for general history recall or a same-session “continue.”
license: MIT
compatibility: Needs git and file access; transcript or session-export access is optional.
---

# Resume Work

Treat the supplied trail as preserved intent and history. Treat live state as the authority for what exists now. Continue without paying again for work that is already complete.

## Reconcile the takeover

1. Read the supplied handoff or trail first. Extract the goal, scope and authorization boundaries, decisions, completed work, verified and unverified claims, blockers, artifacts, and stated resume point. Follow references only as needed; do not mine unrelated sessions or workspaces.
2. Inspect the live state that bears on those claims: current repository and branch, working-tree changes, recent commits, referenced files, active reviews or tickets when accessible, and relevant running or deployed state when already in scope.
3. Compare the two records explicitly:
   - **Matches:** inherited claims confirmed by live state.
   - **Drift:** live state changed after the trail or contradicts it.
   - **Unknown:** consequential claims that remain unverified.
   - **Done:** outcomes already present and not to be repeated.
4. Recompute the exact resume point from that comparison. Prefer the supplied point when it is still valid; move it only when live evidence shows the work advanced, regressed, or diverged.

Live state wins on current reality: files, commits, status, deployed versions, and open/closed records. The trail remains valuable for goals, rationale, rejected options, and prior observations. A later file does not by itself erase a documented decision; call out the conflict.

## Avoid replay

Do not rerun prior investigations, reproduce already-characterized failures, rewrite completed changes, or re-read broad areas solely to feel confident. Run a targeted check when it is necessary to:

- establish whether the resume point is still valid;
- protect against consequential stale or unverified state; or
- satisfy the next work step's normal verification requirement.

Say what was inherited and what, if anything, had to be redone. If the trail is incomplete, inspect the smallest live surface that closes the gap.

## Continue

Before acting, give a short takeover capsule:

- where the prior work stopped;
- what live state confirms or contradicts;
- the exact resume point; and
- the next action you will take.

Then continue the already-authorized work from that point. The takeover does not expand the original scope or authorize external publishing, deployment, destructive operations, or other actions that still require permission. If the goal or authority cannot be recovered safely, stop and ask for the missing direction rather than inventing it.
