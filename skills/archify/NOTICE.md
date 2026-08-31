# Provenance Notice

This skill is vendored verbatim from upstream. Unlike this repository's
rewritten prose skills, Archify is an executable rendering and validation
package; it is copied as-shipped and pinned rather than adapted, with this
`NOTICE.md` as the only addition.

## Source

- tt-a1i, [`tt-a1i/archify`](https://github.com/tt-a1i/archify), commit
  `2bfb47132c057195d8dddb3e25ae966dd7c7a72e` (v2.16.0), subpath `archify/`
  (the Agent Skills package). MIT License. Reuse type: copied.
- Based on Cocoon-AI/architecture-diagram-generator (MIT, v1.0), per upstream
  attribution.

## Updating

Re-vendor from a newer pinned upstream commit wholesale; do not hand-edit
renderer or validator code in place. The upstream `test/` directory is
omitted from this vendored copy (repository hygiene checks); run upstream
tests from a fresh clone when re-vendoring. The packaged update checker
(`scripts/check-update.mjs`) only reports; it never installs.

## MIT License

Copyright (c) 2026 tt-a1i (Archify)
Copyright (c) 2025 Cocoon AI (original "architecture-diagram-generator")

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
