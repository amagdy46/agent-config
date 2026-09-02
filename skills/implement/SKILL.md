---
name: implement
description: Route an authorized implementation request through the appropriate planning, isolation, test, debugging, review, and verification disciplines. Use when the user asks to build, change, or fix code from requirements, a plan, or tickets.
license: MIT
---

# Implement

Implement only the requested outcome within its stated scope.

1. Read repository instructions and the supplied requirements, plan, or tickets. Inspect the existing design before editing. Surface only material ambiguities that cannot be resolved safely from context.
2. For multi-unit work without an adequate plan, use `writing-plans` when available; otherwise write the dependency order, affected interfaces, and proof for each unit before editing. Use `using-git-worktrees` when available and isolation is requested or warranted and authorized; otherwise follow the repository's native isolation policy without transporting dirty changes implicitly.
3. Work in small, verifiable units. Use `test-driven-development` when available for agreed or clearly established behavior seams where test-first work fits; otherwise still observe the relevant failure before the change and its success afterward. Use `systematic-debugging` when available if observed behavior contradicts expectations; otherwise stop, reproduce, form one evidence-backed hypothesis, and test it rather than guessing through failures.
4. Preserve unrelated user changes and established contracts. Do not broaden the work with opportunistic refactors, dependency upgrades, or external mutations.
5. Run focused checks during implementation. Before final claims, obtain fresh evidence from the real proving surface, either through `verification-before-completion` or the same claim-specific gate locally. Use `code-review` when available and requested or when the accepted workflow calls for a review gate; otherwise inspect the complete diff against requirements and repository conventions before handoff.
6. Report changed behavior, files, verification evidence, and remaining risks.

Implementation permission does not imply permission to commit, push, open or update a pull request, deploy, merge, publish, or modify tickets. Perform those actions only when the user separately requests them or they are explicitly part of the accepted workflow.
