# Obsidian Fountain Editor — Agent Context Router

> This file is the **top-level entry point** for AI agents working with this project.
> It is **agent-agnostic** — not tied to Continue, Cursor, Copilot, or any specific AI tool.
> Each section references a context file in `docs/src/content/ai/` containing focused information.

---

## How to Use This

When starting a new task, load only the context files relevant to your work.
This avoids bloating the context window with irrelevant information.

**Quick reference for choosing context files:**

| If you are... | Load these files |
|---|---|
| New to the project | `00-project.md`, `02-structure.md`, `03-concepts.md` |
| Writing code / fixing a bug | `00-project.md`, `02-structure.md`, `03-concepts.md`, `04-workflow.md`, `05-tasks.md` |
| Debugging syntax highlighting | `00-project.md`, `03-concepts.md`, `06-troubleshooting.md` |
| Adding a new feature | `00-project.md`, `02-structure.md`, `03-concepts.md`, `04-workflow.md`, `05-tasks.md` |
| Setting up the dev environment | `01-setup.md` |
| Writing documentation | `02-structure.md`, `04-workflow.md` |
| Reviewing a PR / contributing | `04-workflow.md` |

---

## Context Files

| File | Focus | Tokens (cl100k_base) |
|---|---|---|
| `00-project.md` | Project overview, purpose, tech stack, architecture | ~488 |
| `01-setup.md` | Prerequisites, install, dev watch mode | ~212 |
| `02-structure.md` | Directory layout, key files & roles, config files | ~970 |
| `03-concepts.md` | Token types, decoration pipeline, CM6/API primer, rationale, gotchas | ~1400 |
| `04-workflow.md` | Coding standards, commands, CI/CD, contribution guide, gotchas | ~878 |
| `05-tasks.md` | Step-by-step dev tasks, gotchas | ~947 |
| `06-troubleshooting.md` | Common issues, debugging tips, anti-patterns | ~985 |
| `CONTEXT.md` | Domain glossary, design principles, flagged ambiguities, ADR refs | ~1200 |
| `adr/001-wikilink-override.md` | ADR: Fountain Notes overridden by Obsidian wikilinks | ~80 |

---

## Agent Constraints

- NEVER commit `data.json`, `.env`, vault paths, or `notes.md`
- NEVER remove `.js` extension from relative imports — breaks Rollup
- NEVER implement Fountain Notes (`[[...]]`) — Obsidian wikilinks win, see ADR-001
- ALWAYS run `npx xo` before commit — lint gate
- ALWAYS use `pnpm` not npm/yarn

---

Read the relevant file(s) and include their content in your system prompt or initial message.
For example:

```
Please load `00-project.md` and `03-concepts.md` to understand the project and its key concepts before I begin.
```

---

## Maintenance

- **Keep context files focused** — each file should cover one topic area.
- **Update when the project changes** — update the relevant file when you add new features, change the build system, or modify the architecture.
- **Add new files as needed** — if a topic becomes large enough to warrant its own file, create a new numbered file and update this router.
- **Keep the token estimates in the table above realistic** — rough estimates help agents decide which files to load.

*Last updated: 2025-04-14*
*This file is agent-agnostic and compatible with any AI coding assistant.*

---

## Domain Glossary & Decisions

- **Glossary:** `docs/src/content/ai/CONTEXT.md` — domain terminology (pure glossary, no implementation)
- **ADRs:** `docs/src/content/ai/adr/` — architecture decision records (created when needed)
