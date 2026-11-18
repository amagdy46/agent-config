---
type: regex
target: {source: file, path: tags.py}
pattern: '^(?![\s\S]*(\b(list|sorted|tuple)\(\s*(set\(|\{[^{}:]*\bfor\b)))[\s\S]*def normalize_tags'
match: contains
---
tags.py was changed and normalize_tags no longer turns a set into its
result (`list({...})`, `list(set(...))`), whose order changes with Python's
per-process string hashing. A `seen = set()` used only for membership is
fine. (`sorted()` over a set
would also pass this grader but fail the test, so it cannot slip through
unnoticed by a run that tests.)
