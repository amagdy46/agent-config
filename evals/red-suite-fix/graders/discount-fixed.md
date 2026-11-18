---
type: regex
target: {source: file, path: shop/pricing.py}
pattern: '>=\s*DISCOUNT_FROM_CENTS|DISCOUNT_FROM_CENTS\s*<=|>=\s*10000|>\s*9999'
match: contains
---
An order of exactly 10000 cents now gets the discount.
