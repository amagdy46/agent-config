#!/usr/bin/env bash
set -euo pipefail
mkdir -p shop tests
cat > shop/__init__.py <<'PY'
PY
cat > shop/helpers.py <<'PY'
from decimal import Decimal, ROUND_HALF_UP


def to_cents(amount):
    return int((Decimal(str(amount)) * 100).quantize(Decimal("1"), rounding=ROUND_HALF_UP))


def format_price(cents, currency="USD"):
    symbol = {"USD": "$", "EUR": "€", "GBP": "£"}[currency]
    return f"{symbol}{cents // 100}.{cents % 100:02d}"


def apply_discount(cents, percent):
    return cents - (cents * percent) // 100
PY
cat > shop/cart.py <<'PY'
from shop.helpers import apply_discount, format_price, to_cents


class Cart:
    def __init__(self):
        self.items = []

    def add(self, name, price):
        self.items.append((name, to_cents(price)))

    def total(self, discount=0):
        return apply_discount(sum(c for _, c in self.items), discount)

    def receipt(self, discount=0):
        lines = [f"{n}: {format_price(c)}" for n, c in self.items]
        lines.append(f"total: {format_price(self.total(discount))}")
        return "\n".join(lines)
PY
cat > tests/test_cart.py <<'PY'
import unittest

from shop import helpers
from shop.cart import Cart


class CartTest(unittest.TestCase):
    def test_receipt(self):
        cart = Cart()
        cart.add("tea", 3.5)
        cart.add("cake", 2.25)
        self.assertEqual(cart.receipt(discount=10), "tea: $3.50\ncake: $2.25\ntotal: $5.18")

    def test_format_price_euro(self):
        self.assertEqual(helpers.format_price(1999, "EUR"), "€19.99")


if __name__ == "__main__":
    unittest.main()
PY
touch tests/__init__.py
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add shop"
