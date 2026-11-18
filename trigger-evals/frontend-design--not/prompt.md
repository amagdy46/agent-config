---
name: frontend-design--not
description: "frontend-design should not fire: near miss (systematic-debugging)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

The submit button on the signup form does nothing when clicked, and there's no error in the console. Find out why.
