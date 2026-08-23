# Teaching workspace format

Every path below is relative to the dedicated course workspace chosen by the user. Never resolve these paths relative to the installed skill.

## Structure

```text
MISSION.md
RESOURCES.md
NOTES.md
assets/
learning-records/
lessons/
reference/
```

Create directories lazily. An empty course does not need placeholder files beyond the agreed mission and initial resources.

## `MISSION.md`

Keep the mission short enough to act as a compass.

```markdown
# Mission: <topic>

## Why
<Concrete real-world reason for learning this.>

## Success looks like
- <Observable ability or result.>

## Baseline
- <What the learner demonstrated, not merely encountered.>
- <Known gaps or misconceptions.>

## Milestones
- [ ] <Intermediate observable result.>

## End condition
<Evidence that ends this course or moves it into maintenance/review.>

## Constraints
- <Time, budget, accessibility, tools, or learning preferences.>

## Out of scope
- <Adjacent subject intentionally deferred.>
```

Use one mission per workspace. When the mission changes, confirm with the user, update this file, and add a learning record that explains the change.

## `RESOURCES.md`

Separate sources of knowledge from places to develop judgment.

```markdown
# <Topic> resources

## Knowledge
- [<title>](<url>)
  <What it covers, why it is trustworthy, and when to use it.>

## Practice and judgment
- <Community, mentor, lab, dataset, or real-world venue>
  <What feedback it can provide and any access or privacy constraint.>

## Gaps
- <Evidence the course still needs.>
```

Prefer a small, annotated set of strong sources. Remove sources shown to be shallow or wrong. Record disagreement and limitations rather than presenting a false consensus.

## `NOTES.md`

Record stable teaching preferences, accessibility needs, scheduling constraints, and workspace-specific cautions. Do not turn it into a session log.

## Lessons and references

- Number lessons sequentially: `lessons/0001-<slug>.html`.
- Keep each lesson self-contained for offline review, while linking shared CSS or scripts from `assets/`.
- Put reusable summaries in `reference/`, not only inside lessons.
- Link lessons and references with relative paths so the workspace remains portable.

The first reusable asset should normally be `assets/course.css`. Before creating a new component, inspect existing assets and reuse one that fits. Modify the workspace copy only; never modify an asset inside the installed skill.

## Learning records

Name records `learning-records/0001-<slug>.md` and increment the highest existing number.

```markdown
# <What was learned or established>

<What the learner demonstrated and why it changes future teaching.>

## Evidence
<The answer, exercise, artifact, or prior experience that supports the claim.>

## Implications
<What this unlocks, rules out, or should be retrieved later.>
```

Use the optional sections only when useful. When later evidence corrects a record, mark the earlier one as superseded by the new record rather than deleting it.

## Privacy and portability

Keep course materials in the chosen workspace. Do not embed credentials, private URLs, or confidential source text into HTML lessons. Link to restricted material when the workspace's privacy model permits it, and summarize only what the user authorized the course to retain.

Do not initialize Git, commit, publish, sync, or open the course through an external service unless the user asks. Opening a local lesson in an available local preview is fine when it does not upload content.
