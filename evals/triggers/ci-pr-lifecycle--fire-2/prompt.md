---
name: ci-pr-lifecycle--fire-2
description: "ci-pr-lifecycle should fire: in other words."
tags: [trigger, should-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

push my changes, open a pull request and keep an eye on the checks until they're green
