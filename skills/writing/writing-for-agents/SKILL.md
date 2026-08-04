---
name: writing-for-agents
description: Reference for writing any text a model reads — CLAUDE.md, AGENTS.md, subagent definitions, tool and MCP descriptions, system prompts, hook output, memory.
disable-model-invocation: true
---

Every artifact here exists to wrangle determinism out of a stochastic system. **Predictability** — the agent taking the same _process_ every run, not producing the same output — is the root virtue; every lever below serves it.

Write for the reader you actually have: a model, mid-task, with a crowded context window. Not a human onboarding, not a spec reviewer.

**Bold terms** are defined in [`GLOSSARY.md`](GLOSSARY.md); look them up there for the full meaning.

## Placement

Before writing a line, decide where it lives. The **information hierarchy** ranks material by how immediately the agent needs it, and each surface sits at a fixed rung:

1. **Always loaded** — `CLAUDE.md`, `AGENTS.md`, a system prompt, an agent's `description`, a tool description. Present every turn whether or not it's relevant, so it pays permanent **context load** and competes for attention with the actual task. Reserve it for what applies across most turns: conventions the agent would otherwise get wrong, hard constraints, and **context pointers** to the rest.
2. **Loaded on invocation** — a skill body, a subagent's system prompt, a slash command. Costs nothing until it fires, so it can afford depth.
3. **Out of context until pointed at** — a linked `.md`, a runbook, a schema file. **External reference**: no description, not invocable, any surface can point at it.

Pushing a line down a rung is the default move, not a last resort. A `CLAUDE.md` that grew past a screen is almost always tier-3 material squatting on tier 1 — replace the block with a pointer that names when to read the file.

A **context pointer**'s _wording_, not its target, decides when and how reliably the agent reaches the material. If a must-read file is being skipped, sharpen the condition in the pointer ("read before touching migrations") before you consider inlining it.

Once material has its rung, **co-location** decides what sits beside it: keep a concept's rule, its caveats, and its example under one heading, so reading one part brings its neighbours with it.

## Trigger text

Descriptions, `whenToUse`, tool docstrings, agent summaries — all do the same two jobs: state what the thing is, and list the **branches** that should reach it. Every word is always-loaded, so it earns harder pruning than any body:

- **Front-load the leading word** — trigger text is where it does its invocation work.
- **One trigger per branch.** Synonyms renaming a single branch are **duplication** — "review a PR … check someone's changes" is one branch written twice. Keep only genuinely distinct branches.
- **Cut identity already in the body.** Triggers plus any "when another agent needs…" reach clause, nothing else.
- **State the negative space where it's load-bearing** — when to reach for something else instead. This is the one place a boundary beats a description of capability, because the agent is choosing between siblings.

## Body text

Bodies are built from **steps** and **reference**, mixing freely — all steps, all reference, or both.

Each step ends on a **completion criterion**: the condition that says the work is done. Make it _checkable_ (can the agent tell done from not-done?) and, where it matters, _exhaustive_ ("every call site updated", not "update the call sites"). A vague criterion invites **premature completion** — attention slipping to _being done_ rather than the work — and starves the **legwork** the agent does within a step.

The demand axis binds flat reference too: "every rule applied" holds a review with no steps at all, the same way "every step done" holds a sequence.

Write standing conventions as facts the agent acts on, not as background it might weigh. "Branch names follow conventional branch" beats "we generally prefer conventional branch naming" — **hedging** invites the agent to negotiate with the rule.

Reserve prose for what the agent gets wrong by default. Everything else is a **no-op**.

## Leading words

A **leading word** is a compact concept already living in the model's pretraining that the agent thinks with while working (e.g. _lesson_, _fog of war_, _tracer bullets_, _tight loop_). Repeated as a token — never restated as a sentence — it accumulates a distributed definition and anchors a whole region of behaviour in the fewest tokens, by recruiting priors the model already holds.

It serves predictability twice. In a body it anchors _execution_: the agent reaches for the same behaviour every time the word appears. In trigger text it anchors _invocation_: when the same word lives in your prompts, your docs, and your code, the agent links that shared language to the artifact and reaches for it more reliably. So word triggers with the vocabulary you actually type, and push that vocabulary into the codebase and docs to close the loop.

Hunt for passages that **collapse** into one token — a triad spelled out at three sites, a paragraph gesturing at one idea:

- "fast, deterministic, low-overhead" → _tight_ (a _tight_ loop).
- "a loop you believe in" → _red_ — a fuzzy gate becomes a binary observable state.

Assume every file you inherit is carrying restatements that leading words retire.

## Pruning

Keep each meaning in a **single source of truth**. The cross-surface version bites hardest: the same convention in `CLAUDE.md`, a subagent prompt, and a tool description is three places to edit and three chances to drift. Put it on the lowest rung that reaches every consumer, and point at it from the rest.

Check every line for **relevance** — does it still bear on the work? — then hunt **no-ops** sentence by sentence, in isolation. When a sentence fails the test, delete the whole sentence rather than trim words from it. Be aggressive; most prose that fails should go, not be rewritten.

## Failure modes

Use these to diagnose an agent misbehaving under instructions you wrote.

- **No-op** — a line the model already obeys by default, so you pay load to say nothing. The test: does it change behaviour versus the default? A weak leading word (_be thorough_ when the agent is already thorough-ish) is a no-op; the fix is a stronger word (_relentless_), not a different technique. This is model-relative — settle disagreements by running it, not by debate.
- **Negation** — steering by prohibition backfires: _don't think of an elephant_ names the elephant and makes it more available. Prompt the **positive** — state the target behaviour so the banned one is never spoken. Keep a prohibition only as a hard guardrail you can't phrase positively, and even then pair it with what to do instead.
- **Duplication** — the same meaning in more than one place. Costs maintenance and tokens, and inflates the meaning's prominence past its real rank.
- **Sediment** — stale layers that settle because adding feels safe and removing feels risky. The default fate of any always-loaded file without a pruning discipline; `CLAUDE.md` is where it accumulates fastest.
- **Sprawl** — simply too long, even when every line is live and unique. The cure is the ladder: push **reference** down behind pointers, and split by **branch** so each path carries only what it needs.
- **Premature completion** — ending work before it's genuinely done. Defence, in order: sharpen the completion criterion first (cheap, local); only if it's irreducibly fuzzy _and_ you observe the rush, hide what follows behind a real context boundary — a subagent dispatch or a hand-off, since inline material stays in context and clears nothing.
