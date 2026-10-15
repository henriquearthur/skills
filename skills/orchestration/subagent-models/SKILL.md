---
name: subagent-models
description: Pick a subagent's model and effort by what each model is best at. Use when delegating to a subagent.
---

# Subagent models

Each model has a **fit**, the work it is best at. Give each subagent the model whose fit matches its task, and name the model and the effort explicitly every time you spawn one: a subagent left unset inherits your model, and your price with it. Effort runs `low`, `medium`, `high`, and `high` is the ceiling. Tell the user the model, the effort, and the fit behind each subagent.

The fits, the starting efforts, and what each model needs in its brief depend on the harness. Read the one you are running in before you choose:

- Claude Code: [references/CLAUDE_CODE.md](references/CLAUDE_CODE.md)
- Codex: [references/CODEX.md](references/CODEX.md)

Judgment calls stay with you: what to do, which approach to take, whether a result is good enough. A subagent can gather the options and the trade-offs; the call is yours. Check each subagent's evidence before accepting its report.
