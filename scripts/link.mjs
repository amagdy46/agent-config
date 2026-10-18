#!/usr/bin/env node

// Link every skill in this clone into the agent skill directories on this
// machine, so a `git pull` updates every agent at once.
//
//   node scripts/link.mjs            # link and prune
//   node scripts/link.mjs --dry-run  # show what would change
//
// Links go into ~/.agents/skills and every agent-specific skills directory
// that already exists. Pruning removes dead links left by skills that were
// deleted or by an earlier clone location of this repository. A real
// directory named like a repository skill, such as a stale installer copy, is
// replaced by a link; anything else is left alone.

import { lstat, mkdir, readdir, readlink, realpath, rm, stat, symlink } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const home = homedir();
const dryRun = process.argv.includes("--dry-run");
const agentDirs = [
  join(home, ".claude", "skills"),
  join(home, ".codex", "skills"),
  join(home, ".cursor", "skills"),
  join(home, ".config", "opencode", "skills"),
  join(home, ".pi", "agent", "skills"),
];

async function exists(path) {
  try {
    await lstat(path);
    return true;
  } catch {
    return false;
  }
}

async function isDead(path) {
  try {
    await stat(path);
    return false;
  } catch {
    return true;
  }
}

const skills = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const targetDirs = [join(home, ".agents", "skills")];
for (const dir of agentDirs) if (await exists(dir)) targetDirs.push(dir);

const actions = [];
for (const dir of targetDirs) {
  if (!(await exists(dir))) {
    actions.push({ kind: "mkdir", path: dir });
  } else {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const link = join(dir, entry.name);
      if (!entry.isSymbolicLink() || skills.includes(entry.name)) continue;
      const was = await readlink(link);
      const ours = was.startsWith(skillsRoot) || /agent-config[^/]*\/skills\//.test(was);
      if (ours && (await isDead(link))) actions.push({ kind: "unlink", link, was });
    }
  }
  for (const name of skills) {
    const target = join(skillsRoot, name);
    const link = join(dir, name);
    if (!(await exists(link))) {
      actions.push({ kind: "link", link, target });
      continue;
    }
    const info = await lstat(link);
    if (info.isSymbolicLink()) {
      const current = await realpath(link).catch(() => null);
      if (current !== target) actions.push({ kind: "relink", link, target, was: await readlink(link) });
    } else if (info.isDirectory()) {
      actions.push({ kind: "replace", link, target });
    } else {
      actions.push({ kind: "skip", link });
    }
  }
}

for (const action of actions) {
  const line = {
    mkdir: () => `mkdir    ${action.path}`,
    link: () => `link     ${action.link}`,
    relink: () => `relink   ${action.link} (was ${action.was})`,
    replace: () => `replace  ${action.link} (directory)`,
    unlink: () => `unlink   ${action.link} (dead: ${action.was})`,
    skip: () => `skip     ${action.link}: not a link or directory`,
  }[action.kind]();
  console.log(`${dryRun ? "[dry-run] " : ""}${line}`);
  if (dryRun || action.kind === "skip") continue;
  if (action.kind === "mkdir") await mkdir(action.path, { recursive: true });
  else if (action.kind === "unlink") await rm(action.link);
  else {
    if (action.kind !== "link") await rm(action.link, { recursive: true, force: true });
    await symlink(action.target, action.link);
  }
}

const summary = actions.length === 0 ? "up to date" : `${dryRun ? "would apply" : "applied"} ${actions.length} changes`;
console.log(`${summary}: ${skills.length} skills, ${targetDirs.length} directories`);
