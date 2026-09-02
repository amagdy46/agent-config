# Workflow skeleton

A recurring loop workflow has these stages. The example uses GitHub Actions syntax; map the same stages onto whatever CI the repository uses. Replace every angle-bracket placeholder.

## Stages

1. **Gate.** On scheduled runs, list open pull requests carrying the loop label and exit early when the count meets the bound. Manual dispatch bypasses the gate.
2. **Checkout and setup.** Full history, the repository's runtime and dependency install, cache keyed on the lockfile.
3. **Branch.** Create `<branch-prefix>/<run id>` and configure the CI bot identity.
4. **Sensor.** Run the sensor and write a normalized measurement to a file.
5. **Controller.** Read the measurement and write the selected increment to a file. Delete this step when the agent is the controller.
6. **Actuator.** Assemble the prompt from the template, the controller output, and the memory file, then run the headless agent command and capture its output.
7. **Extract.** Turn the agent output into the pull request body using the agent-specific extraction from `agent-runners.md`.
8. **Publish.** If commits exist, push the branch, create the pull request with the extracted body, and add the label. Upload the raw agent output as an artifact regardless of outcome.

## Shape

```yaml
name: "Agent: <task title>"

on:
  schedule:
    - cron: "<cadence>"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: agent-<task-slug>
  cancel-in-progress: true

jobs:
  loop:
    runs-on: ubuntu-latest
    steps:
      - name: Gate on open pull requests
        id: gate
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          if [ "${{ github.event_name }}" = "schedule" ]; then
            open=$(gh pr list --state open --label "agent-<task-slug>" --json number --jq 'length')
            if [ "$open" -ge <bound> ]; then echo "run=false" >> "$GITHUB_OUTPUT"; exit 0; fi
          fi
          echo "run=true" >> "$GITHUB_OUTPUT"

      - uses: actions/checkout@v5
        if: steps.gate.outputs.run == 'true'
        with:
          fetch-depth: 0

      # <runtime setup, dependency cache, install>

      - name: Branch
        if: steps.gate.outputs.run == 'true'
        run: |
          git checkout -b "<branch-prefix>/$GITHUB_RUN_ID"
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

      - name: Sensor
        if: steps.gate.outputs.run == 'true'
        run: <sensor command> > "$RUNNER_TEMP/sensor.json"

      - name: Controller
        if: steps.gate.outputs.run == 'true'
        run: <controller command> "$RUNNER_TEMP/sensor.json" > "$RUNNER_TEMP/selected.md"

      - name: Actuator
        if: steps.gate.outputs.run == 'true'
        env:
          <PROVIDER_SECRET_NAME>: ${{ secrets.<PROVIDER_SECRET_NAME> }}
        run: |
          # build the prompt from templates.md, the selected work, and the memory file
          # run the headless agent command from agent-runners.md
          # tee output to "$RUNNER_TEMP/agent-output.txt"

      - name: Extract pull request body
        if: steps.gate.outputs.run == 'true'
        run: <agent-specific extraction> > "$RUNNER_TEMP/pr-body.md"

      - name: Publish
        if: steps.gate.outputs.run == 'true'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          if git diff --quiet origin/main...HEAD; then echo "no commits"; exit 0; fi
          git push --set-upstream origin "<branch-prefix>/$GITHUB_RUN_ID"
          gh label create "agent-<task-slug>" --description "Recurring <task title> agent PR" || true
          url=$(gh pr create --title "[$(date +%m/%d)] <task title>" --body-file "$RUNNER_TEMP/pr-body.md")
          gh pr edit "$url" --add-label "agent-<task-slug>"

      - uses: actions/upload-artifact@v4
        if: always() && steps.gate.outputs.run == 'true'
        with:
          name: agent-output
          path: ${{ runner.temp }}/agent-output.txt
```

## Optional feedback command

To let reviewers steer a pull request with a comment command such as `/iterate`, add an `issue_comment` trigger restricted to owners, members, and collaborators, embed a hidden marker naming the workflow in every pull request body, and check the marker before checkout so non-matching workflows exit cheaply. The iteration path checks out the pull request branch, builds a prompt from the pull request body, comments, the feedback, and the memory file, runs the actuator once, pushes to the same branch, and comments with the result. Ask the agent to distill durable feedback back into the memory file.

## Dampener

A separate workflow on pull requests and pushes to the default branch runs the sensor against the merge base and comments only on newly introduced findings. Keep it advisory until the team trusts the signal, then decide whether it should block.
