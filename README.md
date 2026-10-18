# Agent Config

My personal [Agent Skills](https://agentskills.io) for Claude Code, Codex,
Cursor, OpenCode, Pi and any agent that reads the open skill format. This
repository is the source of truth; agent folders only hold links to it.

## Install

```sh
git clone git@github.com:amagdy46/agent-config.git
node agent-config/scripts/link.mjs
```

This links every skill into `~/.agents/skills` and each agent's skills folder
that exists, and removes dead links left by deleted skills or an old clone
location. After that, `git pull` updates every agent. Rerun the script after
adding or removing a skill, or after moving the clone. Use `--dry-run` to
preview.

Third-party skills I use unchanged are installed with the
[skills CLI](https://github.com/vercel-labs/skills)
(`npx skills add <repo> --skill <name>`, `npx skills update`), never copied
here.

## How the agent works

Proceed, then present: for reversible work the agent makes the call, does it
and explains, and asks only for product direction or before irreversible and
outward-facing actions. Starting a new project is the exception: `brainstorm`
interviews first. The working-style section of the global `CLAUDE.md` /
`AGENTS.md` sets this; the skills follow it.

## The flow for a new project

```text
brainstorm ──► writing-plans ──► to-issues ──► implement
   │  ▲             (plan.md)    (GitHub, Linear,   │
   │  └─ research, prototype      or Markdown)      ▼
   └─ grilling (converge)                code-review, verification
```

1. **brainstorm** interviews you for intent, runs research in the background
   while you talk, plays its understanding back, converges with grilling
   rounds, and writes `design.md` once you approve.
2. **writing-plans** turns the design into `plan.md`: small, testable tasks
   with exact interfaces.
3. **to-issues** slices the work into tracer-bullet tickets with blocking
   edges and publishes them where the project's `AGENTS.md` says.
4. **implement** works the ticket frontier, test-first, then verifies and
   reviews.

Everything for one effort lives in one planning folder, `design.md`,
`plan.md` and `issues/`, with frontmatter and wikilinks that Obsidian
understands. Point it at a vault per project in `AGENTS.md`:

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
| Build | [implement](skills/implement/SKILL.md) | execute a plan or tickets, native or delegated |
| | [test-driven-development](skills/test-driven-development/SKILL.md) | red, green, refactor at a public seam |
| | [systematic-debugging](skills/systematic-debugging/SKILL.md) | reproduce, isolate and fix the root cause |
| | [frontend-design](skills/frontend-design/SKILL.md) | structure, style and visually verify UI without the templated look |
| Check | [verification-before-completion](skills/verification-before-completion/SKILL.md) | prove a claim before saying "done" |
| | [code-review](skills/code-review/SKILL.md) | review a change and trace what it could break |
| | [ci-pr-lifecycle](skills/ci-pr-lifecycle/SKILL.md) | drive a PR through CI; never merges unasked |
| Explain | [explain-codebase](skills/explain-codebase/SKILL.md) | explain how and why code works |
| | [wait-what](skills/wait-what/SKILL.md) | re-explain the last answer plainly |
| | [handoff](skills/handoff/SKILL.md) | write or resume from a handoff between sessions |
| Improve | [reflect](skills/reflect/SKILL.md) | turn a session's lessons into skill, AGENTS.md or enforcement edits |
| Write | [technical-documentation](skills/technical-documentation/SKILL.md) | write docs for developers or operators |
| | [unslop](skills/unslop/SKILL.md) | strip AI tells from prose |

## Changing skills

Read [CONTRIBUTING.md](CONTRIBUTING.md). It holds the bar for new text and the
rules for merging the same skill from Superpowers, Matt Pocock's skills and
pstack. Run `node scripts/validate-repo.mjs` before committing.

## License

MIT. Upstream credits and pinned revisions are in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
