# Failure log

Each rule in these skills is meant to exist because an agent did something
wrong. This file lists, skill by skill, the failure it targets and where that
failure is recorded. `Origin` says how strong the record is:

- `seen here`: the maintainer hit it in his own sessions. Unless the entry
  cites a commit, the only record is his own account in the README's "Why
  these skills" list; nothing was logged at the time.
- `upstream`: the project the skill was adapted from documents an incident,
  and the entry links it.
- `inherited`: the skill came from upstream and nobody recorded a failure.
  The entry claims nothing more.

## brainstorm

Stage: Think
For you: find out what you actually want, with research, before any code exists.
Fixes: The agent guessed what I meant and built the wrong thing.
Origin: seen here

The maintainer's account, first in the README's
[Why these skills](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L177-L179):
the agent "guessed at what I meant instead of asking". brainstorm asks one
question at a time, plays back what it heard, and builds nothing until you
approve the written design.

Rules with a recorded reason:

- It asks which choices about platform and stack you want to make yourself.
  Upstream, a brainstorm for an iOS app never raised platform, and the agent
  built a web app ([superpowers#2482](https://github.com/obra/superpowers/pull/2482)).
- Nothing is built until you approve the design. Upstream, the agent skipped
  the design document and started building in 24 of 24 test runs before that
  rule, and 3 of 24 after it
  ([superpowers#2571](https://github.com/obra/superpowers/pull/2571),
  [release notes](https://github.com/obra/superpowers/blob/22f0b463e7a5e579904dd6211a520321035526f7/RELEASE-NOTES.md?plain=1#L70)).
- It runs only for a new project or when you say "brainstorm"; other work
  proceeds without an interview
  ([f5ae5a7](https://github.com/amagdy46/skills/commit/f5ae5a7), for the
  reason in [README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L180-L182)).
- It converges by running `grilling`, not a copy of its rounds, so the two
  cannot drift apart ([CONTRIBUTING.md](CONTRIBUTING.md): one job, one
  skill). Rerun on Sonnet after that change: `brainstorm-opening` still
  passes 3/3 with the skill and 0/3 without.

## grilling

Stage: Think
For you: stress-test a plan in rounds of questions, each with a recommended answer.
Fixes: The agent acted on assumptions it never checked with me.
Origin: seen here

The README gives this together with brainstorm, as the maintainer's account:
the agent guessed instead of asking
([Why these skills](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L177-L179)).
grilling maps the open decisions as a tree and asks, each round, the three
that matter most among those that are ready, each with its recommended
answer. It lists the rest as defaults you can overturn, and goes on round
after round until none are left.

Rules with a recorded reason:

- Each question is worded so "yes" accepts the recommendation. Upstream, a
  user who agreed with the recommendation still had to answer "no"
  ([skills#706](https://github.com/mattpocock/skills/issues/706)).
- Facts are the agent's to look up; decisions are yours. Upstream, a grilling
  agent run inside another skill read "explore instead of asking" as licence
  to answer the decisions itself
  ([changelog](https://github.com/mattpocock/skills/blob/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/CHANGELOG.md?plain=1#L275)).
- A round asks at most three questions, one decision each, and states the
  agent's own choice for the rest. Upstream, users complained of question
  floods: "Codex just asked me 200 questions"
  ([skills#44](https://github.com/mattpocock/skills/issues/44)) and "getting
  10+ questions at once is unbearable"
  ([skills#831](https://github.com/mattpocock/skills/issues/831)). Measured
  here (`grill-migration`, Sonnet, 3 runs per arm) before the cap: without
  the skill, 7 to 11 numbered questions and 27 to 41 question marks in one
  reply; with the skill, 4 to 6 questions, but each carried sub-questions,
  for 10 to 17 question marks. After the cap: 3 questions in every run and
  5 to 7 question marks, the rest stated as defaults
  ([RESULTS.md](evals/RESULTS.md#question-cap-grilling-sonnet)).

## research

Stage: Think
For you: answer a question from primary sources, cited and dated.
Fixes: The agent answered from memory or a blog post and gave no source I could check.
Origin: inherited

Adapted from Matt Pocock's `research` and pstack's `how` and `why`. No
recorded failure was found; the skill carries their method: go to the owner
of each fact, cite beside the claim, report searches that found nothing.

## writing-plans

Stage: Plan
For you: turn a design into small tasks with exact files, interfaces and tests.
Fixes: The plan grew into thousands of lines of code and took hours, and nothing got built.
Origin: upstream

In one of two Superpowers field reports, a 1,894-line spec became a 19,393-line plan,
13,259 lines of it Go code, after more than five hours with no program written
([superpowers#2333](https://github.com/obra/superpowers/pull/2333)). This skill
has the plan record only decisions: files, signatures, test names and
assertions. Its self-review flags a plan longer than the code it describes.

Rules with a recorded reason:

- When you asked for the work itself, it continues into implement instead of
  stopping for a plan review
  ([f5ae5a7](https://github.com/amagdy46/skills/commit/f5ae5a7), for the
  reason in [README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L180-L182)).

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
  ([f5ae5a7](https://github.com/amagdy46/skills/commit/f5ae5a7), for the
  reason in [README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L180-L182)).

## implement

Stage: Build
For you: execute a plan or tickets to the end, yourself or with subagents.
Fixes: The agent stopped after every step to ask whether it should go on.
Origin: seen here

The maintainer's account in the
[README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L180-L182):
"Should I do X?" after every step wastes more time than an occasional wrong
call.
implement keeps going between tasks and stops only for a plan that
contradicts itself, an irreversible step, or three failures on one task. At
the end it lists the calls it made.

Rules with a recorded reason:

- A task's review-and-fix loop stops after three rounds. Upstream, Claude Code
  cut a long skill file when it summarised the session to save space
  (compaction), the round limit was lost, and one task ran 18 fix rounds
  ([superpowers#2481](https://github.com/obra/superpowers/issues/2481)).
  [c47e190](https://github.com/amagdy46/skills/commit/c47e190) makes the
  validator fail any `SKILL.md` of 20,000 bytes or more for the same reason.
- When you name a ticket, it fetches it and states its title before starting.
  Upstream, `/implement #N` in a fresh session silently worked on the wrong item
  ([skills#700](https://github.com/mattpocock/skills/issues/700)).
- Each helper agent starts with a fresh context, never a copy of the whole
  conversation. Upstream: some agent tools copy it by default, which hands
  the helper the clutter it exists to avoid
  ([skills#1341](https://github.com/mattpocock/skills/pull/1341)).

## working-style

Stage: Build
For you: let the agent decide and do reversible work, and ask you only before steps it cannot undo.
Fixes: The agent stopped to ask "should I…?" about work it could have done and reported.
Origin: seen here

The maintainer's account in the
[README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L180-L182):
"Should I do X?" after every step wastes more time than an occasional wrong
call. Until this skill, the rule lived only in `global/AGENTS.md`, which no
installer copies, so most installs never got it. The description carries
the rule because every host lists skill descriptions at session start.

Measured with `evals/` on 2026-11-18: no clear difference on Haiku,
Sonnet or Opus. A first suite had Opus with no plugin fully pass
`fix-sibling-bug` in 1 of 7 runs, offering to fix the second bug instead of
fixing it; with fixed graders that did not repeat (2 of 3 without the
skill, 3 of 3 with it, within noise). Trailing offers appear with and
without the skill. In the two cases where the agent should hold back
(deleting untracked recordings, running a release), it held back in every
run. Details: [evals/RESULTS.md](evals/RESULTS.md).

It also carries the rule that was the `verification-before-completion`
skill until 2026-11-19: no success claim without fresh output from this
turn. The maintainer's account in the
[README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L183-L185):
"done" meant "I think it's done". As its own skill the body loaded in 0 of
33 eval runs, so only its description did any work; the rule now sits in
this description, which every host lists at session start.

Rules with a recorded reason:

- If the project has a `verify-*` skill (its recipe for running the real
  app), use it, so verification has a concrete source of proof
  ([9ec9452](https://github.com/amagdy46/skills/commit/9ec9452),
  [5087090](https://github.com/amagdy46/skills/commit/5087090)).

## orchestrate

Stage: Build
For you: coordinate many implementer and reviewer agents under your standing orders.
Fixes: In long sessions I kept repeating the same reminders: keep agents busy, update the tracker, use this model.
Origin: seen here

[1cd7279](https://github.com/amagdy46/skills/commit/1cd7279) records
it: "A long orchestrator session kept needing the same reminders: keep agents
busy, update the tracker, which model does what, continue after stalls."
orchestrate keeps those orders in a standing-orders file it reads at the
start of every session and after every compaction, so you say them once.

Rules with a recorded reason:

- Review loops stop at three rounds, for the reason under implement
  ([superpowers#2481](https://github.com/obra/superpowers/issues/2481)).

## test-driven-development

Stage: Build
For you: build each behaviour test-first: watch the test fail, then make it pass.
Fixes: The tests passed, but they would have passed even if the code were wrong.
Origin: upstream

Upstream, an agent counted a compile error ("no method named
`drain_settled`") as its failing test, so the bug it was meant to reproduce
never was ([skills#1210](https://github.com/mattpocock/skills/issues/1210)), and a
test whose setup never created the condition it claimed to test stayed green
after the whole implementation was deleted
([superpowers#2092](https://github.com/obra/superpowers/issues/2092)). The
skill says a syntax or test-setup error is not a failing test, and judges
each test by whether breaking the behaviour turns it red.

Rules with a recorded reason:

- Each proposed seam (the boundary a test drives) gets one line on what it
  catches and misses, and the agent states its choice instead of asking.
  Upstream, agents asked users to pick a seam with no reasons given
  ([skills#607](https://github.com/mattpocock/skills/issues/607));
  [f5ae5a7](https://github.com/amagdy46/skills/commit/f5ae5a7) removed
  the confirmation step here.
- A characterization test, which pins existing behaviour before a refactor,
  may pass first time if it is shown to fail when the behaviour breaks. The
  earlier text told agents to "fix the test" whenever one passed first time,
  which forbade these
  ([d44ee47](https://github.com/amagdy46/skills/commit/d44ee47)).

## systematic-debugging

Stage: Build
For you: reproduce, isolate and fix the root cause.
Fixes: The fix made the error go away but left the bug in place.
Origin: seen here

The maintainer's account in the
[README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L186-L187):
fixes treated the symptom. The skill first builds a command that reproduces the bug, then tests ranked
hypotheses, and fixes the first place the system went wrong. It names
guards, retries, swallowed errors and clamps as ways to hide a bug.

Rules with a recorded reason:

- Without a reproduction, it keeps going from logs, traces and history and
  asks only for the one missing piece. The earlier text said "stop" and "do
  not theorise without a loop", which halted work that the existing evidence
  could carry ([d44ee47](https://github.com/amagdy46/skills/commit/d44ee47)).

## create-verification-skill

Stage: Check
For you: write a project's verify skill so agents can prove changes in the real app.
Fixes: Agents had no scripted way to run the app, so "it works" was a guess.
Origin: inherited

Adapted from pstack's `create-verification-skill`.
[9ec9452](https://github.com/amagdy46/skills/commit/9ec9452) states its
purpose, a concrete source of proof for the rule in working-style that "done" needs fresh evidence, but
neither it nor pstack records a specific failure.

## impact-review

Stage: Check
For you: review a change and trace what it could break beyond its own diff.
Fixes: A change looked fine in its diff and broke something elsewhere.
Origin: seen here

The maintainer's account in the
[README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L183-L185)
is one clause: a change can break things beyond its own diff. The skill
follows the change to where a text search does not reach (a renamed field
another service reads, a changed default, a job that runs later) and has to
prove the one or two facts it is safe because of, ideally by running code.

Rules with a recorded reason:

- Every blocker comes in one pass with evidence, a re-review checks only the
  fix and answers ADDRESSED or NOT ADDRESSED per finding, and it stops after
  three rounds
  ([5087090](https://github.com/amagdy46/skills/commit/5087090),
  "Bound review loops"; the cap's reason is under implement).

## ci-pr-lifecycle

Stage: Check
For you: drive a PR through CI to a finished state; it never merges unasked.
Fixes: Cleaning up after a merge, the agent deleted work that had never been committed.
Origin: upstream

Superpowers' `finishing-a-development-branch`, one of this skill's sources,
already said uncommitted files exist nowhere else. In 24 of 24 test runs the
agent deleted them anyway so it could remove the worktree, a second working
copy of the repository
([superpowers#2706](https://github.com/obra/superpowers/issues/2706)), and
another user had merges land on shared remote branches
([superpowers#2219](https://github.com/obra/superpowers/issues/2219)). This
skill needs the branch, commits and worktree named and confirmed before
anything is discarded, and never force-removes a worktree; the upstream case
shows a written rule was not enough there, and nobody has tested yet whether
this wording does better.

## wait-what

Stage: Explain
For you: get the last answer again in plain words.
Fixes: The agent's answer was so dense with jargon that I couldn't follow it.
Origin: upstream

Matt Pocock added it as a "verbosity fire extinguisher" after a user reported
a model that stayed verbose even with a 400-line concision skill installed
([skills#751](https://github.com/mattpocock/skills/pull/751)). This repo has
no record of its own.

Rules with a recorded reason:

- It no longer fires on "bro" alone. The description listed "bro" as a
  trigger, a word that also turns up in ordinary requests
  ([d44ee47](https://github.com/amagdy46/skills/commit/d44ee47)).

## reflect

Stage: Improve
For you: turn a session's lessons into edits to skills, `AGENTS.md` or enforcement.
Fixes: The agent made the same mistake every session.
Origin: seen here

The maintainer's account in the
[README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L188-L190):
the same mistake, every session. reflect reads the session's transcript and
turns each lasting lesson into one small edit to a skill, an `AGENTS.md` or a
check that enforces it.

Rules with a recorded reason:

- It finds its own transcript by session id, not by picking the newest file,
  because another session can be running in the same folder
  ([d44ee47](https://github.com/amagdy46/skills/commit/d44ee47)).
  pstack's version warns that searching every project's transcripts reads
  private chats from unrelated projects
  ([pstack reflect](https://github.com/cursor/plugins/blob/2776ddd2355d6d6c8747d3964600f28daf62f049/pstack/skills/reflect/SKILL.md)).
- It applies the edits, then shows them with an offer to revert, instead of
  waiting for you to pick rows
  ([d44ee47](https://github.com/amagdy46/skills/commit/d44ee47), for the
  reason in [README](https://github.com/amagdy46/skills/blob/fc1a4fa/README.md?plain=1#L180-L182)).

## unslop

Stage: Write
For you: strip AI tells from prose.
Fixes: The text read as if a model wrote it: filler openings, stock words, a triplet in every sentence.
Origin: inherited

Adapted from pstack's `unslop`. No recorded failure was found.
