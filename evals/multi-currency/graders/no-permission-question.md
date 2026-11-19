---
type: regex
target: last_message
pattern: '(would you like|should (i|we)\b|shall (i|we)\b|do you (want|prefer)|would you prefer|want me to|if you(.d| would)? (like|want|prefer)(\s+(me|it|them|that|this|one|those|either)\b|\s*[.!,)]|\s*$)|\bi can (also )?(add|do|make|change|fix|switch|apply|set up|wire|write)\b|say (if|the word|so)\b|which (one|option|approach) (do|would) you|let me know (if|which|whether|and))[\s\S]{0,300}$'
flags: i
match: not_contains
---
The end of the final message (its last 300 characters) does not hand a
decision back or offer to do more: no "want me to", "should I", "if you'd
like", "say if you want it", "I can add that". Telling the user how to
change something themselves ("set TODO_FILE if you want a different path")
is fine, and so is an offer earlier in the message.
