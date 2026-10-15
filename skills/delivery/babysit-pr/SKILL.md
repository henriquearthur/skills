---
name: babysit-pr
description: Drive a PR/MR to mergeable. Use when asked to babysit, watch, or follow a PR/MR, or to get one green.
---

# Babysit PR

Babysitting is a loop: keep pushing fixes until the PR is **green**, then hand back a summary.

## The PR

In order:

1. The PR/MR named in the request.
2. The one open on the current branch's remote.

With neither, ask which PR/MR.

## Green

Green means both, checked against the remote rather than inferred from a local run:

- No merge conflicts with the target branch.
- CI pipeline passing.

## The loop

Poll the PR until CI reports. While it is not green:

1. Read the full finding, not the summary line.
2. Fix locally, commit, push.
3. Poll again from the top.

Stop and ask only when a failure has a cause you can't explain, or when fixing it needs something outside the PR: a missing secret, broken shared infrastructure, a decision the user owns.

## Hand back

When green, report:

- What the PR does.
- What you changed to get it green, and what you dismissed and why.
- What is still blocked on the user, if anything.
