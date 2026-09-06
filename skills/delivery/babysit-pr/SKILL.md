---
name: babysit-pr
description: Drive a PR/MR to mergeable. Use when asked to babysit, watch, or follow a PR/MR, or to get one green.
---

# Babysit PR

Babysitting is a loop, not a report: keep pushing fixes until the PR is **green**, then hand back a summary. Watching it go red and telling the user about it is a failed run.

## The PR

In order:

1. The PR/MR named in the request.
2. The one open on the current branch's remote.

With neither, ask which PR/MR.

## Green

Green means all three, checked against the remote, never inferred from a local run:

- No merge conflicts with the target branch.
- CI pipeline passing.

## The loop

Poll the PR until CI report. While it is red:

1. Read the full finding, not the summary line.
2. Fix locally, commit, push.
3. Poll again from the top.

## Hand back

When green, report:

- What the PR does.
- What you changed to get it green, and what you dismissed and why.
