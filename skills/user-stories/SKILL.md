---
name: user-stories
description: Turn an understood product need into small, negotiable backlog stories with observable acceptance examples. Use when writing, reviewing, or splitting user stories and acceptance criteria; do not use when the underlying problem or feature scope is still unknown.
license: MIT
---

# User Stories

Use a story to preserve user value while creating a small unit for conversation and delivery. A story is neither a miniature PRD nor a technical task disguised with “As a user.”

## Choose the right artifact

Before writing, identify the source product outcome, relevant role or situation, and approved feature boundary.

- Use a user story when a role and desired outcome make the value clear.
- Use a job story when the triggering situation and motivation matter more than a stable persona.
- Use an engineering task when the work has no direct user behavior, such as internal refactoring or infrastructure maintenance.
- Return to product discovery or specification when the need, scope, policy, or permissions are unresolved.

Do not invent personas, research, design links, metrics, or business value.

## Write the card, conversation, and confirmation

### Card

Keep the card short enough to scan:

```markdown
## <Outcome-focused title>

As a <specific role>,
I want to <take an action or achieve a capability>,
so that <meaningful outcome>.
```

When context is the important distinction, use:

```markdown
When <situation>,
I want to <motivation or action>,
so I can <outcome>.
```

The outcome must add information rather than restate the action.

### Conversation

Record only the context needed for a team to make good choices: source problem or spec, scope boundary, relevant policy or design references, assumptions, dependencies, and open decisions. Preserve negotiability; do not lock in an implementation unless it is itself an approved constraint.

### Confirmation

Write observable examples or criteria in domain language. Cover the primary success path and the material boundaries that apply, such as authorization, validation, empty state, failure, retry, recovery, accessibility, or audit behavior. Use Given/When/Then when examples benefit from explicit preconditions and outcomes, but do not force every criterion into that syntax.

Acceptance criteria describe externally meaningful behavior, not private method calls or a developer task list. Do not add arbitrary performance targets or edge cases unsupported by the source specification.

## Check and split

Use INVEST as a diagnostic: independent enough to sequence, negotiable, valuable, estimable with available context, small enough for the team's delivery unit, and testable. If a story fails, identify why rather than claiming every letter passes.

Split by a coherent user-visible slice: workflow step, business rule, operation, data variation, role, happy path before a separately valuable advanced path, or interface boundary. Each resulting story must still deliver or prove something useful. Do not split into frontend/backend/database layers that produce no standalone outcome.

Return the stories with traceability to their source decision and note any acceptance item that requires product, design, legal, security, or technical clarification.

## Boundaries

- Do not create a full backlog merely because one story was requested.
- Do not treat estimates or sprint length as universal facts.
- Do not use “As a developer” to force technical work into a user-value format.
- Do not publish to Jira, Linear, GitHub, or another tracker without explicit authorization.
