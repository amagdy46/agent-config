---
name: to-issues--not-3
description: "to-issues should not fire: near miss (a bug to fix)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

the importer chokes when the CSV starts with a BOM. fix it
