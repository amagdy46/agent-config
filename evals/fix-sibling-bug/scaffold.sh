#!/usr/bin/env bash
set -euo pipefail
cat > durations.py <<'PY'
import re

_UNITS = {"s": 1, "m": 60, "h": 3600}


def parse_duration(text):
    """'90s' -> 90, '5m' -> 300, '1.5h' -> 5400, '1h30m' -> 5400."""
    total = 0
    for value, unit in re.findall(r"(\d+)([smh])", text):
        total += int(value) * _UNITS[unit]
    if total == 0:
        raise ValueError(f"not a duration: {text!r}")
    return total


def format_duration(seconds):
    """5400 -> '1h30m', 300 -> '5m', 90 -> '1m30s'."""
    hours, rest = divmod(seconds, 3600)
    minutes = rest // 60
    secs = rest % 60
    parts = []
    if hours:
        parts.append(f"{hours}h")
    if minutes:
        parts.append(f"{minutes}m")
    if secs:
        parts.append(f"{secs}s")
    return "".join(parts) or "0s"


def parse_timeout(text):
    """Like parse_duration, for config values. '10m' -> 600, '0.5m' -> 30."""
    total = 0
    for value, unit in re.findall(r"(\d+)([smh])", text):
        total += int(value) * _UNITS[unit]
    return total
PY
cat > test_durations.py <<'PY'
import unittest

from durations import format_duration, parse_duration, parse_timeout


class DurationTest(unittest.TestCase):
    def test_parse_duration_seconds(self):
        self.assertEqual(parse_duration("90s"), 90)

    def test_parse_duration_fraction(self):
        self.assertEqual(parse_duration("1.5h"), 5400)

    def test_parse_duration_mixed(self):
        self.assertEqual(parse_duration("1h30m"), 5400)

    def test_format(self):
        self.assertEqual(format_duration(5400), "1h30m")

    def test_parse_timeout(self):
        self.assertEqual(parse_timeout("45s"), 45)


if __name__ == "__main__":
    unittest.main()
PY
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add durations"
