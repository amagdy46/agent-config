---
type: regex
target: {source: file, path: tests/test_cart.py}
pattern: "\\b(?!helpers\\b)\\w+\\.format_price\\(1999"
match: contains
---
The test calls format_price through the renamed module.
