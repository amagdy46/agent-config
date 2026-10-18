#!/usr/bin/env node

// Check every skill against the parts of the Agent Skills specification and
// CONTRIBUTING.md that break things when wrong.

import { existsSync } from "node:fs";
import { readdir, readFile, realpath } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const allowedKeys = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);
const errors = [];
const warnings = [];

// Parse the frontmatter subset skills use: top-level `key: value` pairs whose
// values are plain, quoted, or folded/literal block scalars, plus an indented
// `metadata:` mapping. Anything a strict YAML loader would reject or read
// differently, such as an unquoted ": " inside a plain value, is an error.
function parseFrontmatter(text) {
  const fields = {};
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "" || line.trimStart().startsWith("#")) continue;
    const match = line.match(/^([A-Za-z][\w-]*):(?:\s+(.*))?$/);
    if (!match) throw new Error(`line ${i + 1} is not a top-level "key: value" pair`);
    const [, key, raw = ""] = match;
    if (key in fields) throw new Error(`duplicate key "${key}"`);
    const block = [];
    while (i + 1 < lines.length && /^(\s+\S|\s*$)/.test(lines[i + 1])) block.push(lines[++i].trim());
    let value = raw.trim();
    if (/^[>|][+-]?$/.test(value)) {
      value = raw.trim().startsWith(">") ? block.filter(Boolean).join(" ") : block.join("\n").trim();
    } else if (value === "" && block.length) {
      value = Object.fromEntries(block.filter(Boolean).map((entry) => entry.split(/:\s*/, 2)));
    } else if (block.some(Boolean)) {
      throw new Error(`"${key}" continues onto an indented line; use a block scalar (>-)`);
    } else if (/^"/.test(value)) {
      if (!/^"(?:[^"\\]|\\.)*"$/.test(value)) throw new Error(`"${key}" has an unterminated double quote`);
      value = JSON.parse(value);
    } else if (/^'/.test(value)) {
      if (!/^'(?:[^']|'')*'$/.test(value)) throw new Error(`"${key}" has an unterminated single quote`);
      value = value.slice(1, -1).replace(/''/g, "'");
    } else if (/: |\s#|^[-?:,[\]{}#&*!|>%@`]/.test(value)) {
      throw new Error(`"${key}" is a plain value containing YAML syntax; quote it or use >-`);
    }
    fields[key] = value;
  }
  return fields;
}

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
  let fields;
  try {
    fields = parseFrontmatter(front[1]);
  } catch (error) {
    errors.push(`${name}: invalid frontmatter: ${error.message}`);
    continue;
  }
  for (const key of Object.keys(fields)) if (!allowedKeys.has(key)) errors.push(`${name}: unknown frontmatter key "${key}"`);
  const { name: declared, description } = fields;
  if (declared !== name) errors.push(`${name}: frontmatter name "${declared}" does not match folder`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) errors.push(`${name}: invalid name`);
  if (typeof description !== "string" || !description) errors.push(`${name}: missing description`);
  else if (description.length > 1024) errors.push(`${name}: description over 1024 characters`);
  else if (description.length > 400) warnings.push(`${name}: description is ${description.length} characters`);

  const lines = text.split("\n").length;
  if (lines > 500) errors.push(`${name}: SKILL.md is ${lines} lines`);
  else if (lines > 100) warnings.push(`${name}: SKILL.md is ${lines} lines`);

  const realDir = await realpath(dir);
  for (const md of await markdownFiles(dir)) {
    const from = relative(dir, md);
    const body = await readFile(md, "utf8");
    for (const [, target] of body.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      const resolved = resolve(dirname(md), decodeURI(target));
      if (!inside(dir, resolved)) errors.push(`${name}/${from}: links outside its folder: ${target}`);
      else if (!existsSync(resolved)) errors.push(`${name}/${from}: broken link: ${target}`);
      else if (!inside(realDir, await realpath(resolved))) errors.push(`${name}/${from}: link resolves outside its folder: ${target}`);
    }
  }
}

for (const warning of warnings) console.warn(`warn: ${warning}`);
for (const error of errors) console.error(`error: ${error}`);
if (errors.length) process.exit(1);
console.log("ok");
