# Obsidian Fountain Editor — Agent Context Router

> This file is the **top-level entry point** for AI agents working with this project.
> It is **agent-agnostic** — not tied to Continue, Cursor, Copilot, or any specific AI tool.
> Each section references a context file in `.docs/src/content/ai/` containing focused information.

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

| File | Focus | Tokens Estimate |
|---|---|---|
| `00-project.md` | Project overview, purpose, tech stack, high-level architecture | ~300 |
| `01-setup.md` | Prerequisites, installation, dev workflow, build commands | ~250 |
| `02-structure.md` | Directory layout, key files & roles, configuration files | ~400 |
| `03-concepts.md` | Fountain token types, decoration pipeline, multilingual support, settings | ~600 |
| `04-workflow.md` | Coding standards, testing approach, build/deploy, contribution guidelines | ~350 |
| `05-tasks.md` | Step-by-step guides for common development tasks | ~400 |
| `06-troubleshooting.md` | Common issues, solutions, debugging tips | ~300 |

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

*Last updated: 2026-05-27*
*This file is agent-agnostic and compatible with any AI coding assistant.*
