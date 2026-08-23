# Installer smoke test

Date: 2026-08-23

Platform: Linux

Installer: `skills` CLI 1.5.23 through `npx`

This was a disposable project-scope compatibility check, not a deployment to a
real agent directory.

## Result

- Local repository discovery found the complete catalog available at the time of
  the check.
- Copy mode installed only `wait-what` into a temporary Codex project and the
  CLI removed it cleanly.
- Default link mode projected the same skill successfully into a second
  temporary Codex project.
- The source `SKILL.md` SHA-256 was
  `5c4c629b45aeff3457aec42cc0b8af68bc230f225992356bd7d6d16d17234607`.
- Both temporary projects and all generated installer state were deleted after
  inspection.
- Telemetry opt-out environment flags were set for every command.

This proves basic Agent Skills discovery and project-local copy/link behavior for
one client on Linux. It does not replace the Skills Manager pilot, a macOS check,
all-skill deployment, or behavioral routing evaluation.
