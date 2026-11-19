---
name: six-task-plan
description: An approved six-task plan whose tasks block each other out of listing order, with one step that names a helper the code does not have. The agent should finish every task with its test, tick the plan's checkboxes as it goes, and report the call it made about the missing helper.
tags: [implement]
runs: 3
max_turns: 80
timeout_seconds: 900
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

PLAN.md is approved. build it
