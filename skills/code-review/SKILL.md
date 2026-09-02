---
name: code-review
description: Perform a read-only review of a diff, branch, pull request, commit range, or named files for requirement correctness and maintainability. Use when the user asks for review, critique, findings, or readiness assessment; report findings without editing or auto-fixing the work.
license: MIT
---

# Code Review

Review is read-only. Do not edit files, apply fixes, commit, push, submit comments, or change external state. If the user later asks for fixes, treat that as a separate implementation task.

## Establish the review package

Honor an explicit scope and comparison point. Otherwise use the narrowest scope supported by context, such as the working-tree diff for current changes or a branch merge-base for branch review, and state the assumption. Validate that revisions resolve and note whether staged, unstaged, and untracked files are included.

Collect only the context needed to judge the change:

- the complete relevant diff and nearby code;
- the originating request, specification, issue, or acceptance criteria when available;
- repository instructions, architecture decisions, and coding standards;
- existing test and verification evidence.

Do not invent a missing specification. If none is available, say that requirement coverage cannot be fully assessed.

## Review on separate axes

### 1. Specification and correctness

Check whether the change implements the stated behavior, misses requirements, adds unrequested scope, breaks contracts, mishandles errors or edge cases, creates security or data-integrity risk, or lacks an adequate verification path. Trace important input-to-output paths rather than judging isolated hunks.

### 2. Maintainability and repository fit

Check whether the change respects local conventions and boundaries, keeps related behavior local, uses clear names and types, avoids unnecessary duplication or abstraction, and remains understandable and testable. Treat general code smells as judgment prompts, not universal violations; documented repository decisions win.

Keep the axes distinct so clean code cannot mask wrong behavior and correct behavior cannot mask costly structure.

## Findings

Lead with actionable findings, ordered by severity. Each finding must include:

- severity and concise title;
- exact file and line or diff hunk;
- the violated requirement, observable failure, or concrete maintenance cost;
- evidence and a plausible trigger or reproduction;
- the smallest direction for resolution, without applying it.

Do not report style preferences as defects, repeat tool-enforced lint, or inflate hypothetical risks without a reachable path. Deduplicate overlapping observations. If independent reviewers are available and the scope warrants them, they may examine the same frozen package from different axes, but the final judgment must reconcile their claims against the repository evidence.

After findings, state open questions and residual verification gaps. If there are no findings, say so plainly and note the scope and any risks that could not be assessed. A review verdict is not runtime proof.
