#!/usr/bin/env node

// Check every skill against the parts of the Agent Skills specification and
// CONTRIBUTING.md that break things when wrong. Each message names the file,
// the problem and the fix. Exit 1 on any error; warnings alone exit 0.

import { existsSync } from "node:fs";
import { readdir, readFile, realpath } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { frontmatterOf, parseFailures } from "./lib/skills.mjs";

// Limits. CONTRIBUTING.md and AGENTS.md quote these numbers; a test fails if they differ.
const DESCRIPTION_WARN_CHARS = 300; // house style
const DESCRIPTION_MAX_CHARS = 1024; // Agent Skills specification
const SKILL_WARN_LINES = 100; // house style
const SKILL_MAX_LINES = 500; // Agent Skills specification recommendation
const SKILL_MAX_BYTES = 20000; // Claude Code drops the tail of larger skills after compaction
const NAME_MAX_CHARS = 64; // Agent Skills specification

// The repository root is the first argument, or this script's parent folder.
const root = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), ".."));
const skillsRoot = join(root, "skills");
const allowedKeys = ["name", "description", "license", "compatibility", "metadata", "allowed-tools"];
const errors = [];
const warnings = [];
const folders = [];

function inside(dir, path) {
  const rel = relative(dir, path);
  return rel === "" || (!rel.startsWith(".." + sep) && rel !== ".." && !isAbsolute(rel));
}

async function markdownFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await markdownFiles(path)));
    else if (entry.name.endsWith(".md")) out.push(path);
  }
  return out;
}

if (!existsSync(skillsRoot)) {
  console.error(`error: ${skillsRoot}: not found. Pass the repository root as the first argument, or omit it to check this checkout.`);
  process.exit(1);
}

for (const entry of await readdir(skillsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const name = entry.name;
  folders.push(name);
  const dir = join(skillsRoot, name);
  const file = join(dir, "SKILL.md");
  const at = relative(root, file);
  const validName = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) && name.length <= NAME_MAX_CHARS;
  if (!validName) {
    errors.push(`${at}: folder name "${name}" is invalid. Rename the folder and the name field to lowercase letters, digits and single hyphens, at most ${NAME_MAX_CHARS} characters`);
  }
  if (!existsSync(file)) {
    errors.push(`${at}: missing. Add SKILL.md to skills/${name}/, or delete the folder`);
    continue;
  }
  const text = await readFile(file, "utf8");
  let fields;
  try {
    fields = frontmatterOf(text);
  } catch (error) {
    errors.push(`${at}: ${error.message}`);
    continue;
  }
  if (!fields) {
    errors.push(`${at}: no frontmatter. Start the file with a "---" line, the name and description fields, and a closing "---" line (LF line endings)`);
    continue;
  }
  for (const key of Object.keys(fields)) {
    if (!allowedKeys.includes(key)) errors.push(`${at}: unknown frontmatter key "${key}". Use only ${allowedKeys.join(", ")}; nest anything else under metadata`);
  }
  const { name: declared, description } = fields;
  if (validName && declared !== name) {
    errors.push(`${at}: name is "${declared ?? ""}" but the folder is "${name}". Set "name: ${name}"`);
  }
  if (typeof description !== "string" || !description) {
    errors.push(`${at}: no description. Add "description:" saying what the skill does, then the phrases that should trigger it`);
  } else if (description.length > DESCRIPTION_MAX_CHARS) {
    errors.push(`${at}: description is ${description.length} characters (limit ${DESCRIPTION_MAX_CHARS}). Cut it to what the skill does and the phrases that should trigger it`);
  } else if (description.length > DESCRIPTION_WARN_CHARS) {
    warnings.push(`${at}: description is ${description.length} characters (aim for ${DESCRIPTION_WARN_CHARS} or fewer). Cut it to what the skill does and the phrases that should trigger it`);
  }

  const bytes = Buffer.byteLength(text);
  const lines = text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
  if (bytes >= SKILL_MAX_BYTES) {
    errors.push(`${at}: ${bytes} bytes (must stay under ${SKILL_MAX_BYTES}; Claude Code drops the tail of larger skills after compaction). Move detail only some runs need into a sibling file and link to it`);
  }
  if (lines > SKILL_MAX_LINES) {
    errors.push(`${at}: ${lines} lines (limit ${SKILL_MAX_LINES}). Move detail only some runs need into a sibling file and link to it`);
  } else if (lines > SKILL_WARN_LINES) {
    warnings.push(`${at}: ${lines} lines (aim for ${SKILL_WARN_LINES} or fewer). Cut lines the agent would follow anyway, or move rare detail into a sibling file`);
  }

  const realDir = await realpath(dir);
  for (const md of await markdownFiles(dir)) {
    const from = relative(root, md);
    const body = await readFile(md, "utf8");
    for (const [, target] of body.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      const resolved = resolve(dirname(md), decodeURI(target));
      if (!inside(dir, resolved)) {
        errors.push(`${from}: link "${target}" leaves skills/${name}/. Copy what it needs into the skill's folder, or link a full https:// URL`);
      } else if (!existsSync(resolved)) {
        errors.push(`${from}: link "${target}" points to a missing file. Fix the path or add the file`);
      } else if (!inside(realDir, await realpath(resolved))) {
        errors.push(`${from}: link "${target}" is a symlink to a file outside skills/${name}/. Replace the symlink with a real file`);
      }
    }
  }
}

const failuresFile = join(root, "FAILURES.md");
if (!existsSync(failuresFile)) {
  errors.push(`FAILURES.md: not found. Add it with one "## <name>" section per skill, each with Stage:, For you:, Fixes: and Origin: lines`);
} else {
  const { errors: problems } = parseFailures(await readFile(failuresFile, "utf8"), folders);
  for (const problem of problems) errors.push(`FAILURES.md: ${problem}`);
}

for (const warning of warnings) console.warn(`warn: ${warning}.`);
for (const error of errors) console.error(`error: ${error}.`);
if (errors.length) process.exit(1);
console.log("ok");
