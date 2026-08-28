# Banned patterns and composition limits

These are the signatures a model produces when it tries to "look designed". Treat each as a hard ban unless the brief explicitly asks for it. Items marked **(product UI too)** apply to dashboards, admin panels, internal tools, and forms as well as marketing pages; the rest are landing-page and portfolio rules.

## Visual and CSS

- No neon or outer glows by default; use inner borders or tinted shadows. **(product UI too)**
- No pure `#000000` or pure `#ffffff`; use off-black and off-white. **(product UI too)**
- No oversaturated accents and no purple-blue "AI glow" gradients unless the brand is that color. **(product UI too)**
- No gradient text on large headings.
- No custom cursors.
- No crosshair or hairline grid lines drawn as decoration. Lines organize real content or they go. **(product UI too)**
- No arbitrary z-index values scattered through components; keep a documented layer scale. **(product UI too)**

## Typography

- No oversized headline that shouts; control hierarchy with weight and color. **(product UI too)**
- No serif chosen because a brief "feels creative or premium"; serif needs a stated brand or editorial reason. Rotate serifs rather than reusing the two habitual display serifs across projects.
- No mixed-family emphasis inside a headline. Use italic or bold of the same family.
- No `<br>`-split, italicised headline fragments as a default move.
- No vertical rotated text unless the brief is explicitly experimental and the rotation serves the composition.
- No em-dash or en-dash as a separator or flourish in visible interface text: headlines, labels, pills, buttons, captions, quotes, attribution, alt text, body copy. Restructure with a period, comma, colon, parentheses, or a hyphen for ranges. **(product UI too)**

## Layout and spacing

- No three identical feature cards in a row.
- No card wrapper around every group; use spacing, hairlines, or `divide` rules unless elevation communicates real hierarchy. **(product UI too)**
- No `border-top` and `border-bottom` on every row of a long list or spec table; pick one sparse divider strategy or a different component. **(product UI too)**
- No "left big headline, right small floating paragraph" section header by default; stack headline then body at a readable measure. A split header needs a real visual or interactive element in the second column.
- No floating top-right sub-text in a section heading.
- No three or more consecutive image-and-text zigzag sections; break the rhythm with a different layout family.
- No repeated layout family: each family (three-column cards, full-width quote, split text and image) appears at most once per page; eight sections need at least four families.
- No bento cell without content; a grid has exactly as many cells as items. Multi-cell grids need visual variation in at least two or three cells, not text on identical white tiles.
- No decorative filled-track progress or score bars as comparison visuals on a marketing page.

## Hero and top of page

- Hero fits the first viewport: headline at most two lines on desktop, subtext at most twenty words and four lines, primary action visible without scrolling. A four-line headline is a font-size error.
- Hero top padding at most roughly 6rem on desktop; give breathing room through scale, not padding.
- Hero text stack has at most four elements: one optional eyebrow or brand strip, headline, subtext, one primary and at most one secondary action. No tagline under the actions, no trust micro-strip, no pricing teaser, no feature bullets, no avatar row inside the hero.
- Logo walls sit in their own section directly below the hero, use real vector marks (or a generated monogram for an invented brand), show logos only with no category labels underneath, and render in both color modes.
- No version labels (`BETA`, `v2.0`, `EARLY ACCESS`) as hero eyebrows unless the page is about a launch.
- No decorative caps strip at the hero bottom (`DESIGN. BUILD. SHIP.`) unless it carries real navigation or status.
- No scroll cues ("Scroll to explore", animated mouse icons).
- Navigation fits one line at desktop and is at most 80px tall.

## Micro-labels, separators, dots

- At most one eyebrow per three sections, hero included. Count `uppercase` wide-tracking labels above headings mechanically; if the count exceeds one third of the sections, remove eyebrows. The headline alone is usually enough.
- No section-number eyebrows (`01 / Capabilities`), no numbered pagination on tiles, no numbered scroll cues, no "Index of work, 2018 to 2026" range labels.
- Middle dot `·` at most once per metadata line; prefer line breaks, columns, or hairlines.
- No decorative colored status dots before nav items, list rows, badges, or labels. A dot conveys real semantic state, once per section at most. **(product UI too)**
- No generic step labels ("Step 1", "Phase 01", "Stage one"); the step content is the label. **(product UI too)**
- No pills or tags overlaid on images; caption below the image instead.
- No photo-credit captions as decoration; credit only a real photographer for a real photo.
- No version footers or build stamps on marketing pages.
- No locale, city, time, or weather strips unless the brief is a distributed studio, a travel brand, or a physical venue.

## Content and copy

- No generic placeholder people ("John Doe", "Sarah Chan") and no generic avatars; use believable, locale-appropriate names and specific imagery. **(product UI too)**
- No startup-slop brand names ("Acme", "Nexus", "Cloudly") in sample content.
- No fake-perfect or fake-precise numbers (`99.99%`, `4.1x`, `5.8 mm`) unless real or explicitly labelled as sample data. **(product UI too)**
- No filler verbs: "elevate", "seamless", "unleash", "next-gen", "revolutionize". **(product UI too)**
- No performative-craftsman labels ("From the field", "Field notes", "On our desks") or mock-humble asides; use plain functional labels or none.
- No "Quietly trusted by" social-proof headings; say "Trusted by" or let the logos speak.
- No micro-meta sentence under a heading explaining the section's philosophy.
- Two actions with the same intent ("Get in touch" and "Let's talk") on one page is a failure; one label per intent across nav, hero, and footer.
- Action labels fit one line at desktop; shorten the label or widen the control.
- Testimonial quotes at most three lines, with name plus role or company, typographic quotation marks or none.

## Data density and long lists

- No data-dump section on a marketing page: show the top three to five and link to the full list, or move the data to its own page.
- Over five items is a component decision, not a longer list: grouped chunks with a heading and one soft divider each, a two-column card grid, tabs or accordion for categorisable items, scroll-snap pills, or a carousel or marquee for breadth-only content. **(product UI too)**
- Spec sheets: featured values as large tiles with the rest behind a "view full specifications" disclosure, or three logical clusters with one divider each. This progressive-disclosure shape is the default for dense product UI as well. **(product UI too)**
- Per section: headline of at most eight words, sub-paragraph of at most twenty-five words, one visual or one action. More must be justified by the section's job.

## Assets and previews

- No fake product screenshots built from styled `div` rectangles, fake terminals, or fake task lists, and no fake version footers inside them.
- No hand-drawn decorative SVG illustrations by default; a single simple geometric mark is the exception.
- No text-plus-gradient-blob hero; a hero needs a real visual. Even a restrained page needs two or three real images.
- Asset order: an available image-generation tool first, then real photography (seeded placeholder services or licensed sources allowed by policy), then clearly labelled placeholder slots with a closing note listing the images the page needs. Never fill gaps with hand-rolled illustrations.
- No broken hotlinked stock URLs.
- Third-party UI kits are customised (radii, colors, shadows, type) and never shipped in default state.
