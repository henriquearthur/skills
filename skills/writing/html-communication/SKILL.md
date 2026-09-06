---
name: html-communication
description: Use when the user asks for a write-up, plan, spec, findings, report, comparison, or UI mock to be delivered as a published HTML page. Not for HTML that ships inside a product.
---

# HTML communication

Produce a communication artifact in HTML and publish it to Outpost. The user reads the result at a URL; a local file is an intermediate artifact, not the delivery.

## Direction

- Let the subject, audience, and requested outcome determine the page's structure, visual language, and interactions.
- Make the result clear, coherent, usable, responsive, and appropriate to the material. Use judgment instead of applying a fixed template.
- Organize the content so the reader can quickly understand its context, important details, and conclusions.
- Add interaction when it helps the reader explore or understand the material; a static page is fine when it is the better fit.
- Keep the page self-contained and remove private credentials, internal tokens, and `file://` links.

## Workflow

1. Understand what the page must communicate, to whom, and what the reader should be able to do or decide after reading it.
2. Choose the content structure and implementation that best serve that purpose.
3. Build and check the complete self-contained HTML artifact. Confirm that it renders correctly and that any included behavior works in the intended environments.
4. Use the `outpost` skill to publish the finished artifact, following its requirements for credentials, visibility, and metadata.
5. Report the live URL to the user and state any relevant visibility or expiration condition.

