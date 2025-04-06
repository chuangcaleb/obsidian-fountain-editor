---
title: 🖋️ Marking Files for Fountain
---

There are currently three ways to convert a regular Obsidian note into a hybrid Markdown+Fountain note.

## 🎨 Frontmatter Properties: Cssclasses

```md
---
cssclasses:
  - fountain
---

EXT. SOME PLACE - DAY

This is some scene description.

HERO
I'm here to save the day!
```

Pros:

- Technically this plugin just adds styling, so cssclasses may semantically make sense for you.
- You can use Search or Dataview to filter on the `[cssclasses]` Property.

Cons:

- I guess some people don't like frontmatter, you have to make sure you declare for each note.

## 🔖 Frontmatter Properties: Tag

```md
---
tags:
  - fountain
---

EXT. SOME PLACE - DAY

This is some scene description.

HERO
I'm here to save the day!
```

Pros

- You can use Search or Dataview to filter on the `[tags]` Property.
- You may like that you can click on Tags to auto-populate the Search pane

Cons:

- Again, I guess some people don't like frontmatter, you have to make sure you declare for each note.

## 📄 File Extension

```md
<!-- This file is named "Introduction.fountain.md" -->

EXT. SOME PLACE - DAY

This is some scene description.

HERO
I'm here to save the day!
```

Pros:

- No additional frontmatter.
- If using external tools outside of Obsidian, you can recognize this file as Fountain by filename, instead of parsing the frontmatter.

Cons

- You will need an Obsidian plugin like [MeepTech/obsidian-custom-file-extensions-plugin](https://github.com/MeepTech/obsidian-custom-file-extensions-plugin) to be able to open it like normal. It's super simple though.

---

Note that a note only needs at least one of these attributes to be recognized for Fountain. It also makes no difference if more than one attribute is applied!
