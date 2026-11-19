# Trigger rates

Does each skill load when a request needs it, from its name and
description alone? Measured 2026-11-18 with Claude Code 2.1.327, all 23
skills installed as one plugin, using the suite in `../trigger-evals/` (how to
rerun it: [README.md](README.md#trigger-suite)).

Per skill: two prompts that should load it, one that should not. "fired"
counts runs where the skill loaded; "false" counts near-miss runs where it
loaded anyway. A miss lists what loaded instead; "none" means the agent
answered without any skill.

## Baseline

| skill | Haiku fired | Haiku false | Sonnet fired | Sonnet false | Sonnet miss: loaded instead |
|---|---|---|---|---|---|
| architecture-design | 0/6 | 0/3 | 3/6 | 0/3 | none (3) |
| brainstorm | 3/6 | 0/3 | 5/6 | 0/3 | none (1) |
| ci-pr-lifecycle | 4/6 | 0/3 | 6/6 | 0/3 | |
| impact-review (measured as `code-review`, its name then) | 1/6 | 0/3 | 5/6 | 0/3 | none (1) |
| create-verification-skill | 4/6 | 0/3 | 6/6 | 0/3 | |
| explain-codebase | 2/6 | 0/3 | 6/6 | 0/3 | |
| frontend-design | 5/6 | 0/3 | 6/6 | 0/3 | |
| grilling | 5/6 | 0/3 | 6/6 | 0/3 | |
| handoff | 3/6 | 0/3 | 3/6 | 0/3 | none (3) |
| implement | 3/6 | 0/3 | 6/6 | 0/3 | |
| orchestrate | 6/6 | 0/3 | 6/6 | 0/3 | |
| prototype | 3/6 | 0/3 | 6/6 | 0/2 | |
| reflect | 3/6 | 0/3 | 2/4 | 0/2 | none (2) |
| research | 1/6 | 0/3 | 4/4 | 0/2 | |
| systematic-debugging | 3/6 | 0/3 | 4/4 | 0/2 | |
| technical-documentation | 0/6 | 0/3 | 3/4 | 0/2 | none (1) |
| test-driven-development | 0/6 | 0/3 | 0/4 | 0/2 | none (4) |
| to-issues | 1/6 | 0/3 | 3/4 | 0/2 | none (1) |
| unslop | 2/6 | 0/3 | 4/4 | 0/2 | |
| verification-before-completion | 0/6 | 0/3 | 0/4 | 0/2 | none (4) |
| wait-what | 2/6 | 0/3 | 4/4 | 0/2 | |
| writing-plans | 2/6 | 0/3 | 4/4 | 0/2 | |
| **all** | **53/132 (40%)** | **0/66** | **92/112 (82%)** | **0/55** | |

- Haiku: 3 runs per case. Sonnet: 3 runs for `architecture-design` to
  `prototype`, 2 runs for the rest (the budget ran out; see below).
- Every Haiku miss is "none" as well. No run on either model loaded the
  wrong skill.
- `working-style` has no cases: its description is the rule, and it is not
  meant to be invoked.

## After the description trim

Measured 2026-11-18, same suite and settings, after every description
except `working-style` was cut to about 180 bytes (5,666 to 4,314 bytes
for the set). Haiku: 3 runs per case. Sonnet: 2 runs per case, all
skills.

| skill | Haiku fired | before | Sonnet fired | before |
|---|---|---|---|---|
| architecture-design | 1/6 | 0/6 | 4/4 | 3/6 |
| brainstorm | 3/6 | 3/6 | 4/4 | 5/6 |
| ci-pr-lifecycle | 5/6 | 4/6 | 4/4 | 6/6 |
| impact-review (measured as `code-review`) | 3/6 | 1/6 | 4/4 | 5/6 |
| create-verification-skill | 4/6 | 4/6 | 4/4 | 6/6 |
| explain-codebase | 2/6 | 2/6 | 4/4 | 6/6 |
| frontend-design | 4/6 | 5/6 | 4/4 | 6/6 |
| grilling | 5/6 | 5/6 | 4/4 | 6/6 |
| handoff | 3/6 | 3/6 | 4/4 | 3/6 |
| implement | 5/6 | 3/6 | 4/4 | 6/6 |
| orchestrate | 6/6 | 6/6 | 4/4 | 6/6 |
| prototype | 1/6 | 3/6 | 4/4 | 6/6 |
| reflect | 2/6 | 3/6 | 2/4 | 2/4 |
| research | 4/6 | 1/6 | 4/4 | 4/4 |
| systematic-debugging | 1/6 | 3/6 | 4/4 | 4/4 |
| technical-documentation | 2/6 | 0/6 | 4/4 | 3/4 |
| test-driven-development | 1/6 | 0/6 | 4/4 | 0/4 |
| to-issues | 1/6 | 1/6 | 3/4 | 3/4 |
| unslop | 3/6 | 2/6 | 4/4 | 4/4 |
| verification-before-completion | 0/6 | 0/6 | 0/4 | 0/4 |
| wait-what | 3/6 | 2/6 | 3/4 | 4/4 |
| writing-plans | 3/6 | 2/6 | 4/4 | 4/4 |
| **all** | **62/132 (47%)** | 53/132 (40%) | **80/88 (91%)** | 92/112 (82%) |

False fires: 0/66 on Haiku, 0/44 on Sonnet. Changes beyond a one-run
difference:

- `test-driven-development`: Sonnet 0/4 to 4/4. "test-first" and "make
  it pass" are now quoted; both prompts fire.
- `architecture-design`: "how should we split X" is quoted; the
  "restructure billing.py" prompt now fires on Sonnet (0/3 to 2/2) and
  on Haiku (0/3 to 4/6 over two passes).
- `handoff`: "pick up where the last session left off" fires on Sonnet
  (0/5 to 2/2). Haiku still misses it.
- `implement`, `research`, `impact-review`, `technical-documentation`:
  Haiku up 2 or 3 runs; Sonnet level.
- `prototype`, `systematic-debugging`: Haiku down 2 runs. Noise: rerun
  side by side, the old and new text scored the same (3/6 and 3/6; 2/6
  and 2/6).
- Still missing on both models: `reflect` on "turn that mistake into a
  rule".
- `grilling` was reworded after this run: "one at a time" became "in
  short rounds", because the skill asks in rounds. Its cases were not
  rerun, and one of its prompts says "one at a time".
- `code-review` was then renamed `impact-review`, with "code review"
  added as a trigger phrase. Its three cases, rerun 2026-11-19 (Claude
  Code 2.1.328): Haiku 3/6, Sonnet 4/4, no false fires. The same as
  before the rename.

## What the baseline shows

**Fire reliably** (Sonnet every run, Haiku 4/6 or more): `orchestrate`,
`frontend-design`, `grilling`, `ci-pr-lifecycle`,
`create-verification-skill`.

**Miss on both models:**

- `test-driven-development`: 0/10. "add discount codes, test-first" and
  "write a test that catches it, then make it pass" were done directly,
  without the skill.
- `handoff`: "write up where we are" fires every time; "pick up where the
  last session left off" never does, on either model.
- `reflect`: "reflect on this session" fires; "turn that mistake into a
  rule" never does.
- `architecture-design`: only "help me work out the pieces" fires on
  Sonnet; "restructure billing.py, how should we split it" never does.

**Haiku only:** Haiku mostly fires when the prompt reuses a phrase from
the description and misses when the request is reworded. Its reworded
prompts fired 13 of 66 runs; its close prompts fired 40 of 66.

**Pairs that confuse each other:** none were seen. Every near miss either
loaded nothing or loaded the neighbour it was written for: "write the
plan" loaded `writing-plans`, not `brainstorm`; "is my PR ready" loaded
`ci-pr-lifecycle`, not `verification-before-completion`; "make this README
sound human" loaded `unslop`, not `technical-documentation`; "explain the
scheduler" loaded `explain-codebase`, not `wait-what`.

## Limits

- `verification-before-completion` scored 0/10, and that says nothing
  about the skill. It is meant to load when the agent itself is about to
  say "done", after real work; a single message with no shell never
  reaches that point. Whether it fires there is measured by the behaviour
  suite, not here.
- One turn, no conversation before it. `wait-what`, `reflect` and
  `handoff` normally follow a session; their prompts quote or describe it
  instead.
- Every case runs in the same small repo (`trigger-evals/fixture.sh`). Tools
  are `Skill`, `Read`, `Glob` and `Grep`, with no shell, and at most 4
  turns. Raising the cap to 12 turns changed nothing: 0/18 on Haiku for
  `architecture-design`, `technical-documentation` and
  `test-driven-development`.
- 2 or 3 runs per prompt: a one-run difference is noise. Rerunning
  `handoff` on Sonnet gave 2/4 against 3/6 here, with the same prompt
  firing and the same one missing.
- Built-in skills compete, as in a real install (`code-review`, `debug`,
  `verify`, `deep-research`). None of them loaded in place of a plugin
  skill in these runs.

## Cost

Haiku, full suite at 3 runs per case: $0.77. Sonnet costs about $0.06 a
run, because a loaded skill makes the agent keep working: about $11 for
the full suite at 3 runs, $7.50 at 2.
