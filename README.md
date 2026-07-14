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
ln -s "$PWD/skills/orchestration/orchestrate-build" ~/.claude/skills/orchestrate-build
```

Use `~/.claude/skills` for Claude Code, `~/.codex/skills` for Codex, or the project-local `.claude/skills` to scope a skill to one repo. Symlinking (rather than copying) means `git pull` keeps your installed skills current.

</details>

## Skills

Skills live in buckets under `skills/`, one bucket per domain. Within a bucket they split on one axis — **who can invoke them**.

**User-invoked** skills are reachable only when you type them (`/orchestrate-build`). They own a whole flow from start to finish, and they burn a lot of tokens, so you decide when they run.

**Model-invoked** skills can be typed by you _or_ reached for by the agent on its own when the task fits. They hold reusable discipline that other skills lean on.

### Orchestration

Running agents with other agents: how work gets decomposed, dispatched, and gated.

**User-invoked**

- **[build](./skills/orchestration/build/SKILL.md)** — Drive a set of issues through plan, build, review, and ship. You hold the map; Scouts find things out and Workers dig — one issue each, in their own worktree. Merges land on a single work branch; review and suite run once at the end; one MR/PR ships the whole set.

- **[orchestrate-build](./skills/orchestration/orchestrate-build/SKILL.md)** — Drive a set of issues to completion. Your session becomes the orchestrator: it plans, dispatches Workers into one worktree per issue, gates the returned work against the issue as spec, and ships an MR/PR per issue. It watches fix-up cycles for recurring failures, and only stops to ask you about decisions that are genuinely yours.

**Model-invoked**

- **[model-tiers](./skills/orchestration/model-tiers/SKILL.md)** — Pick the model tier and reasoning effort for a subagent — and what work stays out of your own seat. Frontier buys judgment; Engineering buys engineering; Utility buys coverage. Defaults from the task itself (changes → Engineering, finds-out → Utility), not from how important it feels. Includes tier tables for Claude and Codex.

`build` and `orchestrate-build` reach for `model-tiers` on every dispatch — that's the composition these are built for.

## Credits

Inspired by [mattpocock/skills](https://github.com/mattpocock/skills) — the shape of this repo, and the user-invoked / model-invoked split I use to organise it, both come from there. Go read his too.

## License

[MIT](./LICENSE) — do whatever you want with them.
