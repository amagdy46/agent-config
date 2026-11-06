---
name: implement
description: Execute an approved plan or set of issues to completion, task by task, with tests, verification and review. Use for "implement this", "build the plan", "work the issues", "start on ticket X".
license: MIT
---

# Implement

Build what the approved plan or tickets describe. If the user names a ticket,
fetch it and state its title before starting; if the reference is ambiguous,
ask.

## Pick an execution mode

Choose one yourself, unless the user already did, and state it with a
one-sentence reason:

- **Native:** you implement every task in this session, then one fresh
  reviewer checks the whole branch. Best for a short chain of tightly coupled
  tasks.
- **Delegated:** a fresh subagent implements each task and a fresh reviewer
  checks it before its dependents start. Best for many tasks, or independent
  tasks that can run in parallel.

Without subagent tools, run Native and do the final review as a separate
pass yourself, re-reading the diff against the plan; report that no
independent reviewer was available.

## Work the frontier

The tasks are a graph, not a list. The **frontier** is every task whose
blockers are done. For each task on it:

1. Build it test-first with the test-driven-development skill at the seams
   the plan names, unless the project's `AGENTS.md` sets a different testing
   rule; then follow that rule.
2. Run the project's fast checks during each cycle and its gate once at the
   end of the task, proving the change in the running app with the project's
   `verify-*` skill when it has one.
3. Commit with a message naming the task.
4. Mark it done in the plan checkbox, the issue file's `status`, or the
   tracker.

When delegating, give each implementer a fresh context (never a fork of this
session), an explicit model, and a brief file with pointers instead of pasted
context: the design, the plan or ticket, the files and prior commits. It
writes a report file and returns a short status. Keep progress in a
git-ignored ledger and trust it and `git log` over memory after compaction.
Cap each task's review-and-fix loop at three rounds, then rule on what is
open. For a long session with many tickets, use the orchestrate skill. Independent
frontier tasks may run in parallel, each in its own worktree branched from
the working branch; fold each back into the working branch locally before
starting the tasks it unblocks. That local integration is part of the task.
Merging into the default or a shared branch, or merging a pull request, still
needs an explicit ask. Delegate one level deep.

## Keep going

Continue between tasks without checking in. Stop and ask only when:

- the plan contradicts the code or itself and the choice changes what gets
  built;
- the next step is irreversible, touches production or data, or acts outside
  the repository;
- the same task has failed three times, which means the plan is wrong.

Record any call you made where the plan was silent, and report it at the end.

## Finish

Run the full suite and the verification-before-completion skill. Then review
the whole change with the code-review skill and fix what it finds. Report what
was built, the evidence, the calls you made, and anything left. Push or open a
pull request only when asked; the ci-pr-lifecycle skill covers that.
