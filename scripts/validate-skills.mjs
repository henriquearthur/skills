#!/usr/bin/env node
// Validates every skill under skills/. Run: node scripts/validate-skills.mjs
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");

const KNOWN_KEYS = new Set([
  "name",
  "description",
  "disable-model-invocation",
  "allowed-tools",
  "license",
  "metadata",
]);
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_DESCRIPTION = 1024;

const errors = [];
const warnings = [];
const error = (file, message) => errors.push(`${file}: ${message}`);
const warn = (file, message) => warnings.push(`${file}: ${message}`);

function parseFrontmatter(source) {
  const lines = source.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return null;
  const close = lines.indexOf("---", 1);
  if (close === -1) return null;

  const frontmatter = {};
  for (const line of lines.slice(1, close)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1");
    frontmatter[key] = value;
  }
  return frontmatter;
}

function linkTargets(source) {
  // Links inside fenced code blocks are illustrative, not real targets.
  const prose = source.replace(/^```[\s\S]*?^```/gm, "");
  return [...prose.matchAll(/\[[^\]]*\]\(([^)\s]+)/g)]
    .map((match) => match[1])
    .filter((target) => !/^(https?:|mailto:|#)/.test(target))
    .map((target) => target.split("#")[0])
    .filter(Boolean);
}

if (!existsSync(SKILLS_DIR)) {
  console.error("No skills/ directory found.");
  process.exit(1);
}

const readme = existsSync(join(ROOT, "README.md"))
  ? readFileSync(join(ROOT, "README.md"), "utf8")
  : "";

const subdirectories = (parent) =>
  readdirSync(parent)
    .filter((entry) => !entry.startsWith("."))
    .filter((entry) => statSync(join(parent, entry)).isDirectory())
    .sort();

// skills/<bucket>/<skill>/SKILL.md
const skills = subdirectories(SKILLS_DIR).flatMap((bucket) => {
  if (existsSync(join(SKILLS_DIR, bucket, "SKILL.md")))
    error(`skills/${bucket}`, "skills live in a bucket: skills/<bucket>/<skill>/");
  return subdirectories(join(SKILLS_DIR, bucket)).map((dir) => ({ bucket, dir }));
});

if (skills.length === 0) errors.push("skills/: no skills found");

for (const { bucket, dir } of skills) {
  const skillDir = join(SKILLS_DIR, bucket, dir);
  const skillPath = join(skillDir, "SKILL.md");
  const label = `skills/${bucket}/${dir}/SKILL.md`;

  if (!existsSync(skillPath)) {
    error(`skills/${bucket}/${dir}`, "missing SKILL.md");
    continue;
  }

  const source = readFileSync(skillPath, "utf8");
  const frontmatter = parseFrontmatter(source);

  if (!frontmatter) {
    error(label, "missing or unterminated YAML frontmatter (--- ... ---)");
    continue;
  }

  const { name, description } = frontmatter;

  if (!name) error(label, "frontmatter is missing `name`");
  else if (!KEBAB_CASE.test(name))
    error(label, `name "${name}" is not kebab-case`);
  else if (name !== dir)
    error(label, `name "${name}" does not match directory "${dir}"`);

  if (!description) error(label, "frontmatter is missing `description`");
  else if (description.length > MAX_DESCRIPTION)
    error(
      label,
      `description is ${description.length} chars (max ${MAX_DESCRIPTION})`,
    );

  const userInvoked = frontmatter["disable-model-invocation"];
  if (userInvoked !== undefined && !["true", "false"].includes(userInvoked))
    error(label, "`disable-model-invocation` must be true or false");

  for (const key of Object.keys(frontmatter))
    if (!KNOWN_KEYS.has(key)) warn(label, `unknown frontmatter key \`${key}\``);

  for (const target of linkTargets(source))
    if (!existsSync(resolve(skillDir, target)))
      error(label, `link target does not exist: ${target}`);

  if (readme && !readme.includes(`./skills/${bucket}/${dir}/SKILL.md`))
    error("README.md", `does not link skill "${bucket}/${dir}"`);
}

for (const message of warnings) console.warn(`warn  ${message}`);
for (const message of errors) console.error(`error ${message}`);

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s) across ${skills.length} skill(s).`);
  process.exit(1);
}

console.log(`OK — ${skills.length} skill(s) validated.`);
