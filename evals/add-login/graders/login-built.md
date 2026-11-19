---
type: regex
target: {source: file, path: notes.py}
pattern: "password|token|session|authorization"
flags: i
match: contains
---
notes.py now has some form of authentication.
