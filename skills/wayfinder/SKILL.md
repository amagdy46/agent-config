---
name: wayfinder
description: Build and advance a durable decision map for a large, foggy effort that cannot be responsibly planned in one session. Invoke explicitly for multi-session route-finding; this skill does not implement the destination or publish anything externally.
---

# Wayfinder

Find the route before planning or executing the destination. Use this only when the destination is meaningful but the decisions between here and there are still obscured, and the effort will span multiple sessions.

Wayfinding produces decision artifacts, not implementation. It does not authorize code changes, deployments, purchases, account changes, issue creation, messages, or external publication. A prototype or research activity may clarify a decision only when that activity is separately authorized and remains within the user's scope.

## The map

Keep one durable, portable map in a user-approved location. Prefer repository-relative Markdown. An issue tracker can host it only when the user has authorized those external writes.

The map contains:

```markdown
# <Effort name>

## Destination
<observable state that means route-finding is finished>

## Scope
<in scope, out of scope, constraints, and authorization boundaries>

## Decisions made
- <decision>: <rationale and evidence pointer>

## Frontier
- <the currently answerable, unblocked decision questions>

## Fog
- <important in-scope areas that cannot yet be phrased as precise questions>

## Open risks and assumptions
- <risk or assumption, owner/evidence, and status>

## Exact next decision
<one question to resolve next and why it is now answerable>
```

The **destination** sets the boundary. The **frontier** contains precise questions that can be decided now. **Fog** records in-scope uncertainty that is visible but not yet sharp enough to become a question. Do not manufacture a complete task breakdown inside the fog.

## Chart a route

1. Define the destination in observable terms. If it is already clear enough to plan and complete within one session, say that Wayfinder is unnecessary and stop routing through it.
2. Record scope, non-goals, constraints, and the actions this effort is not authorized to take.
3. Explore breadth-first. Capture the first answerable decision questions across the whole route, their dependencies, and the fog beyond them.
4. Put only unblocked, precisely stated decision questions on the frontier. Each should be small enough for one focused session and end in a decision, not a delivery milestone.
5. Choose the exact next decision. Save the map and stop unless the user also asked to advance it.

## Advance a route

1. Load the map at low resolution: destination, recent decisions, frontier, fog, and next decision. Read linked detail only when it bears on the current question.
2. Compare the map with live state and any newer evidence. Live state decides current reality; preserve recorded rationale unless evidence contradicts it.
3. Resolve one frontier decision in the session. Independent read-only research lanes may run together, but synthesize them into the single decision being advanced.
4. Record the decision once, with rationale and evidence pointers. Promote newly precise questions from fog to frontier, remove invalidated questions, and keep out-of-scope work out.
5. Set the exact next decision and leave a resume-ready map.

Stop wayfinding when no consequential decision remains between the present state and a plan someone can execute. State the resulting route and hand it to planning. Do not cross that boundary by starting the work.
