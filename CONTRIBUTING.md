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
  phrases or situations that should fire it. Keep it to 300 characters or
  fewer; the validator warns above that and fails above 1,024.
- Keep `SKILL.md` to 100 lines or fewer (the validator warns above that), and
  always under 20,000 bytes: Claude Code re-attaches a skill cut at that size
  after compaction, silently dropping its last rules. Push detail that only
  some runs need into a sibling file and point at it. The limits live at the
  top of `scripts/validate-repo.mjs`; change them there first.
- Prompt the behaviour you want. Use a prohibition only for a hard guardrail,
  and pair it with the positive target.
- Reference only files inside the skill's own folder, so each skill installs
  alone.

## Add or change a skill

1. Check the change against the bar above.
2. Edit `skills/<name>/SKILL.md` as described under "Writing a skill". A new
   skill also gets a row in the `README.md` skill table, and a credit in
   `THIRD_PARTY_NOTICES.md` if it adapts an upstream skill.
3. Validate with Node.js 24 or newer, and fix each message until it prints
   `ok`:

   ```sh
   node scripts/validate-repo.mjs
   node --test   # only if you changed scripts/
   ```

4. Open a pull request. CI runs the same two commands.

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

