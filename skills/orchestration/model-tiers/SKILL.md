---
name: model-tiers
description: Pick a subagent's tier — the model and reasoning effort it gets. Use when dispatching a subagent, or when a skill names the tier Frontier, Engineering, or Utility.
---

# Model Tiers

One question prices a dispatch: **who decides?**

Frontier decides. Engineering carries out a decision already made. Utility decides nothing at all — it looks, and reports.

Sort on evidence from the task itself, never on how important it feels.

## Picking a tier

- **Utility** — finding out: scouting an issue's lineage, taking inventory, running a suite, reading logs and pipelines. It reports what is there; nobody has to go looking for what isn't.

- **Engineering** — carrying out: infra whose shape was decided upstream, a fix-up against a review's findings, a mechanical transformation across many files. 

- **Frontier** — deciding: the shape is still open, and settling it changes what everything downstream builds against. That work is yours, so it is rarely a dispatch at all.

Say the tier, the model, and the effort out loud in every dispatch.

## Your own seat

Frontier is your seat, and that is mostly where it stays — it is the tier you spend, not the one you fall back to. The plan, the order the work runs in, a merge conflict, a subagent that came back blocked, the scope: dispatching one of those buys a second opinion on a question only you can close, at the one price you are already paying.

So settle the open question first, then dispatch. Once the shape is fixed, the work left over is Engineering.

## The brief

Start every tier subagent clean, carrying none of your history. Its brief is then its whole world, so the brief holds every constraint that binds the work and nothing it has to go looking for. A subagent handed your history inherits your seat along with it — same model, same effort, same price — and the tier you picked never happens.

Close every brief with this, whatever the tier:

> Gather in one shot — put the whole inspection into a single script and read its output at once. Read only what you have not already read. The worktree is yours alone — nobody else is writing to it. Come back with a short handoff: result, verification, files touched.

## Models

The one part to touch when a harness changes.

### Codex

| Tier        | Model                 |
|-------------|-----------------------|
| Frontier    | GPT 5.6 Sol (Low)     |
| Engineering | GPT 5.6 Luna (Max)    |
| Utility     | GPT 5.6 Luna (Medium) |

Codex honours a per-spawn model and effort only when the spawn carries `fork_turns: "none"` — so put everything the subtask needs into the brief. With `fork_turns: "all"` the subagent runs at your model and your effort, whatever the tier said.

### Claude Code

| Tier        | Model  |
|-------------|--------|
| Frontier    | Opus 5 |
| Engineering | Opus 5 |
| Utility     | Opus 5 |

### Other harnesses

Same ladder with what you have: judgment at the top, bounded engineering in the middle, mechanics at the bottom.
Set the effort deliberately.
