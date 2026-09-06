---
name: build
description: Drive a set of issues through plan, build, review, and ship
disable-model-invocation: true
---

You have been given a spec with tickets that describe how to implement it.

The tickets are not a list of steps. They are a **task graph** with blocking relationships, so there is always a **frontier** of tickets ready to be grabbed.

You are the **coordinator**. Delegate the substantive work, keep approvals with you and the user, and stay in conversation while the team runs. Never disappear into a long silent stretch.

Talk to subagents through **context pointers**: paths to the spec, the tickets, the scout notes, and previous commits. Never restate what a pointer already reaches.

## The team

Pick each agent's model with the `model-tiers` skill.

**Scout** - Tier A. Answers one question. Give it the question and the pointers it starts from. It reads code, docs, and prior commits until the question is answered, writes its notes as markdown outside the repo, and returns only that path.

**Worker** - Tier A. Implements one frontier ticket in its own worktree on its own branch.
Give it pointers to the ticket, the spec, and the scout notes that bear on it. It writes
the code and the tests, stays inside the ticket's scope, and returns once every acceptance
criterion holds and the branch is committed green.

**Merger** - Tier B. Brings one finished worker branch into the PR branch. Give it the two
branches and the ticket the work closes. It resolves conflicts in favour of both intents,
keeps the PR branch green, and returns the merge commit.

**Reviewer** - Tier S. Never yourself, and never the agent that wrote the code.

## Waiting

Slow is not stuck.

Interrupt only on evidence — an agent asking for a decision, a crash, an idle worktree
well past its window — never because the wait feels long.

## Steps

1. Read the spec and the tickets until you can name every ticket, its blockers, and the current frontier.

2. (optional) Send **scouts** for the exploration the tickets need, in codebase files or external docs. Their notes let workers implement instead of explore.

3. Create the branches and draft PRs the spec needs, across as many repositories as it touches. Each PR references the spec and closes only the tickets it completes. The PR that completes the spec closes the spec issue.

4. Dispatch one **worker** per frontier ticket, in the background, each in its own worktree on its own branch.

5. When a worker finishes, merge its branch into the PR branch with a **merger**.

6. Dispatch workers for any tickets that merge puts on the frontier, right away.

7. Once every ticket is closed, run the `code-review` skill on the PR branch. Fix everything it raises in a single worker.

8. Mark the PR ready for review.

9. Remove every worker worktree.
