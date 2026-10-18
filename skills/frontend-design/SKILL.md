---
name: frontend-design
description: Design and build web UI that avoids template and AI-generated looks. Use when building or restyling pages, components, dashboards, or landing pages, when asked to "make it look good", and when UX flows, information architecture, or screen states need deciding first.
license: MIT
compatibility: Best with a browser or screenshot tool for rendered verification.
---

# Frontend Design

Ship an interface a senior designer would sign off on: structure settled first, a direction drawn from the product, craft free of generic tells, verified in the browser.

## 1. Structure first

Skip this step for a pure restyle that keeps the approved flow.

- Name the user, the triggering situation, the task, and the domain vocabulary. Treat the existing UI as evidence, not as the standard.
- Write the journey: entry, primary action order, decision points, feedback, completion, cancellation, resumption.
- List the states the screen needs: first-use, empty, loading, partial, validation, error, offline, permission, stale, destructive, recovery. A happy-path wireframe is not a design.
- Put the main task and the main risk ahead of secondary metrics.
- When the information architecture is open, compare 2-3 variants with different organizing theses (guided sequence vs open workspace, queue-first vs overview-first) at equal fidelity. Prototype a risky one before building it.

Keep approved scope, permissions, and vocabulary. Raise a change as a question.

## 2. Pick the direction

Inspect the repository first: design tokens, component library, brand assets, icon set, fonts. Existing systems win. When the brief names an established design system, use its official package.

State a one-line read before styling: "Reading this as: <page kind> for <audience>, <vibe> language, leaning toward <system or aesthetic>." Ask one question only if two readings lead to materially different work.

Set three dials (variance, motion, density) from the read, using [references/direction.md](references/direction.md), which also maps briefs to design systems and covers redesigns of an existing interface.

## 3. Craft locks

- **Color.** Neutral base, one accent used identically everywhere, one palette temperature, off-black and off-white.
- **Shape.** One radius scale.
- **Theme.** One theme per page; design light and dark together when the product supports both ([references/motion-and-dark-mode.md](references/motion-and-dark-mode.md)).
- **Type.** Hierarchy from weight, size contrast, and spacing, not shouting headlines. Sans by default; a serif needs a brand or editorial reason. Body near 65 characters.
- **Structure.** Group with whitespace and hairlines before cards. Use CSS grid and declare the narrow-viewport collapse in the same component.
- **Copy.** Write from the user's side of the screen: controls name the action, errors say what happened and what to do next. One register, one label per intent, real or labelled sample content, no fake-precise numbers or placeholder names, no em-dash separators.
- **Motion.** Every animation communicates something in one sentence, or it goes. Read the motion reference before adding any.

Read [references/anti-slop.md](references/anti-slop.md) before building a landing page, portfolio, or any marketing surface, and whenever the result looks templated.

## 4. Build

Follow repository conventions and deliver working behavior with the states from step 1, plus focus, keyboard, contrast, responsive, and reduced-motion handling. Verify a dependency exists before importing it. Add fonts, icon sets, or libraries only within repository policy.

## 5. Verify visually

Run the project's checks, then inspect the rendered result with a screenshot or browser tool at mobile and desktop widths, in each theme, and in the key states. Check hierarchy, overflow, alignment, contrast, focus order, console errors, and every visible string. Fix, then re-inspect the final state.

Report the direction, the states exercised, the evidence, and any surface left unverified. Claim contrast, responsiveness, or dark-mode quality only from rendered evidence.
