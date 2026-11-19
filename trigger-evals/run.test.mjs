import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCaseName, skillsInTrace, summarize, formatTable } from './run.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

test('parseCaseName reads skill and direction', () => {
  assert.deepEqual(parseCaseName('code-review--fire-2'), { skill: 'code-review', shouldFire: true });
  assert.deepEqual(parseCaseName('code-review--not'), { skill: 'code-review', shouldFire: false });
  assert.deepEqual(parseCaseName('reflect--not-2'), { skill: 'reflect', shouldFire: false });
  assert.equal(parseCaseName('persist-todos'), null);
});

test('skillsInTrace lists Skill tool calls only', () => {
  const trace = [
    { type: 'assistant', message: { content: [{ type: 'tool_use', name: 'Glob', input: {} }] } },
    { type: 'assistant', message: { content: [{ type: 'tool_use', name: 'Skill', input: { skill: 'amagdy-skills:writing-plans' } }] } },
    { type: 'user', message: { content: 'Launching skill' } },
  ].map((e) => JSON.stringify(e)).join('\n');
  assert.deepEqual(skillsInTrace(trace), ['amagdy-skills:writing-plans']);
});

test('summarize counts fires, false fires, misses and errors', () => {
  const result = { cases: [
    { name: 'implement--fire-1', arms: { with: [{ passed: true }, { passed: false }] } },
    { name: 'implement--fire-2', arms: { with: [{ passed: false, error: 'exit 1: Reached maximum number of turns (4)' },
      { passed: false, error: 'rate limited' }] } },
    { name: 'implement--not', arms: { with: [{ passed: false }, { passed: true }] } },
  ] };
  const fired = { 'implement--fire-1.1': ['amagdy-skills:writing-plans'] };
  const [row] = summarize(result, (name, i) => fired[`${name}.${i}`] ?? []);
  assert.deepEqual({ ...row, instead: { ...row.instead } }, { skill: 'implement', fired: 1, fireRuns: 3,
    falseFires: 1, notRuns: 2, errored: 1, instead: { 'writing-plans': 1, none: 1 } });
  assert.match(formatTable([row]), /\| implement \| 1\/3 \| 1\/2 \| writing-plans \(1\), none \(1\) \(1 errored\) \|/);
});

test('a built-in skill of the same name counts as a miss, not as none', () => {
  const result = { cases: [{ name: 'code-review--fire-1', arms: { with: [{ passed: false }, { passed: false }] } }] };
  const fired = { 'code-review--fire-1.0': ['code-review'], 'code-review--fire-1.1': ['amagdy-skills:code-review'] };
  const [row] = summarize(result, (name, i) => fired[`${name}.${i}`]);
  assert.deepEqual({ ...row.instead }, { 'code-review (built-in)': 1, none: 1 });
});

test('every trigger case has its grader and scaffold', () => {
  const cases = fs.readdirSync(here).filter((d) => parseCaseName(d));
  assert.ok(cases.length > 0);
  for (const name of cases) {
    const { skill, shouldFire } = parseCaseName(name);
    assert.ok(fs.existsSync(path.join(here, '..', 'skills', skill, 'SKILL.md')), `${name}: no skill ${skill}`);
    const grader = fs.readFileSync(path.join(here, name, 'graders', shouldFire ? 'fires.md' : 'stays-quiet.md'), 'utf8');
    assert.match(grader, /type: tool_used/);
    assert.ok(grader.replace(/\\/g, '').includes(`:${skill}"`), `${name}: grader does not name ${skill}`);
    assert.ok(fs.existsSync(path.join(here, name, 'scaffold.sh')), `${name}: no scaffold.sh`);
  }
});
