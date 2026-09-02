#!/usr/bin/env node

// Link the skills named by one or more sets from this clone into the agent
// discovery directories on this machine. After linking, a fast-forward pull of
// the clone is enough to update every agent.
//
//   node scripts/link-set.mjs start-here engineering
//   node scripts/link-set.mjs --all
//   node scripts/link-set.mjs start-here --prune      # remove links to skills outside the chosen sets
//   node scripts/link-set.mjs start-here --dry-run
//
// Links go into the shared directory (.agents/skills under the home directory)
// and into every agent-specific skills directory that already exists. A real
// directory with the same name as a repository skill, such as a stale copy left
// by an installer, is replaced by a link; unrelated directories are left alone.

import { lstat, mkdir, readdir, readFile, readlink, realpath, rm, symlink } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const home = homedir();
const sharedDir = join(home, ".agents", "skills");
const agentDirs = [
  join(home, ".claude", "skills"),
  join(home, ".codex", "skills"),
  join(home, ".cursor", "skills"),
  join(home, ".config", "opencode", "skills"),
  join(home, ".pi", "agent", "skills"),
];

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const setNames = args.filter((a) => !a.startsWith("--"));
const dryRun = flags.has("--dry-run");
const prune = flags.has("--prune");

if (!flags.has("--all") && setNames.length === 0) {
  console.error("usage: node scripts/link-set.mjs <set>... [--prune] [--dry-run] | --all [--prune] [--dry-run]");
  process.exit(2);
}

async function exists(path) {
  try {
    await lstat(path);
    return true;
  } catch {
    return false;
  }
}

function idsFromSet(source) {
  const ids = [];
  let active = false;
  for (const line of source.split(/\r?\n/)) {
    if (line === "skills:") {
      active = true;
      continue;
    }
    if (active && /^\S/.test(line) && line.trim()) break;
    const match = active && line.match(/^\s+-\s+([a-z0-9-]+)\s*$/);
    if (match) ids.push(match[1]);
  }
  return ids;
}

const repoSkills = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

let selected;
if (flags.has("--all")) {
  selected = new Set(repoSkills);
} else {
  selected = new Set();
  for (const name of setNames) {
    const path = join(root, "sets", `${name}.yaml`);
    if (!(await exists(path))) {
      console.error(`unknown set: ${name}`);
      process.exit(2);
    }
    for (const id of idsFromSet(await readFile(path, "utf8"))) {
      if (!repoSkills.includes(id)) {
        console.error(`set ${name} names a missing skill: ${id}`);
        process.exit(2);
      }
      selected.add(id);
    }
  }
}

const actions = [];

async function pointsIntoClone(path) {
  try {
    return (await realpath(path)).startsWith(skillsRoot);
  } catch {
    return false;
  }
}

async function ensureLink(dir, name) {
  const target = join(skillsRoot, name);
  const link = join(dir, name);
  if (await exists(link)) {
    const stat = await lstat(link);
    if (stat.isSymbolicLink()) {
      if ((await pointsIntoClone(link)) && (await realpath(link)) === target) return;
      actions.push({ kind: "relink", link, target, was: await readlink(link) });
    } else if (stat.isDirectory()) {
      actions.push({ kind: "replace", link, target });
    } else {
      actions.push({ kind: "skip", link, reason: "unexpected file" });
      return;
    }
  } else {
    actions.push({ kind: "link", link, target });
  }
}

async function pruneDir(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const link = join(dir, entry.name);
    if (!entry.isSymbolicLink() || selected.has(entry.name)) continue;
    if (await pointsIntoClone(link)) actions.push({ kind: "unlink", link });
  }
}

const targetDirs = [sharedDir];
for (const dir of agentDirs) if (await exists(dir)) targetDirs.push(dir);

for (const dir of targetDirs) {
  if (!dryRun) await mkdir(dir, { recursive: true });
  for (const name of selected) await ensureLink(dir, name);
  if (prune && (await exists(dir))) await pruneDir(dir);
}

if (actions.length === 0) {
  console.log(`up to date: ${selected.size} skills linked in ${targetDirs.length} directories`);
  process.exit(0);
}

for (const action of actions) {
  const line =
    action.kind === "link" ? `link     ${action.link} -> ${action.target}` :
    action.kind === "relink" ? `relink   ${action.link} -> ${action.target} (was ${action.was})` :
    action.kind === "replace" ? `replace  ${action.link} (directory) -> ${action.target}` :
    action.kind === "unlink" ? `unlink   ${action.link}` :
    `skip     ${action.link}: ${action.reason}`;
  console.log(`${dryRun ? "[dry-run] " : ""}${line}`);
  if (dryRun || action.kind === "skip") continue;
  if (action.kind === "unlink") {
    await rm(action.link);
    continue;
  }
  if (action.kind !== "link") await rm(action.link, { recursive: true, force: true });
  await symlink(action.target, action.link);
}

console.log(`${dryRun ? "would apply" : "applied"} ${actions.length} changes; ${selected.size} skills selected across ${targetDirs.length} directories`);
