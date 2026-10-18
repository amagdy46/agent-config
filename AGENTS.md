# Repository Instructions

Personal, agent-neutral skills library. Each skill lives in
`skills/<name>/SKILL.md` and follows the Agent Skills specification.

- Read `CONTRIBUTING.md` before adding or changing a skill. It holds the bar
  for new text and the rules for merging skills from several upstreams.
- Keep skills portable across agents and free of employer facts: names, URLs,
  credentials, incidents, business rules.
- Each skill references only files inside its own folder.
- Commit no machine paths, transcripts, secrets or symlinks.
- Run `node scripts/validate-repo.mjs` before committing.
