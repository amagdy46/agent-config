---
name: code-review
description: Review a diff, branch, PR, or files for spec and standards fit, and trace what a change could break beyond the diff. Use for "review this", "what could this break", "blast radius", or when acting on review feedback.
license: MIT
---

# Code Review

Review is read-only: report findings; edit only when asked.

## Pin the package

For files or a whole repository, review the requested paths at the requested revision (default: the working tree); no diff is needed. For a change, name the base and head explicitly: what the user gave, else the branch's merge-base with the default branch, else the working-tree diff. Confirm both refs resolve and the diff is non-empty (`git diff <base>...<head>`, `git log <base>..<head> --oneline`). State whether staged, unstaged, and untracked files are included.

Gather the **spec** (issue refs in commits, a path the user gave, a spec file matching the branch) and the **standards** (AGENTS.md, CONTRIBUTING, ADRs). With no spec, say requirement coverage cannot be assessed; never invent one.

## Two axes, reported separately

Clean code must not mask wrong behavior, nor correct behavior mask costly structure. Do not merge or rerank across axes.

- **Spec:** requirements missing or partial, behavior nobody asked for, requirements that look met but are wrong. Quote the spec line. Trace input to output instead of judging hunks.
- **Standards:** breaches of documented rules (cite file and rule), then judgement-call smells (Mysterious Name, Duplicated Code, Feature Envy, Shotgun Surgery, Speculative Generality). The repo overrides the smell list. Skip what lint already enforces.

For a large diff, give each axis a fresh subagent with the diff command, its sources, and nothing from your session history; reconcile their claims against the code. Without subagent tools, review the axes in two separate passes and say the review was not independent.

## Trace consumers beyond the diff

Listing callers is the easy part; hunt the breakage grep cannot see. Name what changed semantically (defaults, ordering, timing, errors, permissions, removals), then follow it across boundaries: public APIs and webhooks, schemas and migrations, events and queues, serialized names and flags, caches, jobs, deploy order, other repos and languages.

Pick the one or two load-bearing facts the change is safe because of, and push each up the ladder, stopping where proof gets unsafe or expensive:

1. asserted; 2. cited at `file:line` or in dependency source; 3. failure path traced and shown unreachable; 4. a script or test exercising the real code; 5. reproduced on the running system.

Prefer one small executable probe over a persuasive paragraph. Probe locally; never mutate shared or production systems. An empty search proves nothing about consumers elsewhere. Report **confirmed risks**, **cleared risks**, and **unknowns**, leading with the load-bearing facts and their level.

## Findings

Order by severity: **blocker** (wrong behavior, data loss, security, a broken documented rule), **should** (real cost, safe to merge without), **nit**. Each carries: title, `file:line`, the violated requirement or reachable failure with its trigger, the evidence (a command and its output, or the cited rule), and the smallest direction to resolve it. A finding with no evidence is a question, not a blocker. Drop style preferences and hypotheticals without a reachable path. Report every blocker you can find in this pass; do not save some for the next round. Finish with open questions and what stayed unverified; with no findings, say so and name the scope.

## Re-review

A re-review covers only the fix diff plus anything it touches, and answers ADDRESSED or NOT ADDRESSED for each earlier finding before adding new ones. New findings in code the first pass already read need a reason the first pass missed them. After three rounds, stop and hand the open findings to whoever ordered the review with a recommendation for each.

## Receiving feedback

Verify each item against the codebase before acting. Ask about every unclear item before implementing any. Apply blocking issues first, then simple fixes, then complex ones, testing each. Push back with evidence when a suggestion breaks behavior, lacks context, or adds unused scope (grep for real usage first). State fixes factually; skip praise and thanks.
