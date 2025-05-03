---
title: 📝 Longform Resources
---

Here's a Longform user script for stripping out blockquotes. It is useful when using [blockquotes for markdown annotations](/references/opting-out#obsidianmarkdown-blockquote-recommended)!

```js
module.exports = {
  description: {
    name: "Strip Blockquotes",
    description: "Removes all lines starting with '>' from scenes.",
    availableKinds: ["Scene"],
    options: [],
  },
  compile(input, _) {
    return input.map(scene => {
      const lines = scene.contents.split("\n");
      const filtered = lines.filter(line => !line.trimStart().startsWith(">"));
      return {
        ...scene,
        contents: filtered.join("\n"),
      };
    });
  },
};

```
