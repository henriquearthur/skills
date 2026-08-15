---
name: build
description: Drive a set of issues through plan, build, review, and ship
disable-model-invocation: true
---

# Build

You hold the plan. Two kinds of subagent do the digging:

- **Scouts** find things out — issue text, how a module works, a suite's failures, a pipeline's logs. They report; they change nothing.
- **Workers** build. One issue each, in their own worktree.

Every dispatch names a tier, and `/model-tiers` resolves it: Scouts run at Utility by default, Workers at Engineering. Nothing here dispatches at Frontier.

Some work stays in your hands because dispatching it costs more than doing it — cutting and removing worktrees, merges and their conflicts, the push, opening the MR/PR, and any read one command long. Past that line, anything you would learn by running commands a Scout learns for you.

You are the one thread alive for the whole session, and every report lands in your context for good — so brief both kinds to come back **bounded**.

## 1. Plan

An issue is a leaf. `/to-tickets` cut it from a spec, `/to-spec` synthesised that spec from a discussion, and `/wayfinder` may have charted the discussion first as a map of decision tickets. The issue reads short because the reasoning stayed upstream.

So Scouts pull each issue's **lineage**, following the trail presented by the Issue Tracker:

- **The leaf** — full body, acceptance criteria, comments, blocking edges.
- **Upstream** — the spec it was cut from: its implementation decisions, testing decisions, seams, and out-of-scope. Past that, the wayfinder map and the closed decision tickets whose answers bind this issue.
- **Prototypes** — where the issue points at a `prototype/<name>` branch, that code is a primary source: it is the answer a design question already got. Scout what it settled, not how it was written.
- **Standing** — the ADRs governing the area, and the domain glossary the issue's vocabulary comes from.

Issues cut from one spec share one lineage: scout the spec and the map **once** for the set, and per-issue only the leaf.

A Scout reports what **binds** its issue — decisions locked, terms to use, seams to test at, boundaries the spec drew — never a re-dump of what it read.

Then the gaps: where the lineage is silent on something the issue needs, or where spec and leaf disagree, ask the user — Scouts can't.

Map the dependencies, then sort each issue by what finishes it:

- **Code** — application behavior, and the only kind TDD serves. Where behavior is observable at a testable seam, agree the seams with the user and mark the issue for `/tdd`. Where the seam itself is the open question — how deep the module goes, what its interface exposes — settle it in `/codebase-design`'s vocabulary before the Worker builds against it.

- **Infra** — CI/CD pipelines, Kubernetes manifests, Helm, Kustomize, environment config. Nothing here can go red before it exists; it is proven by applying it and watching the environment. Mark how each one gets verified there.

Present the plan — issues, kind, seams, and the decisions the lineage already fixed. The build starts when the user confirms.

## 2. Build

On the base branch? Cut a conventionally-named work branch.

One Worker per issue, each in a worktree on a branch off the work branch. Independent issues run in parallel; dependents wait. A Worker's brief carries the issue text, acceptance criteria, the lineage that binds it, the scope boundary, and the stop rule: blocked or ambiguous → stop and report. Give the lineage as settled constraints the Worker builds to — not as reading it should go verify. Code issues run `/tdd` at the agreed seams; infra issues run their verification in the target environment.

A blocked Worker stops and reports. Resolve it yourself from the lineage and the plan — most blocks are a question the spec or a closed decision ticket already answered — noting each call you make on the user's behalf; bring the user only what is genuinely theirs — destructive, or a change to the agreed scope.

Some infra blocks are neither: a step only a human can take — provisioning, credentials, CI secrets, a third-party dashboard. Build the user a `/wizard` for it, and keep dispatching whatever doesn't depend on what it produces.

An issue is built when its branch merges into the work branch. Resolve the conflicts, delete the worktree, dispatch whatever was waiting on it.

## 3. Review

When the last issue is merged, a Scout runs the suite on the work branch and reports the failures. Then `/code-review`, at Engineering — the issues **and the spec they were cut from** as spec, the commit the build started from as fixed point. Findings go to a fix-up Worker; re-review what it changed, at that same tier.

Done when the review is clean and the suite passes.

## 4. Ship

Remote — push, open one MR/PR linking the issues, targeting the base branch. A Scout follows the pipeline and reports failures; you decide each fix and dispatch it. Merge only if the user said so.

No remote — merge the work branch into the base branch.

Report the MR/PR (or merge SHA), each issue's commit SHA and review outcome, and the calls you made on the user's behalf.
