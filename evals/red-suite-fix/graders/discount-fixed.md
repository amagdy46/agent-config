---
type: regex
target: {source: file, path: shop/pricing.py}
pattern: '>=\s*(DISCOUNT_FROM_CENTS|10_?000)\b|(DISCOUNT_FROM_CENTS|10_?000)\s*<=|>\s*9_?999\b|not\s+\w+\s*<\s*(DISCOUNT_FROM_CENTS|10_?000)\b'
match: contains
---
An order of exactly 10000 cents now gets the discount.
