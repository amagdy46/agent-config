---
name: product-specification
description: Write or review an evidence-backed product brief, PRD, or feature specification. Use when a product direction needs clear users, outcomes, scope, states, requirements, success measures, and unresolved decisions before design or engineering planning.
license: MIT
---

# Product Specification

Create a concise decision document that makes a product direction discussable and executable without pretending uncertainty is settled. A product specification defines what must be true and why; it is not an implementation plan.

## Establish the contract

Determine the document's audience, decision owner, maturity (`exploration`, `prototype`, or `release`), and the decision it must support. Inspect existing product documents, research, current behavior, support evidence, and approved constraints before drafting.

Label material claims as confirmed fact, evidence-backed observation, inference, proposal, or open question. Do not invent metrics, policy, permissions, user research, or technical capability to complete a template.

## Cover the product surface

Use the smallest structure that covers the real decision:

1. **Summary and recommendation:** the proposed direction and why now.
2. **Problem and evidence:** who experiences what problem, in which context, and what supports that claim.
3. **Outcomes and users:** the user result and business result, plus any counter-signal that prevents gaming.
4. **Scope and non-goals:** included capability, deliberately excluded work, and the appetite or boundary guiding trade-offs.
5. **Experience contract:** entry, core journey, completion, cancellation, resumption, and applicable loading, empty, validation, permission, failure, stale-data, offline, destructive-action, localization, responsive, and accessibility states.
6. **Requirements:** prioritized observable responsibilities. Keep product requirements separate from proposed implementation details.
7. **Acceptance evidence:** what a reviewer must observe at the declared maturity to accept the result.
8. **Risks, dependencies, and open decisions:** impact, owner or decision role, and when the answer is needed.

Include only applicable states, but never omit an important failure or permission path merely to make the happy path look complete.

## Keep the scope honest

Trace every must-have to the stated problem, outcome, constraint, or risk. If the direction cannot fit the available appetite, cut breadth while preserving a coherent and trustworthy core path. Do not demote accessibility, privacy, recovery, or correctness as cosmetic polish.

Use priorities only when they force a decision. Avoid arbitrary word limits, required counts, or numerical targets unsupported by evidence. A measurable target is valuable; a fabricated target is worse than a clearly owned open question.

## Review before handoff

Confirm that another product, design, or engineering reader can tell:

- what problem is being addressed and for whom;
- what is approved, proposed, unknown, and out of scope;
- which information, states, actions, permissions, and risks matter;
- how success and harmful side effects will be observed;
- which decisions still require a human owner.

Do not implement from an unapproved draft when unresolved scope, policy, permission, or destructive behavior could materially change the result. After approval, implementation planning may add architecture, files, sequencing, and commands without rewriting the product intent.

## Boundaries

- Do not start with a preferred UI or architecture and work backward to a problem.
- Do not bury costs, alternatives, or non-goals.
- Do not convert current accidental behavior into an approved requirement without evidence.
- Do not make external tracker changes or publish the specification without authorization.
