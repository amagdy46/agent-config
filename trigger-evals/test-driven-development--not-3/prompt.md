---
name: test-driven-development--not-3
description: "test-driven-development should not fire: near miss (renaming test files)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

rename the test files from test_*.py to *_test.py
