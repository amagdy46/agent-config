---
name: design-control-loop
description: Design and build a scheduled coding-agent loop that drives one codebase property toward a target through small reviewable pull requests. Use when the user wants a recurring agent that gradually fixes, migrates, generates, or cleans up code, or asks for an agentic control loop, iterated agent workflow, or scheduled agent PRs; do not use for a one-off change or for ordinary CI setup.
license: MIT
compatibility: Needs shell access, a CI system that can run on a schedule and open pull requests, and a headless coding-agent CLI with its provider credential stored as a CI secret.
---

# Design control loop

Treat the codebase as a system under continuous disturbance and design a loop that moves one property toward a set point a little at a time. Interview the user with proposals grounded in their repository, agree on a written design, make every component runnable by hand, and only then wire it into CI. Read [references/taxonomy.md](references/taxonomy.md) before the interview and use its vocabulary with the user.

## Phase A: read the repository

Before asking anything, establish the package manager and install command, the validation commands that already exist, the CI platform and its runner and caching conventions, existing agent loops or memory files, and the static analysis, lint, codegen, and test tooling that could act as a sensor.

Completion: you can name all of the above and describe the repository's packages or services at a high level.

## Phase B: design the loop with the user

Work through the components in order, proposing defaults from Phase A and recording decisions:

1. **Set point and scope.** The property being driven, the target (an invariant, a threshold, or a direction), and which directories may be changed versus only read.
2. **Sensor.** How the gap is measured repeatably. Prefer a tool the repository already runs. Discuss stability, cost, and whether it can be silently disabled.
3. **Controller.** How the next increment is chosen and sized to one reviewable unit. Range from a deterministic script to an agent prompt; it may be fused with the sensor or the actuator. Start simple; this is the part that gets tuned.
4. **Actuator.** The coding agent, its secret, its headless command from [references/agent-runners.md](references/agent-runners.md), the golden patterns it must follow, and the validation commands that must pass before it commits.
5. **Disturbances and dampener.** What changes the system outside the loop, and whether a regression gate on pull requests should keep the problem from growing. Offer it; not every loop needs one.
6. **Flow control.** Bound open pull requests per loop. Default to one, identified by a label; scheduled runs no-op when the bound is met, manual runs bypass it.
7. **Steering.** A memory file loaded on every run, and optionally a comment command on the loop's pull requests that re-runs the actuator against reviewer feedback.

Completion: a short written design naming every component, each of which the user can run locally.

## Phase C: write the actuator skill

Write a repository-local skill capturing the agent's judgment for this task. It may include repository-specific paths, commands, and conventions. Put ordered steps with checkable completion criteria in its `SKILL.md`, move long material into sibling references, keep one source of truth per rule, and include a response template that becomes the pull request body. Its frontmatter `name` must match its directory. Use [references/templates.md](references/templates.md) for the response, prompt, and memory skeletons.

## Phase D: run each component by hand

Land the sensor and controller as version-controlled commands where the repository keeps scripts. Run the sensor and inspect its output, run the controller on that output, then run the actuator locally through its headless command on one selected target and confirm validation passes. Do not create CI until all three work on their own.

## Phase E: wire the loop into CI

Assemble the workflow from [references/workflow-skeleton.md](references/workflow-skeleton.md): open-PR gate, checkout, setup, sensor, controller, actuator with memory interpolated after the controller output, PR creation with the agent's final message as the body, and the label. Collapse steps that the design fused. Choose the cadence from task risk and review burden. Validate the workflow file with a YAML parser and confirm every referenced path exists.

CI usually cannot dispatch a brand-new workflow manually until it has run once. If the platform requires it, add a temporary branch trigger for the first run and remove it afterwards; say so explicitly rather than leaving it in place.

## Phase F: hand over

Report the design, the local commands for each component, the workflow path, the label and bound, the memory file, and what the first review should look for. Explain that tuning happens by editing the controller, the skill, and the memory file, not by widening scope. Do not push, enable secrets, or open the first pull request unless the user separately authorizes those actions.
