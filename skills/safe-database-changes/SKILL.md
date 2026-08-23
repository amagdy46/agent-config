---
name: safe-database-changes
description: Plan, create, review, and verify application database migrations without touching production. Use for schema changes, migration generation, backfills, or deploy compatibility; route ORM-specific mechanics through the matching reference or repository discovery.
---

# Safe Database Changes

Never apply, revert, repair, or experiment against production. Treat any unidentified or shared database as unsafe until its purpose and authorization are established. Prefer a disposable local or ephemeral database for execution evidence.

Choose the mode from the request before acting:

- **Plan or review** is read-only. Inspect the model, migration, SQL, history, and rollout assumptions without generating files, changing schemas, or applying anything.
- **Create** may edit the authoritative model and migration artifacts only when the user asked for those changes. It does not authorize applying them to any database.
- **Verify** may apply or revert only on a confirmed disposable database and only when execution is requested or is an accepted part of the implementation workflow.

If the target, mode, or authorization is unclear, remain read-only.

## Discover the migration system

Inspect package metadata, ORM configuration, migration directories, schema definitions, and recent migrations. Determine how the repository records ordering and whether it supports generated migrations.

- For a TypeORM-like entity and migration workflow, read [references/typeorm-like.md](references/typeorm-like.md).
- For a Drizzle-like schema, SQL artifact, and journal workflow, read [references/drizzle-like.md](references/drizzle-like.md).
- For another or unclear system, follow repository documentation and tool help. Do not guess flags, directories, datasource selection, or transaction behavior.

## Design for rollout compatibility

Assume old and new application revisions may overlap unless the deployment model proves otherwise. Prefer expand, migrate, switch, then contract:

1. Add structures that both revisions can tolerate.
2. Deploy compatible reads and writes when dual behavior is needed.
3. Backfill separately with bounded, restart-safe work and observable progress.
4. Switch readers only after coverage is verified.
5. Remove legacy structures in a later change after evidence shows they are unused.

Call out locks, table rewrites, full scans, constraint validation, index build behavior, nullability transitions, default computation, and data loss. Separate schema evolution from large data movement when their failure and rollback characteristics differ.

## Generate, inspect, and prove

When the repository supports generation, change the authoritative model and generate the migration first. Hand-author SQL only when generation is unavailable or cannot express the intended operation. In either case, review the complete SQL and metadata before applying it; remove unrelated drift rather than accepting it as generated noise.

Verify on a disposable database from the same starting schema expected in deployment:

- apply all prerequisites and the new migration;
- inspect the resulting schema, constraints, indexes, and representative data;
- exercise the affected application read and write paths;
- when rollback is supported and safe, revert and reapply; otherwise document the forward-repair strategy;
- test compatibility with every application revision that can coexist during rollout.

A down migration is not automatically safe: reversal may discard data or fail after new writes. State irreversible steps plainly. Record the starting and resulting schema revisions, generated or reviewed artifacts, database kind, apply outcome, rollback or repair evidence, and compatibility gaps.
