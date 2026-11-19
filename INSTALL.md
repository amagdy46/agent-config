# Install, for agents

You were asked to install the skills from
https://github.com/amagdy46/skills. Do these steps in order. Ask the
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
- `working-style` or plugin `amagdy-skills`: this set is already installed. Plugin
  `amagdy-skills`: run its update (step 5). A `working-style` folder: run the skills
  CLI update; if it is a symlink into a git clone, run `git pull` there.
  Then follow "Renamed and removed skills" below.

Any other hit, or this set installed by a second path: stop. Tell the
person what you found and where; two copies of the same job give you
conflicting instructions. Ask whether to remove the other one or stop.

## 3. Install

Whole set by default: the skills hand off to each other by name.

- Claude Code: `claude plugin install amagdy-skills --marketplace amagdy46/skills`
- Codex: `codex plugin marketplace add amagdy46/skills`, then
  `codex plugin add amagdy-skills@amagdy-skills`
- Others: `npx -y skills add amagdy46/skills -g -y --agent <agent>`

Only some skills asked for: use the skills CLI on any agent, and always add
`working-style`:
`npx -y skills add amagdy46/skills -g -y --agent <agent> --skill <name> working-style`

## 4. Check that it loaded

- Claude Code plugin: `claude plugin details amagdy-skills@amagdy-skills` lists `working-style`.
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
| Claude Code plugin | `claude plugin marketplace update amagdy-skills && claude plugin update amagdy-skills@amagdy-skills` | `claude plugin uninstall amagdy-skills@amagdy-skills && claude plugin marketplace remove amagdy-skills` |
| Codex plugin | `codex plugin marketplace upgrade amagdy-skills` | `codex plugin remove amagdy-skills@amagdy-skills && codex plugin marketplace remove amagdy-skills` |
| Skills CLI | `npx -y skills update -g -y` | see below |

Skills CLI removal of this set only:

```sh
npx -y skills remove -g -y -s $(npx -y skills list -g --json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).filter(x=>x.source==="amagdy46/skills").map(x=>x.name).join(" ")))')
```

Restart the agent after an install, update or removal.

## Renamed and removed skills

`npx skills update` neither installs a new name nor removes an old one. If
`npx -y skills list -g --json` shows any of the names below with source
`amagdy46/skills` or `amagdy46/agent-config`, the repository's old name
(another collection's skill of the same name is not ours), run once:

```sh
npx -y skills remove -g -y -s code-review verification-before-completion prototype frontend-design explain-codebase handoff technical-documentation architecture-design test-driven-development wait-what
npx -y skills add amagdy46/skills -g -y --agent <agent>
```

- `code-review` is now `impact-review`: Claude Code's built-in
  `/code-review` shadowed it.
- `verification-before-completion` is now a rule in `working-style`, and
  `prototype` a paragraph in `brainstorm`.
- `frontend-design`, `explain-codebase`, `handoff`,
  `technical-documentation`, `architecture-design`,
  `test-driven-development` and `wait-what` are removed. `implement` still
  builds test-first.

Drop `-g` for a project install. The plugin switches with its next version.
A clone linked with `scripts/link.mjs`: `git pull`, then run the script
again; it removes the dead links.
