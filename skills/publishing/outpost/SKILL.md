---
name: outpost
description: Use when publishing a self-contained HTML file to Outpost, or managing a Page already published there — update, share, list, delete. Use whenever working with outpost.hnrq.workers.dev.
---

# Outpost

`outpost` publishes **one self-contained HTML file** as a **Page** and prints its URL on the first line of stdout.
Everything you hand back to the user comes from that line.

This skill starts at a finished HTML file; writing one is the `html-communication` skill's job.

The binary is installed globally — call it as `outpost <command>`. If the shell cannot find it, the fix is `npm install -g @henriquearthur/outpost`; ask the user to reinstall rather than reaching for another way to run it.

## Before publishing

1. **`OUTPOST_TOKEN` must be exported.** It is the only credential, and every command fails without it.
2. **The file must be self-contained**, up to 20 MB: CSS and JS inline, images as `data:` URIs.

## Publish

```sh
outpost publish page.html --model <model> --agent <agent> --tags <a,b>
```

`--model` (the model that wrote the content) and `--agent` (your tool's name, e.g. `claude-code`) are **mandatory on every publish**
Add `--tags` whenever the topic is nameable, and `--title` only when the HTML `<title>` would mislead.

Pick exactly one visibility from what the user said — `--public` and `--expires` are mutually exclusive:

| The user wants | Flag | First stdout line |
| --- | --- | --- |
| It for themselves (default) | none | Owner-host URL, opens only for the signed-in owner |
| Anyone to open it, indefinitely | `--public` | public URL |
| To share it with someone, for a while | `--expires 7d` | a ready-to-share Expiring Link |

When the user asks to share a page beyond themselves and names no duration, reach for `--expires`: a link that dies is the recoverable mistake.

Then report the URL and, when the Page is not private, what it is — public forever, or a link expiring in N. Keep the Page **id**: every later command takes it.

## Later commands

```sh
outpost update <id> page.html      # replace the HTML; same id, URL and metadata
outpost link <id> --expires 7d     # mint another Expiring Link after one expired
outpost list --json                # newest 100 Pages: id, title, model, agent, visibility, dates
outpost delete <id>                # Page, metadata and all its Links die together
```

Iterating on a page you already published is `update`, so the URL the user already holds keeps working. There is no version history; `update` overwrites.

## Links

`--expires` takes `30m`, `24h`, `7d`, or a combination like `1h30m`; bare `--expires` means 24h. The Page itself stays private — only the Link is shareable, and only until its deadline.

Revoke a single Link (the host and token read straight off the Link URL `<public-host>/l/<token>`):

```sh
curl -X DELETE "https://<public-host>/api/links/<token>" -H "authorization: Bearer $OUTPOST_TOKEN"
```

A Link that "doesn't work" is expired or revoked, not broken: private Pages and dead Links return the same 404 on the public host by design.

## Reading the output

`publish`, `link` and `list` accept `--json` — use it whenever you parse the result; the plain output is for humans.

Failures print `error: …` on stderr and exit non-zero. The exit code is the verdict; surface the message as-is.
