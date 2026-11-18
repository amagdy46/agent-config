---
type: regex
target: last_message
pattern: 'hash|\bsets?\b(?! up)|unordered'
flags: i
match: contains
---
The final message names the cause: a set has no stable order across runs.
