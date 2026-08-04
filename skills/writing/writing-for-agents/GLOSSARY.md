# Glossary — Writing For Agents

The domain model for any text a model reads — `CLAUDE.md`, `AGENTS.md`, subagent definitions, system prompts, tool and MCP descriptions, hook output, memory. Every such artifact exists to wrangle determinism out of a stochastic system; the root virtue is **Predictability**, and every term below is a lever on it. This is the disclosed reference for [`writing-for-agents`](SKILL.md).

The terms are grouped by axis: **Reach** (how material gets into context), **Information Hierarchy** (how it is arranged), **Steering** (how the agent's runtime behaviour is shaped), and **Pruning** (how it is kept lean). Each **failure mode** lives beside the lever that cures it, tagged _failure mode_.

**Bold terms** in any definition are themselves defined in this glossary; find them by their heading.

## Predictability

The degree to which an artifact makes the agent behave the same _way_ on every run — the same process, not the same output (a brainstorming prompt should _predictably_ diverge; its tokens vary, its behaviour doesn't). The root virtue every other term serves — cost and maintainability are symptoms of it, not rivals.

_Avoid_: consistency, reliability, robustness, output-determinism

## Reach

How material gets in front of the agent — and what you pay for it.

### Always-Loaded Surface

Text present in the context window every turn regardless of the task: `CLAUDE.md`, `AGENTS.md`, a system prompt, an agent's `description`, a tool description, a memory index. It pays permanent **context load** and competes with the task for attention, so it earns the hardest pruning of any surface. Reserve it for what applies across most turns — conventions the agent would otherwise get wrong, hard constraints, and **context pointers** to everything else.

_Avoid_: global context, preamble, header

### Invoked Surface

Text loaded only when something fires it: a skill body, a subagent's system prompt, a slash command, a hook's output. Costs nothing until invoked, so it can afford depth an **always-loaded surface** cannot. Its own reach depends entirely on its **trigger text**.

_Avoid_: lazy prompt, on-demand context

### Trigger Text

The machine-readable field that decides whether an **invoked surface** fires — a skill or agent `description`, a `whenToUse`, a tool docstring, an MCP tool summary. It does two jobs: state what the thing is, and list the **branches** that should reach it. It is itself always-loaded, so it earns harder pruning than any body it guards. Where the agent chooses between siblings, its negative space (when to reach for something else) is load-bearing.

_Avoid_: frontmatter, summary, blurb

### Context Pointer

A reference held in the agent's context that names some out-of-context material and encodes the condition for reaching it. **Trigger text** is the top-level context pointer (context window → artifact); a link to a disclosed file is the same object one level down. Its wording, not the target, decides _when_ the agent reaches — and _how reliably_. A must-read target behind a weakly worded pointer is a variance bug: fix the wording first, and inline the material only if sharpening fails.

_Avoid_: link, reference, import

### Context Load

The cost an **always-loaded surface** imposes on the context window — tokens and attention spent every turn whether the material is relevant or not. The brake on adding to `CLAUDE.md`, on registering another tool, and on splitting work into more model-discoverable pieces.

_Avoid_: token cost, context bloat

### Cognitive Load

The cost imposed on the human — what they must hold in their head: which artifacts exist and when to reach for each, when nothing agent-facing points at them. What agent-discoverability removes, and the brake on hiding everything behind manual invocation. Not a cost to minimise: it is the price of human agency. Spend it where human judgement matters; remove it where it does not.

_Avoid_: human index, burden, overhead

### Granularity

How finely you divide material across artifacts. Finer division spends one of the two loads: more agent-discoverable pieces spend **context load** (more **trigger text** crowding the window and competing for attention); more manually-reached pieces spend **cognitive load** (more for the human to remember). Two cuts guide it. By **reach**, split off a discoverable artifact where you have a distinct **leading word** that should trigger it — a word you actually type. By **sequence**, split a run of **steps** where a step's **post-completion steps** need hiding. Beware the reverse: merging sequences exposes each step's post-completion steps to what follows, inviting **premature completion**.

_Avoid_: chunking, modularity

## Information Hierarchy

How content is arranged, and how far down the ladder each piece sits.

### Information Hierarchy

Content ranked by how immediately the agent needs it — a single ladder, produced by two cuts: in-context or behind a pointer, and step or reference. The rungs:

- **Steps** — always-loaded or invoked, primary
- **Reference**, in-file — secondary
- **Reference**, disclosed — behind a **context pointer**

An artifact with no **steps** uses just the bottom two rungs — often a legitimately flat peer-set (e.g. every convention of a repo on one rung), which is a fine arrangement, not a smell. The hierarchy is independent of **reach**: an artifact can be always-loaded or invoked whether it is all steps, all reference, or both. When it has steps, in-file reference that should be disclosed buries them and turns attending to them into a coin-flip — a variance lever, not just a legibility one. Keep the top of the ladder legible; push down it whatever you can.

_Avoid_: structure, organization, layout

### Steps

The ordered actions the agent performs — when an artifact has them, the primary tier of its content, and the part that earns its always-loaded place. Not everything has steps: an artifact can be all steps (a TDD loop), all **reference** (a repo's conventions), or both. Every step ends on a **completion criterion**, clear or vague.

_Avoid_: workflow, instructions, choreography

### Reference

Material the agent refers to on demand — definitions, facts, parameters, examples, conditional instructions. When an artifact has **steps** it is secondary to them; when it has none it is the entire content; or it lives outside any artifact entirely — see **External Reference**. Reached via **context pointers**, and the prime candidate for **progressive disclosure**.

_Avoid_: supporting material, docs, background

### External Reference

**Reference** that lives outside every invocable artifact — a plain file, no **trigger text**, no **steps**, not invocable: a runbook, a schema, an architecture note. The home for shared reference that needn't fire on its own, and the only shared home two manually-invoked artifacts can use, since neither can fire the other.

_Avoid_: doc, resource, knowledge base

### Progressive Disclosure

Moving **reference** down the ladder — out of an **always-loaded surface** and behind a **context pointer** — so the top stays legible. Not primarily a token optimisation; it is how the **information hierarchy** is protected. Licensed by **branching**: disclose what only some branches need, inline what every path needs, and if a pointer fires unreliably on must-read material, sharpen its wording, and pull it back inline only if that fails. The default fix for a bloated `CLAUDE.md`.

_Avoid_: lazy loading, chunking

### Co-location

Keeping the material an agent needs at once in one place — a concept's definition, rules, and caveats under a single heading, not scattered across the file — so reading one part brings its neighbours with it. The within-file companion to the **Information Hierarchy**: the hierarchy ranks _how far down_ a piece sits; co-location decides _what sits beside it_ once there. There is no formula for the right format of a body of **reference**; the test is that it should read like documentation written for the agent, and grouped material reads that way where scattered material does not. Distinct from **Duplication**: that repeats one meaning in two places, where scattering fragments a single meaning across many.

_Avoid_: grouping, clustering, cohesion

### Sprawl

_Failure mode._ An artifact that is simply too long — independent of whether its lines are stale or repeated. Even an all-live, all-unique file can sprawl. It costs readability (the agent wades through more before it can act, and attention thins across the excess), maintainability (every extra line is one more to keep **relevant**), and tokens. The cure is the **information hierarchy**: push **reference** down behind **context pointers**, and split by **branch** or sequence so each path carries only what it needs. Distinct from **sediment** (length from stale accumulation) and **duplication** (length from repeated meaning) — sprawl is length itself, whatever its cause.

_Avoid_: bloat, length, size, verbosity

## Steering

The levers that shape the agent's runtime behaviour toward **Predictability**.

### Branch

A distinct way an artifact can be reached — a case it handles — so different runs take different paths through it. Material with many steps may carry many branches; a linear run has none. The unit **trigger text** enumerates: one trigger per branch, and synonyms renaming a single branch are **duplication**.

_Avoid_: path, case, fork

### Leading Word

A compact concept — also called a _Leitwort_ — already living in the model's pretraining, that the agent thinks with while working. It encodes a behavioural principle in the fewest possible tokens by invoking priors the model already holds (e.g. _lesson_, _proximal zone of development_, _fog of war_, _tracer bullets_). Repeated as a token, never as a sentence, it accumulates a distributed definition and anchors a whole region of behaviour. Coining your own works if you define it clearly, but a made-up word recruits no priors — you pay in definition tokens what a pretrained word gives free. Reach for an existing word first.

A leading word serves **predictability** twice. In a body it anchors **execution** — the agent reaches for the same behaviour every time the concept appears, and inside flat reference it focuses attention on a class of thing to look for, recruiting the right checks each run. In **trigger text** it anchors **invocation** — and not only within one artifact: when the same word lives in your prompts, your docs, and your codebase, the agent links that shared language to the artifact and reaches for it more reliably. Word triggers with the vocabulary you actually type, and push that vocabulary into the code and docs to close the loop.

_Avoid_: keyword, term, motif

### Completion Criterion

The condition that tells the agent a unit of work is done — the target it judges against. Two properties make it a lever, not just a quality. Its **clarity** (can the agent tell done from not-done?) resists **premature completion** — a vague bound ("understanding reached") lets the agent declare done and slip onward; this axis needs _steps_ to bite, since premature completion is a between-steps failure. Its **demand** (how much it requires) sets **legwork** — "every call site updated" forces thorough work where "update the call sites" does not — and this axis is _not_ step-bound: it can bind a body of flat reference too, which is how an artifact with no steps still carries an exhaustiveness bar ("every rule applied"). The strongest criteria are both checkable and exhaustive.

_Avoid_: done condition, exit condition, stopping rule

### Legwork

The work an agent does behind the scenes within a single step — reading files, exploring the codebase, making changes, digging up what it needs rather than offloading to the user. It lives below the step structure: never written as its own step, latent in the wording, controlled by the agent rather than the instructions. The within-step counterpart to **post-completion steps**' across-step pull. Raised by a **leading word** (_comprehensive_, _relentless_) or a **completion criterion** that demands the work be exhaustive — including the demand axis applied to flat reference, which is what drives a body of conventions to cover all its rungs. Goes thin either when that demand is missing or when **premature completion** cuts the step short.

_Avoid_: scope, effort, diligence, coverage

### Post-Completion Steps

The **steps** that follow the current step. Visible, they pull the agent forward into **premature completion** — the more it sees, the stronger the tug; the defence is to hide them across a real context boundary.

_Avoid_: horizon, fog of war, lookahead

### Premature Completion

_Failure mode._ Ending the current step before it is genuinely done, because the agent's attention slips to being done rather than to the work. A between-steps failure: it needs **steps** to occur — work with no steps that quits early isn't premature completion but thin **legwork** under an unmet demand. A tug-of-war between two forces: visible **post-completion steps** (the pull forward) and the **completion criterion**'s clarity (the resistance — a sharp, checkable bar holds; a vague one gives way). Fuzziness is the necessary condition: a sharp bound resists the pull no matter how many later steps are visible, so a step that never rushes needs no defending. Two levers hold a step that does, but reach for them in order: **sharpen the bound first** — it is local and cheap. Only when the criterion is irreducibly fuzzy _and_ you actually observe the rush do you **hide the later steps** — and hiding only works across a real context boundary (a subagent dispatch or a hand-off; inline material leaves the later steps in context and clears nothing). One cause of thin legwork, but distinct from it: legwork can be thin even when a step runs to full completion.

_Avoid_: premature closure, the rush, rushing, shortcutting

### Negation

_Failure mode._ Steering by prohibition — telling the agent what _not_ to do — which drags the forbidden behaviour into context and makes it _more_ available, not less. _Don't think of an elephant_, and the elephant is all there is; _never write verbose comments_, and verbosity is the pattern the agent has just read. The negation is a weak modifier the strongly-activated concept overruns, so the ban half-reads as an instruction to do the thing. Its **leading word** is the _elephant_: whatever a prohibition names into the frame. Cure: prompt the **positive** — describe the target behaviour ("write one-line comments") so the banned one is never spoken. A prohibition earns its place only as a hard guardrail on a behaviour you cannot phrase positively; even then, pair it with the positive target so attention lands on what to do.

_Avoid_: ironic rebound, don't-prompting, the pink elephant

### Hedging

_Failure mode._ Writing a standing convention as a preference rather than a fact — "we generally prefer conventional commits" instead of "commits follow conventional commits". The hedge is read as licence to negotiate with the rule, so the behaviour varies run to run for no gain. Cure: state the convention as what happens. Keep the softener only where the judgement genuinely is the agent's, and then say what decides it.

_Avoid_: waffling, softening, politeness

## Pruning

Keeping an artifact lean — each remedy paired with the failure it cures.

### Single Source of Truth

The desired state where each meaning lives in exactly one authoritative place, so a change to the agent's behaviour is a change in one place. **Duplication** is its violation. The cross-surface version bites hardest: one convention repeated in `CLAUDE.md`, a subagent prompt, and a tool description is three edits and three chances to drift. Put the meaning on the lowest rung that still reaches every consumer, and point at it from the rest.

_Avoid_: home, canonical location

### Duplication

_Failure mode._ The same meaning given more than one **single source of truth**. It costs maintenance (change one place, you must change the others), costs tokens, and inflates prominence — repeating a meaning weights it on the ladder past its real rank. The accidental inverse of a **leading word**, which raises attention on purpose by repeating a token, never the meaning.

_Avoid_: repetition, redundancy

### Relevance

Whether a line still bears on the work — the lens for what to keep. A line loses relevance either by never bearing on the task (mere exposition, or a **branch** that should be disclosed) or by going stale: drifting out of date as the code or world it describes changes. Shorter artifacts are easier to keep relevant, because each line is cheaper to check. Distinct from **no-op**: relevance asks whether a line bears on the task, not whether it changes behaviour.

_Avoid_: load-bearing, staleness, freshness

### Sediment

_Failure mode._ Layers of old content that settle and are never cleared, because adding feels safe and removing feels risky — so stale and irrelevant lines accumulate and you must core down through them to find what is still live. The default fate of anything without a pruning discipline, and it accumulates fastest on an **always-loaded surface** like `CLAUDE.md`, where every session adds and none subtracts. The slow erosion of **relevance**, as opposed to **duplication**'s repeated meaning.

_Avoid_: accretion, bloat, cruft, rot

### No-Op

_Failure mode._ An instruction that changes nothing because the model already does it by default — you pay load to tell the agent what it would do anyway. The test: does a line change behaviour versus the default? A line can be perfectly **relevant** and still be a no-op. The same priors that make a **leading word** free make a no-op worthless.

A leading word is a _technique_; No-Op is a _verdict_ on a line — and they cross. A leading word too weak to beat the default is a no-op (_be thorough_ when the agent is already thorough-ish), and the fix is a stronger word that passes the verdict (_relentless_), not a different technique. So the No-Op test — does it change behaviour versus the default? — is also how you grade whether a leading word is earning its repetitions. This is model-relative, not reader-relative: two people disagreeing over whether a line is a no-op disagree about the default, and settle it by running it, not by debate.

_Avoid_: redundant instruction, restating the obvious, belaboring

---

_Derived from the glossary in [`writing-great-skills`](https://github.com/mattpocock/skills) by Matt Pocock (MIT)._
