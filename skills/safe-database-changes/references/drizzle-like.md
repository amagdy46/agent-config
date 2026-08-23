# Drizzle-like workflows

Use this reference when declarative schema files produce ordered SQL migrations plus a journal or snapshot history.

Treat the schema model, SQL file, and history metadata as one artifact set. Determine which one the repository regards as authoritative and use its established generation path; do not edit a generated SQL file while leaving its snapshot or journal inconsistent.

After generation, inspect:

- the exact statements and their order;
- whether a rename was recognized or represented as destructive drop-and-create;
- defaults, nullability, foreign-key actions, indexes, and constraints;
- journal ordering and snapshot changes;
- statements unrelated to the intended schema delta.

Regenerate after fixing a bad model or baseline rather than hand-normalizing broad drift. If the tool requires an explicit rename choice, resolve it from repository history and intended data preservation, not from convenience.

Verify from the last released migration state and also bootstrap an empty disposable database when the repository promises that path. If rollback artifacts are not a native part of the workflow, document and test a forward repair instead of inventing an untracked reverse migration.
