#!/usr/bin/env node
// Runs the trigger suite with `claude plugin eval` and prints one table:
// per skill, how often it fired when it should and when it should not.
//
//   node evals/triggers/run.mjs [--model haiku] [--runs 3] [--case <glob>]
//                               [--max-cost-usd 2] [-j 2]
//   node evals/triggers/run.mjs --from <results dir>   (reprint, no runs)
//
// Each run's trace is copied into the results dir so the table can name the
// skill that fired instead; the eval's kept temp dirs are then removed.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');

// Case folders are named <skill>--fire-1, <skill>--fire-2 and <skill>--not.
export function parseCaseName(name) {
  const m = /^(.+)--(fire-\d+|not)$/.exec(name);
  return m && { skill: m[1], shouldFire: m[2] !== 'not' };
}

// Skill names loaded in one trace (JSONL text), namespace stripped.
export function skillsInTrace(text) {
  const fired = [];
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    let event;
    try { event = JSON.parse(line); } catch { continue; }
    const content = event.type === 'assistant' && event.message?.content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (part.type === 'tool_use' && part.name === 'Skill' && part.input?.skill) {
        fired.push(String(part.input.skill));
      }
    }
  }
  return fired;
}

const bare = (s) => s.replace(/^[\w-]+:/, '');

// A run that stopped for any reason but the turn cap says nothing about
// triggering (rate limit, timeout, crash); it is left out of the counts.
const errored = (run) => run.error && !/maximum number of turns/i.test(run.error);

// result: aggregate JSON from `claude plugin eval --json`.
// firedFor(caseName, runIndex): skills loaded in that run, or null if unknown.
export function summarize(result, firedFor = () => null) {
  const rows = new Map();
  for (const c of result.cases) {
    const parsed = parseCaseName(c.name);
    if (!parsed) continue;
    const row = rows.get(parsed.skill) ?? { skill: parsed.skill, fired: 0, fireRuns: 0,
      falseFires: 0, notRuns: 0, errored: 0, instead: {} };
    rows.set(parsed.skill, row);
    (c.arms?.with ?? []).forEach((run, i) => {
      if (errored(run)) { row.errored++; return; }
      if (parsed.shouldFire) {
        row.fireRuns++;
        if (run.passed) { row.fired++; return; }
        const others = (firedFor(c.name, i) ?? []).map(bare).filter((s) => s !== parsed.skill);
        const key = others.length ? others.join('+') : 'none';
        row.instead[key] = (row.instead[key] ?? 0) + 1;
      } else {
        row.notRuns++;
        if (!run.passed) row.falseFires++;
      }
    });
  }
  return [...rows.values()].sort((a, b) => a.skill.localeCompare(b.skill));
}

export function formatTable(rows) {
  const lines = ['| skill | fired / should-fire | false / should-not | on a miss, fired instead |',
    '|---|---|---|---|'];
  for (const r of rows) {
    const instead = Object.entries(r.instead).map(([k, n]) => `${k} (${n})`).join(', ');
    const err = r.errored ? ` (${r.errored} errored)` : '';
    lines.push(`| ${r.skill} | ${r.fired}/${r.fireRuns} | ${r.falseFires}/${r.notRuns} | ${instead}${err} |`);
  }
  const sum = (k) => rows.reduce((n, r) => n + r[k], 0);
  lines.push(`| **all** | ${sum('fired')}/${sum('fireRuns')} | ${sum('falseFires')}/${sum('notRuns')} | |`);
  return lines.join('\n');
}

function report(dir) {
  const result = JSON.parse(fs.readFileSync(path.join(dir, 'result.json'), 'utf8'));
  const firedFor = (name, i) => {
    const file = path.join(dir, 'traces', `${name}.${i}.jsonl`);
    return fs.existsSync(file) ? skillsInTrace(fs.readFileSync(file, 'utf8')) : null;
  };
  console.log(`${result.startedAt}  model ${result.suite.modelOverride ?? 'per case'}  ` +
    `Claude Code ${result.claudeVersion}  cost $${result.costUsd.toFixed(2)}` +
    (result.partial ? '  PARTIAL (cost ceiling hit)' : ''));
  console.log(formatTable(summarize(result, firedFor)));
}

function main(argv) {
  const opts = { model: 'haiku', runs: '3', case: null, cost: '2', j: '2', from: null };
  for (let i = 0; i < argv.length; i++) {
    const [flag, value] = [argv[i], argv[i + 1]];
    if (flag === '--model') opts.model = value;
    else if (flag === '--runs') opts.runs = value;
    else if (flag === '--case') opts.case = value;
    else if (flag === '--max-cost-usd') opts.cost = value;
    else if (flag === '-j') opts.j = value;
    else if (flag === '--from') opts.from = value;
    else { console.error(`unknown flag ${flag}`); process.exit(2); }
    i++;
  }
  if (opts.from) return report(opts.from);

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const out = path.join(here, 'results', `${stamp}-${opts.model}`);
  fs.mkdirSync(path.join(out, 'traces'), { recursive: true });
  const args = ['plugin', 'eval', root, '--eval-dir', 'evals/triggers', '--no-publish',
    '--trust-plugin', '--scaffold', '--ablation', 'none', '--keep-temp', '--model', opts.model,
    '--runs', opts.runs, '-j', opts.j, '--max-cost-usd', opts.cost,
    '--output-dir', out, '--json', path.join(out, 'result.json')];
  if (opts.case) args.push('--case', opts.case);
  const env = { ...process.env };
  delete env.ANTHROPIC_API_KEY; // an API key would win over the login
  delete env.ANTHROPIC_AUTH_TOKEN;
  const run = spawnSync('claude', args, { stdio: ['ignore', 'inherit', 'inherit'], env, cwd: root });
  const resultFile = path.join(out, 'result.json');
  if (!fs.existsSync(resultFile)) process.exit(run.status ?? 1);

  // Keep each trace beside the result, then drop the eval's kept temp dir.
  const result = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
  for (const c of result.cases) {
    (c.arms?.with ?? []).forEach((r, i) => {
      if (!r.tracePath || !fs.existsSync(r.tracePath)) return;
      fs.copyFileSync(r.tracePath, path.join(out, 'traces', `${c.name}.${i}.jsonl`));
      const temp = path.dirname(path.dirname(r.tracePath));
      if (/claude-eval-/.test(path.basename(temp))) {
        spawnSync('chmod', ['-R', 'u+rwX', temp]);
        fs.rmSync(temp, { recursive: true, force: true });
      }
    });
  }
  report(out);
  console.log(`\nresults: ${path.relative(root, out)}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
