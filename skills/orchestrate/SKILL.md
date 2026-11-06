---
name: orchestrate
description: Run a long session as the coordinator of implementer and reviewer agents working tickets in parallel worktrees, under the user's standing orders. Use for "orchestrate", "run the factory", "work the backlog", "keep agents busy", or any session that dispatches many implementers.
license: MIT
---

# Orchestrate

You coordinate; you do not write code. Read [preferences.md](preferences.md)
first: it holds the user's standing orders (models, concurrency, tracker,
review policy) and overrides the defaults below. The user edits that file so
they never have to repeat themselves; never ask for something it answers.

## Start, and restart after compaction

1. Read the ledger, `git log`, open pull requests, running agents and the
   tracker's current cycle. Trust these over your memory.
2. Run the project's smoke check on the default branch (its `verify-*` skill
   or `AGENTS.md`). If it is red, fixing it is the first ticket.
3. Pick ready tickets by the project's rules and claim each in the tracker
   before dispatching it.

## Ledger

Keep a git-ignored ledger file (the project's `AGENTS.md` may name one). One
row per ticket: id, state, branch, implementer and model, review round, pull
request, next action. Below it, the rulings. Update it at every state change,
in the same turn you update the tracker.

## Dispatch

- Keep the concurrency target busy. When an agent finishes, send the next
  dispatch in the same turn. Ready tickets with idle capacity is a bug.
- Before fanning out, scan the ready tickets for shared files, interfaces and
  migrations; serialise those or give them blocking edges. Run a new kind of
  work with one ticket end to end before parallelising it.
- Set the model explicitly on every dispatch. Give each agent a fresh
  context, never a fork of this one.
- Brief by file, not by paste: write the brief (ticket, acceptance criteria,
  files, constraints, the project's review checklist) to a file, have the
  implementer write its report to a file and return a short status.
- Implementers never dispatch agents; you dispatch every reviewer.

## Review loop

1. The implementer verifies its own work first (verification-before-completion
   and the project's `verify-*` skill) and self-reviews against the checklist.
2. Review only as often as preferences say. When a review runs, the reviewer
   is on a different model from the implementer and uses the code-review
   skill. Findings count only with evidence; all blockers in one pass.
3. Each re-review covers only the fix diff and answers ADDRESSED or NOT
   ADDRESSED per finding. Nits go in the ledger, not back to the implementer.
4. At three rounds, stop looping: escalate to the milestone reviewer, or rule
   on each open finding yourself. Never drop one silently.
5. A finding class that repeats across pull requests goes to the reflect
   skill, enforcement first.

## Rulings, not stalls

Decide ambiguities yourself and log `Ruling: what — why — cost if wrong`.
Stop for the user only for irreversible or outward-facing actions (merging
into a shared branch, force-pushing, deploying, messaging people, deleting
data), security-sensitive changes, product direction no experiment settles,
or a plan so broken that every path is a guess.

## Failures

- Rate or usage limit: switch to the fallback in preferences and retry. A
  limit never ends the session.
- Two failures on one ticket: a fresh implementer one model tier up, given
  the failure report. A third: park the ticket and comment why.
- Shared resources (test databases, ports, dev servers): never kill a
  process you did not start; wait for it.

## Report

Post a short status at each merge-ready pull request and whenever the user
writes: in flight, ready, parked, rulings since the last status. At the end,
list every ruling, parked ticket and lesson for the reflect skill.
