#!/usr/bin/env bash
set -euo pipefail
mkdir -p src
cat > src/entry.h <<'C'
#ifndef ENTRY_H
#define ENTRY_H

struct entry {
    char name[256];
    int size;
};

int scan_dir(const char *path, struct entry *out, int max);
void print_report(const struct entry *entries, int n);

#endif
C
cat > src/scan.c <<'C'
#include <dirent.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>

#include "entry.h"

int scan_dir(const char *path, struct entry *out, int max)
{
    DIR *dir = opendir(path);
    struct dirent *d;
    struct stat st;
    char full[1024];
    int n = 0;

    if (!dir)
        return -1;
    while ((d = readdir(dir)) && n < max) {
        snprintf(full, sizeof full, "%s/%s", path, d->d_name);
        if (stat(full, &st) != 0 || !S_ISREG(st.st_mode))
            continue;
        snprintf(out[n].name, sizeof out[n].name, "%s", d->d_name);
        out[n].size = st.st_size;
        n++;
    }
    closedir(dir);
    return n;
}
C
cat > src/report.c <<'C'
#include <stdio.h>

#include "entry.h"

void print_report(const struct entry *entries, int n)
{
    for (int i = 0; i < n; i++)
        printf("%-40s %12d\n", entries[i].name, entries[i].size);
}
C
cat > src/main.c <<'C'
#include <stdio.h>

#include "entry.h"

int main(int argc, char **argv)
{
    static struct entry entries[4096];
    int n = scan_dir(argc > 1 ? argv[1] : ".", entries, 4096);

    if (n < 0) {
        perror("scan");
        return 1;
    }
    print_report(entries, n);
    return 0;
}
C
cat > lint.sh <<'SH'
#!/usr/bin/env bash
# Style check: no tabs, lines under 100 characters, no trailing spaces.
status=0
for f in src/*.c src/*.h; do
  if grep -nP '\t' "$f"; then echo "$f: tab"; status=1; fi
  if awk 'length > 99 { print FILENAME ":" NR ": line too long"; bad=1 } END { exit bad }' "$f"; then :; else status=1; fi
  if grep -nE ' +$' "$f"; then echo "$f: trailing space"; status=1; fi
done
[ $status -eq 0 ] && echo "lint ok"
exit $status
SH
chmod +x lint.sh
printf 'CFLAGS = -std=c11 -D_DEFAULT_SOURCE -Wall -Wextra -Werror\n\ndusk: src/*.c src/*.h\n\t$(CC) $(CFLAGS) -o dusk src/*.c\n\nlint:\n\t./lint.sh\n\n.PHONY: lint\n' > Makefile
cat > README.md <<'MD'
# dusk

Lists the files in a folder with their sizes. `make` builds `./dusk`;
`./dusk <folder>` prints the report. `make lint` checks style.
MD
printf 'dusk\n' > .gitignore
git init -q && git add -A && git -c user.name=dev -c user.email=dev@example.com commit -qm "Add dusk"
