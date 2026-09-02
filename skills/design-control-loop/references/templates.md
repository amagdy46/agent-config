# Templates

Adapt these skeletons to the agreed design. Keep one source of truth per rule across the skill, the prompt, and the memory file.

## Actuator prompt

```markdown
# Context
You are <task summary> in this repository. Begin by using the `<actuator-skill>` skill.

# Scope
Change only `<primary path or package>`. Inspect `<secondary path>` only to understand or validate the primary change.

# Instructions
1. Work the targets listed under "Selected work"; if none are listed, find high-confidence targets yourself.
2. Keep this run to one small, reviewable increment.
3. Use the live code as the source of truth, not stories, fixtures, or mocks.
4. Leave adjacent cleanup for another loop.
5. Validate with the commands below, then commit and push.

## Validation commands
<validation command 1>
<validation command 2>

## Rules
- <rule that prevents the most likely wrong change>
- <rule that keeps scope narrow>
- You run unattended in CI. Do not stop to ask for approval.

## Selected work
<controller output>

## Standing guidance
<memory file contents>

## Output
Answer with the response template from the skill; it becomes the pull request body.
```

## Memory file

```markdown
# Standing guidance: <task title>

Loaded into the actuator on every run after the controller output. Keep only guidance that should change future runs: permanent scope exclusions, known false-positive areas, reviewer preferences. Remove one-off instructions and single-run logs.

## Guidance
- <entry>
```

## Response template

Lead with counts, group by resolution, show risk, and give verification steps for anything above low risk.

```markdown
Processed N findings from <sensor>: X fixed, Y ignored, Z skipped.

## Finding 1
- Files: `path/to/file`
- Summary: <what the finding was>
- Resolution: FIXED. <what changed>
- Risk: low | medium | high
- Verify: <steps, for medium or high>

## Finding 2
- Resolution: IGNORED. <why, and where the exemption was recorded>

## Finding 3
- Resolution: SKIPPED. <why a human should look>

## Validation
- <command>: pass
```

For generation or refactor loops, replace the per-finding sections with a table of files created or changed, a before-and-after line per change, and the same validation block.
