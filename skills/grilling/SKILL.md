---
name: grilling
description: Stress-test a plan, decision or idea through rounds of pointed questions, each with a recommended answer. Use for "grill me", "poke holes in this", "challenge my plan", or when a design must converge on decisions.
license: MIT
---

# Grilling

Interview the user relentlessly until you share one understanding. Map the
topic as a **design tree**: each decision branches into the decisions that
depend on it.

## Rounds

The **frontier** is every decision whose prerequisites are settled. Ask the
whole frontier in one round, then wait.

```
❓ **Q1 - <title>**: <the question, with options when they help>

➡️ <your recommended answer and its main trade-off>

---

❓ **Q2 - <title>**: ...
```

Word each question so "yes" accepts your recommendation. A question that
depends on another open question in the same round belongs to a later round.
After each round, fold in the answers, recompute the frontier and ask the
next round.

Press on contradictions, vague words, hidden assumptions, irreversible
choices, failure modes, operating cost, and what would prove the plan wrong.

## Facts versus decisions

Facts are your job. When a question needs a fact from the code, the files or
the web, dispatch a subagent to find it and keep going; only the questions
downstream of that lookup wait. Decisions, trade-offs and risk tolerance are
the user's: put each one to them.

## Done

The session is done when the frontier is empty: every branch visited, nothing
silently assumed. Summarise the settled decisions with reasons, the rejected
alternatives, the remaining risks and who owns any open choice. Ask the user
to confirm that this is the shared understanding before acting on it.
