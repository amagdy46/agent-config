---
type: tool_used
tool: Bash
input_match: '(command":"\s*|[;&|(]\s*|\\n\s*)(make(?!\s+lint)\b|(gcc|cc|clang)\s)'
min: 1
---
The agent ran the build (`make`, `make dusk` or the compiler), not only
`make lint`.
