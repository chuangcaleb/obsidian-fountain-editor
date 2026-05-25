# Development Workflow & Contribution Guidelines

## Coding Standards

- **Language:** TypeScript with strict null checks (`strictNullChecks: true` in tsconfig.json)
- **Linting:** Uses [xo](https://github.com/xojs/xo) (`.xo-config.cjs`) — zero-config JS linter built on ESLint
  - `@typescript-eslint/naming-convention`: off
  - `capitalized-comments`: off
  - Prettier integration: enabled
- **Formatting:** Prettier (`.prettierrc`)
  - Tab width: 2
  - Use tabs (not spaces)
  - Single quotes: disabled (double quotes)
- **Imports:** Use ES module syntax with `.js` extensions in relative imports
  - Example: `import { ... } from "./editor/plugin.js"`
  - This is required because Obsidian's build expects ES module resolution
- **CSS:** Uses PostCSS with:
  - `postcss-import` — allows `@import` statements in CSS
  - `postcss-preset-env` — enables modern CSS features with autoprefixing
- **Editor:** `.editorconfig` file enforces consistent indentation across editors

## Testing Approach

Currently, **no automated tests exist**. Testing is manual:

1. Run `pnpm dev` to auto-build on file changes
2. Open the test vault (`obsidian-fountain-editor-test/`) in Obsidian
3. Create/edit a Fountain note (e.g., with `cssclasses: fountain` in frontmatter)
4. Verify syntax highlighting appears correctly
5. Check the Obsidian Developer Console (`Ctrl+Shift+I`) for errors
6. Test edge cases: empty notes, mixed Fountain+Markdown, all token types

> **TODO:** Future work could add test infrastructure — vitest for unit tests on the tokenizer, snapshot tests for decoration output, or Playwright for integration tests within Obsidian.

## Build & Deployment Pipeline

### Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Watch mode — auto-builds on any file change. Outputs to test vault. |
| `pnpm build` | Production build to `build/` directory. |
| `pnpm changeset` | Create a changeset for version bumping. |
| `pnpm version` | Apply changesets and bump version. |

### Rollup Plugins Used

- `@rollup/plugin-typescript` — TypeScript compilation
- `@rollup/plugin-commonjs` — CJS module conversion
- `@rollup/plugin-terser` — JS minification (production only)
- `rollup-plugin-postcss` — PostCSS processing
- `rollup-plugin-copy` — Copies manifest.json to output

### Version Bump Process

1. Run `pnpm changeset` to create a changeset file
2. Run `pnpm version` which:
   - Uses `@changesets/cli` to update versions
   - Runs `version-bump.mjs` to update `versions.json` with the new version and min app version
3. Merge the PR with the version bumps
4. Create a GitHub release with the built files

## Contribution Guidelines

1. **Fork** the repository on GitHub.
2. **Create a feature branch:** `git checkout -b feat/my-feature`
3. **Make changes** and test thoroughly in Obsidian.
4. **Follow coding standards** (xo lint, Prettier formatting).
5. **Use conventional commits:**
   - `feat: add support for ...`
   - `fix: correct scene heading detection when ...`
   - `docs: update documentation for ...`
   - `refactor: simplify decoration builder`
6. **Run lint:** `npx xo` (ensure no errors)
7. **Open a pull request** against the `main` branch.
8. In the PR description, explain the change and note how it was tested.

## Documentation Site

The documentation site is built with **Astro** and lives in `docs/`.

- Content: Markdown/MDX files in `docs/src/content/docs/`
- Development: `cd docs && pnpm install && pnpm dev`
- The site is deployed to `obsidian-fountain-editor.chuangcaleb.com`