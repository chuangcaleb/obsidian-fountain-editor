# Project Overview

**Obsidian Fountain Editor** is a community plugin for [Obsidian](https://obsidian.md) that provides syntax highlighting and formatting for [Fountain](https://fountain.io) screenplay markup directly in the Obsidian editor. It integrates with CodeMirror 6 (Obsidian's underlying editor) to apply line-level decorations and CSS tokens, giving screenwriters a visual editing experience comparable to dedicated screenplay software.

## Key Technologies

| Technology | Purpose |
|---|---|
| **TypeScript** | Primary language |
| **Obsidian Plugin API** | Plugin lifecycle, settings, file metadata |
| **CodeMirror 6** | Editor extension system (`@codemirror/state`, `@codemirror/view`) |
| **Rollup** | Build system (JS bundling + CSS processing) |
| **PostCSS** | CSS pipeline (imports, vendor prefixes, minimization) |
| **Astro** | Documentation website (in `docs/`) |

## High-Level Architecture

For User Documentation, search markdown/mdx files in `docs/src/content/docs/`.

```
User (Obsidian)
   │
   ├─ FountainPlugin (src/main.ts)
   │     ├─ Lifecycle hooks (onload, onunload)
   │     ├─ Settings management
   │     └─ Registers CodeMirror extension & file tracker
   │
   ├─ Tracker (src/tracker.ts)
   │     └─ Watches active file for Fountain markers:
   │         .fountain.md extension, frontmatter tags/cssclasses
   │
   ├─ CodeMirror Extension (src/editor/plugin.ts)
   │     ├─ isFountainStateField (state field)
   │     └─ FountainPlugin (ViewPlugin) → applies decorations
   │
   ├─ Decorations Builder (src/editor/decorations.ts)
   │     └─ Line-by-line tokenizer → builds DecorationSet
   │
   └─ Styles (src/styles/)
         └─ CSS variables & classes for syntax tokens
```

## Project Links

- **GitHub:** <https://github.com/chuangcaleb/obsidian-fountain-editor>
- **Plugin on Obsidian:** <https://community.obsidian.md/plugins/fountain-editor>
- **Wiki:** Markdown content is in `docs/src/content/docs`
