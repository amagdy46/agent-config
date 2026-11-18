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
