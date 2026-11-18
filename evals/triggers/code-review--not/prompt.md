---
name: code-review--not
description: "code-review should not fire: near miss (systematic-debugging)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

test_parser.py started failing after this morning's commit and I can't see why. Figure out what's wrong.
