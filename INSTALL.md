# Install, for agents

You were asked to install the skills from
https://github.com/amagdy46/agent-config. Do these steps in order. Ask the
person nothing unless step 2 finds a conflict.

## 1. Find which agent you are

Run `env | grep -E '^(CLAUDECODE|CODEX_THREAD_ID|CURSOR_AGENT|OPENCODE|PI_SESSION_ID)='`.

| Set | Agent | `--agent` for the skills CLI | Global instructions file |
|---|---|---|---|
| `CLAUDECODE=1` | Claude Code | `claude-code` | `~/.claude/CLAUDE.md` |
| `CODEX_THREAD_ID` | Codex | `codex` | `~/.codex/AGENTS.md` |
| `CURSOR_AGENT=1` | Cursor | `cursor` | none; the person pastes into Settings > Rules |
| `OPENCODE=1` | OpenCode | `opencode` | `~/.config/opencode/AGENTS.md` |
| `PI_SESSION_ID` | Pi | `pi` | `~/.pi/agent/AGENTS.md` |

Nothing set: use the skills CLI with your own name as `--agent`; a wrong
id makes it print the valid ones. Never leave `--agent` out: with `-y` the
CLI writes into every agent it knows, about 50 folders.

## 2. Check for overlapping collections

```sh
find ~/.claude ~/.codex ~/.agents ~/.cursor ~/.config/opencode ~/.pi .claude .agents -maxdepth 4 \
  \( -name using-superpowers -o -name brainstorming -o -name grill-me -o -name to-tickets \
  -o -name setup-pstack -o -name poteto-mode -o -name working-style \) 2>/dev/null
claude plugin list 2>/dev/null; codex plugin list 2>/dev/null
```

- `using-superpowers`, `brainstorming`, plugin `superpowers`: Superpowers.
- `grill-me`, `to-tickets`, plugin `mattpocock-skills`: Matt Pocock's skills.
- `setup-pstack`, `poteto-mode`, plugin `pstack`: pstack.
- `working-style` or plugin `mashi`: this set is already installed. Plugin
  `mashi`: run its update (step 5). A `working-style` folder: run the skills
  CLI update; if it is a symlink into a git clone, run `git pull` there.
  Then follow "Renamed skills" below.

Any other hit, or this set installed by a second path: stop. Tell the
person what you found and where; two copies of the same job give you
conflicting instructions. Ask whether to remove the other one or stop.

## 3. Install

Whole set by default: the skills hand off to each other by name.

- Claude Code: `claude plugin install mashi --marketplace amagdy46/agent-config`
- Codex: `codex plugin marketplace add amagdy46/agent-config`, then
  `codex plugin add mashi@mashi`
- Others: `npx -y skills add amagdy46/agent-config -g -y --agent <agent>`

Only some skills asked for: use the skills CLI on any agent, and always add
`working-style`:
`npx -y skills add amagdy46/agent-config -g -y --agent <agent> --skill <name> working-style`

## 4. Check that it loaded

- Claude Code plugin: `claude plugin details mashi@mashi` lists `working-style`.
- Codex: `codex debug prompt-input hi | grep -c 'Proceed, then present'` prints 1 or more.
- Skills CLI: `npx -y skills list -g` lists `working-style`.

Skills load at session start, so this session cannot see them; the checks
above are the proof you can run. If one fails, or the person chose a subset
without `working-style`, append this to the global instructions file from
step 1:

```markdown
<!-- working-style:start -->
## Working style

Proceed, then present. For reversible work, make the reasonable call, do it,
and report what you decided and why. Look facts up in the code, docs or web
instead of asking; if running something would settle a question, run it. Ask
only about product direction no experiment can settle, and before
irreversible or outward-facing actions: force-pushing, merging into a shared
branch, deleting data, publishing, messaging people.
<!-- working-style:end -->
```

## 5. Report to the person

Say which skills you installed, for which agent, by which path. Give them
one check for their next session: ask "Quote the first sentence of any
working-style instruction in your context"; the answer contains "Proceed,
then present". Then give these lines. Plugins do not update themselves.

| Path | Update | Remove |
|---|---|---|
| Claude Code plugin | `claude plugin marketplace update mashi && claude plugin update mashi@mashi` | `claude plugin uninstall mashi@mashi && claude plugin marketplace remove mashi` |
| Codex plugin | `codex plugin marketplace upgrade mashi` | `codex plugin remove mashi@mashi && codex plugin marketplace remove mashi` |
| Skills CLI | `npx -y skills update -g -y` | see below |

Skills CLI removal of this set only:

```sh
npx -y skills remove -g -y -s $(npx -y skills list -g --json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).filter(x=>x.source==="amagdy46/agent-config").map(x=>x.name).join(" ")))')
```

Restart the agent after an install, update or removal.

## Renamed skills

`code-review` is now `impact-review`: Claude Code's built-in `/code-review`
shadowed it. `npx skills update` neither installs the new name nor removes
the old one, and `implement` and `orchestrate` now hand off to
`impact-review`. If `npx -y skills list -g --json` shows `code-review` with
source `amagdy46/agent-config` (another collection's `code-review` is not
ours), run once:

```sh
npx -y skills remove -g -y -s code-review
npx -y skills add amagdy46/agent-config -g -y --agent <agent> --skill impact-review
```

Drop `-g` for a project install. The plugin switches with its next version.
A clone linked with `scripts/link.mjs`: `git pull`, then run the script
again; it removes the dead `code-review` link.
