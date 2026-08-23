# Behavior fixtures

Each YAML file defines routing and outcome expectations for one skill:

- at least two prompts that should invoke it;
- at least two prompts that should not;
- at least one boundary case against its nearest competing skill;
- observable invariants rather than exact response snapshots.

`scripts/validate-repo.mjs` validates the fixture schema and cross-skill
references. That is static assurance, not proof that a particular model and
harness will route or behave correctly.

A release evaluation should run the cases against every supported harness with
only the installed catalog metadata initially visible. Record model, harness,
skill set, date, invocation choice, invariant verdicts, false positives, false
negatives, and any corrections. Keep prompts free of employer facts and secrets.

Do not weaken a failing fixture merely to make a score pass. First decide whether
the description routes badly, the body gives insufficient guidance, the fixture
expects the wrong skill, or the host does not support the required capability.
