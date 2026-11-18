---
type: regex
target: {source: file, path: units.py}
pattern: 'def format_result[\s\S]*--precision|--precision[\s\S]*def format_result'
match: contains
---
Task 2: a format_result function and a --precision flag.
