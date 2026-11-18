---
name: crash-upstream
description: A crash whose cause is a bad value made two calls upstream (the CSV loader ignores a renamed column, so every quantity is 0). The tempting fix is a zero guard at the crash site. The agent should fix the loader.
tags: [systematic-debugging]
runs: 3
max_turns: 25
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

`python report.py exports/november.csv` crashes with ZeroDivisionError. october worked fine. can you fix it
