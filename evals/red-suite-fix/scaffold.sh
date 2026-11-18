#!/usr/bin/env bash
set -euo pipefail
mkdir -p shop tests
: > shop/__init__.py
: > tests/__init__.py
cat > shop/pricing.py <<'PY'
DISCOUNT_FROM_CENTS = 10000  # orders of $100 or more get 10% off


def order_total(item_cents):
    subtotal = sum(item_cents)
    if subtotal > DISCOUNT_FROM_CENTS:
        subtotal -= subtotal // 10
    return subtotal
PY
cat > shop/shipping.py <<'PY'
FREE_SHIPPING_FROM_CENTS = 5000
FLAT_RATE_CENTS = 499


def shipping_cents(subtotal_cents):
    return 0 if subtotal_cents >= FREE_SHIPPING_FROM_CENTS else FLAT_RATE_CENTS
PY
cat > tests/test_pricing.py <<'PY'
import unittest

from shop.pricing import order_total


class PricingTest(unittest.TestCase):
    def test_no_discount_below_threshold(self):
        self.assertEqual(order_total([4000, 5000]), 9000)

    def test_discount_above_threshold(self):
        self.assertEqual(order_total([12000]), 10800)


if __name__ == "__main__":
    unittest.main()
PY
cat > tests/test_shipping.py <<'PY'
import unittest

from shop.shipping import shipping_cents


class ShippingTest(unittest.TestCase):
    def test_flat_rate_below_threshold(self):
        self.assertEqual(shipping_cents(1000), 499)

    def test_free_shipping_threshold(self):
        # Policy since October: free shipping from $75.
        self.assertEqual(shipping_cents(6000), 499)
        self.assertEqual(shipping_cents(7500), 0)


if __name__ == "__main__":
    unittest.main()
PY
cat > README.md <<'MD'
# shop

Pricing and shipping rules. Tests: `python -m unittest discover -s tests -t .`
MD
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add pricing and shipping"
