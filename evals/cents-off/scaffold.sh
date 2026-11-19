#!/usr/bin/env bash
set -euo pipefail
mkdir -p shop tests
cat > README.md <<'MD'
# Shop

Small order tools for the market stall.

- `python report.py orders.csv` prints the day's total.
- `python refunds.py refunds.csv` prints the day's refunds.
- `python -m unittest -q` runs the tests.
MD
: > shop/__init__.py
cat > shop/money.py <<'PY'
"""Money is kept as integer cents."""


def to_cents(amount):
    """Parse a decimal string such as "12.50" into integer cents."""
    return int(float(amount) * 100)


def fmt(cents):
    return f"{cents // 100}.{cents % 100:02d}"
PY
cat > shop/cart.py <<'PY'
from shop.money import to_cents


def line_total(price, qty):
    return to_cents(price) * qty


def order_total(rows):
    return sum(line_total(row["price"], int(row["qty"])) for row in rows)
PY
cat > report.py <<'PY'
"""Daily report: python report.py orders.csv"""
import csv
import sys

from shop.cart import order_total
from shop.money import fmt


def main(path):
    with open(path, newline="") as f:
        rows = list(csv.DictReader(f))
    print(f"Orders: {len(rows)}")
    print(f"Total: {fmt(order_total(rows))}")


if __name__ == "__main__":
    main(sys.argv[1])
PY
cat > refunds.py <<'PY'
"""Daily refunds: python refunds.py refunds.csv"""
import csv
import sys

from shop.money import fmt


def refund_total(rows):
    total = 0
    for row in rows:
        total += int(float(row["amount"]) * 100)
    return total


def main(path):
    with open(path, newline="") as f:
        rows = list(csv.DictReader(f))
    print(f"Refunds: {len(rows)}")
    print(f"Total: {fmt(refund_total(rows))}")


if __name__ == "__main__":
    main(sys.argv[1])
PY
cat > orders.csv <<'CSV'
item,price,qty
mug,19.99,1
mug,19.99,1
mug,19.99,1
card,5.00,1
CSV
cat > refunds.csv <<'CSV'
order,amount
1041,19.99
1043,0.29
1050,4.35
CSV
cat > tests/__init__.py <<'PY'
PY
cat > tests/test_cart.py <<'PY'
import unittest

from shop.cart import line_total, order_total


class CartTest(unittest.TestCase):
    def test_line_total(self):
        self.assertEqual(line_total("2.50", 4), 1000)

    def test_order_total(self):
        rows = [{"price": "10.00", "qty": "2"}, {"price": "2.50", "qty": "1"}]
        self.assertEqual(order_total(rows), 2250)


if __name__ == "__main__":
    unittest.main()
PY
