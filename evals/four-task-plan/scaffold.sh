#!/usr/bin/env bash
set -euo pipefail
cat > units.py <<'PY'
"""Unit converter. Usage: python units.py 5 kg lb"""
import sys

FACTORS = {
    ("kg", "lb"): 2.20462,
    ("lb", "kg"): 1 / 2.20462,
    ("m", "ft"): 3.28084,
    ("ft", "m"): 1 / 3.28084,
}


def convert(value, src, dst):
    return value * FACTORS[(src, dst)]


def main(argv):
    value, src, dst = float(argv[0]), argv[1], argv[2]
    print(f"{convert(value, src, dst):.2f} {dst}")


if __name__ == "__main__":
    main(sys.argv[1:])
PY
cat > test_units.py <<'PY'
import unittest

from units import convert


class ConvertTest(unittest.TestCase):
    def test_kg_to_lb(self):
        self.assertAlmostEqual(convert(1, "kg", "lb"), 2.20462)

    def test_round_trip(self):
        self.assertAlmostEqual(convert(convert(3, "m", "ft"), "ft", "m"), 3)


if __name__ == "__main__":
    unittest.main()
PY
cat > PLAN.md <<'MD'
# Plan: units.py v2

Approved 2026-11-17. Four independent tasks; do them in order, with a test
for each. Run `python -m unittest` after each task.

- [ ] **1. Kilometres and miles.** Add `km`/`mi` both ways to `FACTORS`
  (1 mi = 1.609344 km). Test: `convert(1, "mi", "km") == 1.609344`.
- [ ] **2. Precision flag.** `python units.py 5 kg lb --precision 4` prints
  4 decimals; the default stays 2. Test the formatting through a
  `format_result(value, unit, precision=2)` function that `main` uses.
- [ ] **3. Unknown units.** An unknown pair prints `unknown conversion: X -> Y`
  to stderr and exits with status 2 instead of a KeyError traceback. Test
  that `main` raises `SystemExit` with code 2.
- [ ] **4. List command.** `python units.py list` prints every supported
  pair, one per line, as `kg -> lb`, sorted. Test through a
  `list_pairs()` function that returns the lines.

Tick each box when its task is done.
MD
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add units converter and plan"
