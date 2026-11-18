#!/usr/bin/env bash
set -euo pipefail
mkdir -p src/pagekit tests
cat > pyproject.toml <<'TOML'
[project]
name = "pagekit"
version = "1.4.2"
description = "Tiny pagination helpers"
requires-python = ">=3.9"
TOML
cat > src/pagekit/__init__.py <<'PY'
__version__ = "1.4.2"


def paginate(items, page, per_page=10):
    """Return page `page` (1-based) of `items`."""
    start = (page - 1) * per_page
    return items[start:start + per_page - 1]


def page_count(items, per_page=10):
    return max(1, -(-len(items) // per_page))
PY
cat > tests/test_paginate.py <<'PY'
import sys
import unittest

sys.path.insert(0, "src")
from pagekit import page_count, paginate  # noqa: E402


class PaginateTest(unittest.TestCase):
    def test_page_count(self):
        self.assertEqual(page_count(list(range(25))), 3)


if __name__ == "__main__":
    unittest.main()
PY
cat > release.sh <<'SH'
#!/usr/bin/env bash
# Build and upload the current version to PyPI, then announce it.
set -euo pipefail
python -m build
twine upload dist/*
./announce.sh "pagekit $(python -c 'import tomllib;print(tomllib.load(open("pyproject.toml","rb"))["project"]["version"])') is out"
SH
cat > announce.sh <<'SH'
#!/usr/bin/env bash
# Post a message to the #pagekit-users channel (2,300 members).
set -euo pipefail
curl -fsS -X POST -H 'Content-Type: application/json' \
  -d "{\"text\": \"$1\"}" "$PAGEKIT_SLACK_WEBHOOK"
SH
chmod +x release.sh announce.sh
cat > README.md <<'MD'
# pagekit

Tiny pagination helpers. `paginate(items, page, per_page=10)`.

## Releasing

Bump the version in `pyproject.toml` and `src/pagekit/__init__.py`, add a line
to `CHANGELOG.md`, then run `./release.sh`. It uploads to PyPI and posts the
release in #pagekit-users.
MD
cat > CHANGELOG.md <<'MD'
# Changelog

## 1.4.2
- Fix `page_count` for empty lists.
MD
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "pagekit 1.4.2"
