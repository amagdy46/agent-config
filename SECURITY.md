# Security Policy

Skills are trusted instructions and may include executable helpers. Treat every
upstream update as a supply-chain change.

## Intake rules

- Pin immutable upstream commits.
- Review the entire source folder, including scripts, hooks, hidden files,
  assets, network instructions, and executable permissions.
- Never auto-update or auto-merge upstream changes.
- Reject opaque binaries, telemetry, out-of-tree symlinks, destructive defaults,
  secrets, and instructions that broaden user authorization.
- Test installation and removal with a disposable home/config directory before
  touching real agent folders.
- Keep an exact deployment manifest so uninstall removes only managed paths.

## Private boundaries

Do not store employer-specific facts, session transcripts, credentials,
production evidence, internal URLs, customer data, or machine-specific state in
this repository.
