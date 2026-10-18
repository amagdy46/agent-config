# Publishing per tracker

Configure once per project in `AGENTS.md`, for example:

```markdown
Issue tracker: github
Issue tracker: linear (team: Platform, project: Billing v2)
Issue tracker: markdown
Planning folder: ~/notes/projects/billing-v2
```

## GitHub

Create blockers first so later tickets can link to them:

```sh
gh issue create --title "<title>" --body-file <tmpfile> [--label <label>]
```

Native links take the issue's numeric `id`, not its number:

```sh
id=$(gh api repos/{owner}/{repo}/issues/<N> --jq .id)
# make <N> a sub-issue of the parent
gh api -X POST repos/{owner}/{repo}/issues/<parent>/sub_issues -F sub_issue_id=$id
# mark <M> as blocked by <N>
gh api -X POST repos/{owner}/{repo}/issues/<M>/dependencies/blocked_by -F issue_id=$id
```

If an endpoint is unavailable on the repository, keep the "Blocked by" section
in the body with `#N` references and say so in the summary.

## Linear

Use the Linear MCP tools. Resolve the team (and project, if named) first,
then create each ticket with `save_issue`: `title`, `team`, `description`
(the ticket body), optional `project`, `parentId` for a parent issue, and
`blockedBy` with the identifiers of tickets already created (for example
`ENG-123`). Without the MCP server, tell the user it is unavailable and offer
Markdown instead.

## Markdown (Obsidian-friendly)

Write one file per ticket in `issues/` inside the planning folder, numbered in
dependency order: `issues/01-<slug>.md`, `issues/02-<slug>.md`.

```markdown
---
type: issue
status: todo          # todo | doing | done
blocked_by: ["[[01-<slug>]]"]
design: "[[design]]"
---

# 02: <title>

## What to build
...

## Acceptance criteria
- [ ] ...
```

Also write `issues/README.md` listing every ticket with its blockers, so the
frontier is visible at a glance. Obsidian resolves the `[[wikilinks]]` when
the planning folder sits inside a vault; elsewhere they read as plain text.
