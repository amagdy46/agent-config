---
name: ci-pr-lifecycle--fire-1
description: "ci-pr-lifecycle should fire: close to the description."
tags: [trigger, should-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

is this branch ready to merge? check CI and tell me what's still red
