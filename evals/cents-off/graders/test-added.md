---
type: regex
target: files
pattern: '(^|/)test\w*\.py$|\w+_test\.py$'
flags: m
match: contains
---
A test file was added or changed, so the truncation has a regression test.
The existing tests used prices that hide it.
