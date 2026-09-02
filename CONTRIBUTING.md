# Contributing

## Adding or changing a skill

1. Define the concrete requests the skill should handle and its nearest overlap.
2. Keep `SKILL.md` concise and route conditional detail to `references/`.
3. Record provenance in the skill's `NOTICE.md` and the root lock file.
4. Add positive, negative, and overlap behavior fixtures.
5. Validate naming, references, catalog membership, and security declarations.
6. Review trigger wording separately from workflow behavior.

Run the repository validator with Node.js 20 or newer:

```sh
node scripts/validate-repo.mjs
```

Then validate every skill against the Agent Skills specification with the
reference validator (requires `uv`):

```sh
for d in skills/*/; do DO_NOT_TRACK=1 uvx --from skills-ref agentskills validate "$d"; done
```

Finally use `DO_NOT_TRACK=1 DISABLE_TELEMETRY=1 npx --yes skills@1.5.23 add . --list`
to confirm that the complete catalog remains discoverable without deploying it.
Review and update the installer pin deliberately.

## Frontmatter conventions

- `name` and `description` are required by the specification; the description
  states what the skill does and when to use or not use it.
- `license: MIT` on every skill, with the full terms in the skill's `NOTICE.md`.
- `compatibility` only on skills whose catalog portability is `degraded`, naming
  the host capability that is needed or optional.
- `metadata` only for vendored packages that carry an upstream version.

Prefer narrow corrections based on observed behavior. Do not accumulate generic
rules for hypothetical failures.
