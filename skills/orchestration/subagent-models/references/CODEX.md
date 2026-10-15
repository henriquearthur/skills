# Codex

GPT-6 Luna takes **focused** work and GPT-6.1 Sol takes **demanding** work. Most subagents start on Sol. When a task sits between the two, keep Luna if it meets your quality bar.

Pass `model` (`gpt-6-luna`, `gpt-6.1-sol`) and `reasoning_effort` on every spawn, with `fork_turns: "none"`: a subagent that inherits your history keeps your model, so put the context it needs in the brief. A custom agent whose file sets its own model or effort keeps them over what you pass.

Effort means the same on both models: `low` for straightforward tasks where speed matters most, `medium` to balance speed and depth, `high` for tracing complex logic, checking assumptions, and working through edge cases. The starting point differs: Luna starts at `high`, Sol at `medium`.

## GPT-6 Luna: focused work

Luna is the more efficient of the two, for specific, high-volume tasks where you know what a good result looks like: extraction, classification, transformation, structured summaries, and focused coding. As a subagent it suits fast, narrowly scoped agents on clear, repeatable work: mapping the code paths behind a failing flow, gathering evidence before a change is proposed, verifying an API against the docs, and making a small, targeted fix once the issue is understood.

`low` is enough for fine-grained edits and simple data extraction.

In the brief, say what a good result looks like and what output to return.

## GPT-6.1 Sol: demanding work

Sol is where demanding agents start: ambiguous, multistep work that needs planning and validation. That covers complex coding, computer use such as reproducing a UI issue in a browser and capturing the evidence, review for correctness, security, and test gaps, and repeated, long-running work across code, apps, and documents. It also fits coordinated deliverables you expect to revise, such as a board presentation built from financial results or a website built from a product brief.

## When a result falls short

Climb one rung at a time. Raise effort, up to `high`, when the task needs more planning, analysis, or checking. Then move from Luna to Sol, at `medium`. Sol at `high` is the top rung; past it, the problem comes back to you.
