# 👨‍💻 Local Development

The main relevant files you can inspect are [package.json](/package.json), [rollup.config.js](/rollup.config.js) and [release.yml](/.github/workflows/release.yml).

## Node

|[package.json](/package.json)|
|-|

- We use `pnpm`.
- We've got your usual `dev` and `build` scripts.
  - They use [rollup](https://rollupjs.org/introduction/) for bundling.

## Rollup

| [rollup.config.js](/rollup.config.js)|
|-|

- Our test vault will be located at the directory root, at `./obsidian-fountain-editor-test` — initialize your own Obsidian vault!
  - Running `pnpm run dev` will continually generate the plugin binaries at `./obsidian-fountain-editor-test/.obsidian/plugins/fountain-editor`
- CSS is also compiled and preprocessed with [postcss](https://postcss.org/).
- `pnpm run build` creates files at the `./build` directory.

## GitHub Actions

| [release.yml](/.github/workflows/release.yml)|
|-|

- On creating new tags:
  - Checkout repo
  - Install node
    - Install pnpm
      - Try to use pnpm cache
    - Install packages
  - Build binaries
  - Create GitHub Release
  - Zip then upload build outputs
  - Upload binaries directly

Lazy branching strategy, I push to main for now, but do open Merge Requests.

OH and do leave a comment on the GitHub Issue or in one of the Discussion threads if you're going to work on a ticket, so that I know to not start on it as well, and we would end up doing duplicate work.

Feel free to [contact](/README.md#🤙-contact) me any time!
