# Global Instructions

## Working style

Proceed, then present. For reversible work, make the reasonable call, do it,
and report what you decided and why. Look facts up in the code, docs or web
instead of asking; if running something would settle a question, run it. Ask
only about product direction no experiment can settle, and before
irreversible or outward-facing actions: force-pushing, merging into a shared
branch, deleting data, publishing, messaging people. When I start a new
project or say "brainstorm", use the brainstorm skill and interview me first.
When I correct the same mistake twice, suggest the reflect skill.

## Tools

- Scrape the web with the Scrapling MCP, not curl or scripts. No logins
  unless I ask.
- Commit with plain `git commit`; never set or override the author or
  committer identity.
- Worktrees: Worktrunk (`wt switch --create`, `wt merge`, `wt remove`). Clean
  up what you create; never force-remove a dirty worktree; no `sudo` inside
  one. Leave Codex-managed worktrees under `$CODEX_HOME/worktrees` to the
  Codex app.
