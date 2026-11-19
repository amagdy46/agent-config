#!/usr/bin/env bash
# One small repo shared by every trigger case, so a prompt about "this PR" or
# "the export job" finds something to point at instead of an empty folder.
# Without it, agents search, find nothing, and answer without any skill.
set -euo pipefail
mkdir -p ledger tests docs web blog
w() { mkdir -p "$(dirname "$1")"; cat > "$1"; }

w README.md <<'EOF'
# Ledger

Ledger is a powerful, seamless and robust solution for household finances.
It leverages cutting-edge technology to empower users.
EOF
w CHANGELOG.md <<'EOF'
## 2.3.0
- Add CSV import for bank statements.
- Fix rounding in monthly totals.
- Drop Python 3.9.
EOF
w HANDOFF.md <<'EOF'
# Handoff
Branch: feature/config-path. parse_config now takes a path. Next: update
callers in ledger/export.py and the tests. Tests in test_parser.py fail.
EOF
w ledger/config.py <<'EOF'
import json

def parse_config(path):
    with open(path) as f:
        return json.load(f)
EOF
w ledger/billing.py <<'EOF'
from ledger.config import parse_config
from ledger.cache import MemoryCache, DiskCache

def monthly_total(bills):
    return round(sum(b["amount"] for b in bills), 2)

def bill_currency(bill):
    return bill["currency"]
EOF
w ledger/export.py <<'EOF'
from ledger.config import parse_config
from ledger.billing import bill_currency

def nightly_export(bills, config_path):
    cfg = parse_config(config_path)
    return [(b["id"], bill_currency(b), b["amount"]) for b in bills if cfg["export"]]
EOF
w ledger/cache.py <<'EOF'
class MemoryCache:
    def __init__(self): self.data = {}
    def get(self, k): return self.data.get(k)

class DiskCache(MemoryCache):
    def __init__(self, path): super().__init__(); self.path = path
EOF
w ledger/routes.py <<'EOF'
from ledger.auth import require_login
ROUTES = {"/": "home", "/bills": "bills", "/login": "login"}
PUBLIC = {"/", "/login"}

def dispatch(path, user):
    if path not in PUBLIC:
        require_login(user)
    return ROUTES[path]
EOF
w ledger/auth.py <<'EOF'
def require_login(user):
    if user is None:
        raise PermissionError("login required")
EOF
w ledger/scheduler.py <<'EOF'
# cron: 0 2 * * * python -m ledger.scheduler
from ledger.export import nightly_export
if __name__ == "__main__":
    nightly_export([], "config.json")
EOF
w ledger/checkout.py <<'EOF'
def add_item(cart, item, quantity):
    cart.append({"item": item, "quantity": quantity})
    return cart
EOF
w tests/test_parser.py <<'EOF'
from ledger.config import parse_config

def test_parse_config():
    assert parse_config({"export": True}) == {"export": True}
EOF
w docs/plan.md <<'EOF'
# Plan: CSV export (approved)
1. Add ledger/csv_export.py with export_csv(bills, path).
2. Add a `ledger export --csv` command.
3. Tests in tests/test_csv_export.py.
EOF
w docs/import-design.md <<'EOF'
# Design: bank statement import
Parse CSV from three banks, map columns, dedupe by (date, amount, payee),
show a review screen before saving. Undo within 24 hours.
EOF
w docs/offline-sync.md <<'EOF'
# Design: offline sync (approved)
Queue writes locally in SQLite, replay on reconnect, last-writer-wins per field.
EOF
w web/settings.html <<'EOF'
<html><body><h1>Settings</h1><form><input name=email><input name=currency>
<input type=checkbox name=dark> Dark mode <button>Save</button></form></body></html>
EOF
w web/signup.html <<'EOF'
<html><body><form id=signup><input name=email><button type=button>Submit</button></form></body></html>
EOF
w blog/post.md <<'EOF'
In today's fast-paced world, managing finances can be a daunting task. Ledger
seamlessly empowers you to unlock the full potential of your budget.
EOF
w PR_DESCRIPTION.md <<'EOF'
This PR seamlessly introduces a robust, powerful path-based configuration
paradigm that leverages best practices to elevate the developer experience.
EOF

git init -q -b main
git -c user.name=eval -c user.email=eval@example.com add -A
git -c user.name=eval -c user.email=eval@example.com commit -qm "Initial ledger"
git checkout -q -b feature/config-path
printf '\ndef load_default():\n    return parse_config("config.json")\n' >> ledger/config.py
git -c user.name=eval -c user.email=eval@example.com commit -qam "Take a path in parse_config"
