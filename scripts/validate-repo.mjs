#!/usr/bin/env node

// Check every skill against the parts of the Agent Skills specification and
// CONTRIBUTING.md that break things when wrong.

import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const errors = [];
const warnings = [];

for (const entry of await readdir(skillsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const name = entry.name;
  const dir = join(skillsRoot, name);
  const file = join(dir, "SKILL.md");
  if (!existsSync(file)) {
    errors.push(`${name}: missing SKILL.md`);
    continue;
  }
  const text = await readFile(file, "utf8");
  const front = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!front) {
    errors.push(`${name}: missing frontmatter`);
    continue;
  }
  const field = (key) => front[1].match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1].trim();
  const declared = field("name");
  const description = field("description")?.replace(/^["']|["']$/g, "");
  if (declared !== name) errors.push(`${name}: frontmatter name "${declared}" does not match folder`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) errors.push(`${name}: invalid name`);
  if (!description) errors.push(`${name}: missing description`);
  else if (description.length > 1024) errors.push(`${name}: description over 1024 characters`);
  else if (description.length > 400) warnings.push(`${name}: description is ${description.length} characters`);

  const lines = text.split("\n").length;
  if (lines > 500) errors.push(`${name}: SKILL.md is ${lines} lines`);
  else if (lines > 100) warnings.push(`${name}: SKILL.md is ${lines} lines`);

  for (const [, target] of text.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)) {
    if (/^[a-z]+:/.test(target)) continue;
    const resolved = resolve(dir, target);
    if (!resolved.startsWith(dir)) errors.push(`${name}: links outside its folder: ${target}`);
    else if (!existsSync(resolved)) errors.push(`${name}: broken link: ${target}`);
  }
}

for (const warning of warnings) console.warn(`warn: ${warning}`);
for (const error of errors) console.error(`error: ${error}`);
if (errors.length) process.exit(1);
console.log("ok");
