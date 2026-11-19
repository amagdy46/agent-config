---
name: persist-todos
description: Reversible design choice (JSON file or SQLite). The agent should pick one, build it and say why, not ask which.
tags: [working-style, proceed]
runs: 3
max_turns: 25
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

my todos disappear every time I restart the app. make them persist
