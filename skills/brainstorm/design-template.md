# Design document

## Planning folder

One folder per effort holds `design.md`, `plan.md` and `issues/`. Use the
folder named by a `Planning folder:` line in the project's `AGENTS.md` (it may
point into an Obsidian vault); otherwise `docs/plans/YYYY-MM-DD-<slug>/` in
the repository. Outside a repository, ask once where notes live.

## Template

```markdown
---
type: design
status: draft        # draft | approved | superseded
created: YYYY-MM-DD
tags: [design]
---

# <Effort name>

## Intent
<what this is, who it serves, and why now, in the user's words where possible>

## Success looks like
<observable outcomes>

## Goals / non-goals / anti-goals

## Constraints

## Decisions
- <decision>: <reason>. (user) or (my call)

## Left to the builder

## Open questions
<only for multi-session efforts; see the decision map below>
```

Mark every choice you made yourself as "(my call)" so the user can check those
while reading.

## Decision map (multi-session efforts)

When the effort cannot be agreed in one session, add three sections and keep
them current each session:

- **Frontier:** precise questions answerable now, each small enough for one
  session.
- **Fog:** in-scope areas not yet sharp enough to be questions.
- **Next decision:** the one question to resolve next, and why it is now
  answerable.

Resolve one frontier decision per session, record it under Decisions, promote
questions from fog to frontier, and stop when nothing consequential remains
between the current state and a plan.

## Builder check

Dispatch a fresh subagent with this prompt once `design.md` exists:

```
You are a capable <domain> builder handed this design document to plan from.
You cannot talk to its author. Read <path>.

Report only the questions you would still need answered before planning
well: places where you would have to guess and a wrong guess would matter.
For each, say why the answer changes the plan. Rank by importance. Skip
anything the document leaves to the builder or that you could reasonably
decide yourself. If nothing important is left, say so.
```

Sort the answers into three piles:

- **Answered already** by the conversation or the project: write the answer
  into the document.
- **Minor:** a sensible builder could settle it without changing what gets
  built. Settle it and mark it "(my call)".
- **Theirs:** only the user can answer, and the answer changes what gets
  built. Ask these in one message, most important first.

Without a subagent tool, read the document as that builder yourself.
