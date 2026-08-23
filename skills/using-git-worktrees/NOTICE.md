# Provenance Notice

This skill is an independently rewritten adaptation of ideas from:

- `obra/superpowers` at `b36e0829c6d0140e93cfef2ca599b1b07d4a7797`, MIT License. Consulted `skills/using-git-worktrees/SKILL.md`.
- `mattpocock/skills` at `5b15a47f2d7150f545fbcacbfe381787fc0230dc`, MIT License. Consulted `skills/misc/git-guardrails-claude-code/SKILL.md` for destructive Git-operation boundaries; no host-specific hook was retained.
- `cursor/plugins` pstack at `46125561306434d8a1d7745d540d8932ab0cd2a2`, MIT License. Consulted `pstack/skills/poteto-mode/playbooks/worktree-cleanup.md` and `pstack/skills/poteto-mode/playbooks/opening-a-pr.md`.

No source file was copied wholesale. The workflow prioritizes native isolation, adds a conservative portable Git fallback, preserves dirty user work, and treats creation and cleanup as separately authorized mutations.

## MIT License

Copyright (c) 2025 Jesse Vincent
Copyright (c) 2026 Matt Pocock
Copyright (c) 2026 Lauren Tan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
