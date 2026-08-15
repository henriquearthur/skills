---
name: html-communication
description: Use when the user wants a write-up — plan, spec, findings, report, comparison — or UI mocks delivered as an HTML document, or says "HTML" with no other context. Not for HTML that ships inside a product.
---

# HTML Communication

One self-contained HTML file, published to Outpost. The user reads it at a URL; a local file is not delivery.

## Write it like a spec

Dense and scannable: headings, tables, lists, and inline SVG carry the explaining, prose only where prose is the clearest form. No hero, no decorative chrome, no marketing voice, no em dashes.

Default palette: true black (`#000`) background, white primary text, dark gray for secondary surfaces and accents.

## Keep it self-contained

Everything the page needs travels inside the file: semantic markup, an inline `<style>`, inline SVG, and images as `data:` URIs or HTTPS URLs. 

Add interactivity only when it materially helps, as one inline classic `<script>` that wires handlers with `addEventListener`. The page still reads completely with JavaScript off.

The file is public-facing text: it carries only what the reader may see — no secrets, no private URLs, no `file://` links.

## Publish

Publishing is part of the task, not a separate ask: use the `outpost` skill, then report the URL back.
