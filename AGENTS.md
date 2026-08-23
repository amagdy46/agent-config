# Repository Instructions

This is a personal, agent-neutral skills repository. Canonical skills live in
`skills/<name>/SKILL.md` and follow the Agent Skills specification.

## Boundaries

- Keep procedures portable across coding agents.
- Do not add employer-specific names, topology, URLs, commands, credentials,
  incidents, customer information, or business rules.
- Keep host-specific configuration out of canonical `SKILL.md` files.
- Every skill must be independently installable and may reference only files
  inside its own directory.
- Use progressive disclosure: short entrypoint, conditional references.
- Do not copy an upstream skill wholesale. Preserve the useful decisions and
  rewrite the workflow for this repository's scope and authorization model.

## Provenance

Every derived skill needs a `NOTICE.md` listing upstream repository, pinned
commit, consulted paths, license, and whether the source was copied, adapted,
or used as inspiration. Root provenance is recorded in
`provenance.lock.yaml` and `THIRD_PARTY_NOTICES.md`.

## Validation

Every active or pilot skill needs a behavioral fixture under
`tests/behavior/<skill>.yaml` with positive, negative, and overlap cases.
Tests assert decisions and invariants, not exact wording.

Do not commit generated agent-directory projections, manager databases,
machine paths, transcripts, session exports, secrets, or symlinks.
