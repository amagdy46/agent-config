---
name: operator-guide
description: Create or revise task-focused documentation for non-technical product operators, support staff, administrators, or internal-tool users. Use for user guides, standard operating procedures, onboarding, troubleshooting, and handoffs that must match the real interface without exposing implementation detail.
---

# Operator Guide

Help a person complete real work safely through the product surface. Write in the reader's vocabulary, not the implementation's vocabulary. An operator guide is not a developer runbook or a feature brochure.

## Define the reader and task

Identify:

- role, experience, and permitted actions;
- the exact task and why the reader performs it;
- entry point, prerequisites, access, and required inputs;
- normal completion, important exceptions, and escalation owner;
- supported product version, environment, or date.

Use the supplied product specification, approved policy, current UI, support evidence, and existing documents. If the real interface can be inspected safely, verify labels and flow there. Otherwise mark the guide as a draft and list the labels or states that need confirmation.

Never invent buttons, permissions, screenshots, error messages, customer examples, or organizational policy.

## Structure around work

Choose only the sections the reader needs:

1. **Purpose and audience:** what this guide helps the reader accomplish and what it does not cover.
2. **Before you start:** access, inputs, warnings, and conditions.
3. **Quick path:** the common successful route, when a compact checklist is safe.
4. **Task procedures:** one action per numbered step, using exact visible labels and a checkpoint after meaningful transitions.
5. **Decision branches:** “If you see X, do Y,” placed where the branch occurs.
6. **Verify the result:** what success looks like in the interface or downstream process.
7. **Recover or undo:** retry, correction, rollback, or a clear statement that an action cannot be undone.
8. **Troubleshooting and escalation:** symptom as the reader sees it, likely cause if known, safe fix, evidence to collect, and when or where to escalate.
9. **Terms:** only unavoidable product or domain terms, defined plainly.

Separate unrelated tasks into linked guides. Keep reference tables out of the main procedure unless the reader needs them while acting.

## Write for a non-technical operator

- Address the reader directly and use concrete verbs.
- Name the visible product object rather than its service, database, event, or API.
- Explain unavoidable technical terms immediately in plain language.
- Use consistent names that match the interface.
- State consequences before destructive, irreversible, customer-visible, paid, or permission-changing actions.
- Avoid “simply,” “obviously,” and assurances that a task is easy.
- Use screenshots only when they reduce ambiguity; crop sensitive data, add useful context, and provide text that remains usable when the image is stale or inaccessible.

Do not hide uncertainty behind confident prose. If a branch has not been exercised, label it and request validation from an authorized operator.

## Review through the operator's path

Walk the guide against a safe environment or representative evidence. Check that prerequisites are available, labels exist, steps are ordered, outcomes are visible, recovery is possible, and escalation contains enough evidence for the next person. A source-code review alone does not prove a UI procedure.

Protect credentials, personal data, customer data, internal URLs, and screenshots. Replace sensitive examples with clearly fictional or sanitized values.

## Boundaries

- Do not turn an operator guide into architecture documentation.
- Do not authorize actions the reader's role may not perform.
- Do not include production commands merely because the underlying system uses them.
- Do not contact users, change live data, or publish the guide without separate authorization.
