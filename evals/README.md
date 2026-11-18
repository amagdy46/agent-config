# Evals

Behaviour tests for the skills, in the format `claude plugin eval` reads.
Each case is a folder: `prompt.md` (the user's message), `case.yaml` (points
at `scaffold.sh`, which builds a small repo in the empty workspace) and one
grader per file in `graders/`.

The current cases test the working style:

| Case | Tag | The agent should |
|---|---|---|
| persist-todos | proceed | pick JSON or SQLite, build it, say why |
| rename-helpers | proceed | pick a module name, rename, update imports |
| fix-sibling-bug | proceed | fix the same bug in the sibling function too |
| add-login | proceed | build login with sane defaults, list its choices |
| multi-currency | proceed | build a reasonable version, state assumptions |
| free-disk | ask | delete build output; not delete untracked recordings |
| release-fix | ask | fix and bump the version; not run the release |

## Run

From the repo root, with your normal Claude Code login:

```sh
env -u ANTHROPIC_API_KEY claude plugin eval . --no-publish --trust-plugin \
  --scaffold --allow-tools Bash Write Edit --model sonnet -j 2 --max-cost-usd 5
```

- `--scaffold` runs each case's `scaffold.sh`; read them first.
- A no-plugin baseline arm runs by default, so every run doubles. Add
  `--ablation none` to skip it, `--case <name>` or `--tag ask` to narrow.
- Results go to `evals/results/<timestamp>/` (git-ignored).
- Cost, measured November 2026, full suite with the baseline arm: about $4
  on Sonnet and $0.30 on Haiku at 3 runs per case, $5.70 on Opus at 2.

## Writing graders here

- File graders see only files the run created or changed. A scaffold file
  the agent left alone, or deleted, reads as absent. So `exists: false` and
  `not_contains` pass on an untouched file: pair them with a positive check
  on the same file, or check the command with a `tool_used` grader.
- The eval sandbox blocks `git`. Cases that need git (a force-push, a
  merge) cannot run here.
- JavaScript regexes: no inline flags like `(?i)`; use `flags: i`.

## Trigger suite

`trigger-evals/`, at the repo root, checks that each skill loads from its
description alone, and stays quiet on a near miss. Per skill: two prompts
that should load it (one close to its description, one in other words) and
one that belongs to a neighbouring skill or to none. Each case passes or
fails on one `tool_used: Skill` grader. `working-style` has no cases: its
description is the rule itself, not meant to be invoked. The suite sits
outside `evals/` because `claude plugin eval` searches its eval dir
recursively, so the command above would run these cases too. Every case
builds the same small repo (`fixture.sh`), so "review this PR" has
something to point at. The baseline and the rates after the description
trim are in [TRIGGERS.md](TRIGGERS.md).

After changing a description, rerun that skill, then the whole suite:

```sh
node trigger-evals/run.mjs --model haiku --case 'code-review--*'
node trigger-evals/run.mjs --model sonnet --runs 2 --max-cost-usd 8
```

The runner calls `claude plugin eval` with `--eval-dir trigger-evals
--scaffold --ablation none --no-publish` (no baseline arm: without the
plugin there is nothing to load), unsets `ANTHROPIC_API_KEY`, and prints
one table: per skill, fired / should-fire runs, false fires / should-not
runs, and what loaded instead on a miss. `--from <results dir>...`
reprints one or more old runs as one table. Results and traces go to
`trigger-evals/results/` (git-ignored).

Cost, November 2026: the whole suite at 3 runs per case is $0.77 on
Haiku. Sonnet costs about $0.06 a run: about $11 at 3 runs, $7.50 at 2.
One skill's 3 cases cost cents on Haiku and under $0.60 on Sonnet.
