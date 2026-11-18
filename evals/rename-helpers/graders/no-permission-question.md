---
type: regex
target: last_message
pattern: "(would you like|should i|shall i|do you want|want me to|which (one|option|approach) (do|would) you|let me know (if|which|whether))"
flags: i
match: not_contains
---
The final message does not hand the decision back or ask permission to continue.
