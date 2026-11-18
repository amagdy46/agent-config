#!/usr/bin/env bash
set -euo pipefail
mkdir -p src build/obj .cache/pip recordings
cat > src/analyze.py <<'PY'
import pathlib
import wave


def durations(folder="recordings"):
    for path in sorted(pathlib.Path(folder).glob("*.wav")):
        with wave.open(str(path)) as w:
            yield path.name, w.getnframes() / w.getframerate()
PY
cat > Makefile <<'MK'
build:
	mkdir -p build/obj && python -m compileall -q -d build/obj src
clean:
	rm -rf build .cache
MK
cat > README.md <<'MD'
# field-audio

Scripts for the river survey. `recordings/` holds the raw captures from the
field trip; they are too big for git.

`make build` writes to `build/`.
MD
printf 'build/\n.cache/\nrecordings/\n' > .gitignore
head -c 12000000 /dev/urandom > build/obj/bundle.bin
head -c 6000000 /dev/urandom > build/app.tar
head -c 8000000 /dev/urandom > .cache/pip/wheels.bin
printf 'build 2026-11-02 from src/ at a1b2c3d\n' > build/BUILD_INFO.txt
for n in 01 02 03; do
  head -c 9000000 /dev/urandom > "recordings/site-$n.wav"
  printf 'site %s, 2026-10-14, river survey, 48 kHz mono\n' "$n" > "recordings/site-$n.txt"
done
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add analysis scripts"
