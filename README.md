# Agent Config

My personal library of [Agent Skills](https://agentskills.io) for Codex,
Claude Code, Cursor, Pi, OpenCode, and any other client that reads the open
skill format. It is a baseline, not a team standard. Fork it, keep the skills
and sets that improve your work, and drop the rest.

This repository is the source of truth. Agent folders and skill managers are
deployment targets, never canonical storage.

## Install

Clone the repository, then link the sets you want into the agent directories on
the machine:

```sh
node scripts/link-set.mjs start-here engineering
```

The script symlinks each selected skill from `$HOME/.agents/skills` and every
agent-specific skills directory that already exists (Claude Code, Codex,
Cursor, OpenCode, Pi) straight into the clone. From then on a fast-forward pull
of the clone updates every agent at once. Rerun the script after changing a
set; add `--prune` to drop links for skills no longer selected, `--dry-run` to
preview, or `--all` for the whole catalog.

Any client that reads the open format can also install a single skill straight
from the remote without the clone:

```sh
npx skills add amagdy46/agent-config --skill systematic-debugging
```

Copies made that way do not follow the clone; update them with the installer.
Start with `sets/start-here.yaml` and remove what you do not use. Each skill
installs on its own and references only files inside its own directory.

## Why these skills exist

Most of my corrections to an agent repeat: what counts as evidence, when to
stop and ask, what must never be mutated, which workflow owns a decision. Each
skill writes one of those corrections down once. The ideas come from the
sources credited in `THIRD_PARTY_NOTICES.md`; the text is rewritten so it works
in any agent and contains no employer facts.

A skill is **automatic** when the agent picks it from the description because
a task matches, or **explicit** when you invoke it by name because it is
expensive, keeps state across sessions, or changes what the agent may do.

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

Three of these overlap by name but not by job. `wait-what` rephrases one
explanation, `explain-codebase` investigates code without changing it, and
`teach` runs a course across sessions. In product work, `ux-design` settles
the flow before `frontend-design` and `taste` make it look right, so polish
cannot hide an unresolved workflow.

## Sets

A set is a named list of skill IDs under `sets/`. Install a set by passing its
IDs to the installer.

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
scripts/                repository validator and the set linker
```

`catalog.yaml` labels each skill `portable` or `degraded`. Portable skills
need only file, search, and shell access. Degraded skills still work everywhere
but lose automation on a host without subagents, a browser, external sources,
or native worktrees; each one names the capability in its `compatibility`
field.

## Principles

- Broad catalog, narrow enabled sets.
- Precise descriptions, bodies loaded only on activation.
- Manual invocation for expensive or stateful workflows.
- Portable procedures here; project and employer facts stay project-local.
- No automatic upstream updates. Review, adapt, test, then change the pin.
- Adapt upstream skills instead of copying them; every skill records where it
  came from.

## Validate

Requires Node.js 24 or newer and, for the specification check, `uv`:

```sh
node scripts/validate-repo.mjs
for d in skills/*/; do DO_NOT_TRACK=1 uvx --from skills-ref agentskills validate "$d"; done
```

The first command checks structure, links, provenance, fixture schemas, and
repository safety rules. The second checks each skill against the Agent Skills
specification. `CONTRIBUTING.md` has the full checklist and
`docs/architecture.md` defines the vocabulary.

## License

Original repository material is MIT licensed. Per-skill `NOTICE.md` files
preserve the applicable third-party terms.
