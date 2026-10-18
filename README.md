# Agent Config

These are the skills I use every day with Claude Code and Codex. They also
work in Cursor, OpenCode, Pi and any other agent that reads the open
[Agent Skills](https://agentskills.io) format.

The skills started from three collections I like:
[Superpowers](https://github.com/obra/superpowers),
[Matt Pocock's skills](https://github.com/mattpocock/skills) and
[pstack](https://github.com/cursor/plugins/tree/main/pstack). I kept the parts
that fixed problems I actually hit, merged overlapping skills into one, and
cut the rest. The result is 20 short skills.

Two ideas shape everything here:

- **Proceed, then present.** For anything reversible, the agent makes the
  call, does the work and tells you what it decided and why. It asks you only
  about product direction, or before something it can't undo: force-pushing,
  merging, deleting data, publishing, or messaging people.
- **Interview first when the project is new.** Starting something from
  scratch is the one time the agent should slow down. `brainstorm` asks you
  questions until it knows what you want, and researches while you talk.

## Install

### Use the skills

With the [skills CLI](https://github.com/vercel-labs/skills):

```sh
npx skills add amagdy46/agent-config -g                    # pick from the list
npx skills add amagdy46/agent-config -g --skill brainstorm  # just one
npx skills update                                           # later
```

The skills refer to each other by name. For example, `brainstorm` hands off
to `writing-plans`, and `implement` calls `test-driven-development`. Install
the whole set if you want the full flow.

Then add the working style to your global instructions file, such as
`~/.claude/CLAUDE.md` or `~/.codex/AGENTS.md`. Copy the "Working Style"
section from [global/AGENTS.md](global/AGENTS.md). The skills assume it.

### Fork it and make it yours

If you fork the repo, run `scripts/link.mjs` from your clone:

```sh
git clone git@github.com:<you>/agent-config.git
node agent-config/scripts/link.mjs --dry-run   # see what it will do
node agent-config/scripts/link.mjs
```

The script links every skill into `~/.agents/skills` and into the skills
folder of each agent you have installed. After that, `git pull` or a local
edit updates every agent at once.

The script also links the files in `global/` over `~/.claude/CLAUDE.md`,
`~/.codex/AGENTS.md` and `~/AGENTS.md`. It moves any existing file aside to
`.bak` first. Those files hold my personal rules, so edit `global/` before
you run it.

Rerun the script after you add, remove or rename a skill, or move the clone.
It also removes links left behind by deleted skills.

## Quick start

You don't call most skills by name. Describe the task, and the agent picks
the skill that fits.

```text
let's brainstorm a CLI that syncs my Kindle highlights into Obsidian
```

The agent asks you open questions one at a time, and starts background
research on the ideas that come up. Every few answers it plays back what it
has understood. When most questions are settled, it asks pointed questions
with a recommended answer for each, and you can just say "yes". Once you
approve, it writes `design.md`.

```text
plan it and put the work in GitHub issues
```

The agent writes `plan.md`, splits the work into small end-to-end tickets
and opens them with their dependencies linked.

```text
work the issues
```

The agent picks up the tickets that are ready, builds each one test-first,
verifies it and reviews it. It stops only when something is truly blocked.

Other examples:

```text
debug this: the export hangs on files over 2 GB
grill me on this migration plan
review this branch: what could it break?
is this PR ready? push it and watch CI
reflect   (at the end of a session full of corrections)
```

## The flow for a new project

```text
brainstorm ──► writing-plans ──► to-issues ──► implement
   │  ▲             (plan.md)    (GitHub, Linear,   │
   │  └─ research, prototype      or Markdown)      ▼
   └─ grilling (converge)                code-review, verification
```

1. **brainstorm** finds out what you want, researches in the background,
   plays its understanding back in short chunks, then works through the
   remaining decisions with `grilling`. When you approve, it writes
   `design.md`.
2. **writing-plans** turns the design into `plan.md`: small tasks, each with
   its exact files, interfaces and checks.
3. **to-issues** splits the work into thin tickets that each cut through the
   whole stack and can be tested on their own. It links which ticket blocks
   which, and publishes them to GitHub, Linear or Markdown files.
4. **implement** works through the tickets that are ready, test-first. It
   verifies and reviews the result, and pushes only when you ask.

You can start at any step. If you already know what you want, skip
straight to "write a plan" or "break this into issues".

### Where the files go

Everything for one piece of work lives in one planning folder: `design.md`,
`plan.md` and `issues/`. The default is `docs/plans/YYYY-MM-DD-<slug>/` in
the repo. The files use frontmatter and `[[wikilinks]]`, so an Obsidian
vault shows them as linked notes. To put them in your vault and choose a
tracker, add these lines to the project's `AGENTS.md`:

```markdown
Planning folder: ~/notes/projects/<project>
Issue tracker: github            # or: linear (team: X), markdown
```

## Skills

| Stage | Skill | Use it to |
|---|---|---|
| Think | [brainstorm](skills/brainstorm/SKILL.md) | find out what you actually want, with research, then write the design |
| | [grilling](skills/grilling/SKILL.md) | stress-test a plan in rounds of questions with recommended answers |
| | [research](skills/research/SKILL.md) | answer a question from primary sources, cited and dated |
| | [prototype](skills/prototype/SKILL.md) | build a throwaway to answer one design question |
| Plan | [writing-plans](skills/writing-plans/SKILL.md) | write an implementation plan |
| | [to-issues](skills/to-issues/SKILL.md) | break work into tickets in GitHub, Linear or Markdown |
| | [architecture-design](skills/architecture-design/SKILL.md) | design module boundaries and refactor safely |
| Build | [implement](skills/implement/SKILL.md) | execute a plan or tickets, yourself or with subagents |
| | [test-driven-development](skills/test-driven-development/SKILL.md) | red, green, refactor at a public seam |
| | [systematic-debugging](skills/systematic-debugging/SKILL.md) | reproduce, isolate and fix the root cause |
| | [frontend-design](skills/frontend-design/SKILL.md) | design and check UI that doesn't look like a template |
| Check | [verification-before-completion](skills/verification-before-completion/SKILL.md) | prove a claim before saying "done" |
| | [code-review](skills/code-review/SKILL.md) | review a change and trace what it could break |
| | [ci-pr-lifecycle](skills/ci-pr-lifecycle/SKILL.md) | drive a PR through CI; never merges unasked |
| Explain | [explain-codebase](skills/explain-codebase/SKILL.md) | explain how and why code works |
| | [wait-what](skills/wait-what/SKILL.md) | re-explain the last answer in plain words |
| | [handoff](skills/handoff/SKILL.md) | write or resume from a handoff between sessions |
| Improve | [reflect](skills/reflect/SKILL.md) | turn a session's lessons into skill, `AGENTS.md` or enforcement edits |
| Write | [technical-documentation](skills/technical-documentation/SKILL.md) | write docs for developers or operators |
| | [unslop](skills/unslop/SKILL.md) | strip AI tells from prose |

## Why these skills

Each skill exists because of a failure I kept seeing.

- **The agent built the wrong thing.** It guessed at what I meant instead
  of asking. `brainstorm` and `grilling` close that gap before any code
  exists.
- **The agent kept asking permission.** "Should I do X?" after every step
  wastes more time than an occasional wrong call. The working style and
  `implement` keep it moving and have it report what it decided.
- **"Done" meant "I think it's done".** `verification-before-completion`
  makes the agent show fresh evidence, and `code-review` checks what a
  change could break beyond its own diff.
- **Fixes treated the symptom.** `systematic-debugging` reproduces the bug
  and finds its cause before anything changes.
- **The same mistake, every session.** `reflect` reads the session's
  transcript and turns its lessons into edits to the skills, so the next
  session starts smarter.

## Repository layout

```text
skills/<name>/SKILL.md   one skill; longer reference material sits next to it
global/                  my global instructions for Claude Code and Codex
scripts/link.mjs         link skills and global files into each agent
scripts/validate-repo.mjs  check names, descriptions, sizes and links
CONTRIBUTING.md          the bar for new skills and how to merge upstream ones
THIRD_PARTY_NOTICES.md   credits and the pinned upstream versions
```

## Contributing

Issues and PRs are welcome. [CONTRIBUTING.md](CONTRIBUTING.md) sets the bar.
A new line of text must fix a failure someone actually saw. When more than
one source has the same skill, we keep the strongest version rather than
combining all of them. Run `node scripts/validate-repo.mjs` before you
commit.

## Credits and license

MIT. Many ideas here come from Jesse Vincent's Superpowers, Matt Pocock's
skills and poteto's pstack. Credits and pinned upstream versions are in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
