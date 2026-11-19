---
type: regex
target: {source: file, path: PLAN.md}
pattern: '^(?![\s\S]*- \[ \])[\s\S]*- \[[xX]\]'
match: contains
---
Every checkbox in `PLAN.md` is ticked and none is left open: the plan is
the record of progress. An untouched plan fails.
