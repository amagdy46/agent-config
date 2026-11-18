# Failure log

Each rule in these skills is meant to exist because an agent did something
wrong. This file lists, skill by skill, the failure it targets and where you
can check that the failure happened: a commit here, the README, or the
upstream project the skill came from. Where nobody recorded one, the entry
says `inherited` and claims nothing more.

## brainstorm

Stage: Think
For you: find out what you actually want, with research, before any code exists.
Fixes: The agent guessed what I meant and built the wrong thing.
Origin: seen here

Asked for an app, the agent picks a shape on its own and starts building it.
brainstorm asks one question at a time, plays back what it heard, and builds
nothing until you approve the written design. The failure is the first entry
in the README's
[Why these skills](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L177-L179).

Rules with a recorded reason:

- It asks which choices about platform and stack you want to make yourself.
  Upstream, a brainstorm for an iOS app never raised platform, and the agent
  built a web app ([superpowers#2482](https://github.com/obra/superpowers/pull/2482)).
- Nothing is built until you approve the design. Upstream, the agent skipped
  the design document and started building in 24 of 24 test runs before that
  rule, and 3 of 24 after it
  ([superpowers#2571](https://github.com/obra/superpowers/pull/2571),
  [release notes](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/RELEASE-NOTES.md#L70)).
- It runs only for a new project or when you say "brainstorm"; other work
  proceeds without an interview
  ([f5ae5a7](https://github.com/amagdy46/agent-config/commit/f5ae5a7), for the
  reason in [README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L180-L182)).

## grilling

Stage: Think
For you: stress-test a plan in rounds of questions, each with a recommended answer.
Fixes: The agent acted on assumptions it never checked with me.
Origin: seen here

Given a plan, the agent starts on it while questions such as rollback or
ordering were never asked. grilling maps the open decisions as a tree and asks
every question that is ready, each with its recommended answer, round after
round until none are left. The README records the failure together with
brainstorm
([Why these skills](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L177-L179)).

Rules with a recorded reason:

- Each question is worded so "yes" accepts the recommendation. Upstream,
  users had to answer "No, but I agree with the recommendation"
  ([skills#706](https://github.com/mattpocock/skills/issues/706)).
- Facts are the agent's to look up; decisions are yours. Upstream, a grilling
  agent run inside another skill read "explore instead of asking" as licence
  to answer the decisions itself
  ([changelog](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/CHANGELOG.md#L275)).

## research

Stage: Think
For you: answer a question from primary sources, cited and dated.
Fixes: The agent answered from memory or a blog post and gave no source I could check.
Origin: inherited

Adapted from Matt Pocock's `research` and pstack's `how` and `why`. Neither
this repo nor those sources record a case of this going wrong; the skill
carries their method (go to the owner of each fact, cite beside the claim,
report searches that found nothing) without a logged failure behind it.

## prototype

Stage: Think
For you: build a throwaway to answer one design question.
Fixes: A design question was argued in chat for an hour, or a quick spike ended up in production.
Origin: inherited

Adapted from Matt Pocock's `prototype` and pstack's prototype playbook. No
recorded failure was found here or upstream.

## writing-plans

Stage: Plan
For you: turn a design into small tasks with exact files, interfaces and tests.
Fixes: The plan grew into thousands of lines of code and took hours, and nothing got built.
Origin: upstream

In two Superpowers field reports, a 1,894-line spec became a 19,393-line plan,
13,259 lines of it Go code, after more than five hours with no program written
([superpowers#2333](https://github.com/obra/superpowers/pull/2333)). This skill
has the plan record only decisions: files, signatures, test names and
assertions. Its self-review flags a plan longer than the code it describes.

Rules with a recorded reason:

- When you asked for the work itself, it continues into implement instead of
  stopping for a plan review
  ([f5ae5a7](https://github.com/amagdy46/agent-config/commit/f5ae5a7), for the
  reason in [README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L180-L182)).

## to-issues

Stage: Plan
For you: break work into tickets in GitHub, Linear or Markdown, each naming what blocks it.
Fixes: Work landed as one huge ticket, or as layers (all database, then all UI) that could not be tested alone.
Origin: inherited

Adapted from Matt Pocock's `to-tickets`. No recorded failure was found for
the slicing rules themselves.

Rules with a recorded reason:

- It publishes without waiting for approval of the list; asking for issues is
  the go-ahead
  ([f5ae5a7](https://github.com/amagdy46/agent-config/commit/f5ae5a7), for the
  reason in [README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L180-L182)).

## architecture-design

Stage: Plan
For you: design module boundaries, and refactor without changing behaviour.
Fixes: A refactor quietly changed behaviour, or a new design added layers that only passed arguments along.
Origin: inherited

Adapted from Matt Pocock's `codebase-design` and `domain-modeling` and
pstack's `architect` and `arena`. No recorded failure was found.

Rules with a recorded reason:

- It settles design choices itself and states each with its reason, instead
  of asking before every choice
  ([f5ae5a7](https://github.com/amagdy46/agent-config/commit/f5ae5a7), for the
  reason in [README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L180-L182)).

## implement

Stage: Build
For you: execute a plan or tickets to the end, yourself or with subagents.
Fixes: The agent stopped after every step to ask whether it should go on.
Origin: seen here

"Should I do X?" after each task costs more than an occasional wrong call
([README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L180-L182)).
implement keeps going between tasks and stops only for a plan that
contradicts itself, an irreversible step, or three failures on one task. At
the end it lists the calls it made.

Rules with a recorded reason:

- A task's review-and-fix loop stops after three rounds. Upstream, Claude Code
  cut a long skill file after compaction, the round limit was lost, and one
  task ran 18 fix rounds
  ([superpowers#2481](https://github.com/obra/superpowers/issues/2481)).
  [c47e190](https://github.com/amagdy46/agent-config/commit/c47e190) makes the
  validator fail any `SKILL.md` of 20,000 bytes or more for the same reason.
- When you name a ticket, it fetches it and states its title before starting.
  Upstream, `/implement #N` in a fresh session silently worked on the wrong item
  ([skills#700](https://github.com/mattpocock/skills/issues/700)).
- Each subagent starts with a fresh context, never a fork of the session.
  Upstream: some harnesses fork by default, which hands the subagent the
  cluttered context it exists to avoid
  ([skills#1341](https://github.com/mattpocock/skills/pull/1341)).

## orchestrate

Stage: Build
For you: coordinate many implementer and reviewer agents under your standing orders.
Fixes: In long sessions I kept repeating the same reminders: keep agents busy, update the tracker, use this model.
Origin: seen here

[1cd7279](https://github.com/amagdy46/agent-config/commit/1cd7279) records
it: "A long orchestrator session kept needing the same reminders: keep agents
busy, update the tracker, which model does what, continue after stalls."
orchestrate keeps those orders in `preferences.md`, which it reads at the
start of every session and after every compaction, so you say them once.

Rules with a recorded reason:

- Review loops stop at three rounds, for the reason under implement
  ([superpowers#2481](https://github.com/obra/superpowers/issues/2481)).

## test-driven-development

Stage: Build
For you: build each behaviour test-first: watch the test fail, then make it pass.
Fixes: The tests passed, but they would have passed even if the code were wrong.
Origin: upstream

Two upstream reports. An agent counted a compile error ("no method named
`drain_settled`") as its failing test, so the bug it was meant to reproduce
never was ([skills#1210](https://github.com/mattpocock/skills/issues/1210)). A
test whose setup never created the condition it claimed to test stayed green
after the whole implementation was deleted
([superpowers#2092](https://github.com/obra/superpowers/issues/2092)). The
skill says a syntax, fixture or setup error is not a failing test, and judges
each test by whether breaking the behaviour turns it red.

Rules with a recorded reason:

- Each proposed seam (the boundary a test drives) gets one line on what it
  catches and misses, and the agent states its choice instead of asking.
  Upstream, agents asked users to pick a seam with no reasons given
  ([skills#607](https://github.com/mattpocock/skills/issues/607));
  [f5ae5a7](https://github.com/amagdy46/agent-config/commit/f5ae5a7) removed
  the confirmation step here.
- A characterization test, which pins existing behaviour before a refactor,
  may pass first time if it is shown to fail when the behaviour breaks. The
  earlier text told agents to "fix the test" whenever one passed first time,
  which forbade these
  ([d44ee47](https://github.com/amagdy46/agent-config/commit/d44ee47)).

## systematic-debugging

Stage: Build
For you: reproduce, isolate and fix the root cause.
Fixes: The fix made the error go away but left the bug in place.
Origin: seen here

A symptom fix is a retry, a null check or a caught exception that hides
where things first went wrong
([README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L186-L187)).
The skill first builds a command that reproduces the bug, then tests ranked
hypotheses, and fixes the first place the system went wrong. It names
guards, retries, swallowed errors and clamps as ways to hide a bug.

Rules with a recorded reason:

- Without a reproduction, it keeps going from logs, traces and history and
  asks only for the one missing piece. The earlier text said "stop" and "do
  not theorise without a loop", which halted work that the existing evidence
  could carry ([d44ee47](https://github.com/amagdy46/agent-config/commit/d44ee47)).

## frontend-design

Stage: Build
For you: design and check UI that doesn't look like a template.
Fixes: The interface the agent built looked like a generic template.
Origin: inherited

Merged from Taste Skill, Anthropic's `frontend-design` and Vibe Design
Skills. Those sources describe the look they steer away from, but none
records a case, and this repo has none either.

## verification-before-completion

Stage: Check
For you: prove a claim before saying "done".
Fixes: The agent said "done" when it meant "I think it's done".
Origin: seen here

The agent edits code, writes "Fixed!", and has not run the tests or the
feature
([README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L183-L185)).
The skill blocks any success claim without fresh output from this turn:
name the claim, run the command that proves it, read the result, and claim
only what it shows.

Rules with a recorded reason:

- If the project has a `verify-*` skill, use it to drive the real app, so
  verification has a concrete source of proof
  ([9ec9452](https://github.com/amagdy46/agent-config/commit/9ec9452),
  [5087090](https://github.com/amagdy46/agent-config/commit/5087090)).

## create-verification-skill

Stage: Check
For you: write a project's verify skill so agents can prove changes in the real app.
Fixes: Agents had no scripted way to run the app, so "it works" was a guess.
Origin: inherited

Adapted from pstack's `create-verification-skill`.
[9ec9452](https://github.com/amagdy46/agent-config/commit/9ec9452) states its
purpose, a concrete source of proof for verification-before-completion, but
neither it nor pstack records a specific failure.

## code-review

Stage: Check
For you: review a change and trace what it could break beyond its own diff.
Fixes: A change looked fine in its diff and broke something elsewhere.
Origin: seen here

The breaks grep misses: a renamed field another service reads, a changed
default, a job that runs later
([README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L183-L185)).
The skill follows the change across those boundaries and has to prove the
one or two facts it is safe because of, ideally by running code.

Rules with a recorded reason:

- Every blocker comes in one pass with evidence, a re-review checks only the
  fix and answers ADDRESSED or NOT ADDRESSED per finding, and it stops after
  three rounds
  ([5087090](https://github.com/amagdy46/agent-config/commit/5087090),
  "Bound review loops"; the cap's reason is under implement).

## ci-pr-lifecycle

Stage: Check
For you: drive a PR through CI to a finished state; it never merges unasked.
Fixes: Cleaning up after a merge, the agent deleted work that had never been committed.
Origin: upstream

Superpowers' `finishing-a-development-branch`, one of this skill's sources,
already said uncommitted files exist nowhere else. In 24 of 24 test runs the
agent deleted them anyway so it could remove the worktree
([superpowers#2706](https://github.com/obra/superpowers/issues/2706)), and
another user had merges land on shared remote branches
([superpowers#2219](https://github.com/obra/superpowers/issues/2219)). This
skill needs the branch, commits and worktree named and confirmed before
anything is discarded, and never force-removes a worktree. The upstream case
shows a written rule was not enough there; nobody has tested yet whether this
wording does better.

## explain-codebase

Stage: Explain
For you: explain how code works, and why it is shaped that way.
Fixes: The agent explained code from its names and folders, and gave guesses about intent as fact.
Origin: inherited

Adapted from Matt Pocock's `research` and pstack's `how` and `why`. No
recorded failure was found.

## wait-what

Stage: Explain
For you: get the last answer again in plain words.
Fixes: The agent's answer was so dense with jargon that I couldn't follow it.
Origin: upstream

Matt Pocock added it as a "verbosity fire extinguisher" after users reported
models that stayed verbose even with a 400-line concision skill installed
([skills#751](https://github.com/mattpocock/skills/pull/751)). This repo has
no record of its own.

Rules with a recorded reason:

- It no longer fires on "bro" alone. The description listed "bro" as a
  trigger, a word that also turns up in ordinary requests
  ([d44ee47](https://github.com/amagdy46/agent-config/commit/d44ee47)).

## handoff

Stage: Explain
For you: write a handoff between sessions, or resume from one.
Fixes: A new session started cold and redid finished work, or trusted a stale summary.
Origin: inherited

Adapted from Matt Pocock's `handoff`. No recorded failure
was found.

## reflect

Stage: Improve
For you: turn a session's lessons into edits to skills, `AGENTS.md` or enforcement.
Fixes: The agent made the same mistake every session.
Origin: seen here

A correction you gave on Monday is gone by Tuesday
([README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L188-L190)).
reflect reads the session's transcript and turns each lasting lesson into
one small commit to a skill, an `AGENTS.md` or a check that enforces it.

Rules with a recorded reason:

- It finds its own transcript by session id, not by picking the newest file,
  because another session can be running in the same folder
  ([d44ee47](https://github.com/amagdy46/agent-config/commit/d44ee47)).
  pstack's version warns that searching every project's transcripts reads
  private chats from unrelated projects
  ([pstack reflect](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/reflect/SKILL.md)).
- It applies the edits, then shows them with an offer to revert, instead of
  waiting for you to pick rows
  ([d44ee47](https://github.com/amagdy46/agent-config/commit/d44ee47), for the
  reason in [README](https://github.com/amagdy46/agent-config/blob/fc1a4fa/README.md#L180-L182)).

## technical-documentation

Stage: Write
For you: write docs for developers or operators, checked against the real system.
Fixes: The docs described what the code used to do, or guessed at names and flags.
Origin: inherited

Adapted from pstack's `technical-writing`, Technical Writer and Awesome
Copilot. No recorded failure was found.

## unslop

Stage: Write
For you: strip AI tells from prose.
Fixes: The text read as if a model wrote it: filler openings, stock words, a triplet in every sentence.
Origin: inherited

Adapted from pstack's `unslop`. No recorded failure was found.
