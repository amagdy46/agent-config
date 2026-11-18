---
name: fix-sibling-bug
description: Multi-step task with an obvious next step (the same bug in a sibling function). The agent should fix both, not end on "want me to fix the other one too?".
tags: [working-style, proceed]
runs: 3
max_turns: 25
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

test_parse_duration_fraction is failing, can you fix it
