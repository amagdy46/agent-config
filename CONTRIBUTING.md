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

Then run the available Agent Skills validator for every changed skill and use
`DO_NOT_TRACK=1 DISABLE_TELEMETRY=1 npx --yes skills@1.5.23 add . --list` to
confirm that the complete catalog remains discoverable without deploying it.
Review and update the installer pin deliberately.

Prefer narrow corrections based on observed behavior. Do not accumulate generic
rules for hypothetical failures.
