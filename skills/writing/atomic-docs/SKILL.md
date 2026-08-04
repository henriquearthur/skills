---
name: atomic-docs
description: Atomic documentation for software projects. Use when creating or updating project docs, restructuring monolithic or fragmented documentation, organizing AI-agent context for selective retrieval, or auditing docs for scope, duplication, discoverability, and drift.
---

# Atomic Docs

Build documentation as a graph of **atoms**. Each atom serves one coherent reader need, stands on its stated prerequisites, and is canonical for the facts it owns. Indexes route to atoms; links connect related atoms. Draw boundaries by meaning, using file length only as a signal to inspect them.

## 1. Account for the knowledge

Match the inventory to the change:

- For a targeted update, inspect the affected atom, its incoming and outgoing links, the behavior it describes, and instruction files in scope.
- For new documentation or a refactor, inventory entry points, the documentation tree, instruction files, repeated claims, and the code or configuration that establishes the facts.

Classify each candidate atom as exactly one dominant reader need: tutorial, how-to, reference, explanation, decision, or agent instruction. Let secondary material support that type. Mark every relevant statement with a canonical destination, conflict, or deletion reason.

Continue when every relevant statement is accounted for and every conflict is explicit.

## 2. Draw the boundaries

Apply the **atom test** to each planned file:

1. **Purpose** — Does the title reveal one subject, question, outcome, or decision before the file is opened?
2. **Independence** — Can the target reader understand or act with the stated prerequisites?
3. **Cohesion** — Does every section serve the same purpose and change for the same reason?
4. **Ownership** — Is the file canonical for each fact or rule it declares?
5. **Retrieval** — Can a reader or agent select the file from a concrete task?

Split a **monolith** when sections have independent goals, audiences, scopes, owners, or change lifecycles. Combine **confetti** when fragments need the same context to answer one question or complete one outcome.

Continue when every planned atom passes all five checks and every extracted statement has exactly one destination.

## 3. Design the routes

Preserve existing categories with explicit scopes. When reshaping the taxonomy, group atoms by reader need and replace junk drawers with specific categories.

Keep each entry point thin:

- State the purpose of the project or documentation set.
- Group routes by task or subject.
- Describe when to follow each route.
- Point to the canonical atom.

Place universal agent rules in the root instruction file. Place local rules near their scope or behind path-specific loading. Make each route conditional and explicit:

```markdown
When changing authentication, read
[Authentication boundaries](docs/explanation/authentication-boundaries.md)
and [Test authentication](docs/how-to/test-authentication.md).
```

Treat imports according to the agent runtime. Eager imports consume startup context; on-demand links, path-scoped rules, and skills enable selective loading.

Continue when every atom is reachable from an appropriate entry point and each route identifies when its destination is relevant.

## 4. Write the atoms

Open each atom with its scope or outcome. Shape the content by its dominant reader need:

- **Tutorial** — deliver one complete learning experience.
- **How-to** — provide the steps and verification for one practical goal.
- **Reference** — state exact facts, parameters, commands, or contracts.
- **Explanation** — clarify a concept, rationale, or trade-off.
- **Decision** — record status, context, decision, and consequences.
- **Agent instruction** — prescribe concrete, verifiable behavior within an explicit scope.

Verify commands, paths, defaults, and behavioral claims against the system. Link shared facts to their canonical atom. Include the prerequisites that make the atom independently usable.

Revise an existing atom when its purpose remains stable. Preserve decision history with a superseding decision record linked in both directions.

Continue when each atom serves one dominant reader need, states every required prerequisite, and contains verified canonical facts.

## 5. Migrate and verify the graph

1. Update indexes, inbound links, agent routes, and renamed paths.
2. Consolidate shadow copies into their canonical atoms.
3. Search for old paths, headings, and distinctive duplicated phrases.
4. Resolve every touched relative link and anchor.
5. Exercise each affected command or flow when its dependencies are available.
6. Inspect the diff and account for every moved statement.

Finish when every atom is reachable, every touched link resolves, every relevant statement has a destination, each shared fact has one canonical declaration, and the documentation matches observed behavior.
