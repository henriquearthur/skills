# Skills

[![skills.sh](https://skills.sh/b/henriquearthur/skills)](https://skills.sh/henriquearthur/skills)

The agent skills I use every day, published so you can steal them.

A skill is a small Markdown file that teaches a coding agent a discipline it doesn't have by default — how to pick a model for a subagent, how to drive a set of issues to completion without losing the thread. They're deliberately small and composable: no framework owns your process, nothing is hidden behind a runtime. Read them, fork them, make them yours.

Every skill here is **harness-agnostic**. They're written for Claude Code and Codex, and the ideas port to any agent that reads Markdown.

## Quickstart

Install with the [skills.sh](https://skills.sh) CLI, which supports Claude Code, Codex, Cursor, Copilot, and ~20 other agents:

```bash
npx skills@latest add henriquearthur/skills
```

Pick the skills you want and the agents to install them on. That's it.

<details>
<summary>Install manually instead</summary>

Each skill is a plain directory. Copy or symlink the ones you want into your agent's skills directory:

```bash
git clone https://github.com/henriquearthur/skills.git
ln -s "$PWD/skills/orchestration/build" ~/.claude/skills/build
```

Use `~/.claude/skills` for Claude Code, `~/.codex/skills` for Codex, or the project-local `.claude/skills` to scope a skill to one repo. Symlinking (rather than copying) means `git pull` keeps your installed skills current.

</details>

## Skills

Skills live in buckets under `skills/`, one bucket per domain. Within a bucket they split on one axis — **who can invoke them**.

**User-invoked** skills are reachable only when you type them (`/build`). They own a whole flow from start to finish, and they burn a lot of tokens, so you decide when they run.

**Model-invoked** skills can be typed by you _or_ reached for by the agent on its own when the task fits. They hold reusable discipline that other skills lean on.

### Orchestration

Running agents with other agents: how work gets decomposed, dispatched, and gated.

**User-invoked**

- **[build](./skills/orchestration/build/SKILL.md)** — Drive a spec's tickets to a merged PR. You coordinate: scouts answer the open questions, workers implement one frontier ticket each in their own worktree, mergers land the branches, and a reviewer that never wrote the code closes it out.

- **[wave-review](./skills/orchestration/wave-review/SKILL.md)** — Run code review in waves until a wave comes back with zero findings. Leans on the `thermo-nuclear-code-quality-review` skill, which lives outside this repo.

**Model-invoked**

- **[model-tiers](./skills/orchestration/model-tiers/SKILL.md)** — Pick a subagent's tier: the model and reasoning effort it gets. Tier B for mechanical work, Tier A as the default, Tier S when reasoning depth is the point. One table per harness, Claude Code and Codex.

`build` reaches for `model-tiers` on every dispatch — that's the composition these are built for.

### Delivery

Getting finished work merged.

**Model-invoked**

- **[babysit-pr](./skills/delivery/babysit-pr/SKILL.md)** — Drive a PR/MR to green. A loop, not a report: poll the remote, read the full CI finding, fix, push, poll again, and only hand back once there are no conflicts and the pipeline passes.

### Writing

Documents an agent produces: for a model to read, or for a human to.

**Model-invoked**

- **[html-communication](./skills/writing/html-communication/SKILL.md)** — Deliver a write-up — plan, spec, findings, comparison — or a UI mock as one self-contained HTML page published to a URL. Structure follows the subject and the reader, and publishing is part of the task, not a separate ask.

- **[atomic-docs](./skills/writing/atomic-docs/SKILL.md)** — Build documentation as a graph of atoms: one reader need each, canonical for the facts it owns, reachable from a thin index. Use it to restructure monolithic or fragmented docs, organise agent context for selective retrieval, or audit a doc set for scope, duplication, discoverability, and drift.

## Credits

Inspired by [mattpocock/skills](https://github.com/mattpocock/skills) — the shape of this repo, and the user-invoked / model-invoked split I use to organise it, both come from there. Go read his too.

## License

[MIT](./LICENSE) — do whatever you want with them.
