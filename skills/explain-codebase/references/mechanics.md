# Mechanics mode

Use this mode to explain current behavior, runtime flow, structure, ownership, and placement.

## Explore

Anchor the target in concrete entry points, symbols, files, and tests. Trace enough of the path to answer the question without gaps:

1. What triggers the behavior?
2. Which boundary receives the input?
3. Where are validation and decisions made?
4. How do data and state change?
5. Which side effects or outputs occur?
6. How are failures, retries, or cleanup handled?

Follow callers and callees. Read types, configuration, and tests when they determine the behavior. For a cross-cutting subsystem, divide exploration into distinct slices such as request path, state model, and external integrations; reconcile overlaps before explaining.

## Explain

Give the user:

- a short definition and purpose;
- the main flow from trigger to effect;
- the few components and boundaries needed for the mental model;
- a compact map of where those pieces live;
- non-obvious behavior or sharp edges;
- path, symbol, and line references for important claims.

Do not turn the answer into annotated source code or a file inventory. Mention an abstraction only after explaining the concrete job it performs. When answering a placement question, show which layer owns the relevant invariant or side effect and why that ownership follows from the current design.

If the user asks for critique, explain the current architecture first. Then separate observed problems from preferences and proposed improvements. Remain read-only.
