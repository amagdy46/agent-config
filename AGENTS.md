# Repository Instructions

A curated library of short Agent Skills (https://agentskills.io), installed
into Claude Code, Codex and other agents. The skills are the product; the
scripts check, index and install them.

## Layout

- `skills/<name>/SKILL.md`: one skill. Sibling files hold detail only some
  runs need.
- `global/`: the owner's global agent instructions.
- `scripts/validate-repo.mjs`: checks every skill; limits are constants at
  its top. `scripts/validate-repo.test.mjs`: its tests.
- `FAILURES.md`: per skill, the failure it fixes and its one-line pitch.
- `scripts/build-index.mjs`: generates `skills.json` and the README skills
  table from the skills and `FAILURES.md`.
- `scripts/link.mjs`: links skills into this machine's agent homes. Never
  run it unless the user asks.
- `CONTRIBUTING.md`: the bar for new text and the upstream-merge rules.
- `THIRD_PARTY_NOTICES.md`: credits and pinned upstream commits.

## Add or change a skill

1. Read the bar in `CONTRIBUTING.md`. A new line must fix a failure someone
   saw; removing text beats adding it.
2. Edit or create `skills/<name>/SKILL.md`. The folder name is lowercase
   letters, digits and hyphens. Frontmatter: `name: <name>` and
   `description:` (what it does, then trigger phrases, 300 characters or
   fewer). Write the body for the agent that runs it: terse, behaviour first.
3. New skill: add its `## <name>` section to `FAILURES.md`, with the
   `Stage:`, `For you:`, `Fixes:` and `Origin:` lines. Adapted from
   upstream: credit it in `THIRD_PARTY_NOTICES.md`.
4. Run `node scripts/build-index.mjs`; it writes `skills.json` and the
   README skills table, which are never edited by hand. Run
   `node scripts/validate-repo.mjs` and fix each message until it prints
   `ok`. If you changed `scripts/`, also run `node --test`.
5. Commit: imperative sentence, no prefix. CI runs all three commands.

## Hard rules

- Portable: no employer facts (names, URLs, credentials, incidents,
  business rules), machine paths, transcripts, secrets or symlinks.
- A skill links only to files inside its own folder.
- The validator prints `ok` before every commit. Use Node.js 24 or newer.
