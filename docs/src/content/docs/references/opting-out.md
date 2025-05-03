---
title: 🙋‍♂️ Opting Out to Markdown
sidebar:
  order: 3
---

When a file is marked for Fountain formatting, the whole file is treated as Fountain, by default. For those who like to annotate in their screenplay, there are a variety of escape-hatch methods to do so.

## Fountain Synopsis

Fountain's [Synopses](https://fountain.io/syntax/#sections-and-synopses) is treated by the processor as a valid line of Fountain, but it does not receiving any additional styling (notably, the custom screenplay font isn't applied).

```md title="Synopsis.fountain.md"
= Any line that starts with a `=` symbol is treated as a **Fountain Synopsis**.
```

Technically, it still applies the `cm-fountain-synopsis` class name, but Fountain Synopsis and Headings are excluded from additional Fountain styling.

![demo of using synopsis](/src/assets/synopsis.png)

- Pros:
  - Valid Fountain syntax, so you don't need any pre-processing to strip it out or whatever.
- Cons:
  - Only applied per-line, it gets tiring to type out the `=` prefix on every line. Besides, I don't think multi-line synopsis is the intended use-case for Fountain.
  - Not supported by Obsidian

---

## Obsidian/Markdown Blockquote (recommended)

Obsidian's [Block/quotes](https://help.obsidian.md/syntax#Quotes) syntax conflicts with Fountain's Forced [Transition](https://fountain.io/syntax/#transition) syntax -- read details at [Syntax Conflicts](/resources/syntax-conflicts/).

However, if you are able to strip out all the blockquotes before rendering your PDF, with [an optional setting](️/references/settings/#-prefer-obsidians-blockquote-over-fountains-forced-transition), you can use liberally blockquotes everywhere!

```md title="Blockquote.fountain.md"
> Usually, this is Fountain's forced Transition.

> But if there is a non-empty line before or after...
> Then it is treated like a regular Obsidian-markdown blockquote!

> But you can opt-out entirely with the setting: "Prefer Obsidian's blockquote over Fountain's forced Transition"

> [!important]
> You can even use callouts!
```

This is the plugin author's recommended way to annotate screenplays with markdown.

![demo of using blockquote](/src/assets/blockquote.png)

- Pros
  - Natively supported by Obsidian
  - Can be converted into Obsidian Callouts!
  - No rendering issues, CLEAN!
  - Spans across multiple lines
- Cons
  - Requires a step of processing to strip out blockquotes before PDF render
  - Requires an indented `>` prefix, not flush with document body. However...
    - Some people sees this clearly defined annotation area, as a win
    - Native Obsidian support provides that auto-formatting and commands

---

## Obsidian Comments

Text enclosed within `%% Obsidian comment symbols %%` don't receive Fountain formatting, so they look just like regular markdown!

This is no longer the recommended way to annotate screenplay, since we found [an issue](https://github.com/chuangcaleb/obsidian-fountain-editor/pull/58) where a large comment area would break the plugin's Fountain formatting. It is still however a usable way to opt-out into markdown.

```md title="Obsidian Comments.fountain.md"
%%
Text inside here will be regular markdown!
%%

```

- Pros
  - Natively supported in Obsidian!
  - Annotations in main body, without additional indentation or markup. Makes it super simple to add new lines.
  - Spans across multiple liness
- Cons
  - Aforementioned issue where large comment blocks causes the plugin's formatting to go whack
