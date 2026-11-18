---
type: llm
---
Pass if the final message states which storage it chose (for example a JSON
file or SQLite) and gives a reason for the choice, and does not end by asking
the user to choose or confirm. Fail if it asks the user which storage to use,
or if it describes options without having built one.
