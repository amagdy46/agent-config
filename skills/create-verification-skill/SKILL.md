---
name: create-verification-skill
description: Write a project's own verify-<app> skill that tells any agent how to launch the app from scratch, drive a feature like a user, capture evidence and clean up. Use for "make a verification skill", "how do agents prove changes work here", or when agents keep claiming done without running the app.
license: MIT
---

# Create Verification Skill

Produce `.claude/skills/verify-<app>/SKILL.md` (or the project's skills
folder) so an implementer reading it cold, mid-task, can prove its change works
in the real app. Interview the repository, not the user.

## 1. Learn the repository

Find the surface (web, CLI, API, worker), how it runs locally, how an agent can
drive it (reuse existing Playwright, scripts or seeds before inventing any),
what evidence matters, and whether two instances can run side by side without
sharing a port, database or lock. If the checkout does not build, fix or
report that first.

## 2. Write the skill

Sections, with real commands and no placeholders:

- **Launch:** from an empty data directory, with migrations and seed data,
  on a port and database unique to this worktree. Ready means usable, not
  "the port answers". Include teardown.
- **Doctor:** one read-only check that this instance is worth driving.
- **Drive:** real selectors, routes and commands from the repository, using
  stable handles, never coordinates.
- **Evidence:** go through the real user path, not internal setters; capture
  the action and the resulting state; check side effects (rows, sent mail,
  files); mock only at existing production boundaries.
- **Cleanup:** stop only what you started; keep the evidence.

Put helper scripts beside the skill and show how to call them.

## 3. Seed a feature map

`features/README.md` in the skill folder, plus one file for each of the three
to five main user-facing features, each with: sub-features, how a user reaches
it, how to drive it here, gotchas. An unmet precondition is a gotcha; never
weaken a journey to make it pass.

## 4. Prove it

Run launch, doctor, drive one feature, capture evidence and clean up, then
confirm the evidence survived. A skill never executed is a draft; say so.
Point the project's `AGENTS.md` at the new skill.
