# Pre-flight check

Run this against the rendered result before declaring the work done. If a box cannot be honestly ticked, the work is not done. Items under "Landing pages only" are skipped for product UI; everything else applies to both.

## Reading and foundation

- [ ] Design read declared in one line.
- [ ] Dial values stated and reasoned from the brief, not silently defaulted.
- [ ] Design system chosen honestly, or the aesthetic labelled as an approximation.
- [ ] One design system and one icon family per project; repository stack respected; every imported dependency verified.
- [ ] Redesign mode detected and audit performed where an interface already existed.

## Locks

- [ ] Theme lock: one theme for the page, no inverted sections.
- [ ] Color lock: one accent used identically everywhere, one neutral temperature.
- [ ] Shape lock: one radius system, or a stated mixed rule followed everywhere.
- [ ] Typography: sans display unless a serif is justified, same-family emphasis, descender clearance on tight italics, body measure near 65 characters.

## Accessibility and states

- [ ] Every button's text passes WCAG AA against its background; ghost buttons over imagery have a scrim or stroke.
- [ ] Inputs, placeholders, labels, focus rings, helper and error text pass contrast; labels above inputs, errors below, no placeholder-as-label.
- [ ] Loading (shape-matched skeletons), empty, and error states present.
- [ ] Reduced motion honored for everything above motion dial 3.
- [ ] Both color modes rendered and inspected.
- [ ] Narrow-viewport collapse explicit for every multi-column layout; full-height sections use dynamic viewport units.

## Motion and performance

- [ ] Every animation justified in one sentence; claimed motion is shown.
- [ ] Only transform and opacity animated; no raw scroll listeners; effects clean up; motion isolated in client leaves.
- [ ] Pinned scroll patterns start at the viewport top and revert on unmount.
- [ ] Performance targets plausibly met; nothing heavy loaded above the fold unnecessarily.

## Content

- [ ] Every visible string re-read; no broken grammar, unclear referents, or generated-sounding cleverness.
- [ ] No em-dash or en-dash separators in visible text.
- [ ] No fake-precise numbers without a real source or a sample-data label; no generic names, avatars, or brand names.
- [ ] One copy register; one label per action intent; action labels fit one line.
- [ ] Long lists use a component (grouping, grid, tabs, disclosure) rather than a longer list; dense data leads with featured values and discloses the rest.
- [ ] No decorative status dots, numbered step labels, or hairlines on every row.

## Landing pages only

- [ ] Hero fits the first viewport: headline at most two lines, subtext at most twenty words, primary action visible, top padding capped, at most four text elements.
- [ ] Logo wall below the hero, logos only, real marks, both modes.
- [ ] Eyebrow count at most one per three sections, counted mechanically.
- [ ] No split header, no floating corner sub-text, no three consecutive zigzag sections, no repeated layout family, at least four families across eight sections.
- [ ] Bento grids have exact cell counts and visual variation.
- [ ] Marquee at most once per page.
- [ ] Navigation on one line, at most 80px tall.
- [ ] Real images used in the priority order; no div-built fake screenshots, no hand-drawn decorative SVGs, no text-only minimalism.
- [ ] No image-overlay pills, decorative photo credits, version labels or footers, scroll cues, locale strips, section numbering, or decorative caps strips.
- [ ] Quotes at most three lines with clean attribution.

## Report

State the design read, the locks chosen, which checks passed on the rendered result, and which items were not verified and why.
