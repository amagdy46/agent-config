---
name: frontend-design
description: Implement or substantially restyle a web interface when visual design judgment matters. Use for production components, pages, dashboards, and interactive artifacts that need a product-specific visual direction; do not use to resolve an unknown user flow or product requirement.
---

# Frontend Design

Build a working interface with a deliberate visual point of view grounded in the product, audience, content, and existing design system. Distinctiveness is useful only when it improves recognition, hierarchy, or experience.

## Ground the direction

Inspect the approved product or UX specification, current interface, design tokens, components, brand assets, content, accessibility requirements, and implementation conventions. Preserve an approved information architecture and interaction contract. If the user problem, flow, permissions, or critical states are unknown, resolve those before styling or implementation.

When the brief leaves visual direction open, derive a compact thesis from the subject itself:

- the audience and page's primary job;
- the desired character and level of expression;
- one memorable but appropriate signature;
- color, typography, spacing, density, imagery, and motion roles;
- category conventions worth keeping and generic defaults worth challenging.

Do not invent a brand, product claims, metrics, or user research. State any proposed direction that needs approval.

## Design the system, not decoration

Use a small coherent token set and reuse existing components where their semantics fit. Let typography and layout establish hierarchy before adding borders, shadows, gradients, badges, or motion. Structural devices must communicate real grouping, order, status, or action.

Avoid both template sameness and novelty for its own sake. A familiar pattern is correct when it makes the task easier. A visual risk should be concentrated, explainable, and reversible rather than scattered across the page.

Write interface copy from the user's side of the screen. Controls name the action that occurs; confirmations repeat that vocabulary; errors say what happened and what the user can do next. Use real or clearly marked representative content so layout decisions are tested against plausible density and length.

## Implement the complete surface

Follow the repository's framework, component, styling, and asset conventions. Deliver functional behavior rather than a static mock unless the task is explicitly a prototype. Include the applicable loading, empty, validation, error, permission, success, long-content, responsive, keyboard, focus, contrast, reduced-motion, and assistive-technology states.

Use motion to explain state, continuity, or causality. Respect reduced-motion preferences. Do not introduce a heavy dependency, remote font, image, icon set, or generated asset without checking repository policy, licensing, performance, and fallback behavior.

## Inspect the rendered result

Run the project's relevant checks and inspect the real interface at representative viewports and states. Use screenshots or browser evidence when available. Review hierarchy, overflow, alignment, contrast, focus order, interaction feedback, content truth, and console or runtime failures. Fix concrete problems and re-inspect the final state.

Report the direction, important implementation choices, states exercised, evidence collected, and any surface not verified.

## Boundaries

- Do not change approved product behavior merely to support a preferred visual concept.
- Do not hide missing states behind a polished happy path.
- Do not make every element expressive; hierarchy requires restraint.
- Do not copy another product's distinctive identity or unlicensed assets.
- Do not claim visual parity, accessibility, responsiveness, or runtime quality without inspecting evidence that proves it.
