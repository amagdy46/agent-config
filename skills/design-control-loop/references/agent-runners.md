# Agent runners

Headless invocation shapes for common coding agents. Run the chosen command locally against one controller-selected target before putting it in CI. Broad permission modes belong only on trusted, isolated runners with a scoped provider credential stored as a CI secret. Verify flags against the agent's current documentation; they change.

Every runner should write its full output to one file for the artifact upload, and the extraction step should produce the final assistant message as the pull request body. If extraction fails, fall back to the raw output rather than an empty body.

## Claude Code

Install the CLI in the job, export the provider credential, then:

```bash
claude -p "$PROMPT" --permission-mode bypassPermissions --output-format stream-json --verbose 2>&1 | tee "$OUT"
```

Add `--max-turns` or a spend cap when the repository needs guards. Extraction: filter JSON lines to assistant messages, take the last one, and print its text content.

```bash
grep '^{' "$OUT" | jq -rs '[.[] | select(.type == "assistant" and .message.content)] | last | .message.content[] | select(.type == "text") | .text'
```

## Codex CLI

Install the CLI, log in from the credential in the environment, then:

```bash
codex exec "$PROMPT" --cd "$GITHUB_WORKSPACE" --ask-for-approval never --sandbox danger-full-access --json --output-last-message "$BODY" 2>&1 | tee "$OUT"
```

Extraction is built in through `--output-last-message`.

## OpenCode

Install the CLI, export the provider credential matching the chosen model, then:

```bash
opencode run "$PROMPT" --dir "$GITHUB_WORKSPACE" --model <provider/model> --format json --dangerously-skip-permissions 2>&1 | tee "$OUT"
```

Extraction: select the last assistant message from the JSON output.

```bash
jq -r '.messages | map(select(.role == "assistant")) | last | .content' "$OUT"
```

## Other agents

Any agent with a non-interactive mode fits the same slot. Document its install step, credential name, headless command, and extraction rule in the actuator skill so the loop stays portable across agent changes.
