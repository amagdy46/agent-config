# Architecture

This repository adds a small management layer around the Agent Skills format. It
does not invent a new skill runtime.

## Vocabulary

| Term | Meaning here | Standard? |
| --- | --- | --- |
| Skill | One independently installable directory containing `SKILL.md` and optional local resources. | Yes, Agent Skills |
| Set | A named list of skill IDs, such as `daily` or `prototyping`. Think of it as a playlist. | No, repository convention |
| Catalog | Human and tooling metadata about lifecycle, portability, and intended invocation. It is not loaded as skill instructions. | No, repository convention |
| Router | An ordinary skill that chooses another workflow. This repository avoids a large always-on router in v1. | No |
| Adapter | Host-specific glue needed only when an agent cannot consume the portable directory directly. | No |
| Plugin | A host-specific bundle that may contain skills, agents, hooks, tools, or configuration. It is larger than a skill. | Host-specific |
| Manager | A UI or CLI that projects selected skills into agent discovery folders. | No |
| Fixture | A positive, negative, or overlap scenario used to test routing decisions and behavioral invariants. | No |

Terms such as pack, profile, and overlay are intentionally absent in v1. A set is
enough until real deployment experience proves that configuration inheritance or
merging is necessary.

## Source of truth

```text
private Git repository
  -> independently installable skill directories
  -> selected by named sets
  -> projected by a manager or installer
  -> agent-native discovery directories on each machine
```

The Git repository owns content, history, provenance, and review. A manager owns
only local selection and deployment state. Never edit the deployed copy and then
assume it is canonical.

## Token model

Compatible agents discover a skill from its name and description, then load the
full body only when selected. Installing many skills therefore does not imply
loading every complete instruction file on every request. Metadata still has a
cost, so descriptions remain narrow and expensive workflows use explicit
invocation.

## Scope boundary

Portable skills teach reusable procedures. Exact employer service names,
topology, commands, environments, incidents, customers, credentials, and business
rules stay in company-controlled or project-local instructions. A runtime may
discover both sources, but this repository never merges their contents.

## Why this is not PStack

PStack is a Cursor plugin with a sticky router, playbooks, principles, agents,
and Cursor model configuration. This repository borrows several of its strongest
workflows, including prototype, safe refactoring, blast-radius analysis, and
evidence-led explanation. It does not copy PStack's host coupling or require its
large router to be read before ordinary work.

## Portability labels

- `portable`: the workflow needs only common file, search, or shell abilities.
- `degraded`: the workflow remains useful everywhere but loses automation when a
  host lacks subagents, transcript access, external sources, or native worktrees.
- `host-specific`: the skill requires one named host. No initial skill uses this
  status.
