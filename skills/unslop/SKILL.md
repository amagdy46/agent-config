---
name: unslop
description: Remove AI tells from prose while keeping facts and voice. Use as the final pass on reports, docs, READMEs, proposals, PR descriptions, and posts, or when asked to humanize, tighten, or de-slop text. Skip code, logs, quotes, and short chat replies.
license: MIT
---

# Unslop

Revise prose so it sounds like one person making one point, not a model filling a familiar shape. This is a cleanup pass: scan for the patterns below, rewrite, compare with the source.

## Keep intact

Facts, numbers, citations, quotations, calibrated hedges, technical names, commands, identifiers, error text, the author's position, requested format, and legally significant wording. Quoted awkwardness stays; fix the prose around it. Cleaner prose never comes from inventing evidence, deleting a caveat, or strengthening a claim.

## Patterns

**Content and language**
- Lead with the concrete point. Cut preambles, previews, and conclusions that repeat the introduction ("The future looks bright").
- Name the source or delete vague attributions ("experts believe").
- Cut trailing -ing phrases ("highlighting...", "ensuring...", "fostering...").
- Replace AI vocabulary with plain words: additionally, crucial, delve, enhance, intricate, landscape, pivotal, showcase, tapestry, testament, underscore, vibrant. "Serves as", "boasts", and "features" become "is" or "has". "Utilize" and "leverage" become "use".
- State the point directly instead of "not just X, but Y", forced groups of three, false ranges ("from X to Y"), and false contrasts.
- Pick one name per concept and repeat it. Synonym cycling reads as several concepts.
- Replace abstract metaphor nouns with the concrete word: substrate, vector, nexus, primitive, bedrock, scaffolding, paradigm, north star, flywheel, "API surface".
- Say what it does, not how it feels. "SQL you can read" becomes "`.toSQL()` returns the exact string sent to the database." If a sentence could appear unchanged in another project's docs, make it specific or cut it.
- Turn mannered prose (aphorisms, personified code, "rides along") into the literal statement.
- Swap an adverb for a stronger verb or the measured number ("significantly improves" becomes the delta).
- Say "may" for stacked hedges; keep real uncertainty once, where it applies.

**Structure and style**
- Prefer active voice when the actor matters; keep passive when the actor is unknown.
- Split sentences that make the reader backtrack. Vary rhythm naturally.
- Rewrite over-compressed text (dropped articles, arrows, verbless fragments) as whole sentences.
- Use periods or commas instead of em dashes. Use a colon only before a list or example.
- Bold, bullets, and headings only for real structure. Convert "**Performance:** Performance improved" labels to prose; a bold lead-in followed by new detail is fine.
- Sentence-case headings, straight quotes, no decorative emoji.
- Delete chatbot phrases ("I hope this helps", "Certainly!") and flattery.
- Keep first person, humor, and opinion the author already has. Add none.

## Agent-facing docs

For skills, AGENTS.md, and prompts, also apply the writing-for-agents rules: state the target behavior instead of the ban, use one leading word in place of a restated phrase, and delete any sentence the model would obey without being told.

## Final pass

1. Did every fact, literal, citation, and hedge survive?
2. Did any sentence turn more certain, dramatic, or promotional than the evidence?
3. Does it read aloud without template transitions or a repeated cadence?

Return the revised prose. Ask the author only when an ambiguity needs their call.
