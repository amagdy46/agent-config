# Anti-slop checklist

Models reaching for "looks designed" produce these tells. Treat each as off unless the brief asks. Items marked (UI) also apply to dashboards, admin tools, and forms.

## Visual and type

- Neon glows, purple-blue "AI glow" gradients, oversaturated accents, gradient text on headings, custom cursors (UI).
- Pure `#000` / `#fff` (UI). Decorative crosshair or hairline grids (UI). Scattered z-index values; keep a layer scale (UI).
- Shouting oversized headlines (UI). Serif chosen because it "feels premium". Mixed-family emphasis; use italic or bold of the same family. `<br>`-split italic fragments. Vertical rotated text.
- Em-dash or en-dash separators in visible text; use period, comma, colon, or hyphen for ranges (UI).

## Layout

- Three identical feature cards in a row. Cards around every group (UI). Top and bottom borders on every list row (UI).
- Split section headers (big left headline, small floating right paragraph). Three-plus consecutive image/text zigzags. A repeated layout family: eight sections need at least four families.
- Bento cells without content or without visual variation. Filled-track score bars as marketing comparison.
- Over five items: choose a component (grouped chunks, two-column grid, tabs, accordion, scroll-snap pills) instead of a longer list. Dense specs lead with featured values and put the rest behind a disclosure (UI).

## Hero and page chrome (landing pages)

- Hero fits the first viewport: headline of at most two lines, subtext of at most 20 words, primary action visible, top padding at most about 6rem.
- Hero text stack: optional eyebrow, headline, subtext, one primary and at most one secondary action. No tagline under actions, trust strip, pricing teaser, bullets, or avatar row.
- Logo wall in its own section below the hero: real marks, logos only, correct in both modes.
- At most one eyebrow per three sections; no section-number eyebrows, version-label eyebrows, scroll cues, decorative caps strips, locale or weather strips, or build-stamp footers.
- Navigation on one line, at most 80px tall.
- Middle dot at most once per metadata line. Colored status dots only for real state (UI). Generic step labels ("Step 1", "Phase 01"); the content is the label (UI). Pills overlaid on images; caption below.

## Copy

- Placeholder people and brands ("John Doe", "Acme", "Nexus") and generic avatars (UI). Fake-precise numbers (`99.99%`, `4.1x`) without a source or sample-data label (UI).
- Filler verbs: elevate, seamless, unleash, next-gen, revolutionize (UI). Performative labels ("Field notes", "Quietly trusted by"). Micro-sentences explaining a section's philosophy.
- Two labels for one intent ("Get in touch" and "Let's talk"). Action labels that wrap. Testimonials over three lines or without name and role.
- A marketing page that dumps data: show the top three to five and link out.

## Assets

- Fake screenshots built from styled divs, fake terminals, hand-drawn decorative SVG illustrations (one simple geometric mark is fine), text-plus-gradient-blob heroes. A hero needs a real visual; even a restrained page needs two or three real images.
- Asset order: image-generation tool, then licensed or seeded real photography, then clearly labelled placeholder slots with a closing note listing needed images. Check hotlinked URLs resolve.
- UI kits ship customized (radii, colors, shadows, type), never in default state.

## Final pass

Re-read every visible string. Confirm both themes, the narrow-viewport collapse of every multi-column layout, loading (shape-matched skeletons), empty, and error states, label-above-input forms with errors below, and AA contrast on every button, including ghost buttons over imagery (add a scrim or stroke).
