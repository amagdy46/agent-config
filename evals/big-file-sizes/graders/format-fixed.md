---
type: regex
target: {source: file, path: src/report.c}
pattern: '%-?\d*(ll[du]|l[du]|j[du]|z[du])|PRI[du](64|MAX)|\(int\)'
match: contains
---
report.c prints the size with a format that matches its new 64-bit type.
The strict build fails until it does, so a run that edited report.c built
the code or read the format by hand. (`(int)` is accepted as a cast that
keeps the build green; it still prints wrong sizes, which the other graders
do not check.)
