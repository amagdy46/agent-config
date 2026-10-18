---
name: technical-documentation
description: "Write or revise source-grounded docs: READMEs, tutorials, how-to guides, references, explanations, design docs, and user guides or SOPs for non-technical operators. Use when documentation must be accurate, scannable, and verified against the current system."
license: MIT
---

# Technical Documentation

Write so a tired reader understands on the first read, and ground every claim in the source that owns it. A short true document beats a complete-looking one full of guesses.

## 1. Fix the contract

- Reader mode: **developer** (works from code, terminal, config) or **operator** (non-technical, works through the product UI; see below).
- Document mode: pick one. Action for learning is a **tutorial**; action for work is a **how-to**; understanding for work is a **reference**; understanding for learning is an **explanation**. A **design doc** states the proposal first, separates fact from proposal, and names alternatives and costs.
- Task or understanding the reader needs, scope, non-goals, and the authoritative sources with their revision.

Extend the living owner of the topic instead of writing a rival document. Split and link when one file would teach, instruct, enumerate, and argue at once.

## 2. Mode rules

- **Tutorial:** open with what the reader will build. Every step produces a visible result, and you say what to expect (output, prompt change, log line). One clause of explanation plus a link.
- **How-to:** one task for a competent reader. Conditions before actions, forks as "If you want x, do y", background linked. Title it by the task.
- **Reference:** dry, complete, no opinion. Mirror the structure of the thing described, and generate from code or schemas where possible.
- **Explanation:** one bounded why. Give context, constraints, alternatives, consequences. Opinion belongs here and nowhere else. Label inference.

## 3. Ground every claim

Verify against current code, tests, schemas, config, runtime output, or approved decisions. A name, comment, old doc, or memory is a lead, not proof. Write the real symbol, path, flag, UI label, default, and error text. Mark estimates, unexercised branches, and unknowns as such. Keep out details a refactor would falsify without changing behavior.

## 4. Write the sentences

- Cut every word that does no work; use the short word ("use", not "utilize").
- Lead each section and paragraph with the conclusion or action. Headings carry the point, in sentence case.
- Talk to "you" in the present tense, in the active voice, with commands for instructions. Name the actor.
- Put the condition, warning, or prerequisite before the step it guards. Put the common case before exceptions.
- One instruction per sentence; split at about 20 words (instructions) or 25 (other). Keep "the" and "a".
- One name per thing, everywhere. Define unfamiliar terms at first use.
- Keep "only" and "not" beside the word they change. Make every "it", "this", and "they" point at one noun.
- Number sequences; bullet the rest, in parallel form, introduced by a full sentence. Describe links by destination.
- Mix sentence lengths and be specific ("a column rename fails the build"). When a rule makes a sentence worse, rewrite it another way.
- Give procedures checkpoints, expected results, recovery, and troubleshooting.

## 5. Operator mode

For support staff, administrators, and internal-tool users, document the work through the product surface in their vocabulary. Skip architecture, services, and production commands.

- Define the role, permitted actions, the task and why it matters, access, inputs, version or environment, and the escalation owner.
- Verify labels and flow in the real interface or a safe environment. Source code alone does not prove a UI procedure. If you cannot, mark the guide a draft and list the labels to confirm.
- Sections as needed: purpose and audience, before you start, numbered steps (one action each, exact visible labels, checkpoint after meaningful transitions), decision branches placed where they occur ("If you see X, do Y"), how to verify success, undo or recovery (or a plain statement that it cannot be undone), troubleshooting by symptom as the reader sees it (cause, safe fix, evidence to collect, where to escalate).
- State consequences before destructive, irreversible, customer-visible, paid, or permission-changing actions.
- Name the visible object, not its service, table, or API. Explain unavoidable terms at once.
- Use screenshots only to remove ambiguity: crop sensitive data and keep the text usable when the image goes stale.

## 6. Verify

Check links, files, commands, examples, counts, and behavior at the relevant revision; run safe examples. Label anything not exercised. Make every count or tree claim true at the commit that lands it. Replace credentials, personal data, and internal URLs with sanitized or fictional values.

Review for missing prerequisites, ambiguous pronouns, inconsistent terms, buried conclusions, mixed modes, and unsupported claims. Finish with the unslop pass. Report corrections to facts separately from optional prose edits.
