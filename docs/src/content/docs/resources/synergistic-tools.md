---
title: 🤝 Synergistic Tools
description: A list of tools to use together with the Obsidian Fountain Editor plugin
---

## External tools

### [Better Fountain - VS Code Extension](https://marketplace.visualstudio.com/items?itemName=piersdeseilligny.betterfountain)

> _Fountain autocomplete, syntax highlighting, and export to PDF_

- **Fountain screenplay writing in VS Code!**
- It's what I've been using before this, and what I will continue to use for its:
  1. Export to PDF
  2. Actual PDF-like Live Preview
  3. Familiarity with my coding workflows and configurations
  4. Screenplay statistics (afterwriting-labs integration)
  5. Repository management, like version control with `git`
  6. Writing Fountain directly
- The BetterFountain plugin and IDE editor are both still great UX that I will still use.
- That said,
  1. I want links to integrate with my Obsidian vault.
  2. Since Fountain is meant to be written in one long document, it gets bulky. Which leads us to...

## Obsidian Plugins

### [kevboh/longform](https://github.com/kevboh/longform)

> _A plugin for Obsidian that helps you write and edit novels, screenplays, and other long projects._

- **Manage and compile notes into an ordered manuscript!**
  - Yes! This allows you to write Fountain in separate files! And combines them according to your sequence!
  - John August's own [Assembler](https://quoteunquoteapps.com/assembler/) was the original attempt to rectify the issue of [Fountain requiring all your content in a single file](https://github.com/chuangcaleb/ffluent#purpose). It's still an option.
  - But Longform integrates with Obsidian and stores your configuration.
- Through Longform's [Compile](https://github.com/kevboh/longform/blob/main/docs/COMPILE.md) extra features, you can also strip Fountain-incompatible markdown tokens like frontmatter, comments and wikilinks from source files!
- Then you can specify an output file as `out/$1.fountain`!
  - _Thanks, @kevboh, for [fixing this](https://github.com/kevboh/longform/issues/203#issuecomment-1769837247)!_
- An **ESSENTIAL** tool if you're really going to use Obsidian for any writing projects.

### [MeepTech/obsidian-custom-file-extensions-plugin](https://github.com/MeepTech/obsidian-custom-file-extensions-plugin)

> _An obsidian plugin allowing you to register and view different file extensions in a modular manner._

- Allows you to open `.fountain` files in the Obsidian editor!
- Fountain syntax formatting works!
- Note that `.fountain` files are treated like external files, unlike native markdown files that integrate in Obsidian's systems.

### [deathau/cm-typewriter-scroll-obsidian](https://github.com/deathau/cm-typewriter-scroll-obsidian)

> _Typewriter Scroll Obsidian Plugin_

- Automatic scrolling as you type — your cursor/active line stays at a fixed point on your screen. No more flickering eyes.
