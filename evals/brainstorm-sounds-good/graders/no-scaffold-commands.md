---
type: tool_used
tool: Bash
input_match: '\b(npm|npx|pnpm|yarn|bun|pip|uv|cargo|flutter|vite|create-)\b|mkdir\s[^"\\;&|]*\b(src|app|lib|public|components|pages)\b'
min: 0
max: 0
arm: both
---
No project scaffolding or dependency install. Making a folder for a design
note (`mkdir -p docs`) is fine.
