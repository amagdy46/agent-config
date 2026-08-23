# Manager pilot

The first deployment experiment should evaluate
[Skills Manager](https://github.com/xingkongliang/skills-manager) as a consumer
of this Git repository. The manager must not become the canonical database.
Pin the exact reviewed release or commit in the pilot result before installing;
never test an unreviewed moving branch.

## Safety setup

1. Use a disposable configuration root and temporary agent discovery folders.
2. Import a local clone of this repository without executing skill scripts.
3. Disable automatic upstream updates and telemetry where supported.
4. Take an inventory and snapshot before every deploy or undeploy operation.
5. Do not connect the real private remote until local behavior is understood.

## Scenarios

- Discover all skill folders without flattening their local references or assets.
- Mirror `start-here`, `daily`, `prototyping`, `engineering`, and `learning` as
  manager presets without changing the YAML files.
- Deploy by directory-level symlink on Linux and macOS.
- Exercise copy mode as a fallback, then detect and explain drift.
- Enable different sets for two agents without modifying canonical skill files.
- Dry-run deploy and undeploy and verify that only manager-owned paths change.
- Update one skill in Git, review the diff, redeploy, and confirm provenance is
  retained.
- Create a conflicting local edit and verify that the manager refuses or presents
  an understandable reconciliation choice.
- Restore the pre-pilot snapshot and verify exact cleanup.
- Clone the plain Git remote on a second disposable machine/home and reproduce the
  selection without synchronizing secrets or absolute paths.

## Acceptance criteria

- Git history remains sufficient to reconstruct every canonical skill version.
- The manager can be removed without losing the skill library.
- Deployments are dry-runnable, attributable, and exactly reversible.
- No database, token, machine path, or manager backup is required in this repo.
- A skill directory remains usable without the manager.
- Linux and macOS produce the same selected skill contents.

If the pilot fails these criteria, keep the repository and replace only the
deployment tool. Do not redesign the skills around one manager's storage model.

## Result record

Add a dated result only after the experiment. Record the manager revision,
operating system, temporary configuration root, selected set, deployment mode,
created paths, content hashes, uninstall result, and every deviation from the
acceptance criteria. Never record tokens, credentials, or absolute personal
paths.
