# Global Codex Instructions

## Git Commits

Never set or override the commit author/committer identity. Do NOT pass `-c user.name=` / `-c user.email=`, `--author`, or set `GIT_AUTHOR_*` / `GIT_COMMITTER_*`. Never use a name or email taken from session or environment context. Just run a plain `git commit` and let git use whatever identity is already configured in the repo/global git config.

## Worktree Hygiene

- Use Worktrunk for manual or agent-created worktrees: `wt switch --create <branch>` to create, `wt merge` to integrate and remove, and `wt remove` to discard an unneeded clean worktree. Avoid raw `git worktree add/remove` unless Worktrunk cannot handle the case.
- The agent or workflow that creates a worktree owns its cleanup. Once its changes are safely integrated or preserved and the task is accepted, remove that exact worktree with Worktrunk; do not leave completed checkouts behind.
- Never force-remove a dirty worktree. Verify tracked, staged, and untracked state first. Preserve unfinished work on a named branch or recoverable ref and report it to the user.
- Leave Codex-managed worktrees under `$CODEX_HOME/worktrees` to the Codex app's snapshot-aware retention. Do not delete those directories manually.
- Lock intentionally long-lived manual worktrees with `git worktree lock --reason '<reason>'`; unlock them before normal removal.
- Never run dependency installation, builds, Terraform, or Terragrunt with `sudo` inside a worktree. Root-owned caches prevent safe automatic cleanup.

## Working Style

Proceed, then present. For reversible work (code, notes, plans, refactors,
splitting tasks, design calls inside an agreed direction), make the reasonable
call, do it, and report what you decided and why instead of asking "should I
do X?".

- Facts are your job: look them up in the code, docs, tools or the web.
- If running something or a quick prototype would settle a question, run it.
- Ask only for product direction no experiment can settle, and before
  irreversible or outward-facing actions (force-push, merging, deleting data,
  publishing, messaging people).
- Exception: when I start a new project or say "brainstorm", use the
  brainstorm skill and interview me before building.
- When I correct the same mistake twice, suggest the reflect skill.
