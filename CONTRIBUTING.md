# Contributing

This is a small, curated library. Every skill is permanent maintenance
surface, so the bar for adding text is higher than the bar for removing it.

## The bar for a new skill or a new rule

1. **Observed failure.** Something went wrong in a real session and the
   existing skills did not prevent it. "It would be nicer if..." does not
   count.
2. **No composition.** If the behaviour composes from existing skills, write
   it in a project `AGENTS.md` or a prompt instead.
3. **Not a no-op.** If the agent already does it without being told, the line
   costs context and changes nothing. Delete it.

## Writing a skill

- `skills/<name>/SKILL.md`, `name` equal to the folder name.
- The description front-loads the trigger: what the skill does, then the
  phrases or situations that should fire it. Keep it under about 300
  characters.
- Keep `SKILL.md` under about 80 lines. Push detail that only some runs need
  into a sibling file and point at it.
- Prompt the behaviour you want. Use a prohibition only for a hard guardrail,
  and pair it with the positive target.
- Reference only files inside the skill's own folder, so each skill installs
  alone.

## Merging the same skill from several upstreams

Superpowers, Matt Pocock's skills and pstack often cover the same job with
different mechanisms. When folding them into one of these skills:

1. **One job, one skill.** Keep a single skill under this repo's name. Take
   the strongest mechanism from each source, never the union of their text.
2. **Who wins by concern** when sources disagree:

   | Concern | Default source |
   |---|---|
   | Finding intent: open questions, playback, approval gate | Superpowers `brainstorming` |
   | Converging decisions: frontier rounds, recommended answers | Pocock `grilling` |
   | Breaking work down: tracer-bullet tickets, blocking edges | Pocock `to-tickets` |
   | Plans, execution discipline, TDD, verification | Superpowers |
   | Terseness, pruning, prototypes over questions | pstack and Pocock `writing-for-agents` |

   Override the default when the other source fixes a failure seen here.
3. **Adopt an upstream change only if** it fixes a failure seen here or it
   removes text. Skip additions that solve problems not seen here.
4. **Rewrite, do not copy.** Credit the source and pinned commit in
   `THIRD_PARTY_NOTICES.md`.
5. **Never run both copies.** Do not install an upstream skill and this
   repo's version of the same job on the same agent. Upstream skills used
   unchanged are installed with `npx skills add <repo> --skill <name>`, not
   copied here.

### Updating from upstream

```sh
git clone https://github.com/<owner>/<repo> /tmp/up && cd /tmp/up
git log --oneline <pinned>..HEAD -- <skill paths>
git diff <pinned>..HEAD -- <skill paths>
```

Apply the rules above to each change, then bump the pinned commit in
`THIRD_PARTY_NOTICES.md`.

## Validate

```sh
node scripts/validate-repo.mjs
```
