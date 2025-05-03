---
"obsidian-fountain-editor": minor
---

fix: Enforce consistent layout widths by using CSS `ch` instead of ratio widths. (fixes #59)

This ensures consistency in the word wrapping and line breaks between (1) how you see it in Obsidian, and (2) your final rendered PDF.

Of course, that's assuming you don't meddle too much with CSS in Obsidian, as well as standard Fountain-to-PDF settings. This is accomplished by using the `ch` width unit, which ensures consistent width since screenplays use a monospace font. You can be confident in how the

Note, if you were previously using the old CSS tokens for widths (e.g. `--fountain--character-left-factor`), they are removed, and instead simplified to just 4 tokens:

```css
// Current default tokens:
--fountain-line-width: 60ch;
--fountain-character-line-width: 16ch;
--fountain-dialogue-line-width: 38ch;
--fountain-parenthetical-line-width: 29ch;
```

This sleeker, cleaner method, unfortunately, becomes funky-looking when on the most popular Obsidian theme. Minimal provides some really cool line-width utilities, which is why I personally use it, but it breaks this.

There is now a toggle in Settings to fix the styling if you are using Minimal theme.
