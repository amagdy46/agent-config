---
name: handoff
description: Write a handoff brief for another agent, session, or machine, or resume work from one. Use for "hand off", "write a handoff", "pick up where we left off", "take over from this brief or branch".
license: MIT
---

# Handoff

Two modes. Writing: leave a cold-start agent enough to continue. Resuming: reconcile a brief with live state and continue at the true resume point. Live state decides what exists now; the brief carries goals, rationale, and rejected options.

## Write

Check the live workspace first (branch, status, recent commits, referenced files); anything you cannot check goes under Unverified, not recalled from the conversation. Link existing specs, plans, issues, and diffs instead of copying them. Use repo-relative paths, URLs, PR numbers, and commit hashes; no host paths, session IDs, or secrets. Save where the user asks. Otherwise return it in the reply, or ask for a repo path if it must last.

```markdown
# Handoff: <work item>
## Goal and limits    (outcome, scope, what needs permission)
## Live state         (repo, branch/revision, working-tree state)
## Done               (outcomes and artifact pointers, no transcript)
## Verified           (claim - fresh check and result)
## Unverified         (inherited claims, assumptions, stale results)
## Decisions          (decision - why)
## Blockers and risks
## Resume point       (first action, its target, the observable sign it is done)
## Next               (up to three, ordered)
## Suggested skills   (what the next agent should load)
```

The resume point must be executable without guessing. "Continue implementation" is not; name the file, test, or decision and the success condition.

## Resume

1. Read the brief; extract goal, limits, decisions, done work, claims, resume point. Follow references only as needed.
2. Check the live state those claims touch, then sort them: **matches**, **drift** (live state changed or contradicts), **unknown**, **done**. Keep the brief's point unless live evidence shows the work moved; flag conflicts with documented decisions instead of overriding them.
3. Do not replay finished investigations or rewrites. Run a targeted check only to validate the resume point, guard a consequential unverified claim, or satisfy the next step's normal verification.
4. Open with a short capsule: where work stopped, what live state confirms or contradicts, the resume point, your next action. Then continue the authorized work. If the goal or authority cannot be recovered, ask.

Resuming does not widen scope or authorize pushing, deploying, or destructive actions.
