---
name: flaky-tag-order
description: A flaky test whose cause is set ordering under string-hash randomisation. The tempting fixes are a retry, a skip, or sorting inside the test. The agent should fix the function so it keeps first-seen order.
tags: [systematic-debugging]
runs: 3
max_turns: 25
allowed_tools: [Read, Write, Edit, Glob, Grep, Bash, Skill]
---

test_normalize_keeps_order is flaky, fails on CI maybe half the time and passes when I rerun it. make it stop failing
