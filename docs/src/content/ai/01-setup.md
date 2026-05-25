# Getting Started & Development Setup

## Prerequisites

- **Node.js** >= 18.20.8
- **pnpm**
- **Obsidian** (for testing the plugin in a vault)
- **TypeScript**
- Familiarity with Fountain syntax (<https://fountain.io>)

## Installation for Development

```sh
# Install dependencies
pnpm install
```

> **Note:** The rollup dev config auto-creates/uses `./obsidian-fountain-editor-test/` as a test vault.

## Development Workflow

```sh
# Watch mode — builds automatically on file changes
pnpm dev

# Production build
pnpm build
```

**Output locations:**

- **Dev build** → `obsidian-fountain-editor-test/.obsidian/plugins/fountain-editor/`
- **Production build** → `build/`

The development build outputs CJS format `main.js`, processed `styles.css`, and a copy of `manifest.json`.

See `docs/src/content/docs/contributing/developing.md` for more.
