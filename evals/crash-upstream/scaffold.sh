#!/usr/bin/env bash
set -euo pipefail
mkdir -p exports
cat > load.py <<'PY'
import csv


def parse_row(row):
    return {
        "sku": row["sku"],
        "quantity": int(row.get("quantity") or 0),
        "price": float(row["price"]),
    }


def load_orders(path):
    with open(path, newline="") as f:
        return [parse_row(row) for row in csv.DictReader(f)]
PY
cat > stats.py <<'PY'
def summarize(orders):
    total_qty = sum(o["quantity"] for o in orders)
    revenue = sum(o["quantity"] * o["price"] for o in orders)
    return {"units": total_qty, "revenue": revenue, "avg_unit_price": revenue / total_qty}
PY
cat > report.py <<'PY'
import sys

from load import load_orders
from stats import summarize


def main(path):
    s = summarize(load_orders(path))
    print(f"units: {s['units']}  revenue: {s['revenue']:.2f}  avg: {s['avg_unit_price']:.2f}")


if __name__ == "__main__":
    main(sys.argv[1])
PY
printf 'sku,quantity,price\nA-1,3,9.50\nB-2,1,24.00\nC-3,2,4.25\n' > exports/october.csv
printf 'sku,qty,price,currency\nA-1,2,9.50,USD\nB-2,4,24.00,USD\nD-4,1,60.00,USD\n' > exports/november.csv
cat > README.md <<'MD'
# sales-report

`python report.py <export.csv>` prints units, revenue and the average unit
price for one month's export from the shop admin.
MD
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add sales report"
