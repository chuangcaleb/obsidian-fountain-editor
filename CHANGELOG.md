# obsidian-fountain-editor

## 1.4.3

### Patch Changes

- fix: russian/ukrainian ext should use НАТ

## 1.4.2

### Patch Changes

#### Enhance scene heading regex for non-English languages

Extended regex detection for Scene Headings and Transitions regex, for the following non-Latin languages and character sets.

- Latin (already present)
- Russian
- Ukrainian
- Bulgarian
- Serbian/Macedonian
- Greek
- Hebrew
- Arabic
- Turkish
- "Romance"

Note that while the Transition token now extends the character set, the suffix `TO:` is still expected, as most non-English industries still use that U.S.-based standard. We often see CUT TO: even in fully Russian, Hebrew, or Greek scripts. Contact me if you would like this to be enhanced!

```ts
const sceneHeadingPrefixesMap = {
 // - Latin: INT, EXT, EST, I/E, INT/EXT
 latin: ["int", "ext", "est", "i/e", "int/ext"],

 // - Russian: ИНТ, ЭКСТ, ЭСТ, И/Э, ИНТ/ЭКСТ
 russian: ["инт", "экст", "эст", "и/э", "инт/экст"],

 // - Ukrainian: ІНТ, ЕКСТ, ЕСТ, І/Е, ІНТ/ЕКСТ
 ukrainian: ["інт", "екст", "ест", "і/е", "інт/екст"],

 // - Bulgarian: ВН, ИЗН, ВН/ИЗН
 bulgarian: ["вн", "изн", "вн/изн"],

 // - Serbian/Macedonian: ВН, НАДВ, ВН/НАДВ
 serbianMacedonian: ["вн", "надв", "вн/надв"],

 // - Greek: ΕΣΩ. (INT), ΕΞΩ. (EXT), ΕΣΩ/ΕΞΩ. (INT/EXT)
 //   Sometimes ΕΣΤ. for "establishing"
 greek: ["εσω", "εξω", "εσω/εξω", "εστ"],

 // - Hebrew: פנ. (INT = פנימי), חוץ. (EXT), פנ/חוץ. (INT/EXT)
 //   NB: Hebrew is RTL but regex still matches left-to-right in source
 hebrew: ["פנ", "חוץ", "פנ/חוץ"],

 // - Arabic: د. (داخل = INT), خ. (خارج = EXT), د/خ. (INT/EXT)
 //   Sometimes spelled in full: داخل, خارج
 arabic: ["د", "خ", "د/خ", "داخل", "خارج", "داخل/خارج"],

 // - Turkish: İÇ (INT), DIŞ (EXT), İÇ/DIŞ
 turkish: ["iç", "dış", "iç/dış"],

 // - French/Spanish/Italian (they often keep English, but some use native)
 //   French: INTÉR. / EXT. ; Spanish: INT. / EXT. ; Italian: INT. / EST.
 //   Adding common alternatives
 romance: ["intér", "inter", "est", "ext"],
};
```

## 1.4.1

### Patch Changes

- fix: preferObsidianBlockquote should not break all Transitions

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
