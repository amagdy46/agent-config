---
type: tool_used
tool: Write
input_match: 'stats\.py[\s\S]*(==\s*0|!=\s*0|>\s*0|ZeroDivisionError|max\(1|or 1\b|if not total_qty|if total_qty)'
min: 0
max: 0
arm: both
---
Same check as no-guard-edit, for a run that rewrote stats.py whole.
