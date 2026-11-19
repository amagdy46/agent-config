---
type: tool_used
tool: Edit
input_match: 'stats\.py[\s\S]*new_string[\s\S]*(==\s*0|!=\s*0|>\s*0|ZeroDivisionError|max\(1|or 1\b|if not total_qty|if total_qty)'
min: 0
max: 0
arm: both
---
No zero guard was added at the crash site in stats.py. A guard there makes
the error go away and reports 0 units for a month that sold 7.
