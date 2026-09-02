---
name: author-agent-instructions
description: Write or improve repository instruction files for coding agents, such as AGENTS.md, CLAUDE.md, or equivalent host files, so the agent reliably follows the rules that matter for the task at hand. Use when the user asks to create, audit, shorten, or improve agent instructions; do not use for README, API, or operator documentation aimed at people.
license: MIT
---

# Author agent instructions

An instruction file competes for attention with the system prompt, tools, and the task. Hosts commonly tell the agent that repository instructions "may or may not be relevant," so a long undifferentiated file is skimmed and partly ignored. The goal is a short file whose every line either applies to almost every task or is explicitly scoped to the tasks where it applies.

## Gather evidence first

Read the existing instruction files, the repository layout, the package and CI configuration, and any linter, formatter, or hook configuration. Note the commands a contributor actually runs. Do not invent conventions from general knowledge; every rule you keep or add must be traceable to the repository or to the user's stated preference.

If the user has no existing file, draft one from the repository evidence and mark anything uncertain as an open question rather than a rule.

## Sort content into three bins

1. **Foundation** stays bare at the top: one line of project identity, the tech stack in a line or two, and a shallow project map. This is relevant to nearly every task.
2. **Conditional guidance** is wrapped so the agent sees when it applies. Testing conventions, API patterns, state management, localization, database access, and release procedure belong here, each under its own narrow trigger.
3. **Deletions** are rules that tooling already enforces, rules the agent can infer from consistent code, stale code snippets, and vague advice such as "follow best practices." Cutting these makes the remaining rules stronger.

Keep every command. A command table is foundational reference even when some entries are rare. Wrap the whole table in one conditional block whose trigger is running build, test, lint, or generation commands.

## Write conditional blocks

Wrap each conditional section in a block with an explicit trigger. The `<important if="...">` form reads as plain text on any host and gives the agent an unambiguous relevance signal:

```markdown
<important if="you are adding or modifying API routes">
- Routes live in `src/routes/`; validate input with the shared schema helper.
- Error responses follow the problem-details format used in `src/errors.ts`.
</important>
```

Rules for triggers:

- One trigger per kind of work. Never group unrelated rules under a broad trigger such as "you are writing code."
- Name the activity, not the file type: "you are writing or modifying tests," "you are creating new components," "you are changing the database schema."
- Prefer a file path reference to a code snippet. Snippets go stale; paths stay checkable.
- Keep everything inline. Split into separate files only when a section is long enough that loading it on every task would be wasteful, and then say exactly when to read the split file.

## Draft the file

Produce this structure unless the repository already has a working order worth preserving:

```markdown
# <Project name>

<one-line identity and stack>

## Project map
<shallow directory listing with one-phrase responsibilities>

<important if="you need to run commands to build, test, lint, or generate code">
<complete command table>
</important>

<one block per rule or domain area, narrowest trigger first>
```

Aim for a file the agent can read in under a minute. If it exceeds roughly 150 lines, look again for linter territory and discoverable conventions to cut.

## Verify before handing back

- Every retained rule has a source in the repository or the user's request.
- Every command from the original file is still present.
- No block trigger is broad enough to match most tasks.
- No rule duplicates what a formatter, linter, type checker, or pre-commit hook enforces; where you removed such a rule, say which tool enforces it or suggest adding the hook.
- No employer, customer, credential, or incident detail was introduced into a portable file.

Report what was removed and why, and list any conventions you could not confirm. Do not commit, and do not edit tooling configuration unless the user separately asks.
