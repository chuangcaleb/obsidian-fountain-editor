# obsidian-fountain-editor

## 1.4.0

### Consistent document layout widths

Enforce consistent layout widths by using CSS `ch` instead of ratio widths. (fixes #59)

This ensures consistency in the word wrapping and line breaks between (1) how you see it in Obsidian, and (2) your final rendered PDF.

Of course, that's assuming you don't meddle too much with CSS in Obsidian, as well as standard Fountain-to-PDF settings. This is accomplished by using the `ch` width unit, which ensures consistent width since screenplays use a monospace font. You can be confident in how the

Minor breaking change: if you were previously using the old CSS tokens for widths (e.g. `--fountain--character-left-factor`), they are removed, and instead simplified to just 4 tokens:

```css
// Current default tokens:
--fountain-line-width: 60ch;
--fountain-character-line-width: 16ch;
--fountain-dialogue-line-width: 38ch;
--fountain-parenthetical-line-width: 29ch;
```

This sleeker, cleaner method, unfortunately, becomes funky-looking when on the most popular Obsidian theme. Minimal provides some really cool line-width utilities, which is why I personally use it, but it breaks this.

There is now a toggle in Settings to fix the styling if you are using Minimal theme.

### Markdown Blockquote Annotations

You can now use Markdown blockquotes as screenplay annotations. This is a new more stable alternative to the `%% Obsidian comment %%` annotation -- see [#58](https://github.com/chuangcaleb/obsidian-fountain-editor/pull/58/files). There is also now a setting to opt-out of formatting Fountain forced-Transitions.

Note that if you use Markdown blockquotes, you will need to strip your document of blockquotes before rendering Fountain to PDF.

- 1a75126: Skip processing Obsidian multi-line blockquotes as Fountain forced Transitions
- a298bc0: Add option to opt-out of formatting Fountain forced-Transitions

### Technical

- 0ce2783: dx: manage versioning with changesets
