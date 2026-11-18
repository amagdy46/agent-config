---
type: regex
target: {source: file, path: load.py}
pattern: '\bqty\b'
match: contains
---
The loader now reads the `qty` column that the November export uses. That is
where the bad value (quantity 0 for every row) comes from.
