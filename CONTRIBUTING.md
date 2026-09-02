# Contributing

## Adding or changing a skill

1. Define the concrete requests the skill should handle and its nearest overlap.
2. Keep `SKILL.md` concise and route conditional detail to `references/`.
3. Record provenance in the skill's `NOTICE.md` and the root lock file.
4. Add positive, negative, and overlap behavior fixtures.
5. Validate naming, references, catalog membership, and security declarations.
6. Review trigger wording separately from workflow behavior.

Fix what you observed going wrong. Do not add rules for failures that have not
happened.

Run the repository validator with Node.js 24 or newer:

```sh
node scripts/validate-repo.mjs
```

Then check every skill against the Agent Skills specification with the
reference validator, which needs `uv`:

```sh
for d in skills/*/; do DO_NOT_TRACK=1 uvx --from skills-ref agentskills validate "$d"; done
```

Finally confirm the installer still discovers the whole catalog without
deploying it:

```sh
DO_NOT_TRACK=1 DISABLE_TELEMETRY=1 npx --yes skills@1.5.23 add . --list
```

The installer version is pinned on purpose. Bump it after checking the new
release, not by following its latest tag.

## Frontmatter conventions

- `name` and `description` are required by the specification. The description
  says what the skill does and when to use it or leave it alone.
- `license: MIT` on every skill; the full terms live in the skill's `NOTICE.md`.
- `compatibility` only on skills the catalog marks `degraded`, naming the host
  capability that is required or optional.
- `metadata` only on vendored packages that carry an upstream version.
