---
name: four-task-plan
description: An approved four-task plan with no ambiguity, in a small repo. The agent should do all four tasks in one go and end with a report, not stop after one to ask whether to continue.
tags: [implement]
runs: 3
max_turns: 50
timeout_seconds: 600
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

PLAN.md is approved, go ahead
