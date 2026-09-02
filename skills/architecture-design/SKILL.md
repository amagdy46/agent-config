---
name: architecture-design
description: Design or reshape a non-trivial module, interface, subsystem, or integration boundary before implementation. Use when ownership, seams, contracts, data flow, or testability are consequential; do not activate for routine local edits with an established shape.
license: MIT
---

# Architecture Design

Produce a design that concentrates domain knowledge behind a small, honest interface and makes change local. Design work alone does not authorize implementation.

## Ground the decision

Read the relevant code, tests, documentation, contracts, and history. Trace how callers use the current system, where state and side effects live, and which constraints are genuine. Distinguish employer or project convention from a technical invariant.

Sharpen the domain language before drawing boundaries. Identify ambiguous terms, invalid states, repeated shape assumptions, and rules scattered across branches. Prefer structures that encode the domain—such as a typed model, state machine, registry, reducer, or command/event model—when they remove invalid states or duplicated policy. Keep straightforward local code when an abstraction would only add indirection.

## Design caller-first

Start with representative caller usage, then derive:

- the public interface, including invariants, ordering, errors, configuration, and relevant performance characteristics;
- module ownership and the domain knowledge hidden inside;
- data and control flow;
- state ownership and concurrency assumptions;
- side-effect boundaries and failure handling;
- the test surface and observability needed to prove the contract;
- migration and compatibility constraints for existing callers or stored data.

Place validation and translation where untrusted data enters. Keep transport, storage, and framework representations private unless they are intentionally part of the contract. Introduce a seam or adapter only for real variation, a genuine external boundary, or a useful test substitute—not for hypothetical flexibility.

For consequential choices, develop at least two meaningfully different shapes and compare them on:

- **leverage:** capability gained per concept a caller must learn;
- **locality:** whether one change stays in one place;
- **reader load:** layers to trace and hidden state to remember;
- **failure containment:** how errors and partial work propagate;
- **migration cost:** coordinated changes, compatibility, and rollback.

Do not invent alternatives when one established local pattern clearly fits.

## Screen the shape

Revise or reject a design when:

- callers must coordinate many methods or understand internal stages;
- wire, framework, or storage choices leak through several modules;
- modules are split by execution phase rather than knowledge ownership;
- layers mostly forward the same arguments;
- tests must reach through the interface to verify behavior;
- extension points have no present second use;
- the model permits states the domain forbids.

## Deliver the design

Provide the recommended shape, representative usage, interface or type sketch, module map, invariants, rejected alternatives, trade-offs, verification strategy, and migration notes. Use pseudocode or unimplemented signatures when code clarifies the contract, but do not leave production scaffolding unless requested.

If the user requested implementation too, proceed only when the design does not introduce a material unresolved choice or scope expansion. Otherwise surface that choice and wait for direction.
