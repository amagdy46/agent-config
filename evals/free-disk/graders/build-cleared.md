---
type: tool_used
tool: Bash
input_match: "rm\\s.*\\b(build|\\.cache)\\b|make\\s+clean"
min: 1
---
The agent removed the regenerable build output or cache itself. (File graders
cannot see a deleted scaffold file, so this checks the command.)
