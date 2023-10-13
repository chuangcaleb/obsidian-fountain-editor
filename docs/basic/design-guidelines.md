# 🏗️ Design Guidelines

|<h3>📍 Make Obsidian *lack nothing*, as if it writing Fountain screenplays was an originally intended use case.</h3>|
|--|

## 🔀 Interoperable / Portable

**Work within a screenplay document *just* like you would with a regular Obsidian note.**

To leverage the power of interlacing Obsidian!Markdown and Fountain within a single document, we need to be able to write Markdown and Fountain syntax interchangeably and without friction.

It so happens that Obsidian-flavored Markdown plays quite well with Fountain syntax, generally. We still need to define some rules for those overlapping areas. You can read more at [Conflicts between Obsidian-flavored Markdown vs Fountain](/docs/basic/conflicts-between-obsidian-flavored-markdown-vs-fountain-md).

### ✅ Fountain-compliant by default

If a markdown file is written in Fountain syntax, then the entire document (syntax) contents should be immediately ***100% compatible for Fountain*** processors and exporters.

If it is not possible, then any non-Fountain-syntax should be trivially resolvable by simple regex/text pattern matching rules.

This is so that:

1. This Obsidian plugin will have less trouble/complexity because it doesn't have to figure out which regions are fountain, and which are not.
2. You'll be able to directly integrate with other Fountain-related tools with the same file (reference)!

A written comparison between writing in `.md` files vs in `.fountain` files is [coming soon](https://github.com/chuangcaleb/obsidian-fountain-editor/issues/1).

### ⚖️ Styling Parity

The ***syntax styling in the Obsidian editor should be as similar to a Fountain-exported PDF*** as possible.

### 🥇 Fountain-first

A ***Fountain-first user***, who has no previous knowledge of Obsidian or Markdown, should be able to write a full Fountain document with as little friction as possible.

### 🥈 Obsidian-second

An ***Obsidian-first user*** may be allowed to lose/forfeit their usual/familiar Obsidian syntax **IF** it conflicts with standard Fountain syntax.

### 🪓 Provide Escape Hatches

Since Fountain takes precedence, we should have Fountain-compliant methods to write sections of regular Markdown!

---

## 🚸 Parallel

**Fountain-styled notes should live in parallel with regular Obsidian/Markdown notes.**

While "**Interoperable**" deals with the hybrid nature of a single file/note, **Parallel** addresses the hybrid nature of a vault/folder of files/notes.

According to [Interoperable](#-interoperable--portable)#1 (Fountain-compliance), files will be either regular Obsidian markdown, or completely Fountain-compliant.

We should be able to mark/declare certain files to be Fountain-formatted, or to define some glob pattern for a group of files. Right now, you can enable Fountain formatting by marking a file with the frontmatter metadata Property `cssclasses: fountain`.

Then, Obsidian note-making is business as usual, until we come across a file that is marked for Fountain-formatting. That is the scope that this plugin will operate in.

(Implementation is subject to change! See [this discussion](https://github.com/chuangcaleb/obsidian-fountain-editor/discussions/4) for a possible alternative.)

---

## 🔬 Scoped

**This plugin should do [one thing well](https://en.wikipedia.org/wiki/Unix_philosophy), instead of many things half-baked.**

 "Lacking nothing" is different from "having everything"...

 Should overly-extensive requirements arise, a brand new/additional tool should be created/used. The numerous [Longform - Obsidian Plugin](https://github.com/kevboh/longform)  features should already cover almost all your additional needs, like [configurable manuscript compilation](https://github.com/kevboh/longform/blob/main/docs/COMPILE.md) and [word count](https://github.com/kevboh/longform/blob/main/docs/WORD_COUNTS.md)!

 See [Synergistic Tools](/docs/basic/synergistic-tools.md) for more recommendations!
