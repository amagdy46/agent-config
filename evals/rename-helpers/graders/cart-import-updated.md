---
type: regex
target: {source: file, path: shop/cart.py}
pattern: "from shop\\.(?!helpers\\b)\\w+ import"
match: contains
---
cart.py imports from the renamed module. (File graders see only files the run
changed, so a positive match also proves the agent edited it.)
