---
name: handoff
description: Create a compact, portable continuation brief with verified and unverified state separated and one exact resume point. Invoke explicitly when transferring work to another agent, session, or machine; do not use for a final project report.
license: MIT
---

# Handoff

Leave enough durable context for a cold-start agent to continue without replaying the conversation.

Inspect the live workspace with read-only checks before writing the brief when it is available. Do not claim an item is current merely because it appeared earlier in the conversation. If the current state cannot be checked, put the claim under **Unverified**.

Keep the brief portable:

- Use repository-relative paths, stable URLs, issue or PR identifiers, branch names, and commit hashes.
- Avoid absolute machine paths, transcript locations, session identifiers, local tool databases, or assumptions about one agent host.
- Point to existing specs, plans, diffs, and decision records instead of copying them.
- Never include secrets, credentials, private tokens, or unnecessary personal data.

Write to the user-requested location. If none was requested, return the brief directly or ask for a repository-relative destination when durability is required. Do not silently put it in a host temporary directory.

## Brief contract

```markdown
# Handoff: <work item>

## Goal and boundaries
<desired outcome, in-scope work, exclusions, and authorization limits>

## Current live state
<workspace/repository, branch or revision, relevant working-tree state, and what exists now>

## Completed
<durable outcomes and artifact pointers; no transcript recap>

## Verified
- <claim> — <fresh command/check and result, with time if freshness matters>

## Unverified
- <inherited claim, assumption, stale result, or unknown that still needs checking>

## Decisions and constraints
- <decision or constraint> — <rationale/evidence pointer>

## Blockers and risks
- <only active blockers or material risks>

## Exact resume point
<the first action, its target, and the observable result that means it is complete>

## Next after that
1. <up to three ordered follow-on actions>

## Relevant artifacts
- <repository-relative path, URL, issue, PR, or commit>
```

Make **Exact resume point** executable without guessing. “Continue implementation” is not exact; name the file, decision, test, investigation, or review to perform and its success condition.

This skill only creates the brief. It does not commit, push, publish, launch another agent, or perform the resumed work unless the user separately requests that action.
