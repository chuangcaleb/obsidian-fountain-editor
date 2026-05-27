# Development Workflow & Contribution Guidelines

## Coding Standards

- **Language:** TypeScript with strict null checks (`strictNullChecks: true` in tsconfig.json)
- **Linting:** Uses [xo](https://github.com/xojs/xo) (`.xo-config.cjs`) — ESLint-based
  - `@typescript-eslint/naming-convention`: off
  - `capitalized-comments`: off
  - Prettier integration: enabled
- **Formatting:** Prettier (`.prettierrc`)
  - Tab width: 2, tabs not spaces, double quotes (single quotes disabled)
- **Imports:** ES module syntax with `.js` extensions in relative imports
  - `import { ... } from "./editor/plugin.js"` — required for Obsidian build
- **CSS:** PostCSS with `postcss-import` + `postcss-preset-env` (autoprefixing)
- **Editor:** `.editorconfig` enforces consistent indentation

## Commands (All Commands)

| Command | Purpose |
|---|---|
| `pnpm dev` | Watch mode — auto-builds on file change. Outputs to test vault. |
| `pnpm build` | Production build to `build/` directory. |
| `pnpm docs:dev` | Start Astro docs dev server (`cd docs && pnpm dev`). |
| `pnpm version patch|minor|major` | Bump version in package.json, sync manifest.json + versions.json. |

**Dev output:** `obsidian-fountain-editor-test/.obsidian/plugins/fountain-editor/`
**Production output:** `build/` — produces `main.js`, `styles.css`, `manifest.json`

## Rollup Plugins Used

- `@rollup/plugin-typescript` — TypeScript compilation
- `@rollup/plugin-commonjs` — CJS module conversion
- `@rollup/plugin-terser` — JS minification (production only)
- `rollup-plugin-postcss` — PostCSS processing
- `rollup-plugin-copy` — Copies manifest.json to output

## Version Bump Process

The release workflow is triggered by pushing a semver tag (e.g. `1.4.9`). Tags are bare semver (no `v` prefix) per Obsidian plugin spec.

1. Manually update `CHANGELOG.md` with curated release notes
2. Stage CHANGELOG.md: `git add CHANGELOG.md`
3. Run `pnpm version patch` (or `minor`/`major`) which:
   - Bumps `version` in `package.json`
   - Runs `version-bump.mjs` to sync `manifest.json` and `versions.json`
   - Creates a git commit + tag
4. Push commit and tag: `git push --follow-tags`
5. GitHub Actions release workflow triggers on the tag:
   - Runs `pnpm build` to produce `main.js`, `styles.css`, `manifest.json`
   - Creates a GitHub release via `gh release create` with auto-generated release notes
   - Uploads `main.js`, `manifest.json`, `styles.css` as release assets
6. Optionally add a CHANGELOG.md link to the release body in GitHub UI

## Testing Approach

No automated tests. Testing is manual:

1. Run `pnpm dev` to auto-build
2. Open test vault (`obsidian-fountain-editor-test/`) in Obsidian
3. Create Fountain note (e.g., `cssclasses: fountain` in frontmatter)
4. Verify syntax highlighting, check Dev Console (`Ctrl+Shift+I`) for errors
5. Test edge cases: empty notes, mixed Fountain+Markdown, all token types

> **TODO:** Future work — vitest for unit tokenizer tests, snapshot tests for decorations, Playwright for Obsidian integration tests.

## Common Gotchas

### `.js` extension required in imports

TypeScript sources use `.js` extension: `import {x} from "./foo.js"`. Omission causes Rollup build failure. Standard Obsidian plugin convention.

### LINE_TOKENS order is match-first

First matching regex wins. Adding new token after broader regex means it never matches. Insert position carefully.

### xo lint is strict

`npx xo` enforces double quotes, tabs, no unused vars. Prettier integration active — format first, then lint.

### No `pnpm test`

No test command exists. Verify changes manually in Obsidian test vault.

## Contribution Guidelines

1. **Fork** on GitHub
2. **Feature branch:** `git checkout -b feat/my-feature`
3. **Make changes** and test in Obsidian
4. **Follow standards:** xo lint, Prettier formatting
5. **Conventional commits:**
   - `feat:`, `fix:`, `docs:`, `refactor:` prefixes
6. **Run lint:** `npx xo` (no errors)
7. **Open PR** against `main`, explain change and testing approach

Issue templates at `.github/ISSUE_TEMPLATE/`:

- `bug.yml` — structured bug report
- `feature_req.yml` — feature request with use case
- `task.yml` — dev task checklist
- `config.yml` — directs to templates, disables blank issues

## Documentation Site

Built with **Astro** in `docs/`:

- Content: `docs/src/content/docs/`
- Dev: `pnpm docs:dev`
- Deployed to `https://obsidian-fountain-editor.chuangcaleb.com`
