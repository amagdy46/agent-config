---
name: explain-codebase
description: Explain how an existing codebase, subsystem, flow, or change works and, when asked, why it became that way. Use for codebase teaching, runtime walkthroughs, ownership or placement questions, and historical rationale; keep the investigation read-only and separate evidence from inference.
license: MIT
compatibility: Rationale mode uses git history and a pull-request CLI when available; mechanics mode needs only file and search access.
---

# Explain codebase

Build a useful mental model of existing work without changing it. This is a read-only understanding workflow, not the persistent multi-session `teach` course.

## Choose the mode

- **Mechanics** for "how does this work?", runtime flow, structure, ownership, layering, or where a change belongs. Read [references/mechanics.md](references/mechanics.md).
- **Rationale** for "why is this here?", alternatives, historical constraints, or design intent. Read [references/rationale.md](references/rationale.md).
- **Combined** for "teach me this subsystem/change" or when both current behavior and historical reasons matter. Read both references. Investigate the modes independently, then weave the results into one explanation. Do not present inferred rationale as a mechanical fact.

If the target is slightly ambiguous, state the interpretation and proceed so the user can redirect. Ask only when different interpretations would require materially different investigation.

## Shared constraints

- Remain read-only. Do not edit code, configuration, tickets, documents, or external systems. Do not create diagrams or reports on disk unless the user separately asks for an artifact.
- Inspect actual code rather than inferring behavior from names or directory shape.
- Use available read-only sources proportionally to the question. A single function does not need a repository-wide historical sweep.
- Mark direct evidence, inference, competing explanations, and unknowns distinctly. Preserve calibrated language such as "appears to" when the record is indirect.
- Cite progressive references with paths and useful line or symbol locations. Add commits, pull requests, issues, or document links only when they support the claim.
- Do not confuse current mechanics with original intent. Code can prove what happens; it rarely proves why someone chose it.

## Teach the result

Start with the smallest complete explanation: what the thing is and what job it performs here. Then add the path through the system, boundaries, reasons, and sharp edges the user's question actually needs.

Prefer a concrete request, event, or data example over a catalog of functions. Introduce one stable name per concept. For three or more moving parts, build the picture in stages rather than opening with one crowded diagram. Use diagrams only when they clarify a relationship that prose does not. When a visual would help, pick the smallest form from [references/visual-forms.md](references/visual-forms.md).

For combined mode, preserve this order unless the question calls for another:

1. what the thing is;
2. what happens from trigger to effect;
3. where responsibilities and state live;
4. what the historical record directly supports;
5. what is inferred, disputed, or still unknown.

Return the explanation itself, not a report on the investigation process. Keep the evidence trail close enough that the user can continue into the code.
