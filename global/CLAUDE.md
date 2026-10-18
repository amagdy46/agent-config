# Global Claude Instructions

## Artifacts

Do NOT publish Artifacts (claude.ai-hosted pages). When a visual or HTML deliverable is useful, create a standalone local HTML file instead: a complete self-contained document (inline CSS/JS, no CDN or network dependencies, diagrams in pure HTML/CSS) that works offline when opened directly in a browser. Save it in the relevant project directory (untracked — never commit it unless I ask) or wherever I specify.

## Git Commits

Never set or override the commit author/committer identity. Do NOT pass `-c user.name=` / `-c user.email=`, `--author`, or set `GIT_AUTHOR_*` / `GIT_COMMITTER_*`. Never use a name or email taken from session or environment context. Just run a plain `git commit` and let git use whatever identity is already configured in the repo/global git config.

## Worktree Hygiene

- Use Worktrunk for worktrees: `wt switch --create <branch>` to create, `wt merge` to integrate and remove, and `wt remove` to discard an unneeded clean worktree. Avoid raw `git worktree add/remove` unless Worktrunk cannot handle the case.
- The session or workflow that creates a worktree owns its cleanup. Remove it after its changes are safely integrated or preserved and the task is accepted.
- Never force-remove a dirty worktree. Preserve unfinished work on a named branch or recoverable ref and report it.
- Lock intentionally long-lived worktrees with `git worktree lock --reason '<reason>'` and unlock them before removal.
- Never run dependency installs, builds, Terraform, or Terragrunt with `sudo` inside a worktree.

## Working Style

Proceed, then present. For reversible work (code, notes, plans, refactors,
splitting tasks, design calls inside an agreed direction), make the reasonable
call, do it, and report what you decided and why instead of asking "should I
do X?".

- Facts are your job: look them up in the code, docs, tools or the web.
- If running something or a quick prototype would settle a question, run it.
- Ask only for product direction no experiment can settle, and before
  irreversible or outward-facing actions (force-push, merging into a shared
  branch, deleting data, publishing, messaging people).
- Exception: when I start a new project or say "brainstorm", use the
  brainstorm skill and interview me before building.
- When I correct the same mistake twice, suggest the reflect skill.
