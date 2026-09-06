---
name: model-tiers
description: Pick the model and reasoning effort for a task by tiers. Use when delegating to a subagent or choosing which model runs a task
---

# Model tiers

A tier is a capability level. Each tier gives one model and effort per harness. Use the row for the harness you are running in.

Tier A is the default. Reach up to Tier S only when reasoning depth is the point of the task; drop to Tier B when the work is mechanical or repetitive. When a task fits two tiers, take the lower one.

Tell the user the model and effort you are using for every subagent.

## Tier B

Mechanical and repetitive work with a settled procedure: merges, sampling a resource over time, collecting evidence, applying a fix that another agent already proved, running validations.

| Harness     | Model        | Effort |
| ----------- | ------------ | ------ |
| Claude Code | Sonnet 5     | low    |
| Codex       | GPT 5.6 Luna | low    |

## Tier A

Implementation, exploration, refactoring, routine debugging, and anything where the approach is already settled.

| Harness     | Model        | Effort |
| ----------- | ------------ | ------ |
| Claude Code | Opus 5       | low    |
| Codex       | GPT 5.6 Sol  | low    |

GPT 5.6 Luna is slow. Be patient.

## Tier S

Ambiguous reasoning, architecture and design decisions, hard debugging, and reviews where a missed subtlety or a wrong approach is expensive.

| Harness     | Model       | Effort |
| ----------- | ----------- | ------ |
| Claude Code | Opus 5      | medium |
| Codex       | GPT 5.6 Sol | low    |
