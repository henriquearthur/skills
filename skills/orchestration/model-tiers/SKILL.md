---
name: model-tiers
description: Pick the model tier and reasoning effort for a subagent — and what work stays out of your own seat. Use when dispatching subagents, or before doing multi-step mechanical work yourself.
---

# Model Tiers

Match the model to the workload — every dispatch trades quality, latency, and cost.
Frontier buys judgment; Engineering buys engineering; Utility buys coverage.

## Picking a tier

- **Frontier** — open-ended judgment: decomposition, architecture, security, difficult debugging, tradeoffs,
conflict resolution, final synthesis, and final review.

- **Engineering** — bounded engineering: repository exploration requiring synthesis, multi-file implementation,
scoped debugging, tests, refactors, and verification.

- **Utility** — mechanical coverage: literal searches, extraction, formatting, file operations, repetitive edits,
boilerplate, log reduction, and documentation sweeps.

Rules:

- Work that **changes** something defaults to Engineering; work that only **finds something out** defaults to Utility. Move on evidence from the task itself, not its perceived importance.
- Tell the user the tier, model, and effort of every dispatch.

## Your own seat

The rules above are about who you dispatch. This one is about you.

Keep the orchestrator on Frontier work: decomposition, delegation, tradeoffs, conflict resolution, and final synthesis.

Delegate bounded exploration, implementation, verification, and mechanical work. Require compact reports containing conclusions, evidence, changed files, tests, risks, and blockers.

## Models

### If you are Claude

| Tier        | Default         | On user request only |
|-------------|-----------------|----------------------|
| Frontier    | Opus 4.8 (High) | Fable 5 (High)       |
| Engineering | Sonnet 5 (High) | Opus 4.8 (High)      |
| Utility     | Sonnet 5 (Low)  | N/A                  |

### If you are Codex

| Tier        | Model                  |
|-------------|------------------------|
| Frontier    | GPT 5.6 Sol (Medium)   |
| Engineering | GPT 5.6 Terra (Medium) |
| Utility     | GPT 5.6 Luna (Low)     |

When dispatching a subagent with an explicit `model` or `reasoning_effort`:
- Use `fork_turns: "none"` or a bounded numeric fork.
- Do not use `fork_turns: "all"`. 
- Include all context required by the subtask in the spawn message when using `fork_turns: "none"`.

### Any other harness

Use the models available to you, same principle: Frontier for judgment, Engineering for engineering, and Utility for mechanics. Set reasoning effort intentionally.
