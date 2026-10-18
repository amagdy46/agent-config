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

Recommend one, with a one-sentence reason, unless the user already chose:

- **Native:** you implement every task in this session, then one fresh
  reviewer checks the whole branch. Best for a short chain of tightly coupled
  tasks.
- **Delegated:** a fresh subagent implements each task and a fresh reviewer
  checks it before its dependents start. Best for many tasks, or independent
  tasks that can run in parallel.

## Work the frontier

The tasks are a graph, not a list. The **frontier** is every task whose
blockers are done. For each task on it:

1. Build it test-first with the test-driven-development skill, at the seams
   the plan names.
2. Run the type checker and the task's tests often, and the full suite at the
   end of the task.
3. Commit with a message naming the task.
4. Mark it done in the plan checkbox, the issue file's `status`, or the
   tracker.

When delegating, give each implementer pointers instead of pasted context:
the design, the plan or ticket, the files and prior commits. Independent
frontier tasks may run in parallel, each in its own worktree; merge each one
back before starting the tasks it unblocks. Delegate one level deep.

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
