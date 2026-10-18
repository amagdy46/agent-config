---
name: writing-plans
description: Turn an approved design or clear requirements into an implementation plan of small, independently testable tasks with exact files, interfaces and checks. Use for "write a plan", "plan this out", or before multi-step work.
license: MIT
---

# Writing Plans

Write the plan for a capable engineer who has never seen this codebase or the
design. They write idiomatic code once they know the exact interface and the
exact test. What they cannot know is what you decided: which files, which
names and signatures, which values from the design, which tests prove each
task. The plan records those decisions and nothing else.

Read the design and the code first; plan only. If the design covers several
independent subsystems, propose one plan each.

**Where it goes:** `plan.md` next to `design.md` in the planning folder: the
folder named by `Planning folder:` in the project's `AGENTS.md`, otherwise
`docs/plans/YYYY-MM-DD-<slug>/`.

## Header

```markdown
---
type: plan
status: draft
design: ./design.md
---

# <Feature> Plan

**Goal:** <one sentence>
**Approach:** <two or three sentences, with the main trade-off>

## Global constraints
<version floors, naming rules, limits copied verbatim from the design>

## Review focus
<the inputs or failure modes the design implies but no task's test covers
yet, most likely first; give each a test in the task that owns the code>
```

## Tasks

A task is the smallest unit that carries its own test cycle and is worth a
reviewer's gate. Fold setup, config and docs into the task that needs them.
Order tasks so each one leaves the repo working: characterise before
refactoring, contract before consumer, migration before removing the old
path.

```markdown
### Task N: <outcome>

**Files:** create / modify / test, with exact paths
**Interfaces:** consumes <exact signatures from earlier tasks>;
produces <exact names and types later tasks rely on>
**Blocked by:** <task numbers, or none>

- [ ] Write the failing test: <test name and its assertions>
- [ ] Run `<command>`; expect it to fail with <message>
- [ ] Implement `<signature>` in `<path>`
- [ ] Run `<command>`; expect pass
- [ ] Commit
```

A step is done when the implementer can write exactly one reasonable thing
from it. Give signatures, test names, assertions and the design's exact
values; leave bodies to the implementer unless an algorithm is not determined
by them. **A plan longer than the code it describes has written the code
instead.** Lines that decide nothing ("handle edge cases", "add tests") are the
opposite failure.

## Self-review

1. **Coverage:** every requirement in the design maps to a task.
2. **Consistency:** names and types match across producing and consuming
   tasks.
3. **Review focus:** each line has its test in a task.
4. **Proportion:** if code blocks dominate, replace bodies with signatures and
   assertions.

Fix gaps inline and link the plan. If the user asked for the work itself,
continue into the implement skill; otherwise present the plan with the next
steps: tracked issues via the to-issues skill, or execution via implement.
