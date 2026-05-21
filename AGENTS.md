<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Default Agent Configuration

**ALWAYS USE CAVEMAN MODE** — Default to `/caveman full` for all responses. Code, commits, and PRs write normal. Security warnings use normal mode. Switch intensity: `/caveman lite|full|ultra|wenyan-lite|wenyan-full|wenyan-ultra`.

**ALWAYS USE GITNEXUS** — All code exploration, impact analysis, and refactoring MUST use GitNexus MCP tools. Never grep/grep without checking GitNexus first.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **pickleball-planner** (100 symbols, 126 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/pickleball-planner/context` | Codebase overview, check index freshness |
| `gitnexus://repo/pickleball-planner/clusters` | All functional areas |
| `gitnexus://repo/pickleball-planner/processes` | All execution flows |
| `gitnexus://repo/pickleball-planner/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

<!-- caveman:start -->
# Caveman Skills — Ultra-Compressed Communication

**DEFAULT: `/caveman full`** — All responses use caveman mode unless stated otherwise. Code, commits, and PRs write normal. Security warnings use normal mode.

These skills cut token usage ~75% while keeping full technical accuracy. All skills are in `.agents/skills/`.

## Available Skills

| Skill | Trigger | Description |
|-------|----------|-------------|
| **caveman** | "caveman mode", "talk like caveman", "use caveman", "less tokens", "be brief", `/caveman` | Ultra-compressed communication. Modes: lite, full (default), ultra, wenyan-lite, wenyan-full, wenyan-ultra |
| **caveman-commit** | "write a commit", "commit message", "generate commit", `/commit`, staging changes | Conventional Commits format. Subject ≤50 chars, body only when "why" isn't obvious |
| **caveman-review** | "review this PR", "code review", "review the diff", `/review`, reviewing PRs | One line per finding: location, problem, fix. Severity prefixes: 🔴 bug, 🟡 risk, 🔵 nit, ❓ q |
| **caveman-compress** | `/caveman:compress <filepath>`, "compress memory file" | Compress CLAUDE.md, todos, preferences into caveman format. Backup saved as FILE.original.md |
| **caveman-help** | `/caveman-help`, "caveman help", "what caveman commands" | Quick-reference card for all caveman modes, skills, and commands |

## Usage

- **caveman mode persists** until "stop caveman" or "normal mode"
- Switch intensity: `/caveman lite|full|ultra|wenyan-lite|wenyan-full|wenyan-ultra`
- Auto-triggers: token efficiency requests, staging changes (commit), reviewing PRs
- **Boundaries**: code/commits/PRs write normal. Security warnings use normal mode.

## Intensity Levels

| Level | What changes |
|-------|--------------|
| **lite** | No filler/hedging. Keep articles + full sentences. Professional but tight |
| **full** | Drop articles, fragments OK, short synonyms. Classic caveman |
| **ultra** | Abbreviate (DB/auth/config/req/res/fn/impl), strip conjunctions, arrows for causality (X → Y) |
| **wenyan-*** | Classical Chinese register. 80-90% character reduction |

## Examples

**"Why React component re-render?"**
- lite: "Your component re-renders because you create a new object reference each render. Wrap it in `useMemo`."
- full: "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."
- ultra: "Inline obj prop → new ref → re-render. `useMemo`."

**Commit message:**
```
feat(api): add GET /users/:id/profile

Mobile client needs profile data without full user payload
to reduce LTE bandwidth on cold-launch screens.

Closes #128
```

**Code review:**
`L42: 🔴 bug: user can be null after .find(). Add guard before .email.`

<!-- caveman:end -->

# Context7 — Documentation Lookup

**ALWAYS use Context7 MCP** when looking up documentation for any library, framework, SDK, API, or cloud service — even well-known ones like Next.js, React, Bootstrap, or ESLint. Training data may not reflect recent changes.

## Workflow

1. `context7_resolve-library-id` with library name + question (e.g., libraryName: "next.js", query: "how to configure API routes in pages router")
2. Pick best match by: exact name, description relevance, snippet count, reputation (High/Medium), benchmark score
3. `context7_query-docs` with selected library ID + full question
4. Answer using fetched docs

## Rules

- Use even when you think you know the answer — deprecations and breaking changes happen
- Do NOT use for: refactoring, writing scripts from scratch, debugging business logic, general programming concepts
- Re-query if results look stale or don't match the installed version
