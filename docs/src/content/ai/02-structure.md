# Project Structure

## Directory Layout

```
obsidian-fountain-editor/
├── src/                   # Source code
│   ├── main.ts            # Plugin entry point
│   ├── settings.ts        # Plugin settings & settings tab
│   ├── tracker.ts         # Active file Fountain detection
│   └── editor/            # CodeMirror extension
│       ├── plugin.ts      # State field & ViewPlugin wrapper
│       ├── decorations.ts # Tokenizer & decoration builder
│       ├── consts.ts      # Token definitions & regex patterns
│       └── interface.ts   # TypeScript interfaces
├── src/styles/            # CSS stylesheets
│   ├── index.css          # Entry point (imports other CSS files)
│   ├── base.css           # Base reset / layout styles
│   ├── tokens.css         # Syntax token CSS variables
│   ├── font.css           # Font-related styles
│   └── options.css        # Settings-controlled styles
├── docs/                  # Astro documentation site (markdown/mdx in docs/src/content/docs/)
├── rollup.config.js       # Build configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies & scripts
├── manifest.json          # Obsidian plugin manifest
├── pnpm-workspace.yaml    # pnpm workspace config
├── version-bump.mjs       # Version bump script (for changesets)
├── .xo-config.cjs         # Linting config (xo/ESLint)
├── .prettierrc            # Formatting config (Prettier)
├── .editorconfig          # Editor settings
└── .github/               # Issue templates, CI/CD workflows
```

## Key Files Explained

### Source Code (`src/`)

| File | Role |
|---|---|
| `main.ts` | Plugin lifecycle (`onload`, `onunload`); registers the CodeMirror extension and event listeners for file/metadata changes |
| `settings.ts` | User-facing settings tab with `fixMinimal` and `preferObsidianBlockquote` options; `FountainEditorSettings` type |
| `tracker.ts` | Watches file open/change events; determines if the active note should be treated as Fountain (checks extension, tags, cssclasses) |
| `editor/plugin.ts` | Defines `isFountainStateField` (CodeMirror StateField) and `FountainPlugin` (ViewPlugin) that applies decorations |
| `editor/decorations.ts` | Core tokenizer: reads visible lines, determines Fountain element types, builds `DecorationSet` |
| `editor/consts.ts` | All regex patterns for Fountain tokens (scene heading, character, dialogue, etc.) with multilingual support |
| `editor/interface.ts` | `FountainState` and `FountainContext` type definitions |

### Styles (`src/styles/`)

| File | Role |
|---|---|
| `index.css` | Entry point; imports base, tokens, font, and options |
| `base.css` | Base reset / layout styles for Fountain lines |
| `tokens.css` | CSS variables for each syntax token (colors, fonts, etc.) |
| `font.css` | Font-related styles (Courier family for screenplay look) |
| `options.css` | Settings-controlled styles (theme fix, blockquote override) |

### Configuration Files

| File | Role |
|---|---|
| `rollup.config.js` | Dual pipeline: TypeScript → `main.js` (CJS bundle) + PostCSS → `styles.css`; dev output to test vault, production to `build/` |
| `tsconfig.json` | TypeScript config: `ESNext` modules, `ES6` target, strict null checks, `DOM`/`ES5`/`ES6`/`ES7` libs |
| `package.json` | Dependencies, scripts (`dev`, `build`, `changeset`, `version`), node engine constraint |
| `manifest.json` | Obsidian plugin manifest: `id: fountain-editor`, `minAppVersion: 0.15.0`, desktop + mobile |
| `pnpm-workspace.yaml` | pnpm workspace config |
| `.xo-config.cjs` | xo (ESLint-based) linter config; prettier integration enabled; naming-convention off |
| `.prettierrc` | Tab indentation (2-wide), single quotes disabled |

## Build Output

Rollup produces:
- `main.js` — bundled plugin code (CommonJS format)
- `styles.css` — processed PostCSS output
- `manifest.json` — copied from root