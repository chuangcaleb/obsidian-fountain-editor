# Domain Glossary

Terms used in this project. No implementation details.

## Fountain Screenplay Elements

See `docs/src/content/docs/references/syntax-parity.md` for a glossary table that maps to official Fountain documentation, and syntax-parity status.

| Term | Definition |
|---|---|
| **Scene Heading** | Location & time-of-day marker (e.g. `INT. HOUSE - DAY`). Detected via multilingual prefix set. |
| **Action** | Descriptive prose, default line type. |
| **Character** | Speaking character name, uppercase, before dialogue. Supports forced `@` prefix and parenthetical extensions like `(V.O.)`. |
| **Dialogue** | Spoken words by a character. Context-dependent — only valid after a Character line. |
| **Parenthetical** | Delivery direction before dialogue, wrapped in `()`. |
| **Character Extension** | Modifier suffix after character name (e.g. `(V.O.)`, `(CONT'D)`), rendered italic. |
| **Dual Dialogue** | Two characters speaking simultaneously — appended `^` syntax. Currently not handled by plugin. |
| **Emphasis** | Text formatting: italic (`*`), bold (`**`), underline (`_`). Italic and bold handled natively by Obsidian. Underline conflicts with Markdown italics. |
| **Lyric** | Song/musical line, prefixed with `~`. |
| **Centered Text** | Text centered on page, wrapped in `> <`. The `>` prefix conflicts with Markdown blockquotes. |
| **Transition** | Editing transition (e.g. `CUT TO:`). Valid only between empty lines. Forced prefix `>` conflicts with Markdown blockquotes. |
| **Section** | Structural heading, prefixed with `#`. |
| **Synopsis** | Summary note, prefixed with `=`. |
| **Boneyard** | Multi-line comment, delimited by `/*` and `*/`. Content rendered faint. Closing `*/` token can be misparsed as italic by Obsidian. |
| **Comment Block** | Obsidian-flavoured markdown comment, delimited by `%%`. Content skipped by parser. Large blocks can break formatting. |
| **Page Break** | Page separator (three or more `=` characters). Currently not formatted by plugin. |
| **Title Page** | Key:value metadata block at document start. Plugin does not style. |
| **Notes** (Fountain) | Annotation syntax using `[[ ]]` brackets. Conflicts with Obsidian wikilinks. |
| **Scene Numbers** | Sequential numbering appended to scene headings via `#1#` suffix. Planned, not yet implemented. |
| **Line Break** | Double-space syntax for forced line breaks within Action blocks. |

## Fountain Syntax

| Term | Definition |
|---|---|
| **Forced Line** | Prefix to override default type detection: `!` = forced Action, `@` = forced Character, `.` = forced Scene Heading, `>` = forced Transition. `>` prefix conflicts with Markdown blockquotes. |
| **Empty Line** | Blank line that resets dialogue mode. Parser state machine uses it to determine valid token positions. |
| **Scene Heading Prefix Set** | Multilingual vocabulary for detecting scene headings. Supports Latin, Russian, Ukrainian, Bulgarian, Serbian/Macedonian, Greek, Hebrew, Arabic, Turkish, and Romance language prefixes. |
| **Fountain State** | Parser tracking flags: `inDialogue` (inside dialogue block), `inBoneyard` (inside boneyard), `inCommentBlock` (inside comment block). Resets each decoration pass. |

## Detection

| Term | Definition |
|---|---|
| **Fountain Marker** | Signal that a note activates Fountain formatting: `.fountain.md` extension OR frontmatter `tags: fountain` OR frontmatter `cssclasses: fountain`. |
| **Fountain Active** | Boolean state per editor. When true, the CodeMirror extension builds decorations. CSS class `fountain` applied to `.markdown-source-view`. |

## Design Principles

| Term | Definition |
|---|---|
| **Hybrid Syntax** | Mixing Fountain screenplay syntax and Markdown annotation syntax in the same document, side by side. |
| **Fountain-compliant** | Design principle: hybrid Fountain+Markdown files must remain compatible with external Fountain processors. Non-Fountain syntax should be trivially removable with simple regex. |
| **Fountain-first / Obsidian-second** | Design priority: Fountain syntax takes precedence over Obsidian syntax when they conflict. Configurable via Prefer Blockquotes setting. |
| **View-only** | Plugin scoped to visual/formatting changes only — never modifies files. |
| **Styling Parity** | Editor styling should match a Fountain-exported PDF as closely as possible. |

## Workflow Concepts

| Term | Definition |
|---|---|
| **Atomic Slices** | One scene or sequence per file, as opposed to a single monolithic screenplay document. Enabled by Obsidian's file model and Longform plugin. |
| **Escape Hatches** (Opting Out) | Methods to write regular Markdown within a Fountain-marked document: Synopsis (`=`), Blockquotes (`>` with Prefer Blockquotes enabled), Obsidian Comments (`%%`). |
| **Synergistic Tools** | Companion tools extending the Fountain-Obsidian workflow (e.g. Longform for compilation, Better Fountain for PDF export). |
| **Callouts** | Obsidian `> [!note]` / `> [!tip]` extended blockquote syntax. Usable inside Fountain docs when Prefer Blockquotes is enabled. |
| **Strip Blockquotes** | Process of removing `>`-prefixed lines before PDF export. Required when using blockquotes for annotations with Prefer Blockquotes enabled. |
| **Reading Mode** | Obsidian's non-editable document view. Plugin formatting not yet implemented for this mode. |

## Settings

| Term | Definition |
|---|---|
| **Fix Minimal Theme** | Setting (`fixMinimal`). Disables custom left-offset positioning for character/dialogue/parenthetical lines to resolve conflicts with themes like Minimal. |
| **Prefer Blockquotes** | Setting (`preferObsidianBlockquote`). When enabled, `>` lines are treated as Obsidian blockquotes instead of Fountain transitions. Blockquote lines must be stripped before PDF export. |
