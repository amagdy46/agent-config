---
name: technical-documentation
description: Create or revise source-grounded documentation for developers and technical operators, including tutorials, how-to guides, references, explanations, READMEs, and design documents. Use when technical prose must be accurate, navigable, and verifiable against the current system.
license: MIT
---

# Technical Documentation

Write the document a technical reader needs, grounded in the source that owns each claim. Prefer a short truthful document over a complete-looking document filled with guesses.

## Establish the document contract

Before drafting, determine:

- document kind and target reader;
- the task or understanding the reader needs;
- scope and explicit non-goals;
- authoritative sources and their revision or date;
- existing documentation conventions and the current owner of the topic.

Inspect comparable documents and extend the existing source of truth when possible. Do not create a rival document beside a living owner.

## Choose one primary mode

- **Tutorial:** teach through a safe, concrete path with early visible success. Keep explanation brief and tell the learner what to observe.
- **How-to:** help a competent reader complete one task. Put conditions before actions, keep steps direct, and link background separately.
- **Reference:** support lookup with complete, stable facts arranged like the interface being described. Prefer generation from code or schemas where available.
- **Explanation:** answer a bounded “why” with context, constraints, alternatives, consequences, and clearly labeled inference.
- **Design document:** state the proposal early, distinguish facts from proposals, name alternatives and costs, and make open decisions addressable.

Split and link when one file tries to teach, instruct, enumerate, and argue at the same time.

## Ground every claim

Use current code, tests, schemas, configuration, runtime evidence, and approved decisions according to the claim. A name, comment, old document, or memory is a lead to verify, not proof. Mark estimates, unknowns, unexercised branches, and historical behavior honestly.

Write exact symbols, paths, UI labels, commands, fields, defaults, limits, and error text when those details are part of the contract. Keep implementation trivia out of prose when a refactor would make the documentation false without changing behavior.

## Make the text executable by the reader

- Lead sections and paragraphs with the conclusion or action.
- Use one term for one concept and define unfamiliar terms at first use.
- Prefer active voice, direct commands, and short everyday words.
- Put warnings and prerequisites before the step they guard.
- Give procedures observable checkpoints, expected results, recovery, and troubleshooting.
- Use descriptive link text, meaningful headings, numbered sequences, and parallel lists.
- Preserve commands, code, identifiers, citations, numbers, and uncertainty during editing.

Match the repository's tone unless it weakens truth or clarity. Do not force mechanical style rules when they make the text less natural.

## Verify before delivery

Check links, referenced files, commands, code examples, schemas, counts, and claimed behavior at the relevant revision. Run safe examples when the request authorizes it. Label anything not exercised, and state what evidence would promote a draft to trusted documentation.

Review for missing prerequisites, ambiguous pronouns, inconsistent terms, buried conclusions, unsupported claims, and accidental mixing of document modes. Keep factual corrections separate from optional prose improvements.

## Boundaries

- Do not invent behavior to fill a template.
- Do not silently rewrite an approved policy or historical decision.
- Do not expose credentials, customer data, private URLs, or internal facts in portable documentation.
- Do not publish or send documentation externally without authorization.
- Use `operator-guide`-style reasoning instead when the primary reader is a non-technical product operator completing tasks through a user interface.
