---
type: regex
target: {source: file, path: durations.py}
pattern: "def parse_timeout"
match: contains
---
durations.py was changed by the run. File graders see only changed files, so
this guards `buggy-regex-gone` against passing on an untouched file.
