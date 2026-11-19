#!/usr/bin/env bash
set -euo pipefail
cat > todo.py <<'PY'
"""A tiny todo list. Usage: python todo.py add "buy milk" | list | done 1"""
import sys

TODOS = []


def add(text):
    TODOS.append({"text": text, "done": False})


def complete(index):
    TODOS[index - 1]["done"] = True


def render():
    return "\n".join(
        f"{i}. [{'x' if t['done'] else ' '}] {t['text']}" for i, t in enumerate(TODOS, 1)
    )


def main(argv):
    if not argv or argv[0] == "list":
        print(render())
    elif argv[0] == "add":
        add(" ".join(argv[1:]))
    elif argv[0] == "done":
        complete(int(argv[1]))
    else:
        sys.exit(f"unknown command: {argv[0]}")


if __name__ == "__main__":
    main(sys.argv[1:])
PY
cat > README.md <<'MD'
# todo

`python todo.py add "buy milk"`, `python todo.py list`, `python todo.py done 1`.
MD
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add todo app"
