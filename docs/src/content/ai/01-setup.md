# Getting Started & Development Setup

## Prerequisites

- **Node.js** >= 18.20.8
- **pnpm**
- **Obsidian** (for testing)
- Familiarity with Fountain syntax (<https://fountain.io>)

## Install & Run

```sh
pnpm install

# Watch mode — auto-builds on file changes. Outputs to test vault.
pnpm dev
```

**Dev output:** `obsidian-fountain-editor-test/.obsidian/plugins/fountain-editor/` (auto-created)

Open `obsidian-fountain-editor-test/` in Obsidian, create a note with `cssclasses: fountain` in frontmatter. Styling appears on save.

See `docs/src/content/docs/contributing/developing.md` for more.
