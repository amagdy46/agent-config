---
type: regex
target: {source: file, path: tags.py}
pattern: '^(?![\s\S]*(\bset\(|\{[^{}:]*\bfor\b[^{}:]*\}))[\s\S]*def normalize_tags'
match: contains
---
tags.py was changed and normalize_tags no longer builds a set, whose order
changes with Python's per-process string hashing. (`sorted()` over a set
would also pass this grader but fail the test, so it cannot slip through
unnoticed by a run that tests.)
