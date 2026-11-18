#!/usr/bin/env node
// Run the eval suite per skill and summarise it. No dependencies.
//
//   node evals/run.mjs [--model sonnet] [--arm skill|full] [--skill a,b]
//                      [--case <glob>] [--runs 3] [--max-cost-usd 10]
//                      [--judge-model haiku] [--out <dir>] [--keep-temp] [--dry-run]
//   node evals/run.mjs summary <out dir> [--model opus] [--write]
//
// A case belongs to the skill named first in its prompt.md `tags`.
//
// --arm skill (default): for each skill, a throwaway plugin holding only that
//   skill and its cases, run against the built-in no-plugin baseline. This
//   is the with/without number for the skill.
// --arm full: one plugin holding every skill in skills/ and every case,
//   with-arm only (its baseline is the same no-plugin run as the skill arm).
//
// Plugins are built in a temporary folder outside the repo and deleted after.
// Each run writes <out>/<arm>-<model>.json (the `claude plugin eval --json`
// result). `summary` reads every such file in <out> and prints a markdown
// table; with --write it also writes evals/summary.json from the skill arms
// of --model, the file scripts/build-index.mjs reads for the README.
//
// Reports are never published (--no-publish). Locally, run it as
// `env -u ANTHROPIC_API_KEY -u ANTHROPIC_AUTH_TOKEN node evals/run.mjs ...`
// to use your Claude login; in CI, ANTHROPIC_API_KEY is the credential.

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";

const evalsDir = import.meta.dirname;
const root = resolve(evalsDir, "..");

function parseArgs(argv) {
  const opts = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) opts._.push(arg);
    else if (["--keep-temp", "--dry-run", "--write"].includes(arg)) opts[arg.slice(2)] = true;
    else opts[arg.slice(2)] = argv[++i];
  }
  return opts;
}

// Every case folder under evals/ with its skill (the first tag).
function cases() {
  return readdirSync(evalsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(evalsDir, d.name, "prompt.md")))
    .map((d) => {
      const text = readFileSync(join(evalsDir, d.name, "prompt.md"), "utf8");
      const tags = text.match(/^tags:\s*\[([^\]]*)\]/m)?.[1].split(",").map((t) => t.trim()) ?? [];
      return { name: d.name, skill: tags[0] };
    });
}

function buildPlugin(dir, name, skills, caseNames) {
  mkdirSync(join(dir, ".claude-plugin"), { recursive: true });
  writeFileSync(join(dir, ".claude-plugin", "plugin.json"), JSON.stringify({ name }) + "\n");
  for (const skill of skills) cpSync(join(root, "skills", skill), join(dir, "skills", skill), { recursive: true });
  for (const c of caseNames) cpSync(join(evalsDir, c), join(dir, "evals", c), { recursive: true });
}

function run(opts) {
  const model = opts.model ?? "sonnet";
  const arm = opts.arm ?? "skill";
  const all = cases();
  const wanted = opts.skill ? opts.skill.split(",") : [...new Set(all.map((c) => c.skill))];
  for (const skill of wanted) {
    if (!existsSync(join(root, "skills", skill, "SKILL.md"))) throw new Error(`no skill "${skill}" in skills/`);
  }
  const out = resolve(opts.out ?? join(evalsDir, "results", `run-${new Date().toISOString().replace(/[:.]/g, "-")}`));
  mkdirSync(out, { recursive: true });
  const work = mkdtempSync(join(tmpdir(), "agent-config-evals-"));

  const jobs =
    arm === "full"
      ? [{ label: `full-${model}`, name: "agent-config", skills: readdirSync(join(root, "skills")), cases: all.filter((c) => wanted.includes(c.skill)) }]
      : wanted.map((skill) => ({ label: `skill-${skill}-${model}`, name: `agent-config-${skill}`, skills: [skill], cases: all.filter((c) => c.skill === skill) }));

  let failed = false;
  try {
    for (const job of jobs) {
      const dir = join(work, job.label);
      buildPlugin(dir, job.name, job.skills, job.cases.map((c) => c.name));
      const args = [
        "plugin", "eval", ".", "--no-publish", "--trust-plugin", "--scaffold",
        "--allow-tools", "Bash", "Write", "Edit",
        "--model", model, "--judge-model", opts["judge-model"] ?? "haiku",
        "-j", "2", "--runs", String(opts.runs ?? 3), "--threshold", "0",
        "--max-cost-usd", String(opts["max-cost-usd"] ?? 10),
        "--ablation", arm === "full" ? "none" : "with-without",
        "--json", join(out, `${job.label}.json`), "--output-dir", join(out, job.label),
      ];
      if (opts.case) args.push("--case", opts.case);
      if (opts["keep-temp"]) args.push("--keep-temp");
      console.log(`\n## ${job.label}: ${job.cases.map((c) => c.name).join(", ")}\n$ claude ${args.join(" ")}`);
      if (opts["dry-run"]) continue;
      const result = spawnSync("claude", args, { cwd: dir, stdio: "inherit" });
      if (result.status !== 0) {
        console.error(`${job.label}: claude exited ${result.status}`);
        failed = true;
      }
    }
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
  console.log(`\nresults: ${out}\nsummary: node evals/run.mjs summary ${out}`);
  if (failed) process.exitCode = 1;
}

// A run passes when it has no error and every scored grader passed.
const passed = (r) => !r.error && r.graders.every((g) => g.passed || g.scored === false);
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const round = (x) => Math.round(x * 100) / 100;

function load(out) {
  const rows = [];
  for (const file of readdirSync(out).filter((f) => f.endsWith(".json") && !f.includes("aggregate"))) {
    const doc = JSON.parse(readFileSync(join(out, file), "utf8"));
    if (!doc.cases) continue;
    const label = basename(file, ".json");
    const arm = label.startsWith("full-") ? "full" : "skill";
    const model = doc.suite?.modelOverride ?? label.split("-").at(-1);
    for (const c of doc.cases) {
      const row = { file, label, arm, model, case: c.name, skill: c.tags?.[0] ?? null, cost: 0 };
      for (const side of ["with", "without"]) {
        const runs = c.arms?.[side] ?? [];
        if (!runs.length) continue;
        row[side] = { score: mean(runs.map((r) => r.score ?? 0)), passes: runs.filter(passed).length, runs: runs.length };
        row.cost += runs.reduce((a, r) => a + (r.costUsd ?? 0) + (r.judgeCostUsd ?? 0), 0);
      }
      const fired = (c.arms?.with ?? []).filter((r) => r.graders.some((g) => g.name === "skill-fired" && g.passed)).length;
      row.fired = `${fired}/${c.arms?.with?.length ?? 0}`;
      rows.push(row);
    }
    rows.costTotal = (rows.costTotal ?? 0) + (doc.costUsd ?? 0);
  }
  return rows;
}

function summary(opts) {
  const out = resolve(opts._[1] ?? "");
  const rows = load(out);
  const skillOf = Object.fromEntries(cases().map((c) => [c.name, c.skill]));
  for (const r of rows) r.skill ??= skillOf[r.case];
  const cell = (s) => (s ? `${s.score.toFixed(2)} (${s.passes}/${s.runs})` : "");
  console.log("| skill | case | model | arm | with | without | skill fired |\n|---|---|---|---|---|---|---|");
  for (const r of rows.sort((a, b) => (a.skill + a.case + a.model + a.arm).localeCompare(b.skill + b.case + b.model + b.arm))) {
    console.log(`| ${r.skill} | ${r.case} | ${r.model} | ${r.arm} | ${cell(r.with)} | ${cell(r.without)} | ${r.fired} |`);
  }
  console.log(`\ntotal cost: $${(rows.costTotal ?? 0).toFixed(2)}`);
  if (!opts.write) return;
  const model = opts.model ?? "opus";
  const skills = {};
  for (const r of rows.filter((x) => x.arm === "skill" && x.model === model && x.with && x.without)) {
    (skills[r.skill] ??= []).push(r);
  }
  const doc = { generated: new Date().toISOString().slice(0, 10), model, skills: {} };
  for (const [skill, list] of Object.entries(skills).sort()) {
    const w = round(mean(list.map((r) => r.with.passes / r.with.runs)));
    const wo = round(mean(list.map((r) => r.without.passes / r.without.runs)));
    doc.skills[skill] = { cases: list.length, with: w, without: wo, delta: round(w - wo) };
  }
  writeFileSync(join(evalsDir, "summary.json"), JSON.stringify(doc, null, 2) + "\n");
  console.log(`wrote evals/summary.json (${model}, ${Object.keys(doc.skills).length} skills)`);
}

const opts = parseArgs(process.argv.slice(2));
if (opts._[0] === "summary") summary(opts);
else run(opts);
