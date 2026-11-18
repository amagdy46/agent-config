# Trigger baseline

Does each skill load when a request needs it, from its name and
description alone? Measured 2026-11-18 with Claude Code 2.1.327, all 23
skills installed as one plugin, using the suite in `../trigger-evals/` (how to
rerun it: [README.md](README.md#trigger-suite)).

Per skill: two prompts that should load it, one that should not. "fired"
counts runs where the skill loaded; "false" counts near-miss runs where it
loaded anyway. A miss lists what loaded instead; "none" means the agent
answered without any skill.

## Results

| skill | Haiku fired | Haiku false | Sonnet fired | Sonnet false | Sonnet miss: loaded instead |
|---|---|---|---|---|---|
| architecture-design | 0/6 | 0/3 | 3/6 | 0/3 | none (3) |
| brainstorm | 3/6 | 0/3 | 5/6 | 0/3 | none (1) |
| ci-pr-lifecycle | 4/6 | 0/3 | 6/6 | 0/3 | |
| code-review | 1/6 | 0/3 | 5/6 | 0/3 | none (1) |
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

## What it shows

**Fire reliably** (Sonnet every run, Haiku 4/6 or more): `orchestrate`,
`frontend-design`, `grilling`, `ci-pr-lifecycle`,
`create-verification-skill`.

**Miss on both models:**

- `test-driven-development`: 0/10. "add discount codes, test-first" and
  "write a test that catches it, then make it pass" were done directly,
  without the skill.
- `verification-before-completion`: 0/10. "show me evidence it works" and
  "don't tell me it's fixed until you've proved it" never loaded it.
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
