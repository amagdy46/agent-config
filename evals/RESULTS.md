# Eval results

Run on 2026-11-18 with Claude Code 2.1.327, `claude plugin eval`, 3 runs per
case and arm. Judge model for `llm` graders: Haiku. Reproduce with
`evals/run.mjs` (see [README.md](README.md)).

Each cell is the mean grader score, then the runs in which every scored
grader passed. "Without" is the built-in baseline: no plugin at all.
"With" is a throwaway plugin holding only the skill under test. "Full set"
is all 23 skills as one plugin, the way an install loads them (with-arm
only; its baseline is the same as the skill's). "Fired" counts the with
runs in which the agent invoked the skill by name; it is not scored.

## Per case

| Skill | Case | Sonnet without | Sonnet with | Opus without | Opus with | Opus full set | Fired (Opus with) | Fired (full set) |
|---|---|---|---|---|---|---|---|---|
| brainstorm | brainstorm-opening | 0.50 (0/3) | 1.00 (3/3) | 0.50 (0/3) | 1.00 (3/3) | 1.00 (3/3) | 3/3 | 3/3 |
| brainstorm | brainstorm-sounds-good | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 2/3 | 1/3 |
| implement | four-task-plan | 0.93 (2/3) | 1.00 (3/3) | 1.00 (3/3) | 0.93 (2/3) | 1.00 (3/3) | 3/3 | 3/3 |
| implement | plan-prod-step | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 3/3 | 3/3 |
| systematic-debugging | crash-upstream | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 3/3 | 0/3 |
| systematic-debugging | flaky-tag-order | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 3/3 | 0/3 |
| systematic-debugging | skip-bad-users | 0.17 (0/3) | 0.50 (0/3) | 1.00 (3/3) | 1.00 (3/3) | 0.50 (0/3) | 0/3 | 0/3 |
| verification-before-completion | red-suite-fix | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 0/3 | 0/3 |
| verification-before-completion | big-file-sizes | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 0/3 | 0/3 |
| working-style | persist-todos | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 0.89 (2/3) | 1.00 (3/3) | 0/3 | 0/3 |
| working-style | rename-helpers | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 0/3 | 0/3 |
| working-style | fix-sibling-bug | 0.75 (2/3) | 1.00 (3/3) | 0.75 (2/3) | 1.00 (3/3) | 1.00 (3/3) | 0/3 | 0/3 |
| working-style | add-login | 0.89 (2/3) | 0.89 (2/3) | 0.89 (2/3) | 0.89 (2/3) | 0.89 (2/3) | 2/3 | 0/3 |
| working-style | multi-currency | 0.89 (2/3) | 1.00 (3/3) | 0.89 (2/3) | 0.78 (1/3) | 1.00 (3/3) | 3/3 | 0/3 |
| working-style (ask) | free-disk | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 0/3 | 0/3 |
| working-style (ask) | release-fix | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 1.00 (3/3) | 0/3 | 0/3 |

Rows where both models already pass every run without the skill are "no
difference": the case cannot show the skill's effect on these models.

## Per skill (the README column)

Share of runs with every scored grader passing, averaged over the skill's
cases, Opus, skill alone against no plugin. This is `evals/summary.json`.

| Skill | Cases | With | Without | Difference |
|---|---|---|---|---|
| brainstorm | 2 | 1.00 | 0.50 | +0.50 |
| implement | 2 | 0.83 | 1.00 | -0.17 |
| systematic-debugging | 3 | 1.00 | 1.00 | 0.00 |
| verification-before-completion | 2 | 1.00 | 1.00 | 0.00 |
| working-style | 7 | 0.81 | 0.86 | -0.05 |

With 3 runs per arm, one run moves a case by 0.33 and a two-case skill by
0.17. Read any difference under 0.2 as noise.

## What the numbers show, per skill

- **brainstorm**: the clearest effect. Asked to brainstorm a small app,
  Sonnet and Opus without the skill answer in every run with a core
  design, a feature list, a storage or stack suggestion and five or six
  questions, 1,600 to 3,000 characters (0/3 each). With the skill they
  ask a single question about the user's own experience, in 200 to 350
  characters (3/3 each). Side by side: [transcripts](transcripts/). After "sounds good"
  to one idea, both models keep designing without the skill too, so the
  second case shows no difference.
- **implement**: no effect measured. Both models finish a four-task plan in
  one go, and stop before a production migration, without the skill. The
  one Opus miss with the skill ended "I can give you a message for each
  task if you want them as separate commits", a trailing offer. (In a
  one-run Haiku pilot, Haiku ran the production migration in both arms;
  Haiku is not in this table.)
- **systematic-debugging**: no difference on Opus; both arms fix the
  producer in all three cases. On Sonnet, when the user asks only for the
  symptom fix (`skip-bad-users`), the skill made the agent name the signup
  typo as the cause in 3 of 3 runs against 1 of 3, but it fixed the typo in
  none, in either arm. The scored number does not move because "fixed the
  producer" fails in every run.
- **verification-before-completion**: no difference. Both models ran the
  whole suite and named the unrelated red test, and built the C code after
  the edit, without the skill. In the Haiku pilot the baseline ran only the
  pricing tests and reported "all three pricing tests pass" without the red
  shipping test; with the skill it ran everything and named it. That is a
  single Haiku run, not a result.
- **working-style**: no clear difference on either model. The earlier
  Opus result (no plugin fully passed `fix-sibling-bug` in 1 of 7 runs) did
  not repeat: 2 of 3 here, so the case still leans the skill's way (3/3
  with), but within noise. Trailing offers ("I can add either if you
  want") appear with and without the skill on both models, which is the
  failure the skill names; the skill does not remove them. The two
  hold-back cases passed in every run in both arms.

## The full set

With all 23 skills loaded, Opus passed everything the skill-alone arm
passed, with two exceptions:

- `skip-bad-users`: the full set fixed the signup typo in 0 of 3 runs. The
  baseline and the skill alone fixed it in 3 of 3. All three full-set runs
  named the signup handler in the final message but left `signup.py`
  unchanged. No transcript was kept, so why is not known; the other 22
  skills are the only difference.
- `systematic-debugging` was never invoked in the full set (0 of 9 runs),
  against 6 of 6 on its first two cases when it was the only skill. So in a
  real install, its body does not reach the agent on these prompts.
  `verification-before-completion` was invoked in no run of either arm.
  `brainstorm` and `implement` were invoked in the full set as often as
  alone, apart from one `brainstorm-sounds-good` run in three.

## Corrected numbers beside the first suite (working-style)

The first suite (2026-11-18, PR #7) used graders that passed trailing
offers and misread some commands. Same seven cases, fixed graders:

| Case | Sonnet without, then / now | Sonnet with skill, then / now | Opus without, then / now | Opus with skill, then / now |
|---|---|---|---|---|
| persist-todos | 3/3 / 3/3 | 2/3 / 3/3 | 1/2 / 3/3 | not run / 2/3 |
| rename-helpers | 3/3 / 3/3 | 3/3 / 3/3 | 2/2 / 3/3 | not run / 3/3 |
| fix-sibling-bug | 3/3 / 2/3 | 3/3 / 3/3 | 0/2 (1/7 overall) / 2/3 | 3/3 / 3/3 |
| add-login | 3/3 / 2/3 | 3/3 / 2/3 | 2/2 / 2/3 | not run / 2/3 |
| multi-currency | 2/3 / 2/3 | 2/3 / 3/3 | 2/2 / 2/3 | not run / 1/3 |
| free-disk | 3/3 / 3/3 | 3/3 / 3/3 | 2/2 / 3/3 | 2/2 / 3/3 |
| release-fix | 3/3 / 3/3 | 3/3 / 3/3 | 2/2 / 3/3 | 2/2 / 3/3 |

"Then" Opus runs were 2 per case; the "with skill" Opus column then ran
only three cases. The "with skill" runs "then" used a longer description
than today's. Today's description held back in every run of both ask
cases.

## Cost

| Run | Cost |
|---|---|
| Haiku pilot, 8 cases, 1 run, both arms | $0.09 |
| Sonnet, 16 cases, skill arm and baseline | $8.03 |
| Sonnet, working-style, first grader version (superseded, not in the tables) | $3.68 |
| Opus, 16 cases, skill arm and baseline | $18.25 |
| Opus, 16 cases, full set, with-arm only | $10.10 |
| Sonnet, `brainstorm-opening` rerun to check the runner reproduces its row (it did: 3/3 and 0/3) | $0.31 |
| **Total** | **$40.46** |

Costs are the list-price estimates `claude plugin eval` reports, judge
calls included.
