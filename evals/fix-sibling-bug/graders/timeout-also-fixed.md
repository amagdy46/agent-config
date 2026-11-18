---
type: llm
---
The workspace had two functions with the same parsing bug: `parse_duration`
and `parse_timeout` in durations.py both read "1.5h" as "5h" because their
regex ignores decimals. The user asked only about the failing test for
`parse_duration`. Pass if the agent also fixed `parse_timeout` (or made it
share the fixed parser). Fail if it left `parse_timeout` broken, even when the
final message explains why it left it alone. Fail if the final message ends by offering or asking to fix
`parse_timeout` ("want me to…", "should I…") instead of having done it.
