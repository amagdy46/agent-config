---
name: grilling
description: Stress-test a plan, decision, or idea through a structured, challenging interview. Use only when the user explicitly asks to be grilled, interrogated, or pushed on their assumptions; do not activate for ordinary clarification or requirements gathering.
---

# Grilling

Turn the topic into a decision tree: foundational choices first, then the decisions that depend on them. The current **frontier** is every important question whose prerequisites are already settled.

## Run the interview

1. Restate the decision being tested and the success criteria you currently understand.
2. Inspect available files, code, documentation, history, or other in-scope evidence before asking factual questions. Facts you can discover are your work; preferences, trade-offs, risk tolerance, and authority remain the user's decisions.
3. Ask one frontier round at a time. Include all independent questions that can be answered now, but defer questions whose premise depends on another unanswered choice.
4. For every question, explain why it matters and give a recommended answer with its main trade-off. Challenge contradictions, vague language, hidden assumptions, irreversible choices, failure modes, operating burden, and what would falsify the plan.
5. Incorporate the answers, recompute the frontier, and continue until no material branch remains silently assumed.

Keep rounds digestible. Prefer numbered questions with clearly separated recommendations. Do not manufacture ceremony around trivial decisions, repeat settled questions, or ask the user to retrieve facts available to you.

## Finish

Summarize:

- settled decisions and reasons;
- assumptions and evidence;
- unresolved choices and who owns them;
- rejected alternatives;
- risks, validation steps, and stop conditions.

Ask the user to confirm that the summary represents the shared understanding. Grilling authorizes the interview and its synthesis only. Do not implement the plan, edit unrelated artifacts, contact people, or mutate external systems unless that action was separately requested or explicitly approved.
