---
name: orchestrate-build
description: Drive a set of issues to completion — this session orchestrates while Worker subagents implement, review, and fix.
disable-model-invocation: true
---

# Orchestrate Build

You are the **Orchestrator**: you decompose, dispatch, gate, and integrate. **Workers** (subagents) do the token-heavy work: reading modules, red-green loops, edits, test runs.

## 1. Plan

Gather each issue's full text and acceptance criteria; ask the user about gaps — Workers can't. Per issue decide: model tier, dependencies, and whether TDD applies (observable behavior at a testable seam — the `tdd` skill needs seams pre-agreed with the user).

Present the plan — issues, tiers, seams, order, delivery — and dispatch after the user confirms. Delivery is one MR/PR per issue as each clears the gate; when the user wants the feature delivered whole, an **integration branch** off the base collects every gated issue and ships as a single MR/PR at the end.

## 2. Dispatch

One worktree per issue, on its own conventionally-named branch off the **base branch** — or off its dependency's branch when that dependency isn't merged yet. Independent issues run in parallel; dependents wait. Everything on an issue happens in its worktree.

Beyond the obvious contents of a Worker prompt, set the boundary: what's out of scope, and the stop rule — blocked or ambiguous → stop and report, never widen scope. Implementation Workers run TDD at the agreed seams where they exist.

## 3. Gate

Verify the returned work against the issue as spec:

- **Trivial** — the whole diff fits one read and carries no logic: read it yourself against the criteria; that read is the gate.
- **Substantive** — everything else: run `/code-review`, issue as spec, the branch it forked from as fixed point.
- **No diff** — dispatch a verifier Worker to exercise the delivered result against the criteria.

A diff you can't confidently call trivial is substantive.

**Parity:** whoever reviews gets the environment the implementer had — worktree, verification commands, setup. A finding nobody has executed is a hypothesis; have it executed before it drives a fix.

Findings go back as a fix-up into the same worktree, then back through this gate.

## 4. Converge

Watch the fix-up cycles for recurrence — you are the only one who sees the whole series. A new finding in the same class of failure as an earlier one means instance fixes aren't converging: the next fix-up's job is to enumerate the **source of truth** (what the tool, format, or API actually accepts) and fix the class.

## 5. Ship

Full suite on the approved branch, then:

- Per-issue, remote exists — push and open the MR/PR linking the issue, targeting the branch it forked from; follow the CI/CD pipeline and fix failures. Merge yourself only if the user said so.

- Per-issue, no remote — merge into the base branch, full suite after.

- Whole delivery — merge into the integration branch, full suite after each merge; when the last issue lands, push and open the single MR/PR linking every issue (no remote: merge the integration branch into the base).

A conflict or failing suite is a finding — back through the gate.

Shipped: delete the worktree, comment the MR/PR or merge SHA on the tracker, close the issue, and dispatch whatever was waiting on it.

## 6. Wrap up

After the plan is approved the build runs to the report without stopping for the user: resolve Worker blocks and ambiguities yourself from the issue text and the plan, noting each call. Two cases earn a question to the user — a decision that is genuinely theirs (destructive, or changing the agreed scope), or the same class of failure surviving even a source-of-truth fix. Ask it carrying the context needed to answer, while the rest of the build keeps moving.

When everything is shipped, report per issue: MR/PR or merge SHA, gate outcome and decisions made on the user's behalf.
