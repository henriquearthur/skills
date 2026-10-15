---
name: pr
description: Ship finished work as a Pull or Merge Request. Use when creating a branch, committing, or opening or editing a PR/MR.
---

# PR

## Branch and commits

- Branch: `<type>/<issue>-<slug>`, for example `fix/123-thread-cpu-spike`. Without an issue, `<type>/<slug>`.
- Commits: Conventional Commits, with the issue number when there is one.

## Title and body

- Title: a conventional commit that states the effect in plain language, for example `fix(web): new threads no longer spike CPU`.
- Body: the problem in a sentence or two, then how you fixed it; headings to break it up.

## Babysit

Once the PR/MR is open, follow the `babysit-pr` skill.
