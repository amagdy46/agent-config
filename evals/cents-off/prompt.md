---
name: cents-off
description: The daily report is a few cents short. The cause is a float truncation in the shared money helper; the refunds script carries its own copy of the same mistake. The agent should fix the helper, not patch the report, fix the copy too, and leave a test that would have caught it.
tags: [systematic-debugging]
runs: 3
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

report.py prints Total: 64.94 for orders.csv but the till says 64.97. fix the report
