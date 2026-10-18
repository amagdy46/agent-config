#!/usr/bin/env node

// Link every skill in this clone into the agent skill directories on this
// machine, so a `git pull` updates every agent at once.
//
//   node scripts/link.mjs            # link and prune
//   node scripts/link.mjs --dry-run  # show what would change
//
// Links go into ~/.agents/skills and every agent-specific skills directory
// that already exists. The global instruction files in global/ are linked
// over ~/.claude/CLAUDE.md, ~/.codex/AGENTS.md and ~/AGENTS.md.
//
// Nothing is deleted except links this script made. Every link it makes is
// recorded in a manifest; a later run removes recorded links that are no
// longer wanted, plus dead links into this clone's skills folder. Anything
// else in the way (a real directory, a file, a link made by something else)
// is moved into a fresh, timestamped backup folder first.

import { lstat, mkdir, readFile, readdir, readlink, rename, rm, stat, symlink, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const home = homedir();
const dryRun = process.argv.includes("--dry-run");
const stateDir = join(home, ".agents", "agent-config");
const manifestPath = join(stateDir, "links.json");
const backupRoot = join(stateDir, "backups", new Date().toISOString().replace(/[:.]/g, "-"));
const agentDirs = [
  join(home, ".claude", "skills"),
  join(home, ".codex", "skills"),
  join(home, ".cursor", "skills"),
  join(home, ".config", "opencode", "skills"),
  join(home, ".pi", "agent", "skills"),
];
const globalFiles = [
  [join(root, "global", "CLAUDE.md"), join(home, ".claude", "CLAUDE.md")],
  [join(root, "global", "AGENTS.md"), join(home, ".codex", "AGENTS.md")],
  [join(root, "global", "AGENTS.md"), join(home, "AGENTS.md")],
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

const inSkillsRoot = (target) => target.startsWith(skillsRoot + "/");

const manifest = JSON.parse(await readFile(manifestPath, "utf8").catch(() => "{}"));
const skills = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const targetDirs = [join(home, ".agents", "skills")];
for (const dir of agentDirs) if (await exists(dir)) targetDirs.push(dir);

// link path -> target path, for everything this run should leave in place.
const wanted = new Map();
for (const dir of targetDirs) for (const name of skills) wanted.set(join(dir, name), join(skillsRoot, name));
for (const [target, link] of globalFiles) if (await exists(dirname(link))) wanted.set(link, target);

const actions = [];
for (const dir of targetDirs) if (!(await exists(dir))) actions.push({ kind: "mkdir", path: dir });

// Prune links we made that are no longer wanted, and dead links into this
// clone left by skills deleted before the manifest existed.
const stale = new Map(Object.entries(manifest).filter(([link]) => !wanted.has(link)));
for (const dir of targetDirs) {
  if (!(await exists(dir))) continue;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const link = join(dir, entry.name);
    if (!entry.isSymbolicLink() || wanted.has(link)) continue;
    const was = await readlink(link);
    if (inSkillsRoot(was) && (await isDead(link))) stale.set(link, was);
  }
}
for (const [link, recorded] of stale) {
  if (!(await exists(link)) || !(await lstat(link)).isSymbolicLink()) continue;
  const was = await readlink(link);
  if (was === recorded) actions.push({ kind: "unlink", link, was });
}

for (const [link, target] of wanted) {
  if (!(await exists(link))) {
    actions.push({ kind: "link", link, target });
    continue;
  }
  const info = await lstat(link);
  const was = info.isSymbolicLink() ? await readlink(link) : null;
  if (was === target) continue;
  const ours = was !== null && (manifest[link] === was || inSkillsRoot(was));
  if (ours) actions.push({ kind: "relink", link, target, was });
  else actions.push({ kind: "backup", link, target, to: join(backupRoot, relative(home, link)) });
}

for (const action of actions) {
  const line = {
    mkdir: () => `mkdir    ${action.path}`,
    link: () => `link     ${action.link}`,
    relink: () => `relink   ${action.link} (was ${action.was})`,
    backup: () => `backup   ${action.link} -> ${action.to}`,
    unlink: () => `unlink   ${action.link} (was ${action.was})`,
  }[action.kind]();
  console.log(`${dryRun ? "[dry-run] " : ""}${line}`);
  if (dryRun) continue;
  if (action.kind === "mkdir") await mkdir(action.path, { recursive: true });
  else if (action.kind === "unlink") await rm(action.link);
  else {
    if (action.kind === "relink") await rm(action.link);
    if (action.kind === "backup") {
      await mkdir(dirname(action.to), { recursive: true });
      await rename(action.link, action.to);
    }
    await symlink(action.target, action.link);
  }
}

if (!dryRun) {
  await mkdir(stateDir, { recursive: true });
  await writeFile(manifestPath, JSON.stringify(Object.fromEntries(wanted), null, 2) + "\n");
}

const summary = actions.length === 0 ? "up to date" : `${dryRun ? "would apply" : "applied"} ${actions.length} changes`;
console.log(`${summary}: ${skills.length} skills, ${targetDirs.length} directories`);
