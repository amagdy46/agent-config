---
name: teach
description: Run a persistent, multi-session course in a dedicated learning workspace, with a mission, vetted resources, short HTML lessons, learning records, retrieval practice, and an explicit end condition. Use when learning is the project; do not use for a one-turn clarification or codebase explanation.
license: MIT
---

# Teach

Help the user build durable knowledge and skill across sessions. The workspace, not the conversation, holds continuity.

## Protect the workspace boundary

Use one dedicated learning workspace for one mission. Resolve its explicit path before writing. If the user has not named a workspace, ask where the course should live rather than assuming the current project, home directory, or installed skill directory.

Never write course state inside this skill's installation directory. Do not take over an existing software project unless the user explicitly chose it as the course workspace. Keep the workspace private by default: do not publish it, push it, share it, or copy its contents to external services without explicit permission. Record sensitive or employer-specific material only when the user chose an appropriately private workspace.

Read [references/workspace-format.md](references/workspace-format.md) before initializing or repairing a workspace. All paths described there are relative to the chosen course workspace, never this skill folder.

## Start or resume

On every invocation, inspect the workspace state before deciding what to do.

For a new course:

1. Interview the user about the concrete outcome, motivation, constraints, prior knowledge, and gaps.
2. Establish a baseline with a small conversation or task that reveals what the user can already explain or do. Do not equate familiarity with demonstrated understanding.
3. Agree on observable success criteria, milestones, and an end condition. Write `MISSION.md` only after these are clear.
4. Find and vet high-trust resources before teaching substantive claims. Record them in `RESOURCES.md`, with their purpose and limits.
5. Create only the workspace directories and shared assets needed for the first lesson.

For an existing course, read `MISSION.md`, `RESOURCES.md`, `NOTES.md`, relevant learning records, and the latest lessons or references. Continue from demonstrated learning, not from assumptions or the previous chat transcript.

Confirm before materially changing the mission, success criteria, or end condition. Record why the course changed.

## Choose the next teaching move

Use the mission, baseline, milestones, recent evidence, and elapsed time to decide among:

- introduce one new concept or skill;
- retrieve earlier material from memory;
- interleave related skills that the learner can already attempt;
- correct a misconception;
- practice in a realistic setting;
- consolidate a durable reference;
- pause for outside feedback or a trusted community;
- finish the course because the end condition is met.

Keep work inside the learner's zone of proximal development: challenging enough to require effort, close enough to complete with useful feedback. Do not produce endless new lessons. At each milestone, compare demonstrated performance with the success criteria and choose new instruction, review, real practice, or completion.

Read [references/lesson-design.md](references/lesson-design.md) whenever creating a lesson, practice activity, quiz, review, or learning record.

## Ground knowledge

Treat unverified model memory as a lead, not a teaching source. Prefer primary sources, standards, official documentation, high-quality research, and recognized practitioners appropriate to the topic. Cite claims inside lessons and recommend one especially useful primary source.

For procedures where a plausible error would be hard to notice or costly, verify the procedure independently before teaching it. Say when evidence is disputed, thin, or outside the available sources.

Knowledge comes from trustworthy sources. Skill comes from practice with a tight feedback loop. Judgment comes from real use and, when appropriate, contact with experienced people or communities. Do not substitute confident prose for any of these.

## Produce durable course material

The normal teaching unit is one short, self-contained HTML lesson in `lessons/`. It should deliver one tangible win in one sitting, link to its sources and related course material, and use reusable components from `assets/` rather than duplicating them.

Create or update `reference/` documents for material the learner will return to, such as a glossary, algorithm, syntax guide, checklist, or practice sequence. Lessons teach; references compress.

Write a learning record only when there is evidence of durable progress, disclosed prior knowledge, a corrected misconception, or a changed mission. Coverage is not learning. Preserve superseded records rather than deleting the history.

End a session with the lesson or practice itself, a clear next action, and updated workspace state. Do not claim mastery without evidence against the mission's success criteria.
