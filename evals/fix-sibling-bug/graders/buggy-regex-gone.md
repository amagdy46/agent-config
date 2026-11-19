---
type: regex
target: {source: file, path: durations.py}
pattern: "\\(\\\\d\\+\\)\\(\\[smh\\]\\)"
match: not_contains
---
The integer-only pattern `(\d+)([smh])` is gone from both functions.
