# Direction, systems, and redesigns

## Read the brief

Signals: page kind (landing, portfolio, editorial, redesign, product UI), vibe words, references and screenshots, audience, existing brand assets, quiet constraints (accessibility-first, public sector, regulated, children). Constraints override taste.

## Dials

State the values and why. Above variance 3, every asymmetric layout collapses to one column on narrow viewports.

| Read | Variance | Motion | Density |
| --- | --- | --- | --- |
| Minimalist, calm, editorial | 5-6 | 3-4 | 2-3 |
| Premium consumer, luxury | 7-8 | 5-7 | 3-4 |
| Playful, experimental, agency | 9-10 | 8-10 | 3-4 |
| Generic landing or portfolio | 7-9 | 6-8 | 3-5 |
| Trust-first, public sector, regulated | 3-4 | 2-3 | 4-5 |
| Product UI: dashboard, admin, tool | 2-4 | 2-3 | 5-8 |
| Redesign, preserve / overhaul | existing / existing +2 | existing +1 / +2 | match existing |

- Variance 1-3 symmetric grid; 4-7 offsets and left-aligned headers; 8-10 masonry and deliberate empty zones.
- Motion 1-3 hover states only; 4-7 eased transform/opacity and staggered load-ins; 8-10 scroll-driven choreography.
- Density 1-3 airy; 4-7 standard app spacing; 8-10 tight padding, hairlines instead of cards, tabular numerals.

## Design systems

The repository's own library wins. Otherwise, when the brief names a real system, install the official package, use one system per project, and keep its tokens (importing tokens and overriding most of them is a fake).

- Microsoft-style: Fluent. Google-style: Material Web. IBM data-dense: Carbon. Shopify app: Polaris. Atlassian-style: Atlassian design system. GitHub-style: Primer.
- UK public service: GOV.UK Frontend. US public service: USWDS.
- Own the components on modern SaaS: shadcn/ui, customized, never default. Accessible React base: Radix Themes. Fast MVP: Bootstrap. Utility-first: Tailwind.

When the brief is an aesthetic (glassmorphism, bento, brutalism, editorial, dark tech, aurora gradients), build with native CSS and label borrowed inspiration. Glass needs a solid fallback under `prefers-reduced-transparency` and suits premium consumer or media, not dashboards. Bento has exactly as many cells as items. Aurora gradients avoid the default purple-blue.

Icons: the family the repository uses, else one maintained library, one stroke width, no hand-drawn paths. Fonts: the framework's font mechanism or self-hosted with `font-display: swap`. Emoji only for a chat-style register.

## Redesigning an existing interface

Detect the mode first; ask once if unclear: preserve the brand, or start visually from scratch?

- **Preserve:** audit, extract brand tokens, evolve. **Overhaul:** new visual language, same content and information architecture. **Greenfield:** dials from the read.
- Audit before touching: brand tokens, page tree and primary paths, content blocks, patterns to keep (signature interactions, copy voice, accessibility wins) and retire (generated tells, broken layouts), search and sharing baseline (titles, structured data, social cards), analytics events and form field names.
- Apply levers in order and stop when the brief is met: typography, spacing and rhythm, color recalibration, motion, key-section recomposition, block replacement. For product UI, the first three plus progressive disclosure usually suffice.
- Ask approval before changing routes, slugs, navigation labels, form fields, wordmark, or legal and consent copy.
