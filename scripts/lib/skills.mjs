// Parse the frontmatter subset skills use: top-level `key: value` pairs whose
// values are plain, quoted, or folded/literal block scalars, plus an indented
// `metadata:` mapping. Anything a strict YAML loader would reject or read
// differently, such as an unquoted ": " inside a plain value, is an error.
export function parseFrontmatter(text) {
  const fields = {};
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "" || line.trimStart().startsWith("#")) continue;
    const match = line.match(/^([A-Za-z][\w-]*):(?:\s+(.*))?$/);
    if (!match) throw new Error(`frontmatter line ${i + 1} is not a top-level "key: value" pair. Start it at column 0 as "key: value", or indent it under the key it continues`);
    const [, key, raw = ""] = match;
    if (key in fields) throw new Error(`frontmatter key "${key}" appears twice. Keep one`);
    const block = [];
    while (i + 1 < lines.length && /^(\s+\S|\s*$)/.test(lines[i + 1])) block.push(lines[++i].trim());
    let value = raw.trim();
    if (/^[>|][+-]?$/.test(value)) {
      value = raw.trim().startsWith(">") ? block.filter(Boolean).join(" ") : block.join("\n").trim();
    } else if (value === "" && block.length) {
      value = Object.fromEntries(block.filter(Boolean).map((entry) => entry.split(/:\s*/, 2)));
    } else if (block.some(Boolean)) {
      throw new Error(`the line after "${key}" is indented. If it starts a new key, move it to column 0; if it continues "${key}", write "${key}: >-" and put the whole value on the indented lines below it`);
    } else if (/^"/.test(value)) {
      if (!/^"(?:[^"\\]|\\.)*"$/.test(value)) throw new Error(`"${key}" opens a double quote it never closes. End the value with " and escape inner quotes as \\"`);
      value = JSON.parse(value);
    } else if (/^'/.test(value)) {
      if (!/^'(?:[^']|'')*'$/.test(value)) throw new Error(`"${key}" opens a single quote it never closes. End the value with ' and double inner quotes as ''`);
      value = value.slice(1, -1).replace(/''/g, "'");
    } else if (/: |\s#|^[-?:,[\]{}#&*!|>%@`]/.test(value)) {
      throw new Error(`"${key}" is unquoted but contains YAML syntax (": ", " #" or a leading symbol). Write "${key}: >-" and put the value on the next indented line`);
    }
    fields[key] = value;
  }
  return fields;
}

// Read a SKILL.md's frontmatter fields, or null when the file has none.
// Throws when the frontmatter does not parse.
export function frontmatterOf(text) {
  const front = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  return front ? parseFrontmatter(front[1]) : null;
}

// What an agent loads for one skill at session start: its name and description.
export const startupBytes = (name, description) => Buffer.byteLength(name) + Buffer.byteLength(description);

// FAILURES.md holds one "## <name>" section per skill. Each starts with these
// lines; the README table and skills.json are built from them.
export const STAGES = ["Think", "Plan", "Build", "Check", "Explain", "Improve", "Write"];
export const ORIGINS = ["seen here", "upstream", "inherited"];
const FIELDS = { Stage: "stage", "For you": "forYou", Fixes: "fixes", Origin: "origin" };

// Parse FAILURES.md against the skill folders. Returns the sections in file
// order, keyed by skill name, and a list of "<problem>. <fix>" messages.
export function parseFailures(text, folders) {
  const bodies = new Map();
  const errors = [];
  let current = null;
  for (const line of text.split("\n")) {
    const heading = line.match(/^## (.*?)\s*$/);
    if (heading) {
      current = heading[1];
      if (bodies.has(current)) {
        errors.push(`"## ${current}" appears twice. Merge the two sections into one`);
        current = null;
      } else bodies.set(current, []);
    } else if (current !== null) bodies.get(current).push(line);
  }
  const sections = new Map();
  for (const [name, lines] of bodies) {
    if (!folders.includes(name)) {
      errors.push(`"## ${name}" has no skills/${name}/ folder. Delete the section, or rename it to match the skill's folder`);
      continue;
    }
    const entry = {};
    for (const [label, key] of Object.entries(FIELDS)) {
      const found = lines.filter((line) => line.startsWith(`${label}:`)).map((line) => line.slice(label.length + 1).trim());
      if (found.length === 0) errors.push(`"## ${name}" has no "${label}:" line. Add "${label}: ..." on its own line under the heading`);
      else if (found.length > 1) errors.push(`"## ${name}" has ${found.length} "${label}:" lines. Keep one`);
      else if (!found[0]) errors.push(`"## ${name}" has an empty "${label}:" line. Fill it in`);
      else entry[key] = found[0];
    }
    if (entry.stage && !STAGES.includes(entry.stage)) {
      errors.push(`"## ${name}" has Stage "${entry.stage}". Use one of ${STAGES.join(", ")}`);
    }
    if (entry.origin && !ORIGINS.includes(entry.origin)) {
      errors.push(`"## ${name}" has Origin "${entry.origin}". Use one of ${ORIGINS.join(", ")}`);
    }
    if (Object.keys(entry).length === Object.keys(FIELDS).length) sections.set(name, entry);
  }
  for (const name of folders) {
    if (!bodies.has(name)) {
      errors.push(`no "## ${name}" section for skills/${name}/. Add one with Stage:, For you:, Fixes: and Origin: lines; the top of FAILURES.md says what each means`);
    }
  }
  return { sections, errors };
}
