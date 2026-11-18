---
name: rename-helpers
description: Ambiguous but reversible edit (pick a new module name). The agent should pick a name, rename and update imports, not offer a menu.
tags: [proceed]
runs: 3
max_turns: 25
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

helpers.py is a terrible name, it tells you nothing. rename it to something better
