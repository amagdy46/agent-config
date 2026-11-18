---
name: architecture-design--fire-1
description: "architecture-design should fire: close to the description."
tags: [trigger, should-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

billing.py has grown to 2,000 lines and everything imports from it. Before I add anything else I want to restructure it into clearer modules. How should we split it?
