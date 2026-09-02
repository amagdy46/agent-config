---
name: unslop
description: Edit substantial human-facing prose to remove generic AI patterns while preserving meaning, evidence, uncertainty, and the author's intended voice. Use for reports, documentation, proposals, posts, and other writing that merits a deliberate prose pass; do not invoke for every short chat reply.
license: MIT
---

# Unslop

Revise writing so it sounds like a particular person communicating a particular point, not a model filling a familiar shape.

## Scope

Apply this skill to substantial prose meant for people. It can edit an existing draft or serve as the final prose pass on a new document.

Do not turn it into an always-on conversation rule. Skip it for short transactional replies, code, generated data, logs, quoted source material, and exact technical literals unless the user explicitly asks for an edit.

## Preserve before rewriting

Identify the claims and constraints that must survive:

- facts, measurements, citations, quotations, and attribution;
- confidence and uncertainty, including deliberate hedges;
- technical names, commands, identifiers, API fields, error text, and other literals;
- the author's position, intended audience, and requested format;
- legally or operationally significant wording.

Never make prose sound cleaner by inventing evidence, deleting a caveat, strengthening a claim, or silently changing a technical term. If a quoted passage contains awkward wording, leave the quote intact and improve the surrounding prose.

## Edit

Read for meaning first, then revise at the paragraph and sentence level.

- Lead with the concrete point. Cut throat-clearing, generic previews, and conclusions that only repeat the introduction.
- Replace puffery, promotional adjectives, vague attribution, and stock AI vocabulary with specific facts or plain words.
- Remove filler, forced symmetry, artificial groups of three, false contrasts, and formulaic "not only X, but Y" constructions.
- Prefer one stable name for each concept. Do not cycle through synonyms for variety.
- Prefer active voice when the actor matters. Keep passive voice when the actor is unknown or irrelevant.
- Split sentences that make the reader backtrack. Vary rhythm naturally; do not force every sentence to the same length.
- Use headings, bullets, bold text, colons, parentheses, and dashes only when they clarify real structure. Do not decorate prose to simulate structure.
- Keep first person, humor, informality, or opinion when they fit the author's voice. Do not add personality the author did not imply.
- Replace abstract claims with the mechanism, example, source, or number that makes them useful. If none exists, cut the claim or mark the gap.

Do not flatten all writing into terse technical prose. A narrative, tutorial, memo, and incident report need different rhythms. Match the audience and purpose.

## Final pass

Compare the revision with the source:

1. Did every material fact, literal, citation, and calibrated hedge survive?
2. Did any sentence become more certain, more dramatic, or more promotional than the evidence permits?
3. Could a sentence appear unchanged in an unrelated document? Make it specific or remove it.
4. Does the piece sound coherent when read aloud, without obvious template transitions or repetitive cadence?

Return the revised prose. Mention a material ambiguity only when resolving it requires the author rather than an editing judgment.
