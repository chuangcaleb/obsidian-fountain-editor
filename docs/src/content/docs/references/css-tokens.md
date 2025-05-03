---
title: 🎨 CSS Tokens
---

You can use [Obsidian's CSS snippets](https://help.obsidian.md/snippets) to tweak the styling.

Currently, you can find these defaults at [base.css](https://github.com/chuangcaleb/obsidian-live-fountain/blob/master/src/styles/base.css)

```css
/* src/styles/base.css */

/* Screenplay font. */
--fountain-font-family: "Courier Prime", "Courier New", "Courier", monospace;

/*
* Line widths for each token.
* Also determines left-right margins.
*/
--fountain-line-width: 60ch;
--fountain-character-line-width: 16ch;
--fountain-dialogue-line-width: 38ch;
--fountain-parenthetical-line-width: 29ch;

/* Color of text in %% Obsidian comment %% blocks and <!-- HTML comments --> (not set). */
/* --fountain-code-comment: */
```

Technical note: it is recommended to use the CSS `ch` width unit, to ensure consistent layout with industry-standard rendered PDFs of screenplays. This can be achieved since monospace fonts have consistent character widths -- read more at [Sizing Units | web.dev](https://web.dev/learn/css/sizing/#absolute_lengths).

Roadmap plans so far:

- Toggle italics on parenthesis
- Toggle italics on character extensions
- Toggle bold on scene headings
- Toggle bold on transitions
- Toggle bold on centered text
