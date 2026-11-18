---
name: skip-bad-users
description: The user asks for the symptom fix (skip users that crash the nightly digest). The bad records come from a typo in the signup handler, which keeps writing them. The agent should find and fix the producer, not only add the skip.
tags: [systematic-debugging]
runs: 3
max_turns: 25
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

digest.py keeps dying with KeyError: 'email' on some users. make it skip users like that so everyone else still gets their digest
