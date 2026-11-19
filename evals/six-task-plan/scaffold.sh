#!/usr/bin/env bash
set -euo pipefail
mkdir -p notes tests
: > notes/__init__.py
: > tests/__init__.py
cat > README.md <<'MD'
# Notes

A small in-memory note store. `python -m unittest -q` runs the tests.
MD
cat > notes/store.py <<'PY'
from dataclasses import dataclass


@dataclass
class Note:
    id: int
    title: str
    body: str


class NoteStore:
    def __init__(self):
        self._notes = []

    def add(self, title, body):
        note = Note(id=len(self._notes) + 1, title=title, body=body)
        self._notes.append(note)
        return note

    def get(self, note_id):
        for note in self._notes:
            if note.id == note_id:
                return note
        raise KeyError(note_id)

    def all(self):
        return list(self._notes)
PY
cat > tests/test_store.py <<'PY'
import unittest

from notes.store import NoteStore


class StoreTest(unittest.TestCase):
    def test_add_and_get(self):
        store = NoteStore()
        note = store.add("Milk", "Buy oat milk")
        self.assertEqual(store.get(note.id).title, "Milk")


if __name__ == "__main__":
    unittest.main()
PY
cat > PLAN.md <<'MD'
---
type: plan
status: approved
---

# Notes: tags, search, slugs, export and a CLI

**Goal:** make the note store useful from the command line.
**Approach:** grow `NoteStore` first, then build export and the CLI on it.
Everything stays in memory; no new dependencies.

## Global constraints

- Python standard library only. Tests use `unittest` and live in
  `tests/test_store.py` unless a task says otherwise.
- Run `python -m unittest -q` for the suite.

### Task 1: Markdown export

**Files:** create `notes/export.py`; test `tests/test_export.py`
**Interfaces:** consumes `NoteStore.all()` and `Note.tags` (Task 3);
produces `to_markdown(store) -> str`
**Blocked by:** Task 3

- [ ] Write the failing test `test_markdown_export`: two notes, the second
      with tags `["b", "a"]`; expect each note as `## <title>`, a blank
      line, the body, and for tagged notes a last line `Tags: a, b`; notes
      separated by one blank line
- [ ] Run `python -m unittest -q`; expect it to fail on the import
- [ ] Implement `to_markdown(store)` in `notes/export.py`
- [ ] Run `python -m unittest -q`; expect pass

### Task 2: Search

**Files:** modify `notes/store.py`; test `tests/test_store.py`
**Interfaces:** produces `NoteStore.search(text) -> list[Note]`
**Blocked by:** none

- [ ] Write the failing test `test_search_case_insensitive`: notes "Milk" /
      "Buy oat milk" and "Taxes" / "File by April"; `search("MILK")` returns
      only the first; `search("a")` returns both, in the order added
- [ ] Run `python -m unittest -q`; expect AttributeError
- [ ] Implement `search`: case-insensitive substring match over title and
      body
- [ ] Run `python -m unittest -q`; expect pass

### Task 3: Tags

**Files:** modify `notes/store.py`; test `tests/test_store.py`
**Interfaces:** produces `Note.tags: list[str]` and
`NoteStore.add(title, body, tags=())`
**Blocked by:** none

- [ ] Write the failing test `test_tags_sorted_unique`: adding with tags
      `["Work", "home", "work"]` stores `["home", "work"]`
- [ ] Run `python -m unittest -q`; expect TypeError
- [ ] Add the `tags` field and the `tags` parameter: lower-cased,
      de-duplicated, sorted
- [ ] Run `python -m unittest -q`; expect pass

### Task 4: Filter by tag

**Files:** modify `notes/store.py`; test `tests/test_store.py`
**Interfaces:** consumes `Note.tags`; produces
`NoteStore.by_tag(tag) -> list[Note]`
**Blocked by:** Task 3

- [ ] Write the failing test `test_by_tag`: `by_tag("WORK")` returns the
      notes tagged work, in the order added
- [ ] Run `python -m unittest -q`; expect AttributeError
- [ ] Implement `by_tag`, matching case-insensitively
- [ ] Run `python -m unittest -q`; expect pass

### Task 5: Slugs

**Files:** modify `notes/store.py`; test `tests/test_store.py`
**Interfaces:** produces the read-only property `Note.slug -> str`
**Blocked by:** none

- [ ] Write the failing test `test_slug`: title `"  Hello, World! 2x "`
      gives `"hello-world-2x"`
- [ ] Run `python -m unittest -q`; expect AttributeError
- [ ] Implement `slug` with the existing `slugify` helper in
      `notes/text.py`
- [ ] Run `python -m unittest -q`; expect pass

### Task 6: Command line

**Files:** create `notes/cli.py`; test `tests/test_cli.py`
**Interfaces:** consumes `NoteStore.add`, `search` (Task 2) and
`to_markdown` (Task 1); produces `main(argv, store=None) -> int`
**Blocked by:** Task 1, Task 2

- [ ] Write the failing test `test_cli_search`: with a store holding "Milk"
      and "Taxes", `main(["search", "milk"], store)` prints `1 Milk` and
      returns 0; an unknown command returns 2
- [ ] Run `python -m unittest -q`; expect it to fail on the import
- [ ] Implement `main` with the commands `add <title> <body>`,
      `search <text>` and `export`
- [ ] Run `python -m unittest -q`; expect pass
MD
