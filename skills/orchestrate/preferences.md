# Standing orders

The user's preferences for orchestrated sessions. Edit freely; the
orchestrator reads this file at the start of every session and after every
compaction.

## Models

| Role | Model | Notes |
|---|---|---|
| Orchestrator | Opus 5.5 | coordinates only, writes no code |
| Implementer | DeepSeek v4.1 Flash | every ticket |
| Milestone reviewer and council | Sol 6.1 | see below |

## Review

No per-pull-request review for now (trial started 2026-11-06). A pull request
is merge-ready when the implementer has verified it with the project's
`verify-*` skill and its checks are green.

Sol 6.1 reviews at milestones only: the end of a roadmap section, or a batch
of merged work touching money, approvals or anything that sends to an outside
party, tenant isolation or migrations. It reviews the merged range, not single
pull requests, and its findings become tickets. Also use it as a council for
contested design calls.

Keep a trial log in the ledger: each Sol finding, the pull request that
introduced it, and whether a per-pull-request review would plausibly have
caught it. Bring the tally to the user at each milestone so we can decide
whether to change the process.

Fallbacks: the implementer falls back to Sonnet 5.5 after a usage limit or two
failures on one ticket; Sol 6.1 falls back to Opus 5.5. When a rate limit
hits and no fallback is left, wait for the limit to reset and retry on your
own; never stop the session or wait for the user because of a limit.

## Concurrency

Keep four implementers busy whenever four tickets are ready, plus their
reviewers. Never leave capacity idle while waiting on one agent.

## Tracker

Update the tracker at every state change without being asked: claimed and in
progress at dispatch, in review with the pull request link, done after the
merge, back to todo with a comment when parked.

## Product check

Keep one agent playing the product's real user: it drives the running app
through the main journeys after each merge and files what breaks as tickets.

## Merging

Never merge without an explicit ask in this session. Get every pull request
to merge-ready (checks green, review clean) and list them.
