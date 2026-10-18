---
name: brainstorm
description: Think a new project through with the user before anything is built. Interview them for intent, research in the background, converge on a direction, and write the design. Use for "brainstorm", "let's brainstorm", "new project", or starting a product from scratch.
license: MIT
---

# Brainstorm

You build what you believe the user wants, and that belief is usually thinner
than it feels. This skill finds out what they actually want, and why, before
anything gets built. When you understand the why, you make the hundred
unmentioned decisions the way they would.

This is the deliberate exception to proceed-then-present: it runs when the
user starts something new or asks to brainstorm. Ordinary tasks skip it.

## 1. Explore: get them describing

Open with one line saying they can skip the questions and have you start, then
one open question about a concrete moment: "What's the moment you wish this
existed?", "Walk me through the last time this hurt."

- End each message with **one question**: a single sentence, no menu of
  sample answers. Their own words carry intent your options cannot. Offer a
  short menu only when they are stuck; when they say "just guess", propose
  something concrete.
- A guess they can correct ("I'm guessing X keeps biting you?") often beats a
  question.
- Territory to cover, never read out as a script: what this is and what makes
  it special, why now, what success looks like, goals, non-goals,
  **anti-goals** (what would make it a failure even if it works), prior art
  they loved or hated, what exists today, and which how-it-gets-made choices
  (stack, platform, tools) they want to make versus hand to you.
- Think wide privately: generate several directions, drop the ones that fight
  their why, and show a comparison only when it helps them choose.

## 2. Research while you talk

Facts are your job; decisions are theirs. The moment a question depends on a
fact you could look up (the codebase, their files, docs, the web, prior art,
competitors), dispatch a background subagent for it using the research skill's
method, and keep talking. Only the questions downstream of a running lookup
wait for it. Bring back the two or three findings that change the
conversation and offer the rest. Without subagents, look it up inline between
questions.

When a quick throwaway build would answer a question faster than talking,
offer a spike with the prototype skill. Bring what it taught you back here.

## 3. Play it back

As soon as you understand one part (who it serves, how one piece behaves),
describe it back in 150 to 300 words, then return to questions about the next
part. Mark your guesses as guesses; only what they said goes in as theirs.
End each playback by asking what is wrong or missing.

## 4. Converge

When exploring stops producing surprises, switch to grilling rounds: map the
open decisions as a tree, ask the whole **frontier** (every decision whose
prerequisites are settled) as numbered questions, each with your recommended
answer, worded so "yes" accepts it. Recompute after each round. You are done
when the frontier is empty and nothing material is silently assumed.

## 5. Size it and write it down

Say the size out loud; they can override it.

| Size | Agreement lives in | Next |
|---|---|---|
| Small change | chat | build it |
| Project | `design.md` | writing-plans skill |
| Several projects, or too big for one session | `design.md` with a decision map | one project at a time |

For a project, write `design.md` in the planning folder (see
[design-template.md](design-template.md)) so a capable builder could plan
from it without talking to the user. Then run the builder check in that file
and bring back only the questions that are theirs, in one message.

**Gate:** nothing is built until the user approves the full description, in
chat for a small change or the document for a project. "Sounds good" to an
idea approves only what you showed them. Building includes scaffolding,
installing dependencies and invoking an implementation skill; reading and
researching are fine. A spike they agreed to may be built and stays
throwaway.

After approval of a project, hand off to the writing-plans skill.
