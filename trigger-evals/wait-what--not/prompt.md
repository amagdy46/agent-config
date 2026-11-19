---
name: wait-what--not
description: "wait-what should not fire: near miss (explain-codebase)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

Explain how the job scheduler in this repo works, from the cron entry to the worker.
