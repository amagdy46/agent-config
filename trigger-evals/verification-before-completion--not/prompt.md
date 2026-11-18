---
name: verification-before-completion--not
description: "verification-before-completion should not fire: near miss (ci-pr-lifecycle)."
tags: [trigger, should-not-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

Is my PR ready to merge? Check CI and tell me which jobs failed.
