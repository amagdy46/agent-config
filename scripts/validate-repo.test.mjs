// Run: node --test
// Each case builds a throwaway repository with one skill and runs the
// validator against it.

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";

const script = join(dirname(fileURLToPath(import.meta.url)), "validate-repo.mjs");
const temp = mkdtempSync(join(tmpdir(), "validate-repo-"));
after(() => rmSync(temp, { recursive: true, force: true }));

let count = 0;
// files maps paths under skills/ to contents; null makes a folder.
function run(files) {
  const root = join(temp, String(count++));
  mkdirSync(join(root, "skills"), { recursive: true });
  for (const [path, content] of Object.entries(files)) {
    const full = join(root, "skills", path);
    if (content === null) mkdirSync(full, { recursive: true });
    else {
      mkdirSync(dirname(full), { recursive: true });
      writeFileSync(full, content);
    }
  }
  return { root, ...validate(root) };
}

function validate(root) {
  const { status, stdout, stderr } = spawnSync(process.execPath, [script, root], { encoding: "utf8" });
  return { status, stdout, stderr };
}

const skill = (front, body = "Do the thing.\n") => `---\n${front}\n---\n\n${body}`;
const good = (name = "demo", extra = "") => skill(`name: ${name}\ndescription: Do the thing. Use for "do it".${extra}`);

// Every message is one line: "<level>: <file>: <problem>. <fix>."
function expectOne(result, level, pattern) {
  const lines = result.stderr.trim().split("\n");
  assert.equal(lines.length, 1, result.stderr);
  assert.match(lines[0], new RegExp(`^${level}: \\S+: .+\\. [A-Z].+\\.$`), lines[0]);
  assert.match(lines[0], pattern);
  assert.equal(result.status, level === "error" ? 1 : 0, result.stderr);
}

test("a valid skill prints ok", () => {
  const result = run({ "demo/SKILL.md": good(), "demo/ref.md": "[back](SKILL.md)\n" });
  assert.equal(result.stdout, "ok\n");
  assert.equal(result.stderr, "");
  assert.equal(result.status, 0);
});

test("folded and quoted descriptions and metadata parse", () => {
  const front = 'name: demo\ndescription: >-\n  Do the thing:\n  then stop.\nlicense: "MIT"\ncompatibility: \'any\'\nmetadata:\n  version: 1';
  const result = run({ "demo/SKILL.md": skill(front) });
  assert.equal(result.stderr, "");
  assert.equal(result.status, 0);
});

test("missing skills folder", () => {
  const result = validate(join(temp, "nowhere"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /^error: .*skills: not found\. Pass the repository root/);
});

const errors = [
  ["missing SKILL.md", { "demo/": null }, /skills\/demo\/SKILL\.md: missing\. Add SKILL\.md/],
  ["no frontmatter", { "demo/SKILL.md": "# Demo\n" }, /no frontmatter\. Start the file with a "---" line/],
  ["CRLF frontmatter", { "demo/SKILL.md": good().replaceAll("\n", "\r\n") }, /no frontmatter\..*LF line endings/],
  ["line that is not key: value", { "demo/SKILL.md": skill("name: demo\n- description") }, /line 2 is not a top-level "key: value" pair\. Start it at column 0/],
  ["duplicate key", { "demo/SKILL.md": skill("name: demo\nname: demo\ndescription: x") }, /key "name" appears twice\. Keep one/],
  ["plain value continued on an indented line", { "demo/SKILL.md": skill("name: demo\ndescription: Do\n  more") }, /"description" continues onto an indented line\. Write "description: >-"/],
  ["unterminated double quote", { "demo/SKILL.md": skill('name: demo\ndescription: "Do') }, /"description" opens a double quote it never closes\. End the value with "/],
  ["unterminated single quote", { "demo/SKILL.md": skill("name: demo\ndescription: 'Do") }, /"description" opens a single quote it never closes\. End the value with '/],
  ["plain value with YAML syntax", { "demo/SKILL.md": skill("name: demo\ndescription: Do: this") }, /"description" is unquoted but contains YAML syntax.*\. Write "description: >-"/],
  ["unknown key", { "demo/SKILL.md": good("demo", "\nversion: 1") }, /unknown frontmatter key "version"\. Use only name, description.*put anything else under metadata:/],
  ["invalid folder name", { "Demo_Skill/SKILL.md": good("Demo_Skill") }, /folder name "Demo_Skill" is invalid\. Rename the folder and the name field/],
  ["name longer than 64", { [`${"a".repeat(65)}/SKILL.md`]: good("a".repeat(65)) }, /is invalid\..*at most 64 characters/],
  ["name differs from folder", { "demo/SKILL.md": good("other") }, /name is "other" but the folder is "demo"\. Set "name: demo"/],
  ["missing description", { "demo/SKILL.md": skill("name: demo") }, /no description\. Add "description:"/],
  ["description over 1024", { "demo/SKILL.md": skill(`name: demo\ndescription: ${"x".repeat(1025)}`) }, /description is 1025 characters \(limit 1024\)\. Cut it/],
  ["20,000 bytes or more", { "demo/SKILL.md": good() + "x".repeat(20000) }, /SKILL\.md: \d+ bytes \(must stay under 20000.*\)\. Move detail/],
  ["over 500 lines", { "demo/SKILL.md": good() + "x\n".repeat(500) }, /SKILL\.md: \d+ lines \(limit 500\)\. Move detail/],
  ["link outside the folder", { "demo/SKILL.md": good() + "[x](../other/SKILL.md)\n" }, /SKILL\.md: link "\.\.\/other\/SKILL\.md" leaves skills\/demo\/\. Copy what it needs/],
  ["broken link", { "demo/SKILL.md": good() + "[x](missing.md)\n" }, /SKILL\.md: link "missing\.md" points to a missing file\. Fix the path/],
  ["broken link in a sibling file", { "demo/SKILL.md": good(), "demo/refs/a.md": "[x](b.md)\n" }, /skills\/demo\/refs\/a\.md: link "b\.md" points to a missing file/],
];

for (const [name, files, pattern] of errors) {
  test(`error: ${name}`, () => expectOne(run(files), "error", pattern));
}

test("error: link through a symlink that leaves the folder", () => {
  const result = run({ "demo/SKILL.md": good() + "[x](out.md)\n", "outside.md": "secret\n" });
  symlinkSync(join(result.root, "skills", "outside.md"), join(result.root, "skills", "demo", "out.md"));
  expectOne(validate(result.root), "error", /link "out\.md" is a symlink to a file outside skills\/demo\/\. Replace the symlink/);
});

test("warn: description over 300 characters", () => {
  expectOne(run({ "demo/SKILL.md": skill(`name: demo\ndescription: ${"x".repeat(301)}`) }), "warn", /description is 301 characters \(aim for 300 or fewer\)\. Cut it/);
});

test("warn: SKILL.md over 100 lines", () => {
  const text = good();
  const lines = text.split("\n").length;
  expectOne(run({ "demo/SKILL.md": text + "x\n".repeat(101 - lines) }), "warn", /SKILL\.md: 101 lines \(aim for 100 or fewer\)\. Cut lines/);
});

test("limits are inclusive: 300 characters and 100 lines pass clean", () => {
  const text = skill(`name: demo\ndescription: ${"x".repeat(300)}`);
  const result = run({ "demo/SKILL.md": text + "x\n".repeat(100 - text.split("\n").length) });
  assert.equal(result.stderr, "");
  assert.equal(result.status, 0);
});
