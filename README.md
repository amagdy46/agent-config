# Agent Config

My opinionated, portable coding-agent configuration for Codex, Claude Code,
Cursor, Pi, OpenCode, and other clients that support Agent Skills. It is a
personal baseline, not a team standard: use it as a reference or fork it, then
customize the skills and enabled sets for your own workflow.

The repository is the source of truth. Skill managers and agent-native folders
are deployment targets, not canonical storage.

## Layout

```text
skills/                 portable skill folders
sets/                   named selections of skill IDs
tests/behavior/         trigger and behavior fixtures
AGENTS.md               canonical repository instructions
CLAUDE.md               thin Claude Code import of AGENTS.md
catalog.yaml            lifecycle and invocation metadata
provenance.lock.yaml    reviewed upstream revisions and derivation map
THIRD_PARTY_NOTICES.md  upstream notices
LICENSE                 license for original repository material
```

## Start here

`sets/start-here.yaml` is the first selection to pilot. It intentionally favors
the work that recurs most often: prototyping, research, codebase navigation,
debugging, verification, review, architecture, safe refactoring, blast-radius
analysis, handoffs, and clear explanations.

For work repositories, add `sets/engineering.yaml`. It layers in implementation,
worktree isolation, multi-agent review loops, TypeScript test-layer selection,
provider-consumer contracts, safe migration practice, and terminal CI/PR
evidence. It remains generic; repository-local instructions supply the real
commands, services, and policies.

Use `sets/product.yaml` for evidence-led discovery, concise product
specifications, user stories, interaction design, and prototypes. Use
`sets/documentation.yaml` for source-grounded developer documentation and
task-focused guides for non-technical operators. The latter is intentionally
separate because an API reference and an internal-tool procedure serve different
readers and require different evidence.

Within product work, `ux-design` decides task flow, information architecture,
and behavior; `frontend-design` implements the approved direction with visual
craft and rendered verification. Keeping them separate prevents polish from
masking an unresolved workflow.

The communication skills have deliberately different jobs:

- `wait-what` rephrases the immediately preceding explanation. Saying “bro” is
  an alias for this behavior when the explanation did not land.
- `explain-codebase` investigates and explains how existing code works, why a
  design exists, or both. It does not change the code.
- `teach` creates or continues a persistent, source-grounded course across
  sessions. It is Matt Pocock's stateful learning concept, not a synonym for a
  one-off explanation.
- `unslop` improves substantial human-facing prose without altering evidence,
  citations, commands, identifiers, or uncertainty.

See [docs/architecture.md](docs/architecture.md) for the vocabulary and
[docs/manager-pilot.md](docs/manager-pilot.md) for the deployment experiment.

## Principles

- Broad catalog, narrow enabled sets.
- Precise discovery descriptions and lazy bodies.
- Manual invocation for expensive or stateful workflows.
- Portable procedures in this repository; project and employer facts stay
  project-local.
- No automatic upstream updates. Review, adapt, test, then change the pin.

## Reuse and customization

- Review a skill before enabling it; do not install the entire catalog merely
  because it is available.
- Start with `sets/start-here.yaml`, then remove what does not improve your work.
- Fork or copy the parts you depend on instead of treating this personal
  repository as a permanently supported service.
- Keep employer, customer, project, credential, and incident details in an
  authorized company or project-local repository.
- Preserve each skill's provenance and license notice when adapting it.

## Validate

Requires Node.js 20 or newer. From the repository root:

```sh
node scripts/validate-repo.mjs
DO_NOT_TRACK=1 DISABLE_TELEMETRY=1 npx --yes skills@1.5.23 add . --list
```

The first command validates structure, references, provenance alignment, fixture
schemas, and repository safety rules. The second checks discovery compatibility;
it lists skills without deploying them. Review and deliberately update the pinned
installer version rather than following its moving latest release.

Behavior fixtures are executable specifications for future cross-harness evals;
static validation does not claim that a model followed every invariant.

## Status

This repository is ready for private experimentation. Complete the isolated
manager pilot before deploying it broadly to global agent folders. Original
repository material is MIT licensed; per-skill notices preserve applicable
third-party MIT terms.
