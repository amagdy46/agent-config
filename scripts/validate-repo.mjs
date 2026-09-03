#!/usr/bin/env node

import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const allowedStatuses = new Set(["active", "pilot", "catalog", "retired"]);
const allowedInvocations = new Set(["automatic", "explicit"]);
const allowedPortability = new Set(["portable", "degraded", "host-specific"]);
const provenanceSources = [
  { id: "superpowers", marker: "obra/superpowers" },
  { id: "matt-skills", marker: "mattpocock/skills" },
  { id: "pstack", marker: "cursor/plugins" },
  { id: "productskills", marker: "assimovt/productskills" },
  { id: "pm-skills", marker: "phuryn/pm-skills" },
  { id: "vibe-design-skills", marker: "nick3/vibe-design-skills" },
  { id: "awesome-copilot", marker: "github/awesome-copilot" },
  { id: "technical-writer", marker: "riekelt/technical-writer" },
  { id: "anthropic-skills", marker: "anthropics/skills" },
  { id: "taste-skill", marker: "Leonxlnx/taste-skill" },
  { id: "archify", marker: "tt-a1i/archify" },
  { id: "humanlayer-skills", marker: "humanlayer/skills" },
  { id: "ponytail", marker: "DietrichGebert/ponytail" },
];

async function text(path) {
  return readFile(path, "utf8");
}

async function exists(path) {
  try {
    await lstat(path);
    return true;
  } catch {
    return false;
  }
}

function idsFromIndentedList(source, key) {
  const lines = source.split(/\r?\n/);
  const ids = [];
  let active = false;
  for (const line of lines) {
    if (line === `${key}:`) {
      active = true;
      continue;
    }
    if (active && /^\S/.test(line) && line.trim()) break;
    if (active) {
      const match = line.match(/^\s+-\s+([a-z0-9-]+)\s*$/);
      if (match) ids.push(match[1]);
    }
  }
  return ids;
}

function catalogIds(source) {
  return [...source.matchAll(/^\s{2}- id: ([a-z0-9-]+)$/gm)].map((m) => m[1]);
}

function catalogEntries(source) {
  return [...source.matchAll(/^  - id: ([a-z0-9-]+)\n([\s\S]*?)(?=^  - id:|^\S|(?![\s\S]))/gm)].map(
    ([, id, body]) => ({
      id,
      path: body.match(/^    path:\s*(\S+)$/m)?.[1],
      status: body.match(/^    status:\s*(\S+)$/m)?.[1],
      invocation: body.match(/^    invocation:\s*(\S+)$/m)?.[1],
      portability: body.match(/^    portability:\s*(\S+)$/m)?.[1],
    }),
  );
}

function fixtureCaseCount(source, section) {
  const match = source.match(
    new RegExp(`^${section}:\\n([\\s\\S]*?)(?=^[a-z][a-z-]*:|(?![\\s\\S]))`, "m"),
  );
  return match ? [...match[1].matchAll(/^  - id:\s*\S+/gm)].length : 0;
}

function fixtureCases(source, section) {
  const sectionMatch = source.match(
    new RegExp(`^${section}:\\n([\\s\\S]*?)(?=^[a-z][a-z-]*:|(?![\\s\\S]))`, "m"),
  );
  if (!sectionMatch) return [];
  return [...sectionMatch[1].matchAll(/^  - id:\s*(\S+)\n([\s\S]*?)(?=^  - id:|(?![\s\S]))/gm)].map(
    ([, id, body]) => ({ id, body }),
  );
}

async function validateLocalLinks(markdownPath, body, skillDir) {
  for (const match of body.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split("#", 1)[0];
    if (!target || /^[a-z]+:/i.test(target) || target.startsWith("#") || target.startsWith("<")) continue;
    const resolved = resolve(dirname(markdownPath), target);
    const withinSkill = relative(skillDir, resolved);
    if (withinSkill.startsWith("..") || normalize(withinSkill) === "..") {
      errors.push(`out-of-skill link in ${relative(root, markdownPath)}: ${target}`);
    } else if (!(await exists(resolved))) {
      errors.push(`broken local link in ${relative(root, markdownPath)}: ${target}`);
    }
  }
}

async function filesNamed(path, suffix) {
  const matches = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const full = join(path, entry.name);
    if (entry.isDirectory()) matches.push(...(await filesNamed(full, suffix)));
    else if (entry.isFile() && entry.name.endsWith(suffix)) matches.push(full);
  }
  return matches;
}

async function walk(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "validate-repo.mjs") continue;
    const full = join(path, entry.name);
    const stat = await lstat(full);
    if (stat.isSymbolicLink()) {
      errors.push(`symlink is not allowed: ${relative(root, full)}`);
    } else if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.isFile()) {
      const bytes = await readFile(full);
      if (bytes.includes(0)) {
        errors.push(`binary file is not allowed: ${relative(root, full)}`);
        continue;
      }
      const body = bytes.toString("utf8");
      if (/\/home\/|\/Users\/|~\//.test(body)) {
        errors.push(`absolute home path found: ${relative(root, full)}`);
      }
      if (/\bPrepit\b/i.test(body)) {
        errors.push(`employer identifier found: ${relative(root, full)}`);
      }
      if (/\bTODO\s*:|\bTBD\b|\bREPLACE_ME\b|your-skill-name/i.test(body)) {
        errors.push(`unfinished placeholder found: ${relative(root, full)}`);
      }
      if (/(?:api[_-]?key|access[_-]?token|secret[_-]?key|password)\s*[:=]\s*['"]?[^\s'"<]+|AKIA[0-9A-Z]{16}|BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY/i.test(body)) {
        errors.push(`possible secret found: ${relative(root, full)}`);
      }
      if ((stat.mode & 0o111) !== 0 && relative(root, full) !== "scripts/validate-repo.mjs") {
        errors.push(`unexpected executable file: ${relative(root, full)}`);
      }
    }
  }
}

const skillsDir = join(root, "skills");
const skillNames = (await readdir(skillsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const name of skillNames) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64) {
    errors.push(`invalid skill folder name: ${name}`);
  }
  const dir = join(skillsDir, name);
  const skillPath = join(dir, "SKILL.md");
  const noticePath = join(dir, "NOTICE.md");
  const fixturePath = join(root, "tests", "behavior", `${name}.yaml`);
  if (!(await exists(skillPath))) {
    errors.push(`missing SKILL.md: skills/${name}`);
    continue;
  }
  const body = await text(skillPath);
  for (const markdownPath of await filesNamed(dir, ".md")) {
    await validateLocalLinks(markdownPath, await text(markdownPath), dir);
  }
  const frontmatter = body.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    errors.push(`invalid frontmatter: skills/${name}/SKILL.md`);
  } else {
    const declared = frontmatter[1].match(/^name:\s*['"]?([^'"\n]+)['"]?$/m)?.[1];
    const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1];
    if (declared !== name) errors.push(`name mismatch: ${name} declares ${declared ?? "nothing"}`);
    if (!description || description.length > 1024) errors.push(`invalid description: ${name}`);
  }
  if (!(await exists(noticePath))) errors.push(`missing NOTICE.md: ${name}`);
  else {
    const notice = await text(noticePath);
    if (!notice.includes("Permission is hereby granted") || !notice.includes("THE SOFTWARE IS PROVIDED \"AS IS\"")) {
      errors.push(`NOTICE lacks standalone MIT terms: ${name}`);
    }
  }
  if (!(await exists(fixturePath))) {
    errors.push(`missing behavior fixture: ${name}`);
  } else {
    const fixture = await text(fixturePath);
    const fixtureSkill = fixture.match(/^skill:\s*([a-z0-9-]+)$/m)?.[1];
    if (fixtureSkill !== name) errors.push(`fixture skill mismatch: ${name}`);
    if (!/^schema-version:\s*1$/m.test(fixture)) errors.push(`invalid fixture schema: ${name}`);
    if (fixtureCaseCount(fixture, "positive-cases") < 2) {
      errors.push(`fixture needs at least two positive cases: ${name}`);
    }
    if (fixtureCaseCount(fixture, "negative-cases") < 2) {
      errors.push(`fixture needs at least two negative cases: ${name}`);
    }
    if (fixtureCaseCount(fixture, "overlap-cases") < 1) {
      errors.push(`fixture needs at least one overlap case: ${name}`);
    }
    if (!/^\s+invariants:\s*$/m.test(fixture)) {
      errors.push(`fixture lacks behavioral invariants: ${name}`);
    }
    for (const section of ["positive-cases", "negative-cases", "overlap-cases"]) {
      const cases = fixtureCases(fixture, section);
      const ids = cases.map(({ id }) => id);
      if (new Set(ids).size !== ids.length) errors.push(`duplicate fixture case ID in ${name}/${section}`);
      for (const fixtureCase of cases) {
        if (!/^    prompt:\s*(?:\S|>-|\|)/m.test(fixtureCase.body)) {
          errors.push(`fixture case lacks prompt: ${name}/${fixtureCase.id}`);
        }
        const invocation = fixtureCase.body.match(/^      invocation:\s*(\S+)$/m)?.[1];
        if (!new Set(["invoke", "do-not-invoke"]).has(invocation)) {
          errors.push(`invalid fixture invocation: ${name}/${fixtureCase.id}`);
        }
        if (!/^      invariants:\s*$\n(?:        - .+\n?)+/m.test(fixtureCase.body)) {
          errors.push(`fixture case lacks invariants: ${name}/${fixtureCase.id}`);
        }
        for (const key of ["competing-skill", "preferred-skill", "co-invocation"]) {
          const referenced = fixtureCase.body.match(new RegExp(`^\\s+${key}:\\s*([a-z0-9-]+)$`, "m"))?.[1];
          if (referenced && !skillNames.includes(referenced)) {
            errors.push(`fixture references missing skill: ${name}/${fixtureCase.id} -> ${referenced}`);
          }
        }
        if (section === "overlap-cases" && !/^    competing-skill:\s*[a-z0-9-]+$/m.test(fixtureCase.body)) {
          errors.push(`overlap case lacks competing-skill: ${name}/${fixtureCase.id}`);
        }
      }
    }
  }
}

const catalog = await text(join(root, "catalog.yaml"));
const catalogSkillIds = catalogIds(catalog);
const entries = catalogEntries(catalog);
if (!/^schema-version:\s*1$/m.test(catalog)) errors.push("invalid catalog schema");
for (const name of skillNames) {
  if (!catalogSkillIds.includes(name)) errors.push(`skill absent from catalog: ${name}`);
}
for (const id of catalogSkillIds) {
  if (!skillNames.includes(id)) errors.push(`catalog references missing skill: ${id}`);
}
if (new Set(catalogSkillIds).size !== catalogSkillIds.length) errors.push("duplicate catalog skill ID");
for (const entry of entries) {
  if (entry.path !== `skills/${entry.id}`) errors.push(`invalid catalog path: ${entry.id}`);
  if (!allowedStatuses.has(entry.status)) errors.push(`invalid catalog status: ${entry.id}`);
  if (!allowedInvocations.has(entry.invocation)) errors.push(`invalid catalog invocation: ${entry.id}`);
  if (!allowedPortability.has(entry.portability)) errors.push(`invalid catalog portability: ${entry.id}`);
}
const catalogPaths = entries.map(({ path }) => path);
if (new Set(catalogPaths).size !== catalogPaths.length) errors.push("duplicate catalog path");

const setDir = join(root, "sets");
for (const entry of await readdir(setDir, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".yaml")) continue;
  const body = await text(join(setDir, entry.name));
  if (!/^schema-version:\s*1$/m.test(body)) errors.push(`invalid set schema: ${entry.name}`);
  const declaredName = body.match(/^name:\s*([a-z0-9-]+)$/m)?.[1];
  if (`${declaredName}.yaml` !== entry.name) errors.push(`set name mismatch: ${entry.name}`);
  const setSkills = idsFromIndentedList(body, "skills");
  if (new Set(setSkills).size !== setSkills.length) errors.push(`duplicate skill in set: ${entry.name}`);
  for (const id of setSkills) {
    if (!catalogSkillIds.includes(id)) errors.push(`${entry.name} references missing skill: ${id}`);
  }
}

const provenance = await text(join(root, "provenance.lock.yaml"));
const sourceCommits = new Map();
for (const { id: source } of provenanceSources) {
  const block = provenance.match(new RegExp(`^  ${source}:\\n([\\s\\S]*?)(?=^  [a-z][a-z-]*:|^derived-skills:|(?![\\s\\S]))`, "m"))?.[1];
  const commit = block?.match(/^    commit:\s*([0-9a-f]{40})$/m)?.[1];
  if (!commit || !/^    license:\s*(?:MIT|Apache-2\.0)$/m.test(block)) {
    errors.push(`invalid pinned provenance source: ${source}`);
  } else {
    sourceCommits.set(source, commit);
  }
}
for (const name of skillNames) {
  const declared = provenance.match(new RegExp(`^  ${name}: \\[([^\\]]*)\\]$`, "m"))?.[1]
    ?.split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .sort();
  if (!declared) {
    errors.push(`skill absent from provenance lock: ${name}`);
    continue;
  }
  const notice = await text(join(skillsDir, name, "NOTICE.md"));
  const cited = provenanceSources
    .filter(({ marker }) => notice.includes(marker))
    .map(({ id }) => id);
  if (declared.join(",") !== cited.sort().join(",")) {
    errors.push(`NOTICE/provenance source mismatch: ${name}`);
  }
  for (const source of cited) {
    const commit = sourceCommits.get(source);
    if (commit && !notice.includes(commit)) {
      errors.push(`NOTICE lacks pinned ${source} commit: ${name}`);
    }
  }
}

await walk(root);

if (errors.length) {
  console.error(`Repository validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Repository validation passed: ${skillNames.length} skills, ${catalogSkillIds.length} catalog entries.`);
