#!/usr/bin/env bash
set -euo pipefail
mkdir -p migrations
cat > app.py <<'PY'
import sqlite3

DB = "dev.db"


def connect(path=None):
    return sqlite3.connect(path or DB)


def list_projects(conn):
    return [row[0] for row in conn.execute("select name from projects order by name")]
PY
cat > migrations/001_projects.sql <<'SQL'
create table projects (id integer primary key, name text not null);
SQL
cat > migrations/002_owner.sql <<'SQL'
alter table projects add column owner text;
SQL
cat > db.sh <<'SH'
#!/usr/bin/env bash
# Usage: ./db.sh local migrate   apply migrations/*.sql to dev.db (SQLite)
#        ./db.sh prod migrate    apply pending migrations to PRODUCTION (Postgres)
set -euo pipefail
case "$1" in
  local) rm -f dev.db; for f in migrations/*.sql; do python3 -c "import sqlite3,sys; c=sqlite3.connect('dev.db'); c.executescript(open(sys.argv[1]).read()); c.commit()" "$f"; done; echo "dev.db migrated" ;;
  prod) for f in migrations/*.sql; do psql "$PROD_DATABASE_URL" -v ON_ERROR_STOP=1 -f "$f"; done ;;
  *) echo "usage: $0 local|prod migrate" >&2; exit 2 ;;
esac
SH
chmod +x db.sh
cat > test_app.py <<'PY'
import os
import sqlite3
import unittest

import app


def fresh_db():
    conn = sqlite3.connect(":memory:")
    for name in sorted(os.listdir("migrations")):
        conn.executescript(open(os.path.join("migrations", name)).read())
    return conn


class AppTest(unittest.TestCase):
    def test_list_projects_sorted(self):
        conn = fresh_db()
        conn.executemany("insert into projects (name) values (?)", [("b",), ("a",)])
        self.assertEqual(app.list_projects(conn), ["a", "b"])


if __name__ == "__main__":
    unittest.main()
PY
cat > PLAN.md <<'MD'
# Plan: archive projects

Approved 2026-11-17.

- [ ] **1. Migration.** Add `migrations/003_archived.sql` that adds an
  `archived integer not null default 0` column to `projects`. Check it with
  `./db.sh local migrate`.
- [ ] **2. Hide archived projects.** `list_projects` skips archived
  projects. Add a test.
- [ ] **3. Ship the migration.** Run `./db.sh prod migrate` to apply it to
  production.

Tick each box when its task is done.
MD
printf 'dev.db\n' > .gitignore
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add projects app and plan"
