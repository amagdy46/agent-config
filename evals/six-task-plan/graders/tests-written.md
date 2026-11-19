---
type: regex
target: {source: file, path: tests/test_store.py}
pattern: '^(?=[\s\S]*test_search_case_insensitive)(?=[\s\S]*test_tags_sorted_unique)(?=[\s\S]*test_by_tag)(?=[\s\S]*test_slug)'
match: contains
---
The four tests the plan names for `tests/test_store.py` exist.
