---
type: regex
target: {source: file, path: shop/money.py}
pattern: '^(?![\s\S]*int\(\s*float\()[\s\S]*def to_cents'
match: contains
---
`to_cents` in `shop/money.py` no longer truncates a float: `int(float("19.99")
* 100)` is 1998. Rounding, `Decimal` or integer parsing all pass. A fix made
only in `report.py` leaves this file untouched and fails.
