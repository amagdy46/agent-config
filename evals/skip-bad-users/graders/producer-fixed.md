---
type: regex
target: {source: file, path: signup.py}
pattern: '^(?![\s\S]*"e-mail"\s*:)[\s\S]*"email"\s*:'
match: contains
---
signup.py now writes the `email` key. It wrote `e-mail`, so every new signup
became a user the digest crashes on, or, with only a skip added, a user who
silently never gets a digest. A comment or a
line that reads old `"e-mail"` records is fine; only writing that key fails.
