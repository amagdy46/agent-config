# Agent Config

A personal, portable library of [Agent Skills](https://agentskills.io) for
Codex, Claude Code, Cursor, Pi, OpenCode, and any other client that reads the
open skill format. It is an opinionated baseline, not a team standard: use it as
a reference or fork it, then keep the skills and sets that improve your work.

The repository is the source of truth. Agent-native folders and skill managers
are deployment targets, never canonical storage.

## Install

Install one skill, a named set, or everything with the open skills installer:

```sh
npx skills add git@github.com:amagdy46/agent-config.git --skill systematic-debugging
```

Add `--all` to install the full catalog, or pick the skill IDs from a set file
under `sets/`. Start with `sets/start-here.yaml`, then remove what does not
earn its place. Every skill is independently installable and references only
files inside its own directory.

## Why these skills exist

Agents do their best work when the recurring judgment calls are written down:
what counts as evidence, when to stop and ask, what must never be mutated, and
which workflow owns which decision. Each skill here captures one such procedure,
borrowed from the sources credited in `THIRD_PARTY_NOTICES.md` and rewritten
to be agent-neutral, portable, and free of employer facts.

Skills are either **automatic**, meaning the agent selects them from the
description when a task matches, or **explicit**, meaning you invoke them by
name because they are expensive, stateful, or change what the agent is allowed
to do.

## Skills

### Product and design

- **[product-discovery](skills/product-discovery/SKILL.md)**: frame a product problem and choose the cheapest evidence that would change a decision.
- **[product-specification](skills/product-specification/SKILL.md)**: write an evidence-backed brief or PRD with scope, states, and acceptance evidence.
- **[user-stories](skills/user-stories/SKILL.md)**: split an understood need into small, negotiable stories with observable acceptance examples.
- **[ux-design](skills/ux-design/SKILL.md)**: design task flows, information architecture, states, and structural UX variants before visuals.
- **[frontend-design](skills/frontend-design/SKILL.md)**: implement product-specific, accessible, visually verified web interfaces.
- **[taste](skills/taste/SKILL.md)**: anti-slop visual craft applied alongside frontend-design so UI does not look templated.
- **[prototype](skills/prototype/SKILL.md)** (explicit): build throwaway variants to answer one named design question.

### Engineering

- **[architecture-design](skills/architecture-design/SKILL.md)**: design consequential module, interface, seam, and boundary changes.
- **[refactor-safely](skills/refactor-safely/SKILL.md)**: restructure code while preserving externally observable behavior.
- **[blast-radius](skills/blast-radius/SKILL.md)**: trace consumers beyond the diff and prove the load-bearing safety facts.
- **[systematic-debugging](skills/systematic-debugging/SKILL.md)**: reproduce, isolate, explain, and verify the root cause of a failure.
- **[test-driven-development](skills/test-driven-development/SKILL.md)** (explicit): red-green-refactor through an affordable public seam.
- **[typescript-testing](skills/typescript-testing/SKILL.md)**: choose the smallest honest TypeScript test layer and behavior seam.
- **[contract-testing](skills/contract-testing/SKILL.md)**: prove provider-consumer compatibility at real transport boundaries.
- **[safe-database-changes](skills/safe-database-changes/SKILL.md)**: design and verify migrations on disposable databases, never production.
- **[writing-plans](skills/writing-plans/SKILL.md)**: produce a dependency-aware plan in independently verifiable units.
- **[implement](skills/implement/SKILL.md)** (explicit): execute an approved plan with evidence and review gates.
- **[code-review](skills/code-review/SKILL.md)**: review a change for requirement correctness and maintainability without editing it.
- **[verification-before-completion](skills/verification-before-completion/SKILL.md)**: require fresh, claim-specific evidence before declaring success.
- **[using-git-worktrees](skills/using-git-worktrees/SKILL.md)** (explicit): establish safe Git isolation for substantial or parallel work.
- **[multi-agent-development](skills/multi-agent-development/SKILL.md)** (explicit): coordinate bounded delegated implementation with independent review.
- **[ci-pr-lifecycle](skills/ci-pr-lifecycle/SKILL.md)**: inspect or drive PR and CI state with explicit mutation boundaries; never merges.
- **[design-control-loop](skills/design-control-loop/SKILL.md)** (explicit, pilot): design a scheduled agent loop that drives one codebase property toward a target through small PRs.

### Documentation and explanation

- **[technical-documentation](skills/technical-documentation/SKILL.md)**: source-grounded developer docs matched to reader and document mode.
- **[operator-guide](skills/operator-guide/SKILL.md)**: verified task guidance for non-technical operators and support staff.
- **[author-agent-instructions](skills/author-agent-instructions/SKILL.md)** (pilot): write or improve AGENTS.md-style files with bare foundations and narrowly triggered rules.
- **[unslop](skills/unslop/SKILL.md)**: make substantial human-facing prose concrete and natural without changing its evidence.
- **[explain-codebase](skills/explain-codebase/SKILL.md)**: explain how existing code works and, when asked, why it became that way.
- **[wait-what](skills/wait-what/SKILL.md)**: re-pitch the immediately preceding explanation in plain language. Saying "bro" triggers it too.
- **[teach](skills/teach/SKILL.md)** (explicit): run a persistent multi-session course in a dedicated learning workspace.
- **[archify](skills/archify/SKILL.md)** (pilot): render validated architecture, sequence, workflow, and dataflow diagrams as standalone HTML.

### Navigation and continuity

- **[research](skills/research/SKILL.md)**: produce a scoped, current, primary-source research artifact.
- **[grilling](skills/grilling/SKILL.md)** (explicit): stress-test a plan or decision through dependency-aware questioning.
- **[wayfinder](skills/wayfinder/SKILL.md)** (explicit): keep a durable decision map for a large effort whose route is unclear.
- **[handoff](skills/handoff/SKILL.md)** (explicit): transfer verified work state across agents, sessions, or machines.
- **[resume-work](skills/resume-work/SKILL.md)**: continue from a handoff, branch, or prior work trail at the true resume point.

The communication skills have deliberately different jobs: `wait-what` rephrases
one explanation, `explain-codebase` investigates code without changing it, and
`teach` builds a course across sessions. Within product work, `ux-design`
decides the flow and `frontend-design` plus `taste` implement it, so polish
never masks an unresolved workflow.

## Sets

A set is a named list of skill IDs under `sets/`, like a playlist:

| Set | Use it for |
| --- | --- |
| `start-here` | The first selection to pilot: prototyping, research, debugging, review, architecture, handoffs, explanation. |
| `engineering` | Substantial implementation work with isolation, tests, migrations, CI evidence, and agent loops. |
| `delivery` | Executing approved work with review gates and a durable handoff. |
| `review` | Read-only review and risk analysis. |
| `product` | Discovery, specification, stories, interaction design, and prototypes. |
| `frontend` | Interface design and implementation through visual verification. |
| `documentation` | Developer docs, operator guides, agent instructions, and plain prose. |
| `prototyping` | Experimental design and safe structural exploration. |
| `learning` | Courses and explanation. |
| `daily`, `lean-core` | Small everyday selections. |

## Layout

```text
skills/                 one directory per skill: SKILL.md, NOTICE.md, optional references/
sets/                   named selections of skill IDs
tests/behavior/         trigger and behavior fixtures, one per skill
catalog.yaml            lifecycle, invocation, and portability metadata
provenance.lock.yaml    pinned upstream revisions and the derivation map
THIRD_PARTY_NOTICES.md  upstream notices
docs/                   architecture notes and experiment records
scripts/                repository validator
```

Portability labels in the catalog mean: `portable` needs only file, search, and
shell access; `degraded` stays useful everywhere but loses automation when a
host lacks subagents, a browser, external sources, or native worktrees. Skills
marked degraded declare the capability in their `compatibility` field.

## Principles

- Broad catalog, narrow enabled sets.
- Precise discovery descriptions and lazy bodies, following the specification's
  progressive-disclosure model.
- Manual invocation for expensive or stateful workflows.
- Portable procedures here; project and employer facts stay project-local.
- No automatic upstream updates. Review, adapt, test, then change the pin.
- Never copy an upstream skill wholesale; every skill records its provenance.

## Validate

Requires Node.js 20 or newer and, for the specification check, `uv`:

```sh
node scripts/validate-repo.mjs
for d in skills/*/; do DO_NOT_TRACK=1 uvx --from skills-ref agentskills validate "$d"; done
```

The first command checks structure, links, provenance alignment, fixture schemas,
and repository safety rules. The second checks each skill against the Agent
Skills specification. See `CONTRIBUTING.md` for the full checklist and
`docs/architecture.md` for vocabulary.

## License

Original repository material is MIT licensed. Per-skill `NOTICE.md` files
preserve the applicable third-party terms.
