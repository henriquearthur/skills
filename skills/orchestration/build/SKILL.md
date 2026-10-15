---
name: build
description: Drive a set of issues through plan, build, review, and ship.
disable-model-invocation: true
---

You have been given a spec with tickets that describe how to implement it.

The tickets are not a list of steps. They are a **task graph** with blocking relationships, so there is always a **frontier** of tickets ready to be grabbed.

You are the **coordinator**. Delegate the substantive work, keep approvals with you and the user, and stay in conversation while the team runs: put a short status note in the same message as each dispatch or merge.

Done means: every ticket's branch is merged into its **integration branch**, every `code-review` finding is fixed, every ticket is resolved the way the issue tracker closes work (by a PR marked ready for review, or in the tracker itself where there is no PR), and every worker worktree is removed.

Talk to subagents through **context pointers**: paths to the spec, the tickets, the scout notes, and previous commits. Never restate what a pointer already reaches.

## The team

Each member owns one theme. Before dispatching a member yourself, call the Skill tool with `subagent-models` to pick its model and effort.

**Scout** - Exploration. Answers one question. Dispatch it as an agent that can save files, and give it the question, the pointers it starts from, and a notes directory outside the repo that every later agent can reach. It reads code, docs, and prior commits until the question is answered, writes its notes there as markdown, and returns only that path.

**Worker** - Implementation. Implements one frontier ticket in its own worktree on its own branch.
Give it pointers to the ticket, the spec, and the scout notes that bear on it. It confirms
its worktree is based on the integration branch before starting, and resets onto it if not.
Where the ticket has a testable seam, it calls the Skill tool with `tdd` to build the ticket;
DevOps work it builds directly and verifies with the available native checks. It stays inside
the ticket's scope and merges the integration branch tip into its own branch before reporting
done. It returns once every acceptance criterion holds and the branch is committed green.

**Merger** - Integration. Brings one finished worker branch into the integration branch. Give it
the two branches and the ticket the work closes. It resolves conflicts in favour of both
intents, keeps the integration branch green, and returns the merge commit.

**Reviewer** - Review. Judges the merged integration branch against the repo's standards and the spec. The
reviewers are the sub-agents the `code-review` skill dispatches: you run the skill and collect
the findings, and the judging is theirs. Always a fresh agent, separate from you and from every
agent that wrote the code.

When an agent reports back, check its evidence before you accept it: the worker's branch is committed and green, the scout's notes answer the question, the merge commit is on the integration branch.

## Waiting

Slow is not stuck.

Interrupt only on evidence — an agent asking for a decision, a crash, an idle worktree
well past its window — never because the wait feels long.

## Steps

1. Read the spec and the tickets until you can name every ticket, its blockers, and the current frontier.

2. (optional) Send **scouts** for the exploration the tickets need, in codebase files or external docs. Their notes let workers implement instead of explore.

3. Create the integration branches the spec needs, across as many repositories as it touches.

4. Dispatch one **worker** per frontier ticket, in the background, each in its own worktree on its own branch.

5. When a worker finishes, merge its branch into the integration branch with a **merger**.

6. Dispatch workers for any tickets that merge puts on the frontier, right away.

7. Where the issue tracker closes work through PRs, or the user asks for one, open a draft PR for each integration branch on its first merge (a branch with no commits ahead of main can't open one). Each PR references the spec and closes only the tickets it completes. The PR that completes the spec closes the spec issue.

8. Once every ticket's branch is merged, run the `code-review` skill on the integration branch. Fix everything it raises in a single worker.

9. Mark each draft PR ready for review. Where a branch has no PR, resolve its tickets the way the issue tracker closes work, and report the branch.

10. Remove every worker worktree.
