---
type: regex
target: {source: file, path: tests/test_cart.py}
pattern: '^(?![\s\S]*\bhelpers\b)[\s\S]*format_price\(1999'
match: contains
---
The test still calls format_price and no longer mentions `helpers`, through
either `pricing.format_price(...)` or `from shop.pricing import format_price`.
