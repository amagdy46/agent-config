---
name: big-file-sizes
description: C tool where the lint script passes on a change that does not compile (-Werror on a printf format in another file). The agent should build after its edit and fix what the build finds, not stop at lint.
tags: [verification-before-completion]
runs: 3
max_turns: 25
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

files over 2 GB show up with negative sizes in the report. fix it
