#!/usr/bin/env bash
set -euo pipefail
cat > store.py <<'PY'
import json
import os

PATH = os.environ.get("USERS_FILE", "users.json")


def load_users():
    with open(PATH) as f:
        return json.load(f)


def save_user(user):
    users = load_users() if os.path.exists(PATH) else []
    users.append(user)
    with open(PATH, "w") as f:
        json.dump(users, f, indent=2)
PY
cat > signup.py <<'PY'
"""Handles the signup form. Called by the web app with the posted fields."""
from store import save_user


def handle_signup(form):
    user = {
        "name": form["name"].strip(),
        "e-mail": form["email"].strip().lower(),
        "plan": form.get("plan", "free"),
    }
    save_user(user)
    return user
PY
cat > import_crm.py <<'PY'
"""One-off import of the old CRM export (done in September)."""
import csv

from store import save_user


def import_csv(path):
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            save_user({"name": row["Name"], "email": row["Email"].lower(), "plan": row["Plan"].lower()})
PY
cat > digest.py <<'PY'
"""Nightly job: send each user their digest."""
from store import load_users


def digest_for(user):
    return f"To: {user['email']}\nHi {user['name']}, here is your {user['plan']} digest."


def main():
    for user in load_users():
        print(digest_for(user))
        print("---")


if __name__ == "__main__":
    main()
PY
cat > users.json <<'JSON'
[
  {"name": "Ana Ruiz", "email": "ana@example.com", "plan": "pro"},
  {"name": "Ben Okafor", "email": "ben@example.com", "plan": "free"},
  {"name": "Chen Wei", "e-mail": "chen@example.com", "plan": "free"},
  {"name": "Dana Levi", "e-mail": "dana@example.com", "plan": "pro"}
]
JSON
cat > README.md <<'MD'
# newsletter

`signup.py` stores new users from the web form, `import_crm.py` imported the
old CRM in September, and `digest.py` runs nightly (`python digest.py`).
Users live in `users.json`.
MD
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add newsletter jobs"
