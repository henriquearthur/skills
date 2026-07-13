# Codex dispatch mechanics

How to operate `spawn_agent` on the Codex harness. Disclosed reference for [SKILL.md](SKILL.md) — tier tables and rules live there.

- Pass `agent_type` explicitly on every call, even though it may not appear in the tool's schema — without it the child silently inherits the parent's model (the expensive frontier one).
- `task_name` accepts only lowercase letters, digits, and underscores. Put the tier in the name so the UI shows which model is working: `tier_volume_research_x`.
- Spawning a swarm: spawn all of them first, then issue a single wait at the end.

## TEMPORARY — harness bug

Follow-up turns to an existing subagent silently inherit the parent's model instead of keeping the subagent's role. Until the fix lands, treat subagents as single-shot: each unit of work gets a fresh spawn with a self-contained prompt and `fork_turns="none"`; for follow-up work, spawn a new subagent. Once follow-ups respect `agent_type`, delete this section and use subagents normally.
