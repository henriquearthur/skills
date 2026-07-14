---
name: build
description: Drive a set of issues through plan, build, review, and ship
disable-model-invocation: true
---

# Build

You hold the map, never the shovel. Two kinds of subagent do the digging:

- **Scouts** find things out — issue text, how a module works, a suite's failures, a pipeline's logs. They report; they change nothing.
- **Workers** build. One issue each, in their own worktree.

Anything you would learn by running commands, a Scout learns for you. Yours is the plan, the merges, the conflicts, and the calls that are genuinely yours to make.

You are the one thread alive for the whole session, and every report lands in your context for good — so brief both kinds to come back **bounded**: status, SHA, findings. Tier every dispatch with `/model-tiers`.

## 1. Plan

Scouts pull each issue's full text and acceptance criteria. Ask the user about the gaps — Scouts can't.

Map the dependencies, then sort each issue by what finishes it:

- **Code** — application behavior, and the only kind TDD serves. Where behavior is observable at a testable seam, agree the seams with the user and mark the issue for `/tdd`.

- **Infra** — CI/CD pipelines, Kubernetes manifests, Helm, Kustomize, environment config. Nothing here can go red before it exists; it is proven by applying it and watching the environment. Mark how each one gets verified there.

Present the plan — issues, kind, tier, seams. The build starts when the user confirms.

## 2. Build

On the base branch? Cut a conventionally-named work branch.

One Worker per issue, each in a worktree on a branch off the work branch. Independent issues run in parallel; dependents wait. A Worker starts with no history — its prompt is its whole world. It carries the issue text, acceptance criteria, the scope boundary, what Scouts already learned that the Worker would otherwise re-dig, and the stop rule: blocked or ambiguous → stop and report. Code issues run `/tdd` at the agreed seams; infra issues run their verification in the target environment.

A blocked Worker stops and reports. Resolve it yourself from the issue text and the plan, noting each call you make on the user's behalf; bring the user only what is genuinely theirs — destructive, or a change to the agreed scope.

An issue is built when its branch merges into the work branch. Resolve the conflicts, delete the worktree, dispatch whatever was waiting on it.

## 3. Review

When the last issue is merged, a Scout runs the suite on the work branch and reports the failures. Then `/code-review` — the issues as spec, the commit the build started from as fixed point. Findings go to a fix-up Worker; re-review what it changed.

Done when the review is clean and the suite passes.

## 4. Ship

Remote — push, open one MR/PR linking the issues, targeting the base branch. A Scout follows the pipeline and reports failures; you decide each fix and dispatch it. Merge only if the user said so.

No remote — merge the work branch into the base branch.

Report the MR/PR (or merge SHA), each issue's commit SHA and review outcome, and the calls you made on the user's behalf.
