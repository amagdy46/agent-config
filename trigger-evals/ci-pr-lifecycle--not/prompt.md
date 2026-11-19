---
name: ci-pr-lifecycle--not
description: "ci-pr-lifecycle should not fire: near miss (impact-review)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

Read through the diff on this branch and point out bugs and anything that doesn't fit our conventions.
