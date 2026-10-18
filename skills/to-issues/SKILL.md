---
name: to-issues
description: Break a design, plan or conversation into tracer-bullet issues with blocking edges, then publish them to GitHub Issues, Linear, or Markdown files (Obsidian-friendly). Use for "break this into issues", "create tickets", "make a backlog", "put this in Linear/GitHub".
license: MIT
---

# To Issues

Break the work into **tickets**: tracer-bullet vertical slices, each naming
the tickets that **block** it.

## 1. Gather

Work from the conversation, or read the `design.md` / `plan.md` / issue the
user points at, in full. Explore the code enough to use the project's own
vocabulary and to spot prefactoring that makes the work easier: make the
change easy, then make the easy change.

## 2. Slice

- Each ticket cuts a narrow but complete path through every layer (data, API,
  UI, tests) and is demoable or verifiable on its own.
- Each fits in one fresh agent context.
- Prefactoring tickets come first.
- A wide mechanical change (rename, retype) whose blast radius breaks
  everything at once is sequenced **expand, migrate in batches, contract**,
  each batch its own ticket blocked by the expand.

If a `plan.md` exists, its tasks are the raw material; merge tasks that only
make sense together into one slice, and record which task numbers each
ticket covers.

## 3. Check the breakdown

Review your own list before publishing: each blocking edge truly gates, no
ticket is a horizontal layer, none is too big for one context. The user asking
for issues is the go-ahead; tickets are cheap to merge, split or close
afterwards, so publish and let them adjust. Show the breakdown and wait first
only when the user asked to review it.

## 4. Publish

Use the tracker named by `Issue tracker:` in the project's `AGENTS.md`, or
the one the user named. With neither, write Markdown files in the planning
folder and mention the `Issue tracker:` line for next time. Publish in dependency order, blockers first, so edges can reference
real identifiers. Details per tracker: [trackers.md](trackers.md).

Each ticket body:

```markdown
## What to build
<the end-to-end behaviour, from the user's point of view>

## Acceptance criteria
- [ ] <observable check>

## Blocked by
<links to blocking tickets, or "None, can start now">

Design: <link to design.md or parent issue>
Plan: <link to plan.md>, tasks <numbers>   (when a plan exists)
```

Leave out file paths and code: they go stale, and the plan tasks the ticket
links hold the exact files and interfaces. The exception is a
decision-rich snippet from a prototype (schema, state machine, type shape).

Finish with the list of created tickets and the **frontier**: tickets with no
open blockers, ready to start. Leave parent issues unmodified.
