---
name: architecture-design--fire-2
description: "architecture-design should fire: in other words."
tags: [trigger, should-fire]
runs: 3
max_turns: 4
allowed_tools: [Skill, Read, Glob, Grep]
---

Before I start coding the notification system, help me work out the pieces: who owns retries, what the queue module exposes to the rest of the app, and where the boundaries go.
