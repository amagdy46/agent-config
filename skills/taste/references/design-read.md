# Design read

Produce the design read before any code or styling. Most generated design is bad because the model jumps to a habitual aesthetic instead of reading the brief.

## Signals to read

1. **Page kind.** Landing (SaaS, consumer, agency, event), portfolio (developer, designer, studio), editorial or blog, redesign (preserve or overhaul), or product UI (dashboard, admin, internal tool, form-heavy workflow).
2. **Vibe words.** Terms the user used: minimalist, calm, premium, playful, serious B2B, editorial, glassy, dark tech, brutalist, and named products they want to feel like.
3. **References.** Linked URLs, pasted screenshots, named competitors, existing screens in the repository.
4. **Audience.** Procurement panel, design-conscious consumer, recruiter, operator on shift. The audience picks the aesthetic.
5. **Existing brand assets.** Logo, palette, type, photography, design tokens, component library. For a redesign or product UI these are starting material, not optional input.
6. **Quiet constraints.** Accessibility-first audiences, public sector, regulated industries, trust-first commerce, children. These override aesthetic preference.

## Output

One line: "Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."

Examples:

- "Reading this as: B2B SaaS landing for technical buyers, with a restrained minimalist language, leaning toward the repository's utility CSS, a neutral sans, and light motion."
- "Reading this as: redesign of a public-sector service site, with a trust-first language, leaning toward the national design system."
- "Reading this as: internal operations dashboard for on-shift staff, with a calm high-density language, leaning toward the existing component library with stricter hierarchy."

If two readings would lead to materially different work, ask one question, for example "Closer to clean-and-neutral or expressive-and-experimental?". Never ask a list of questions. If the read is confidently inferable, declare it and continue.

## The three dials

Set three dials from the read. They gate later layout, motion, and density decisions.

- **Variance** 1 to 10: 1 is perfect symmetry, 10 is expressive asymmetry.
- **Motion** 1 to 10: 1 is static with hover states only, 10 is cinematic scroll choreography.
- **Density** 1 to 10: 1 is gallery-airy, 10 is packed cockpit data.

| Read | Variance | Motion | Density |
| --- | --- | --- | --- |
| Minimalist, calm, editorial, clean | 5 to 6 | 3 to 4 | 2 to 3 |
| Premium consumer, luxury, brand | 7 to 8 | 5 to 7 | 3 to 4 |
| Playful, experimental, agency | 9 to 10 | 8 to 10 | 3 to 4 |
| Generic landing or portfolio | 7 to 9 | 6 to 8 | 3 to 5 |
| Trust-first, public sector, regulated, accessibility-critical | 3 to 4 | 2 to 3 | 4 to 5 |
| Product UI: dashboard, admin, internal tool | 2 to 4 | 2 to 3 | 5 to 8 |
| Redesign, preserve | match existing | existing + 1 | match existing |
| Redesign, overhaul | existing + 2 | existing + 2 | match existing |

Dial meanings:

- Variance 1 to 3: symmetric grid, equal padding, centered alignment. 4 to 7: offsets, mixed aspect ratios, left-aligned headers over centered data. 8 to 10: masonry, fractional grids, large deliberate empty zones. Above 3, every asymmetric layout must collapse to a strict single column on narrow viewports.
- Motion 1 to 3: no automatic animation. 4 to 7: eased transitions on transform and opacity, staggered load-ins. 8 to 10: scroll-driven reveals, pinning, parallax, all via a scroll library, intersection observers, or CSS scroll-driven animation.
- Density 1 to 3: large section gaps. 4 to 7: standard app spacing. 8 to 10: tight padding, no card boxes, hairlines separate data, tabular numerals for figures.

State the chosen values and the reason. Do not silently use a baseline. Overrides happen in conversation, not by editing this file.
