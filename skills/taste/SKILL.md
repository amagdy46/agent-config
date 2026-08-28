---
name: taste
description: Apply anti-slop visual craft when a web interface is built, restyled, or redesigned and it must not look templated or AI-generated. Use alongside frontend-design for landing pages, portfolios, redesigns, and product UI such as dashboards and internal tools that need hierarchy, restraint, consistent color and shape, honest motion, and dark-mode parity; do not use to decide the user flow, information architecture, or state model, and do not use for engineering-only frontend work with no visual change.
---

# Taste

Enforce visual craft that an experienced designer would sign off on. This skill is a rules layer, not an implementation workflow: `ux-design` owns task flow, information architecture, and the state model; `frontend-design` owns the product-specific visual direction, complete states, and rendered verification. `taste` sits on top of both and removes the defaults, tells, and inconsistencies that make an interface read as generated. Invoke it with `frontend-design` whenever the visual quality of a page or redesign matters.

Every rule is contextual. Read the brief first, then apply only what fits.

## Read the brief before choosing an aesthetic

Infer what the user wants from page kind, vibe words, references, audience, existing brand assets, and quiet constraints such as accessibility-first audiences or regulated domains. Constraints override aesthetic preference.

State a one-line design read before producing anything: page kind, audience, visual language, and the design system or aesthetic family it leans toward. If the read genuinely diverges, ask exactly one clarifying question; otherwise declare it and proceed. Read [references/design-read.md](references/design-read.md) for the signal list, the three dials (variance, motion, density), and their inference table.

Do not default to the model's habitual output: purple-blue glow gradients, a centered hero over a dark mesh, three equal feature cards, glass on everything, looping micro-animations, or Inter on slate. Reach past them deliberately from the design read.

## Choose the foundation honestly

If the brief reads as an established design system (enterprise suite, public-sector service, platform admin surface, an existing component library in the repository), use that system's official package rather than recreating its look by hand, and do not import its tokens and then override most of them. One system per project. If the brief is an aesthetic rather than a system, build it with native CSS and the repository's styling approach and label borrowed inspiration honestly. Read [references/design-system-map.md](references/design-system-map.md).

Respect the repository's existing stack. Do not swap icon sets, fonts, animation libraries, or styling approaches without checking repository policy, and verify a dependency exists before importing it.

## Lock the system

- **Color lock.** Neutral base, at most one accent, moderate saturation, one palette temperature. Once the accent is chosen it is used identically across the whole page; audit every component before finishing.
- **Shape lock.** One corner-radius scale (all sharp, all soft, or all pill for interactive elements). Mixed radii are allowed only under a stated rule that is followed everywhere.
- **Theme lock.** One theme per page (light, dark, or system). Sections do not invert mid-scroll. Tints within the same family are fine; a single deliberate theme switch is allowed only when the brief asks for it.
- **Typography.** Hierarchy comes from weight, size contrast, and spacing, not from oversized headlines. Sans display is the default; a serif needs a stated brand or editorial reason. Emphasise a word with italic or bold of the same family, never by mixing families. Body copy stays within roughly 65 characters per line. Check descender clearance on tight italic display type.
- **Spacing and structure.** Group with whitespace, hairlines, or `divide` rules before reaching for cards; use cards only when elevation communicates real hierarchy. Tint shadows to the background hue. Use CSS grid rather than percentage flex math, and declare the narrow-viewport collapse for every multi-column layout in the same component.
- **Copy.** One register per page, concrete verbs, no fake-precise numbers unless labelled as sample data, no generic placeholder names or brands. Re-read every visible string before finishing.

## Discipline motion and dark mode

Motion must be motivated: hierarchy, sequence, feedback, or state change. If you cannot say what an animation communicates in one sentence, drop it. Claimed motion must be shown; if working motion is out of scope, ship a clean static page rather than a half-built one. Animate only transform and opacity, honor `prefers-reduced-motion`, and clean up every effect. Read [references/motion.md](references/motion.md) for the scroll and physics rules.

Design both color modes from the start unless the brief says otherwise. Hierarchy, brand recognition, and contrast must hold in both; check the rendered page in both modes. Read [references/dark-mode.md](references/dark-mode.md).

## Redesign audit-first

For an existing interface, detect the mode (preserve, overhaul, or greenfield) before proposing anything, audit brand tokens, structure, content, and patterns to keep or retire, and then apply modernisation levers in order of value per unit of risk: typography, spacing and rhythm, color recalibration, motion, key-section recomposition, block replacement. Do not silently change routes, navigation labels, form fields, wordmarks, or legal copy. Read [references/redesign-protocol.md](references/redesign-protocol.md).

## Apply to product UI as a filter

For dashboards, internal tools, admin panels, and forms, apply the locks, typography, spacing, copy, motion, dark-mode, and redesign rules above, plus the product-relevant banned patterns (decorative status dots, card-wrapping everything, hairlines on every row, generic step labels, fake-precise numbers). Prefer progressive disclosure over exposure: featured values first, the rest behind a disclosure; grouped chunks instead of long undifferentiated lists. Landing-page rules about hero composition, eyebrows, logo walls, marquees, section-layout variety, and imagery do not apply. Let the product's own design system or component library win where it exists.

## Finish with the pre-flight check

Before declaring the work done, run the checklist in [references/preflight.md](references/preflight.md) against the rendered result, together with the banned-pattern list in [references/banned-patterns.md](references/banned-patterns.md). Every item must be honestly ticked or fixed. Report the design read, the locks chosen, the checks that passed, and anything left unverified.

## Boundaries

- Do not use visual craft to conceal an unresolved flow, missing states, or an unclear value proposition.
- Do not restructure approved information architecture, permissions, or vocabulary for the sake of a layout.
- Do not add dependencies, fonts, icon sets, or generated assets outside repository policy.
- Do not claim motion, contrast, or dark-mode quality without inspecting the rendered interface.
- Do not treat any rule here as automatic; each one must fit the design read.
