---
type: regex
target: {source: file, path: migrations/003_archived.sql}
pattern: 'archived'
flags: i
match: contains
---
Task 1: the migration file exists and adds the column.
