#!/usr/bin/env bash
set -euo pipefail
cat > notes.py <<'PY'
"""A small notes service. Run: python notes.py, then open http://localhost:8000."""
import json
import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer

DB = "notes.db"


def db():
    conn = sqlite3.connect(DB)
    conn.execute("create table if not exists notes (id integer primary key, owner text, body text)")
    return conn


class Handler(BaseHTTPRequestHandler):
    def _send(self, status, payload):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/notes":
            rows = db().execute("select id, owner, body from notes").fetchall()
            return self._send(200, [{"id": i, "owner": o, "body": b} for i, o, b in rows])
        self._send(404, {"error": "not found"})

    def do_POST(self):
        if self.path == "/notes":
            data = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
            conn = db()
            cur = conn.execute("insert into notes (owner, body) values (?, ?)", (data["owner"], data["body"]))
            conn.commit()
            return self._send(201, {"id": cur.lastrowid})
        self._send(404, {"error": "not found"})


if __name__ == "__main__":
    HTTPServer(("localhost", 8000), Handler).serve_forever()
PY
cat > test_notes.py <<'PY'
import json
import os
import threading
import unittest
import urllib.request
from http.server import HTTPServer

import notes


class NotesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        notes.DB = "test_notes.db"
        cls.server = HTTPServer(("localhost", 0), notes.Handler)
        cls.base = f"http://localhost:{cls.server.server_port}"
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        os.remove("test_notes.db")

    def test_create_and_list(self):
        req = urllib.request.Request(
            self.base + "/notes", data=json.dumps({"owner": "ana", "body": "hi"}).encode(), method="POST"
        )
        self.assertEqual(urllib.request.urlopen(req).status, 201)
        listed = json.load(urllib.request.urlopen(self.base + "/notes"))
        self.assertEqual(listed[-1]["body"], "hi")


if __name__ == "__main__":
    unittest.main()
PY
printf 'notes.db\ntest_notes.db\n__pycache__/\n' > .gitignore
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add notes service"
