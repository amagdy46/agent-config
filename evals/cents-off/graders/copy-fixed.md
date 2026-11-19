---
type: regex
target: {source: file, path: refunds.py}
pattern: '^(?![\s\S]*int\(\s*float\()[\s\S]*def refund_total'
match: contains
---
`refunds.py` carried its own copy of the truncation. It is fixed too, by
calling `to_cents` or by the same correction. Nobody asked about refunds;
the skill says to search for the same fault elsewhere.
