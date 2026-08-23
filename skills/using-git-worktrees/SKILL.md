---
name: using-git-worktrees
description: Create or recognize an isolated Git workspace for implementation while preserving existing changes and authorization boundaries. Use when the user requests a worktree, an accepted workflow requires isolation, or concurrent work would otherwise collide.
---

# Using Git Worktrees

Isolation protects concurrent work; it does not grant permission to create branches, move uncommitted changes, install dependencies, commit, push, or delete workspaces.

## Inspect first

With read-only Git commands, confirm the repository root, current branch or detached state, working-tree status, common Git directory, existing worktrees, and any repository instructions. Detect whether the current environment is already an isolated workspace. Do not create a nested worktree when an existing harness or agent environment already provides suitable isolation.

If the current tree is dirty, classify which changes belong to the user and whether any overlap the requested work. Never reset, clean, checkout over, stash, patch out, copy, or relocate those changes without explicit authorization. Prefer a clean worktree based on a committed revision; uncommitted user work is not silently transported into it.

## Choose the mechanism

Creating a worktree and branch requires authorization. Existing user instructions or an accepted workflow may provide it; otherwise ask before mutating Git state.

1. Prefer the coding host's native isolated-workspace or worktree mechanism when available. It owns placement, lifecycle, and cleanup.
2. Use `git worktree` only when no suitable native mechanism exists.

For the Git fallback:

- resolve the requested start revision and verify the intended branch name is safe and unambiguous;
- choose an explicit path outside the tracked tree, or an existing project-local worktree directory only after `git check-ignore` confirms it is ignored;
- require the destination not to exist and check that the branch is not already checked out elsewhere;
- use `git worktree add <exact-path> -b <new-branch> <start-revision>` for a new branch, or the corresponding non-`-b` form only for an existing branch that is free to check out;
- if any check fails, stop and report the exact conflict rather than changing branches, deleting directories, or rewriting repository state.

Do not add ignore rules or commit them as an incidental step. If no safe location exists, ask for a location or continue in place only when the user accepts that boundary.

## Establish the baseline

Inside the selected workspace, confirm its absolute path, branch/detached state, and clean status. Follow repository-provided setup and verification instructions. Do not guess package-manager commands or install dependencies merely because a manifest exists; use the repository's documented workflow and the authorization already granted.

Run the smallest credible baseline check for the planned work. If it fails before implementation, preserve the evidence and ask whether to investigate or proceed with the known baseline failure.

Report the workspace path, base revision, branch state, clean/dirty state, and baseline result.

## Cleanup

Cleanup is a separate destructive action. Perform it only when requested, after confirming the exact registered worktree path and checking for uncommitted or untracked files. Refuse automatic removal of a dirty worktree. Prefer the host's native cleanup; otherwise use `git worktree remove <exact-path>` and prune only stale administrative entries when justified. Never use broad recursive deletion as worktree cleanup.
