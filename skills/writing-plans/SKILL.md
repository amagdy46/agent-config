---
name: writing-plans
description: Turn accepted requirements into an implementation plan made of ordered, independently verifiable units with explicit files, interfaces, dependencies, and checks. Use when the user asks for a plan or when complex work needs planning before implementation; this skill plans only and does not edit implementation files.
license: MIT
---

# Writing Plans

Produce a plan, not the implementation. Inspect the repository and relevant documents with read-only operations. Do not change source, configuration, tests, dependencies, branches, commits, tickets, or external systems while using this skill.

## Ground the plan

Identify the goal, accepted requirements, exclusions, constraints, current behavior, and success evidence. Cite the source for consequential requirements. Resolve repository structure and existing patterns before naming files or interfaces.

Do not hide uncertainty behind a detailed-looking plan. Record assumptions, open decisions, and missing access. Ask only when a missing decision would materially change the architecture or work; otherwise state the reasonable assumption used.

## Design the delivery sequence

Map the components and files that will be created, modified, or retired, with one clear responsibility each. Follow established structure unless a deliberate restructuring is part of the accepted scope.

Break work into the smallest units that:

- deliver one coherent behavior or structural transition;
- end in an observable, independently runnable check;
- could be reviewed or rejected without invalidating unrelated units;
- leave the repository in a coherent state;
- expose dependencies on earlier units.

Order units so the sequence proves itself: characterization before behavior-preserving change, contract before consumer, migration before legacy removal, failing regression before repair when appropriate. Avoid tasks that are only scaffolding, vague cleanup, or a layer-wide batch with verification deferred to the end.

## Required content

Begin with:

- **Goal** and user-visible outcome
- **Scope / exclusions**
- **Approach** and consequential tradeoffs
- **Constraints and assumptions**
- **Verification strategy** for the complete outcome

For every implementation unit include:

1. **Outcome:** the coherent change the unit leaves behind.
2. **Files:** exact paths to create, modify, test, or remove, with responsibilities.
3. **Interfaces:** exact contracts consumed and produced, including names and data shapes where known.
4. **Dependencies:** preceding units, migrations, fixtures, services, or decisions required.
5. **Steps:** concrete actions in execution order, including the intended testing seam.
6. **Verification:** an exact command or real-surface procedure and its expected observation.
7. **Risks / rollback:** only when the unit changes persistent data, public contracts, infrastructure, or other hard-to-reverse state.

Use code sketches only when they resolve ambiguity about an interface or algorithm; do not pre-implement every file in prose. Never use placeholders such as “handle edge cases,” “add tests,” or “similar to above.” Name the cases, checks, and paths.

## Self-review and handoff

Before presenting the plan, check every material requirement maps to a unit, interfaces agree across producers and consumers, paths exist or are explicitly created, dependencies are acyclic and ordered, and every unit has a credible check. Report any coverage gap instead of calling the plan ready.

End with the plan location if one was requested and the unresolved decisions, if any. Do not start execution or infer authorization to create a worktree, commit, push, or open a pull request.
