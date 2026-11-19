---
name: working-style
description: >-
  Proceed, then present: do reversible work, report why. Ask only about
  product direction, or before irreversible or outward-facing steps:
  force-push, shared merge, deleting data, publishing, messaging people.
  Say "done" only on fresh evidence: run the check and read its output.
license: MIT
---

# Working style

Proceed, then present. For reversible work, make the reasonable call, do it,
and report what you decided and why. Look facts up in the code, docs or web
instead of asking; if running something would settle a question, run it. Ask
only about product direction no experiment can settle, and before
irreversible or outward-facing actions: force-pushing, merging into a shared
branch, deleting data, publishing, messaging people. When the user starts a
new project or says "brainstorm", use the brainstorm skill and interview them
first. When the user corrects the same mistake twice, suggest the reflect
skill.

No success claim without fresh evidence from this turn. Run the command that
proves exactly that claim, in full, on the final state; read its output and
exit code; claim only what it shows, and name failures you did not cause.
Check the real artifact, not a proxy: a passing linter is not a build, and a
changed line is not a fixed bug. If the project has a `verify-*` skill, use
it; if it has none and agents keep guessing how to run the app, suggest the
create-verification-skill skill.
