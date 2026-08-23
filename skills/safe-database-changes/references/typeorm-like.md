# TypeORM-like workflows

Use this reference when entity metadata and ordered migration classes are the repository's source of schema evolution.

Confirm which datasource configuration owns migration discovery and which entity set generation compares. Reuse the repository's established configuration; an accidentally empty or alternate datasource can generate a destructive diff.

Prefer this sequence when generation exists:

1. Make the intended entity or schema-model change.
2. Invoke the repository's generation path with an explicit descriptive migration name.
3. Inspect both directions of the generated migration and the imports or metadata that register it.
4. Remove only statements proven to be unrelated drift; regenerate if the cause is configuration mismatch.

Review whether operations are compatible with the configured transaction mode. Some index or online-DDL operations cannot run inside the default transaction. Do not silently change global transaction policy to accommodate one migration; use the repository's supported per-migration mechanism or split the operation.

Exercise migration ordering from the last released state, not only from an empty schema. If rollback exists, verify what happens to data created after the forward migration before describing it as reversible.
