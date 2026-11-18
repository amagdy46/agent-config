#!/usr/bin/env bash
set -euo pipefail
cat > tags.py <<'PY'
def normalize_tags(raw):
    """'Python, web,python , API' -> ['python', 'web', 'api']: lowercase, no duplicates, first-seen order."""
    return list({t.strip().lower() for t in raw.split(",") if t.strip()})


def tag_line(raw):
    return " ".join(f"#{t}" for t in normalize_tags(raw))
PY
cat > test_tags.py <<'PY'
import unittest

from tags import normalize_tags, tag_line


class TagsTest(unittest.TestCase):
    def test_normalize_dedupes(self):
        self.assertEqual(len(normalize_tags("a, A, b")), 2)

    def test_normalize_keeps_order(self):
        self.assertEqual(normalize_tags("Python, web,python , API"), ["python", "web", "api"])

    def test_tag_line_single(self):
        self.assertEqual(tag_line("News"), "#news")


if __name__ == "__main__":
    unittest.main()
PY
cat > README.md <<'MD'
# tags

Tag helpers for the blog. Tests: `python -m unittest`.
MD
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add tag helpers"
