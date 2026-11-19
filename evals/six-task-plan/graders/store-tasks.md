---
type: regex
target: {source: file, path: notes/store.py}
pattern: '^(?=[\s\S]*def search)(?=[\s\S]*def by_tag)(?=[\s\S]*tags)(?=[\s\S]*def slug)'
match: contains
---
Tasks 2 to 5: `notes/store.py` has `search`, `by_tag`, tags and `slug`.
