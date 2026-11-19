// Run: node --test
// Each case builds a throwaway repository with one skill and runs the
// validator against it.

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";

const script = join(dirname(fileURLToPath(import.meta.url)), "validate-repo.mjs");
const temp = mkdtempSync(join(tmpdir(), "validate-repo-"));
after(() => rmSync(temp, { recursive: true, force: true }));

let count = 0;
const section = (name, stage = "Build") => `## ${name}\n\nStage: ${stage}\nFor you: do it.\nFixes: It went wrong.\nOrigin: seen here\n\n`;
// files maps paths under skills/ to contents; null makes a folder. failures
// is FAILURES.md; by default it has one good section per skill folder.
function run(files, failures) {
  const root = join(temp, String(count++));
  mkdirSync(join(root, "skills"), { recursive: true });
  const folders = new Set(Object.keys(files).filter((path) => path.includes("/")).map((path) => path.split("/")[0]));
  if (failures === undefined) failures = "# Failure log\n\n" + [...folders].map((name) => section(name)).join("");
  if (failures !== null) writeFileSync(join(root, "FAILURES.md"), failures);
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
const countLines = (text) => text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
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
  ["plain value continued on an indented line", { "demo/SKILL.md": skill("name: demo\ndescription: Do\n  more") }, /the line after "description" is indented\. If it starts a new key, move it to column 0; if it continues "description", write "description: >-"/],
  ["unterminated double quote", { "demo/SKILL.md": skill('name: demo\ndescription: "Do') }, /"description" opens a double quote it never closes\. End the value with "/],
  ["unterminated single quote", { "demo/SKILL.md": skill("name: demo\ndescription: 'Do") }, /"description" opens a single quote it never closes\. End the value with '/],
  ["plain value with YAML syntax", { "demo/SKILL.md": skill("name: demo\ndescription: Do: this") }, /"description" is unquoted but contains YAML syntax.*\. Write "description: >-"/],
  ["unknown key", { "demo/SKILL.md": good("demo", "\nversion: 1") }, /unknown frontmatter key "version"\. Use only name, description.*nest anything else under metadata/],
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

test("a bad folder name is reported even when the frontmatter is broken", () => {
  const result = run({ "Demo/SKILL.md": "# Demo\n" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /folder name "Demo" is invalid/);
  assert.match(result.stderr, /no frontmatter/);
});

test("error: link through a symlink that leaves the folder", () => {
  const result = run({ "demo/SKILL.md": good() + "[x](out.md)\n", "outside.md": "secret\n" });
  symlinkSync(join(result.root, "skills", "outside.md"), join(result.root, "skills", "demo", "out.md"));
  expectOne(validate(result.root), "error", /link "out\.md" is a symlink to a file outside skills\/demo\/\. Replace the symlink/);
});

const warnChars = Number(readFileSync(script, "utf8").match(/const DESCRIPTION_WARN_CHARS = (\d+);/)[1]);

test("warn: description over the house limit", () => {
  expectOne(run({ "demo/SKILL.md": skill(`name: demo\ndescription: ${"x".repeat(warnChars + 1)}`) }), "warn", new RegExp(`description is ${warnChars + 1} characters \\(aim for ${warnChars} or fewer\\)\\. Cut it`));
});

test("warn: SKILL.md over 100 lines", () => {
  const text = good();
  expectOne(run({ "demo/SKILL.md": text + "x\n".repeat(101 - countLines(text)) }), "warn", /SKILL\.md: 101 lines \(aim for 100 or fewer\)\. Cut lines/);
});

test("limits are inclusive: the house description limit and 100 lines pass clean", () => {
  const text = skill(`name: demo\ndescription: ${"x".repeat(warnChars)}`);
  const result = run({ "demo/SKILL.md": text + "x\n".repeat(100 - countLines(text)) });
  assert.equal(result.stderr, "");
  assert.equal(result.status, 0);
});

test("frontmatter with no newline after the closing --- still parses", () => {
  const result = run({ "demo/SKILL.md": "---\nname: demo\ndescription: Do the thing.\n---" });
  assert.equal(result.stderr, "");
  assert.equal(result.status, 0);
});

test("error: an indented key is reported as such", () => {
  expectOne(run({ "demo/SKILL.md": skill("name: demo\n  description: Do the thing.") }), "error", /the line after "name" is indented\. If it starts a new key, move it to column 0/);
});

const failureErrors = [
  ["FAILURES.md missing", null, /^error: FAILURES\.md: not found\. Add it with one "## <name>" section per skill/],
  ["no section for a skill", "# Failure log\n", /FAILURES\.md: no "## demo" section for skills\/demo\/\. Add one with Stage:, For you:, Fixes: and Origin: lines/],
  ["section for a missing skill", section("demo") + section("gone"), /FAILURES\.md: "## gone" has no skills\/gone\/ folder\. Delete the section, or rename it/],
  ["section twice", section("demo") + section("demo"), /FAILURES\.md: "## demo" appears twice\. Merge the two sections/],
  ["missing line", section("demo").replace("Fixes: It went wrong.\n", ""), /FAILURES\.md: "## demo" has no "Fixes:" line\. Add "Fixes: \.\.\." on its own line/],
  ["line twice", section("demo").replace("Origin:", "Origin: upstream\nOrigin:"), /FAILURES\.md: "## demo" has 2 "Origin:" lines\. Keep one/],
  ["empty line", section("demo").replace("For you: do it.", "For you:"), /FAILURES\.md: "## demo" has an empty "For you:" line\. Fill it in/],
  ["unknown stage", section("demo", "Ship"), /FAILURES\.md: "## demo" has Stage "Ship"\. Use one of Think, Plan, Build, Check, Explain, Improve, Write/],
  ["unknown origin", section("demo").replace("seen here", "folklore"), /FAILURES\.md: "## demo" has Origin "folklore"\. Use one of seen here, upstream, inherited/],
];

for (const [name, failures, pattern] of failureErrors) {
  test(`error: ${name}`, () => expectOne(run({ "demo/SKILL.md": good() }, failures), "error", pattern));
}

test("error: names and descriptions over the startup budget", () => {
  const limit = Number(readFileSync(script, "utf8").match(/const STARTUP_MAX_BYTES = (\d+);/)[1]);
  const files = {};
  // Descriptions at the house limit stay clear of the description warning.
  const skills = Math.ceil(limit / warnChars) + 1;
  for (let i = 0; i < skills; i++) files[`s${i}/SKILL.md`] = skill(`name: s${i}\ndescription: ${"x".repeat(warnChars)}`);
  const total = Array.from({ length: skills }, (_, i) => `s${i}`.length + warnChars).reduce((a, b) => a + b);
  expectOne(run(files), "error", new RegExp(`^error: skills/: names and descriptions total ${total} bytes.*\\(budget ${limit}\\)\\. Trim a description, or raise STARTUP_MAX_BYTES`));
});

test("the limits quoted in CONTRIBUTING.md and AGENTS.md match the script", () => {
  const repo = join(dirname(script), "..");
  const source = readFileSync(script, "utf8");
  const limit = (name) => Number(source.match(new RegExp(`const ${name} = (\\d+);`))[1]);
  const grouped = (n) => n.toLocaleString("en-US");
  const contributing = readFileSync(join(repo, "CONTRIBUTING.md"), "utf8").replace(/\s+/g, " ");
  const agents = readFileSync(join(repo, "AGENTS.md"), "utf8").replace(/\s+/g, " ");
  assert.ok(contributing.includes(`${limit("DESCRIPTION_WARN_CHARS")} characters or fewer`));
  assert.ok(contributing.includes(`fails above ${grouped(limit("DESCRIPTION_MAX_CHARS"))}`));
  assert.ok(contributing.includes(`${limit("SKILL_WARN_LINES")} lines or fewer`));
  assert.ok(contributing.includes(`under ${grouped(limit("SKILL_MAX_BYTES"))} bytes`));
  assert.ok(agents.includes(`${limit("DESCRIPTION_WARN_CHARS")} characters or fewer`));
});

test("error: plugin manifests that disagree on version", () => {
  const { root } = run({ "demo/SKILL.md": good() });
  const manifest = (dir, json) => {
    mkdirSync(join(root, dir), { recursive: true });
    writeFileSync(join(root, dir, "plugin.json"), JSON.stringify(json));
  };
  manifest(".claude-plugin", { name: "demo", version: "1.0.0" });
  manifest(".cursor-plugin", { name: "demo", version: "1.0.0" });
  assert.equal(validate(root).stdout, "ok\n");
  manifest(".codex-plugin", { name: "demo", version: "1.1.0" });
  expectOne(validate(root), "error", /^error: \.codex-plugin\/plugin\.json: version is "1\.1\.0" but \.claude-plugin\/plugin\.json has "1\.0\.0"/);
});
