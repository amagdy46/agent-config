---
type: regex
target: {source: file, path: src/pagekit/__init__.py}
pattern: "start:\\s*start\\s*\\+\\s*per_page\\]"
match: contains
---
The slice no longer drops the last item.
