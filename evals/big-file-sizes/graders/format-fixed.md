---
type: regex
target: {source: file, path: src/report.c}
pattern: '%-?\d*(ll[du]|l[du]|j[du]|z[du])|PRI[du](64|MAX)'
match: contains
---
report.c prints the size with a format that matches its new 64-bit type.
The strict build fails until it does, so a run that edited report.c built
the code or read the format by hand. A cast to `(int)` keeps the build green but
still prints wrong sizes, so it fails.
