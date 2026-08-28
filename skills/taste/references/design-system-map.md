# Design system map

Pick the foundation after the design read. Do not hand-write CSS for something that has an official package, and do not present an aesthetic trend as an official system.

## When the brief reads as a real design system

| Brief reads as | Foundation |
| --- | --- |
| The repository already ships a component library or design tokens | That library. It wins over every row below. |
| Microsoft-style enterprise SaaS | The vendor's official Fluent package |
| Google-style, Material-flavored product | Official Material Web with Material 3 tokens |
| IBM-style enterprise analytics, dense B2B data | Official Carbon |
| Shopify app surface | Polaris, which the platform requires |
| Atlassian-style product | The official Atlassian design system and tokens |
| GitHub-style developer tool or community page | Primer, with its brand variant for marketing |
| UK public-sector service | GOV.UK Frontend |
| US public-sector or trust-first service | USWDS |
| Fast local-business or agency MVP | Bootstrap: plain, fast, and works |
| Modern accessible React foundation | Radix Themes |
| Modern SaaS where the team wants to own the components | shadcn/ui, never shipped in its default state |
| Utility-first modern SaaS or marketing site | Tailwind utilities with a dark variant strategy |

Rules:

- **Honesty.** If the brief matches a row, install and use the official package. Do not recreate its look by hand, and do not import its tokens and then override most of them.
- **One system per project.** Do not mix two component systems in one tree.
- **Stack respect.** Before adding any of these, check repository policy, existing dependencies, and licensing. An existing stack is not replaced because a row here suggests something else.
- **Verify dependencies.** Check the package manifest before importing. If a package is missing, state the install command first; never assume it exists.

## When the brief is an aesthetic, not a system

No official package exists for these. Build with native CSS and the repository's styling approach, and say in code comments what is borrowed inspiration.

| Aesthetic | Honest implementation |
| --- | --- |
| Glassmorphism, frosted glass | `backdrop-filter`, layered 1px borders, a highlight overlay, and a solid-fill fallback under `prefers-reduced-transparency`. Suitable for premium consumer or media overlays; unsuitable for dashboards, public sector, and plain B2B. |
| Bento tile grid | CSS grid with mixed cell sizes. Exactly as many cells as there is content. |
| Brutalism | Native CSS, monospace, raw borders. |
| Editorial or magazine | Serif type with a stated reason, asymmetric grid, generous whitespace. |
| Dark tech | Mono plus one accent, terminal motifs. |
| Aurora or mesh gradient | SVG or layered radial gradients, never the default purple-blue. |
| Kinetic typography | Native CSS animation, scroll-driven animation, a scroll library only for pinning. |
| Vendor "liquid glass" | Documented by its vendor for native platforms only. Any web version is a glassmorphism approximation and must be labelled as one. |

## Icons, fonts, emoji

- Use the icon family the repository already uses. If none exists, pick one maintained library and use it exclusively, with a standard stroke width. Do not hand-draw icon paths, and do not mix families.
- Load fonts through the framework's font mechanism or self-hosted `@font-face` with `font-display: swap`. Do not add remote font links without policy check.
- Emoji in interface text is off by default. Use it only when the brief explicitly asks for a playful, chat-style register, and then sparingly.
