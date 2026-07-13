# Repo conventions

This repo publishes agent skills. Its only artifacts are Markdown files — there is no application to build or run.

## Layout

Skills are grouped into buckets by domain: `skills/<bucket>/<skill-name>/SKILL.md`, every directory kebab-case. Today there is one bucket — `orchestration/` (running agents with other agents: decomposing, dispatching, gating). A new skill that doesn't fit an existing bucket gets a new bucket rather than being forced into a bad one; a bucket exists only once a skill lives in it.

Optional sibling files hold anything the skill doesn't need on every run (long reference tables, harness-specific mechanics); `SKILL.md` links to them so the agent loads them on demand.

## Every skill

- `name` in the frontmatter matches its directory name.
- `description` says what the skill does and when to use it — that line is all the agent sees when deciding to reach for it. User-invoked skills (`disable-model-invocation: true`) don't need the trigger, since only the human invokes them.
- Is listed in the **Skills** section of `README.md`, under its bucket's heading and then under **User-invoked** or **Model-invoked** to match its frontmatter. A skill missing from the README is a bug; so is a README entry for a skill that no longer exists.
- Stays harness-agnostic (Claude Code and Codex both). Where a harness genuinely differs, name it and push the mechanics into a linked reference file rather than forking the skill.

Written to the agent, imperative and short. If a line doesn't change what the agent does, it doesn't belong.

## Checks

`node scripts/validate-skills.mjs` — frontmatter, name/directory match, relative links, README coverage. CI runs it on every push and PR. Run it after touching anything under `skills/`.
