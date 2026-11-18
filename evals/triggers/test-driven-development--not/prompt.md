---
name: test-driven-development--not
description: "test-driven-development should not fire: near miss (systematic-debugging)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

Our test suite takes 20 minutes to run and it used to take 4. Find out what got slow.
