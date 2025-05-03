---
title: ⚙️ Plugin Settings
sidebar:
  order: 4
---

## Functional

### ☑️ Prefer Obsidian's blockquote over Fountain's forced Transition

Skips trying to convert single-lines that start with `>` from Obsidian blockquotes into Fountain's Transitions. Blockquotes are the preferred cleaner way to annotate your screenplay, but you will need to [strip them out](/resources/longform) before rendering your Fountain document to PDF.

## Visual

### ☑️ Fix broken styling on certain themes

**Fix Fountain formatting on themes like Minimal.**

v1.4.0 implements better code for styling. This sleeker, cleaner method, unfortunately, becomes funky-looking when on the most popular Obsidian theme. Minimal provides some really cool line-width utilities, which is why I personally use it, but it breaks this.

There is now a toggle in Settings to fix the styling if you are using Minimal theme.
