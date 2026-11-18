---
type: regex
target: last_message
pattern: 'e-mail|signup\.py'
flags: i
match: contains
---
The final message names the cause: `signup.py` writes the key `e-mail`.
The scaffold's README names `signup.py`, so the bare word "signup" is not
enough.
