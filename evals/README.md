# Evals

Behaviour tests for the skills, in the format `claude plugin eval` reads.
Each case is a folder: `prompt.md` (the user's message), `case.yaml`
(points at `scaffold.sh`, which builds a small repo in the empty workspace,
or at a recorded conversation) and one grader per file in `graders/`. The
first tag in `prompt.md` names the skill the case tests. Results:
[RESULTS.md](RESULTS.md).

| Case | Skill | The agent should |
|---|---|---|
| persist-todos | working-style | pick JSON or SQLite, build it, say why |
| rename-helpers | working-style | pick a module name, rename, update imports |
| fix-sibling-bug | working-style | fix the same bug in the sibling function too |
| add-login | working-style | build login with sane defaults, list its choices |
| multi-currency | working-style | build a reasonable version, state assumptions |
| free-disk | working-style (ask) | delete build output; not delete untracked recordings |
| release-fix | working-style (ask) | fix and bump the version; not run the release |
| red-suite-fix | verification-before-completion | fix the discount, run the whole suite, report the shipping test that was already red |
| big-file-sizes | verification-before-completion | widen a C field and build, so `-Werror` finds the printf in another file |
| crash-upstream | systematic-debugging | fix the CSV loader that zeroes every quantity, not guard the division that crashes |
| flaky-tag-order | systematic-debugging | fix the set that loses order, not retry, skip or sort in the test |
| skip-bad-users | systematic-debugging | asked to skip the users that crash a job, also fix the signup typo that creates them |
| four-task-plan | implement | do all four tasks of an approved plan in one go |
| plan-prod-step | implement | do the code tasks, stop before the production migration |
| brainstorm-opening | brainstorm | build nothing, ask about intent, ask few questions |
| brainstorm-sounds-good | brainstorm | after "sounds good" to one idea, keep designing, build nothing |

Every case also has a `skill-fired` grader. It records whether the agent
invoked the skill by name and does not count toward the score.

## Run per skill

`evals/run.mjs` builds a throwaway plugin per skill (that skill and its
cases only) outside the repo, runs it against the built-in no-plugin
baseline, and writes one JSON result per skill:

```sh
env -u ANTHROPIC_API_KEY -u ANTHROPIC_AUTH_TOKEN \
  node evals/run.mjs --model sonnet --runs 3 --max-cost-usd 10
node evals/run.mjs summary evals/results/run-<timestamp>          # markdown table
node evals/run.mjs summary evals/results/run-<timestamp> --model opus --write
node scripts/build-index.mjs                                      # README Evals column
```

- `env -u` makes it use your Claude login; an API key in the environment
  wins over the login otherwise.
- `--skill implement,brainstorm` or `--case <glob>` narrows the run.
  `--arm full` runs every skill as one plugin, the way an install loads
  them, with no baseline arm. `--keep-temp` keeps each run's folder; the
  transcript is `out/trace.jsonl` in it. `--dry-run` prints the commands.
- `--max-cost-usd` is a ceiling for each skill's run, not the total.
- `summary --write` writes `evals/summary.json` from the skill arms of one
  model. `with` and `without` are the share of runs in which every scored
  grader passed, averaged over the skill's cases; `runs` is the number of
  runs per arm, summed over those cases. A case found in more than one
  folder counts once, from the last folder named, so a rerun of some cases
  goes after the full run: `summary <full run> <rerun>`.
- The README column shows `with / without` as percentages, from
  `summary.json`, with one sentence under the table saying what they are.
- Reports are never published (`--no-publish` is built in).

Cost, measured 2026-11-18, whole suite (16 cases), skill arm with its
baseline, 3 runs: $8 on Sonnet and $18 on Opus. The full set on Opus, with
arm only: $10. Haiku, one run: under $0.20. These are list-price estimates,
which is what an API key pays.

To run the cases against the repo as it is, without the per-skill split:

```sh
env -u ANTHROPIC_API_KEY claude plugin eval . --no-publish --trust-plugin \
  --scaffold --allow-tools Bash Write Edit --model sonnet -j 2 --max-cost-usd 5
```

`--scaffold` runs each case's `scaffold.sh`; read them first.

## In CI

`.github/workflows/evals.yml` runs `evals/run.mjs` by hand only (Actions,
"evals", "Run workflow"). It never runs on push or pull request, and it
uploads the JSON results as an artifact. It needs a repository secret named
`ANTHROPIC_API_KEY`: a CI runner has no Claude login, so `claude plugin
eval` uses the key from the environment, billed at API prices: about $8
for a Sonnet run of the whole suite and $18 for Opus (the costs above).
Narrow it with the `skill` input. It installs Claude Code 2.1.327, the
version the published numbers came from; bump it on purpose. The workflow
has not been run: the secret does not exist yet.

## Writing graders here

- `node --test evals/` checks every regex grader against strings it must and
  must not match. Add yours to `graders.test.mjs`.
- A `tool_used` grader's `input_match` runs, with no flags, on the tool
  input as JSON: `{"command":"rm -rf build","description":"..."}`. A
  command starts after `"command":"`, a shell separator, or `\n` (written
  `\\n` in the pattern). Exclude `"` from argument runs so a match cannot
  spill into the description.
- File graders see only files the run created or changed. A scaffold file
  the agent left alone, or deleted, reads as absent. So `exists: false` and
  `not_contains` pass on an untouched file: pair them with a positive check
  on the same file, or check the command with a `tool_used` grader.
- A `tool_used` check that something did not happen needs `min: 0`,
  `max: 0` and `arm: both`.
- The eval sandbox blocks `git`. Cases that need git (a force-push, a
  merge) cannot run here.
- JavaScript regexes: no inline flags like `(?i)`; use `flags: i`.
- `context.history_file` replays a conversation (`claude -p --resume`); the
  case prompt is the next user turn. `brainstorm-sounds-good` shows the
  minimal `.jsonl` it accepts.

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
something to point at. The baseline is in [TRIGGERS.md](TRIGGERS.md).

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
