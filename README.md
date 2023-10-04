# Obsidian Fountain - Live Editor

|**Obsidian Live Preview styling for the [Fountain](https://fountain.io) screenplay language syntax.**|
|-|

[![banner](docs/assets/banner.png)](https://youtu.be/GORryaw32sI "Obsidian Fountain - Live Editor (Plugin Showcase)")

---

## Usage

### Quickstart

Currently in beta, you may use [BRAT](https://github.com/TfTHacker/obsidian42-brat) to install it!

Open any file and add `cssclasses: fountain` to the frontmatter metadata Properties. You will get automatic formatting according to the [Fountain syntax rules](https://fountain.io/syntax/)!

```yaml
---
cssclasses:
  - fountain
---
# Opening Hook

EXT. PUBLIC RESTROOM - DAY
```

> **Youtube Demo**: [Obsidian Fountain - Live Editor (Plugin Showcase)](https://youtu.be/GORryaw32sI)

### Disclaimer

This plugin should only extend your view and should never modify any local files, but to be safe, just play around in test vaults until we reach a stable 1.0.0!

---

## Design Guidelines

### Interoperable

Obsidian-flavored Markdown plays quite well with Fountain syntax, generally. We need to define some rules for those overlapping areas. You can read more at [Conflicts between Obsidian-flavored Markdown vs Fountain](<docs/basic/Conflicts between Obsidian-flavored Markdown vs Fountain.md>).

For this particular project, these are the general design philosophies:

1. ✅ **Fountain-compliant**: If a markdown document is written in Fountain syntax, the entire document (syntax) must be ***100% compatible with Fountain*** processors and exporters. (If you want local Fountain syntax, just use a codeblock!)
  1a. ⚖️ **Formatting Parity**: The entire final processed document, especially the actual Fountain parts (that is, not the escaped synopsis or boneyard sections), should look ***as similar to the rendered Live Preview formatting*** as possible.
2. 🥇 **Fountain-first**: A ***Fountain-first user***, who has no previous knowledge of Obsidian or Markdown, should be able to write a full Fountain document with zero friction.
3. 🥈 **Obsidian-second**: An ***Obsidian-first user*** may be allowed to lose/forfeit their usual/familiar Obsidian syntax **IF** it conflicts with standard Fountain syntax.
  3a. 🪓 **Escape Hatches**: Since Fountain takes precedence, we should have Fountain-compliant methods to write sections of regular Markdown!

### Parallel

**Fountain-formatted notes should live in parallel with regular Obsidian Markdown notes.**

According to [Interoperable](#interoperable)#1 (Fountain-compliance), files will be either regular Obsidian markdown, or completely Fountain-compliant.

We should be able to mark/declare certain files to be Fountain-formatted, or to define some glob pattern for a group of files. Right now, you can enable Fountain formatting by marking a file with the frontmatter metadata Property `cssclasses: fountain`.

Then, Obsidian note-making is business as usual, until we come across a file that is marked for Fountain-formatting. That is the scope that this plugin will operate in.

(This one is subject to change! See [this discussion](https://github.com/chuangcaleb/obsidian-fountain-live/discussions/4) for a possible alternative)

### Scoped

This plugin should do [one thing well](https://en.wikipedia.org/wiki/Unix_philosophy). That one thing is to add Live Editor styling for the Fountain syntax to Obsidian.

That said, there are a LOT of tools that can fill obvious missing steps in your pipeline.

#### Recommended Tools

- [Better Fountain - Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=piersdeseilligny.betterfountain): *Fountain autocomplete, syntax highlighting, and export to PDF*
  - **Fountain writing in VS Code!**
  - It's what I've been using before this, what I will continue to use for its:
    1. Export to PDF!
    2. Live Preview!
    3. Screenplay statistics!
    4. Repository management, like handling `git`. Obsidian will still use `git`.
    5. Writing Fountain directly. It's still a great UX that I will still use.
  - That said,
    1. I want links to integrate with my Obsidian vault.
    2. Since Fountain is meant to be written in one long document, it gets bulky. Which leads us to...
- [kevboh/longform](https://github.com/kevboh/longform): *A plugin for Obsidian that helps you write and edit novels, screenplays, and other long projects.*
  - **Manage and compile notes into an ordered manuscript!**
  - Yes! This means you can write Fountain in separate files! And sequence them!
- [MeepTech/obsidian-custom-file-extensions-plugin](https://github.com/MeepTech/obsidian-custom-file-extensions-plugin): *An obsidian plugin allowing you to register and view different file extensions in a modular manner.*
  - Allows you to open `.fountain` files in the Obsidian editor!
  - Fountain syntax formatting works!
  - But `.fountain` files will not be linked in the editor.

See the [Related Projects](#related-projects) section for more!

---

## Contributing

### Overview

#### Don't know how to code? You can contribute

- 🪲 **Report bugs/request features** on the Issue tab!
- 📣 **Share (the link to) this plugin** around on forums and channels and with your friends! Raise awareness!
- 💬 **Message me** (@chuangcaleb) on Discord!
  - 🪲 Report a bug!
  - ⚡️ Request a feature!
  - 🤩 Send words of encouragement! They actually make a difference.
- ✍🏼 **Create a screenplay project** integrated with Obsidian!
  - 📸 **Showcase examples** of how you took advantage of mixing the best of Fountain + Obsidian. Then I can reuse your examples in promotions, and maybe get inspiration too! hehe

#### Know how to code? You can contribute

- 🔀 **Open a Pull Request!** *Focus on critical bugs and major features first.*
  - 🏗️ I may need some help setting up infrastructure stuff like automation!
- 🪲 **Report a bug**, but with your *specialized technical diagnosis*!
- 🫱 **Send some advice**, Not just a first-time Obsidian plugin dev, but my first public community project.

## Related Projects

- [Darakah/obsidian-fountain](https://github.com/Darakah/obsidian-fountain): *Obsidian plugin to edit, write and render Fountain Writing Syntax for screenplays and scripts*
  - Formats Fountain syntax, just like this plugin
  - But for preview mode only, and must be wrapped in a code block
  - 2.5 years+ old project
- [chuangcaleb/ffluent](https://github.com/chuangcaleb/ffluent): CLI to bundle atomic Fountain screenplay files
  - My attempt to replicate `longform` but for Fountain files, as a CLI. Uses a json/yaml file at each directory to define a sequence.
  - Abandoned since this project, but may be of interest.
- [Highland 2](https://www.highland2.app/)
  - Made by the creator of Fountain itself. Features its own text editor app, WYSIWYG, "Revision Mode" and analysis tools. Since everything is wrapped in a nice bow, it's probably the best Fountain-writing app if you're not technical.
