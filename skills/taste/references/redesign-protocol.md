# Redesign protocol

Misclassifying the mode is the largest source of bad redesign output. Detect it first.

## Modes

- **Greenfield.** No existing interface, or a full overhaul is approved. Dials come from the design read.
- **Preserve.** Modernise without breaking the brand. Audit first, extract brand tokens, evolve gradually.
- **Overhaul.** New visual language over existing content. Treat visuals as greenfield; preserve content and information architecture.

If ambiguous, ask once: "Should this preserve the existing brand, or start visually from scratch?"

## Audit before touching

Document the current state before proposing changes:

- **Brand tokens.** Primary and accent colors, type stack, logo treatment, radii, spacing scale.
- **Information architecture.** Page or screen tree, primary navigation, key task or conversion paths. This is `ux-design` territory; record it, do not redesign it here.
- **Content blocks.** What exists, what does work, what is filler.
- **Patterns to preserve.** Signature interactions, a recognisable hero, copy voice, existing accessibility wins.
- **Patterns to retire.** Generated-looking tells, broken layouts, dead links, generic stock imagery, performance traps.
- **Dial reading.** Infer the current variance, motion, and density. That is the starting point, not a baseline.
- **Search and sharing baseline.** Ranking pages, titles, structured data, social cards. Losing them is the top redesign risk for public pages.
- **Instrumentation.** Analytics events, element identifiers, and form field names that downstream systems depend on.

## Preservation rules

- Do not change information architecture, slugs, anchors, or primary navigation labels unless asked.
- Extract brand colors before applying the color lock. A brand that is already purple stays purple, executed with intent.
- Preserve copy voice unless a rewrite is requested. Visual modernisation is not a content rewrite.
- Do not regress focus states, alt text, keyboard navigation, or contrast.
- Do not rename buttons, fields, or section identifiers that tracking depends on.

## Modernisation levers, in order

Apply in order and stop when the brief is satisfied. Earlier levers give the most visual lift per unit of risk.

1. Typography refresh.
2. Spacing and vertical rhythm.
3. Color recalibration: desaturate, unify neutrals, keep the brand accent.
4. Motion layer appropriate to the motion dial, on existing components.
5. Hero or key-screen recomposition.
6. Full block replacement, only when a block is unsalvageable.

For product UI, levers 1 to 3 plus progressive disclosure (featured values first, detail behind disclosure, grouped instead of flat lists) usually deliver most of the value with the least risk to operator muscle memory.

## Decision

- Structure, content, and search baseline are sound: targeted evolution with levers 1 to 4.
- Visual debt is structural (no design system, broken responsive behavior, incoherent hierarchy): full redesign with strict content preservation, with the structural questions routed to `ux-design`.
- The brand itself is changing: greenfield.

## Never changed silently

Require explicit approval before modifying route structure, primary navigation labels, form field names or order, the logo or wordmark, and legal, consent, or cookie copy.
