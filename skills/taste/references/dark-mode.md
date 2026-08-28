# Dark-mode parity

Design both modes from the start. Do not ship light-only or dark-only without explicit instruction, except for print-emulating editorial briefs.

## Token strategy

Pick one strategy per project and keep it:

- **Utility dark variant.** Every color utility is paired with its dark counterpart at the point of use.
- **Semantic CSS variables.** Define tokens such as surface, elevated surface, primary text, muted text, border, and accent, and swap their values under a theme attribute or `prefers-color-scheme`. Preferred when a component library with theming is in play, and set once at the application root so individual sections cannot override it.

If the repository already has a token strategy, use it.

## What this reference enforces

The brief and brand decide the actual colors. The skill enforces only:

- **Contrast.** WCAG AA minimum for body text (4.5:1) and large text (3:1); aim for AAA on hero copy. Buttons, form inputs, placeholders, focus rings, helper text, and error text all pass against their section background in both modes.
- **Hierarchy parity.** Whatever stands out in light mode stands out in dark mode. A primary action that pops in light does not recede in dark.
- **Brand fidelity.** The primary brand color remains recognisable; do not desaturate the brand into a generic dark theme.
- **No pure black or pure white.** Off-black and off-white preserve depth. Same-family tints between sections are fine; flipping a section to the opposite theme is not.
- **Logos and images.** Logo walls and monochrome marks render correctly in both modes through a single-color theme variable or paired assets.

## Default mode

Respect `prefers-color-scheme` unless the brand insists on one mode. Add a manual toggle if either mode would lose key brand expression.

## Verification

Open the rendered page in both modes during development and again on the final state. Do not report dark-mode support from source alone.
