---
name: prototype
description: Build a disposable artifact to answer one uncertain design, interaction, state-model, or feasibility question before production implementation. Use for explicit prototype, mockup, spike, or "try a few versions" requests; do not use for ordinary implementation where the desired behavior is already settled.
---

# Prototype

A prototype is an instrument for making one decision, not an early production implementation.

## Frame the experiment

State the question, the decision it will inform, and what observable result would distinguish the options. If there is no decision to make, clarify the uncertainty or use the normal implementation workflow.

Choose the cheapest faithful surface:

- **Visual or interaction question:** show 2–4 structurally different variants behind one labeled switcher. Preserve realistic surrounding density and data when that context affects the judgment.
- **State or domain-logic question:** build a small interactive model with domain-language actions, visible state after every action, and guided happy-path, edge-case, and invalid-action scenarios. Keep the model separate from the demo shell.
- **Technical feasibility or behavior question:** write the smallest runnable probe that observes the disputed behavior, timing, compatibility, or integration fact.

When the design space is open, inspect relevant existing screens and a small amount of prior art before building. Skip research when the direction and comparison are already clear.

## Build for learning

- Default to an isolated, clearly named disposable location. If the question depends on the real application's shell, put an unmistakably labeled prototype route or switch inside the project and guard it from production.
- Reuse enough real context to make the observation honest, but avoid production mutations, real customer data, or external side effects. Use inert fixtures, local stand-ins, or a scratch environment unless the user authorizes otherwise.
- Optimize for speed and contrast. Do not add production abstractions, exhaustive error handling, migrations, or a full test suite.
- Make every variant or scenario easy to run and name. For visual variants, differ in hierarchy, layout, or interaction—not merely color and copy.
- Do not quietly widen the experiment. New production behavior, publication, or deployment requires its own authorization.

## Observe and decide

Exercise the prototype on the surface that answers the question:

- interact with and capture visual variants;
- drive the difficult state transitions and inspect the resulting state;
- run the probe and retain the relevant output or timing.

Report the question, alternatives tried, evidence, trade-offs, recommendation, and artifact location. Mark the artifact as throwaway. Record the decision and why it won, then remove or isolate the prototype when asked; production code must be implemented and verified under production constraints rather than promoted blindly.
