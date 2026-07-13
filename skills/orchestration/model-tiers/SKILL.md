---
name: model-tiers
description: Pick the model tier and reasoning effort for a subagent. Use when dispatching subagents.
---

# Model Tiers

Match the model to the workload — every dispatch trades quality, latency, and cost. Frontier tokens buy judgment; volume tokens buy coverage.

## Picking a tier

- **Frontier** — decomposing ambiguous work; architecture, tradeoffs, risk analysis; final synthesis and review.
- **Middle** — multi-file implementation against a clear spec; bug hunts scoped to a subsystem; tests and refactors with real design decisions; verifying another agent's findings.
- **Volume** — repository and documentation sweeps; log clustering and test-output reduction; repetitive edits with clear constraints; evidence gathering.

Rules:

- Default to Middle; move tiers on evidence from the task itself, not its perceived importance.
- Open judgment calls → one tier up. Mechanically verifiable output (it passes or it doesn't) → one tier down.
- Tell the user the tier, model, and effort of every dispatch; the subagent itself never needs to know its model.

## Models

### If you are Claude

| Tier     | Default         | On user request only |
|----------|-----------------|----------------------|
| Frontier | Opus 4.8 (High) | Fable 5 (High)       |
| Middle   | Sonnet 5 (High) | Opus 4.8 (High)      |
| Volume   | Sonnet 5 (High) | —                    |

### If you are Codex

| Tier     | Model                  | `agent_type`  |
|----------|------------------------|---------------|
| Frontier | GPT 5.6 Sol (High)     | (you)         |
| Middle   | GPT 5.6 Terra (Medium) | `tier-middle` |
| Volume   | GPT 5.6 Luna (High)    | `tier-volume` |

Frontier is the orchestrator itself; the two subagent roles are registered in `~/.codex/config.toml`. Before your first `spawn_agent`, read [codex.md](codex.md) — its dispatch mechanics are mandatory.

### Any other harness

Use the models available to you, same principle: pick the model for the workload and set reasoning effort intentionally.
