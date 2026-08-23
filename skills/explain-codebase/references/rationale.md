# Rationale mode

Use this mode to investigate why code, a design, or a constraint became the way it is.

## Establish the code anchor

Locate the relevant files, symbols, and lines. Use read-only history such as `git blame`, `git log --follow`, and commit patches to find when the behavior entered or changed. Follow linked pull requests, issues, design documents, incidents, and team discussions when those sources are available and proportionate to the question.

Search by more than the current symbol name. Include earlier names, commit hashes, pull-request numbers, ticket IDs, user-visible behavior, distinctive literals, and dates around the change.

## Apply evidence discipline

Classify claims before presenting them:

- **Direct evidence:** a source explicitly states the reason. Cite the commit, review, ticket, document, discussion, comment, or test that states it.
- **Supported conclusion:** several independent signals converge but no source states the reason outright. Cite the signals and say that the evidence points to the conclusion.
- **Inference:** context makes the explanation plausible but does not establish it. Show the inference chain and hedge it.
- **Competing hypotheses:** the available evidence fits more than one explanation. Show support and contradiction for each.
- **Speculation:** a possibility has little supporting evidence. Label it explicitly and include it only when it helps the user decide what to investigate next.
- **Unknown:** the available record does not answer the question. State which likely sources were searched or unavailable.

Never cite code shape as proof of its own motivation. Do not retrofit a sensible modern rationale onto an old choice. Preserve contradictions and changes of mind instead of forcing a smooth story.

## Present

Anchor the reader in the code first, then separate:

1. what the historical record directly supports;
2. what the combined evidence supports;
3. what remains inference or speculation;
4. alternative explanations, if material;
5. gaps and unavailable evidence;
6. the sources consulted, including relevant null results.

Use confidence language deliberately. Do not remove hedges just to make the prose sound decisive. If the question precedes a planned change, end with constraints the evidence suggests preserving, changing, avoiding, or testing; do not perform the change.
