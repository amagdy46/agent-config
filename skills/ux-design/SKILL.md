---
name: ux-design
description: Design or review a product flow, screen structure, information architecture, or interaction before visual implementation. Use when deciding how people complete a task, what they need to see, which states must exist, or how structural UX variants should be compared.
---

# UX Design

Design the experience around the user's task, decisions, and recovery. This skill owns interaction structure and behavior. It does not replace visual direction, production frontend implementation, or user research.

## Ground the experience

Identify the user and context, triggering situation, desired outcome, approved scope, domain terms, permissions, sensitive information, platform constraints, and available evidence. Inspect the current product or related patterns when they exist.

Separate observed behavior from inference and proposal. Existing UI is evidence, not automatically the correct standard. Do not manufacture analytics, research findings, policies, or accessibility claims.

## Model the journey and states

Describe:

- entry conditions and the primary task;
- information the user must perceive, compare, or trust;
- action order and decision points;
- system feedback, progress, completion, cancellation, and resumption;
- applicable first-use, empty, loading, partial, validation, error, offline, permission, stale-data, destructive-action, and recovery states;
- keyboard, focus, assistive-technology, responsive, localization, and content-volume behavior.

Preserve the user's mental model and domain vocabulary. Put the most important task and risk ahead of secondary metrics or decoration.

## Explore structure when it is uncertain

If the information architecture is not settled, compare a small set of meaningfully different variants. Change the organizing thesis, not merely colors or card styles. Examples include guided sequence versus open workspace, queue-first versus overview-first, or exception-first versus normal-state-first.

For each viable variant state:

- attention and action order;
- regions and progressive disclosure;
- handling of important non-ideal states;
- responsive transformation;
- advantages, risks, assumptions, and implementation consequences.

Use comparable low-fidelity wireframes, state tables, or flow diagrams when they improve the decision. Do not polish one option more than the others and then treat preference as evidence.

## Produce the UX contract

Return the selected direction or unresolved alternatives with:

- task and journey;
- information hierarchy and action hierarchy;
- state and feedback model;
- permission, safety, and recovery behavior;
- responsive and accessibility requirements;
- content guidance and exact domain terms;
- assumptions, open decisions, and evidence needed;
- observable acceptance checks and a prototype recommendation when uncertainty remains.

Record why the direction fits the product specification and what it deliberately does not solve. A high-risk or structurally novel direction should be tested through a disposable prototype before production implementation.

## Boundaries

- Do not choose a dashboard, modal, wizard, or component before its responsibility is clear.
- Do not use visual novelty to compensate for a broken task flow.
- Do not present a happy-path wireframe as complete UX.
- Do not silently change approved product scope, permissions, or terminology.
- Do not implement production UI unless the user separately requests implementation.
