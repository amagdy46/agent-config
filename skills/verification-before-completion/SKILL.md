---
name: verification-before-completion
description: Gate any claim that work is done, fixed, passing, or ready on fresh evidence. Use right before saying "done", "fixed", or "passing", handing work back, committing, or opening a PR.
license: MIT
---

# Verification Before Completion

No success claim without fresh evidence from this turn. A claim is a status, a satisfied tone ("Done!"), or any wording that implies success; each needs the evidence.

## Gate

1. **Name** the claim.
2. **Pick** the command that proves exactly that claim.
3. **Run** it in full, now, on the final state.
4. **Read** all output, the exit code, and the failure count.
5. **Claim** only what the output shows; otherwise report the observed state and the gap.

"Should work", "probably", and "I'm confident" mean step 3 has not happened.

## Proof matches the claim

| Claim | Proof | Not proof |
|---|---|---|
| Tests pass | full suite output, 0 failures | an earlier run, one file |
| Build succeeds | build exit 0 | linter or type check |
| Bug fixed | original symptom re-run and gone | code changed |
| Regression test works | passes, fails with the fix reverted, passes restored | passed once |
| Requirements met | each requirement checked line by line | tests green |
| Delegated work done | read the diff and run the check yourself | the agent's "success" |

Check the real artifact, not a proxy. Run the feature, read the actual value. When a check fails, suspect your observation method before the system. Prefer a script that re-runs the same comparison to a one-time eyeball, and keep its output.

Report failures from the full run by name, including ones you did not cause. List surfaces left unverified and why.

Run the gate before committing, pushing, opening a PR, or starting the next task.
