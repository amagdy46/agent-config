# Motion and dark mode

## Motion

- Valid reasons: hierarchy, sequence, feedback, state change. "It looked cool" fails.
- Claimed motion is shown. With the motion dial above 4, the page needs a hero entry, section reveals, and hover physics on primary actions. Otherwise lower the dial and ship a clean static page; half-built scroll triggers are worse.
- Animate `transform` and `opacity` only. Use `will-change` only on elements that animate. Ease with springs, never linear.
- Use the repository's animation library or CSS transitions. Reveal-on-enter uses the library or CSS `animation-timeline`; reserve a scroll-trigger library for pinning and horizontal pans. One animation engine per component tree.
- Skip raw `scroll` listeners and per-frame framework state. Pointer-driven values live outside the render cycle.
- Every registered effect has cleanup. Motion lives in client leaf components.
- Full-height sections use dynamic viewport units. Grain overlays sit on a fixed, pointer-events-none element.
- Perpetual effects (pulse, shimmer, typewriter) only for live status. Marquees at most once per page.
- Pinned sections start when their top meets the viewport top. Stacks and pans revert cleanly on unmount.
- Honor `prefers-reduced-motion`: loops, parallax, pinning, and magnetic effects collapse to static.
- Targets: LCP under 2.5 s, interaction latency under 200 ms, CLS under 0.1. Lazy-load below the fold.

## Dark mode

Design both modes from the start unless the brief or product says otherwise.

- Use the repository's token strategy; else semantic CSS variables (surface, elevated surface, text, muted, border, accent) set at the app root and swapped by theme attribute or `prefers-color-scheme`.
- Contrast: AA in both modes for body (4.5:1) and large text (3:1), including buttons, inputs, placeholders, focus rings, helper and error text.
- Hierarchy parity: what pops in light pops in dark. Keep the brand color recognizable instead of desaturating it into a generic dark theme.
- Logos and monochrome marks render in both modes.
- Respect `prefers-color-scheme`; add a toggle when either mode would lose brand expression.
- Open the rendered page in both modes; source alone proves nothing.
