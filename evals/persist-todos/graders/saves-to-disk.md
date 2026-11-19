---
type: regex
target: {source: file, path: todo.py}
pattern: "json|sqlite3|shelve|pickle|csv"
match: contains
---
todo.py now writes the todos somewhere that survives a restart.
