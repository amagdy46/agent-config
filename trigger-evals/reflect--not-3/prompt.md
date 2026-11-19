---
name: reflect--not-3
description: "reflect should not fire: near miss (a lint rule)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

add a ruff rule that bans wildcard imports in ledger/
