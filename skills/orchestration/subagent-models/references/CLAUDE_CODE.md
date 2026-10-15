# Claude Code

Haiku 5.5 takes **lookups**, Sonnet 5.5 takes **well-scoped** work, and Opus 5.5 takes **judgment**. When a task sits between two models, take the smaller one if its mistake would be cheap to spot, and the larger one otherwise.

Pass `model` (`haiku`, `sonnet`, `opus`) and `effort` on every Agent call. Every model starts at `medium`.

## Haiku 5.5: lookups

Haiku is the fastest and cheapest of the three, built for high-volume work where a mistake is cheap to spot: finding files, answering "where is this defined", reading logs and test output, running tests, summarizing, classifying, extracting, querying a database, and browser steps where speed matters. A misread search result sends you after the wrong file, and you pay for the detour, so complex agentic coding stays with Sonnet and Opus.

`low` suits short tool tasks and simple, high-volume requests; on a long agent task it is more likely to skip a search, stop early, or skip a check. `high` suits longer tasks and strict instruction following.

In the brief, ask for the evidence with the answer: the path and line, the log excerpt, the command it ran. Keep the task narrow, since Haiku is the best value while its context stays under 100k tokens. Give it today's date when it will search the web.

## Sonnet 5.5: well-scoped work

Sonnet fits well-scoped everyday tasks, the ones with a clear spec and a way to check the result: fixing a bug, iterating on a feature, verifying against requirements. It also takes well-defined agent tasks you run repeatedly (investigation, review, drafting), and it produces polished documents, slides, and spreadsheets with a strong eye for design. The hardest long-horizon work belongs to Opus.

Use `medium` for a well-specified task and `high` for a harder or longer one.

Sonnet's habits shape the brief. At `low` it may report a change done without running a check, so name the check (tests, type-check, build) and ask for its output in the report. At `low` and `medium` on a long task it may stop midway to ask for confirmation, and a subagent has no one to ask: tell it to carry on until everything is done and checked, or use `high`. It adds tests, docs, and supporting files beyond the request, so when you want only the requested change, ask for the rest as suggestions at the end of the report. On an open-ended request it starts building, so when you want ideas or a plan, say so.

## Opus 5.5: judgment

Opus fits complex work that requires careful judgment, and the hardest problems: debugging, multistep changes carried through a large codebase until the tests pass, long audits and migrations, and code review, where it catches more bugs with fewer false alarms. It is also the model for knowledge work where a wrong figure is costly, such as financial modeling and catching the detail that is easy to miss in a large input, and for reading dense charts, diagrams, and screenshots.

One mechanical case stays on Opus as well. An edit spread across many files, such as a rename or a known pattern applied everywhere, runs on Opus at `low`, so the code comes from the same model that writes the rest, at a lower cost per turn.

Go to `high` when `medium` stalls. The typical sign is a fix that stops at one layer, such as an API handler updated and its client forgotten.

In the brief, say what "done" looks like and when to stop and ask, in one message. Opus gets to work quickly, so on a loosely specified task tell it to explore the relevant sources first, including ones the task leaves unmentioned. For a review, ask only for problems that would block the merge, each with file, line, why it is wrong, and how to show it fails. Ask it to mark anything it could not confirm and say where it looked.

## When a result falls short

Climb one rung at a time. First give the subagent a check it can run, which is usually cheaper than more effort. Then raise effort to `high`, which costs more per turn but less than a bigger model. Then move up a model. Opus at `high` is the top rung; past it, the problem comes back to you.
