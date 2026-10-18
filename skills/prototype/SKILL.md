---
name: prototype
description: Build a throwaway artifact to settle one uncertain design question. Use for "prototype", "spike", "mockup", "try a few versions", "does this state model feel right", or "what should this look like". Skip when the behavior is already settled.
license: MIT
---

# Prototype

A prototype is throwaway code that answers one question. The question picks the shape; no decision to make means no prototype, so build normally.

## Pick the branch

- **Look or interaction** ("what should this look like?"): 2-4 structurally different variants (hierarchy, layout, interaction, not just color) behind one labeled switcher, such as a URL param or key press. Keep realistic density and data. If the design space is open, check prior art and let the user choose directions before building.
- **State or logic** ("does this model feel right?"): a small interactive model with domain-language actions, the full state shown after every action, and guided scenarios for the happy path, edge cases, and invalid actions. A single HTML file a non-developer can drive is ideal. Keep the model apart from the demo shell.
- **Feasibility** (timing, compatibility, an integration fact): the smallest runnable probe that observes the disputed behavior.

If the branch is unclear and nobody is around, follow the surrounding code (backend module: logic; page or component: look) and state the assumption on the prototype itself.

## Rules

1. Name and place it so nobody mistakes it for production: a scratch dir, or a clearly labeled route near the code it informs, using the project's routing convention.
2. One command or double-click to run.
3. State lives in memory. If persistence is the question, use a scratch database or file named for wiping.
4. Skip tests, error handling beyond runnable, and abstractions. Use fixtures, never real customer data or external side effects.
5. Run it and look: screenshot variants, drive the hard transitions, keep the probe's output or timing. The observation is the test.

## Close out

Report the question, variants tried, evidence, trade-offs, a recommendation, and the artifact path, marked throwaway. Record the verdict and why it won in the issue or commit; keep the prototype on a throwaway branch or delete it, never promote it into production. Real code follows its normal workflow. Building beyond the question needs a new go-ahead.
