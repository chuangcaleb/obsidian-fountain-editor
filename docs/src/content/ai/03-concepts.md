# Key Concepts: Fountain Tokens & Decoration Pipeline

## Fountain Syntax Elements

Recognized elements defined in `src/editor/consts.ts` — `TOKEN_NAMES` const + `LINE_TOKENS` array.

| Token | CSS Class | Defined At |
|---|---|---|
| Scene Heading | `cm-fountain-scene-heading` | `TOKEN_NAMES.sceneHeading`, regex: multilingual prefix + `.` prefix |
| Action | `cm-fountain-action` | Default when no token matches |
| Character | `cm-fountain-character` | Uppercase name after empty line (or `@` prefix) |
| Dialogue | `cm-fountain-dialogue` | After Character line, before empty line |
| Parenthetical | `cm-fountain-parenthetical` | `(...)` inside dialogue |
| Lyric | `cm-fountain-lyrics` | `~` prefix |
| Centered | `cm-fountain-centered` | `> text <` |
| Transition | `cm-fountain-transition` | `TO:` ending or `>` prefix, between empty lines |
| Section | `cm-fountain-section` | `#` prefix |
| Synopsis | `cm-fountain-synopsis` | `=` prefix |
| Boneyard | `cm-fountain-boneyard` | `/*` / `*/` block |
| Page Break | `cm-fountain-page-break` | `===` (3+) |

Full glossary with usage notes and _Avoid labels: `CONTEXT.md` → Fountain Screenplay Elements.

## Editor Extension Model (CodeMirror 6)

Plugin extends Obsidian's editor via CM6. Key types:

| Type | Role | Used In |
|---|---|---|
| `StateField<T>` | Reactive state slot. Holds typed value, updates on every transaction. | `isFountainStateField` tracks whether active file is Fountain |
| `StateEffect<T>` | Dispatchable action mutating a StateField value. | `updateIsFountainState` triggers enable/disable |
| `ViewPlugin` | Plugin class attached to editor view. Receives `ViewUpdate` with `docChanged`, `viewportChanged`. | `FountainPlugin` builds decorations |
| `DecorationSet` | Set of line/inline decorations for viewport. | Returned by `buildDecorations()` |
| `RangeSetBuilder` | Builder for constructing DecorationSet from ranges. | Used in `buildDecorations()` |
| `EditorView` | Running editor instance. Access via `markdownView.editor.cm`. | External entry point for state queries |

## Obsidian API Dependencies

| Type | Purpose |
|---|---|
| `Plugin` | Base class — lifecycle hooks `onload`, `onunload` |
| `PluginSettingTab` | Settings UI via `Setting` builder |
| `MarkdownView` | Active editor view; access CM6 via `view.editor.cm` |
| `TFile` | Vault file representation |
| `MetadataCache` | Frontmatter parsing; `getFileCache()` returns tags, cssclasses |
| `loadData()` / `saveData()` | Settings persistence |

Note: `obsidian` dep is `"latest"` in package.json — API may change between Obsidian releases.

## Marking a Note for Fountain Highlighting

Create a note and use **one** of these:

| Method | Example |
|---|---|
| File extension | `myscript.fountain.md` |
| Frontmatter tag | `---\ntags: fountain\n---` |
| Frontmatter cssclasses | `---\ncssclasses:\n  - fountain\n---` |

## How Decorations Work (Pipeline)

### Step 1: File Detection (`src/tracker.ts`)

- Listens for `file-open`, `active-leaf-change`, and metadata `changed` events.
- Checks Fountain marker priority:
  1. File extension is exactly `.fountain`, or basename ends with `.fountain` (e.g. `.fountain` or `.fountain.md`)
  2. Frontmatter `tags` includes `"fountain"`
  3. Frontmatter `cssclasses` includes `"fountain"`
- Calls `updateFileState()` to notify CM6 extension.

### Step 2: State Update (`src/editor/plugin.ts`)

- `updateFileState()` dispatches `StateEffect<boolean>` to CM6 state.
- `isFountainStateField` — `StateField<boolean>` tracking whether current file is Fountain.
- `FountainPlugin` ViewPlugin watches this field, rebuilds decorations on change.

### Step 3: Tokenizer (`src/editor/decorations.ts`)

- `buildDecorations()` called on: `docChanged`, `viewportChanged`, Fountain state change.
- Iterates visible ranges (`view.visibleRanges`).
- For each line, calls `getLineFormat()` which:
  1. Checks empty lines and `%% comment` blocks.
  2. Tests line against each `LINE_TOKENS` regex (order matters — first match wins).
  3. Resolves context-dependent tokens (character after empty line, parenthetical during dialogue, transition between empty lines).
  4. Falls back to `action` if no match.

### Step 4: Decoration Building

- Line decorations: `Decoration.line({class: "cm-fountain-" + token})`
- Inline mark decorations for formatting characters: `!` action, `.` scene heading, `~` lyric, `=` synopsis, `@` character, `(...)` character extension, `<` centered text

### Step 5: CSS Styling

- CSS variables in `src/styles/tokens.css` control colors, fonts, styling.
- Classes: `cm-fountain-scene-heading`, `cm-fountain-character`, etc.
- Settings-controlled overrides in `options.css`.

## Multilingual Scene Heading Support

Detected via `sceneHeadingPrefixesMap` in `src/editor/consts.ts`:

| Language | Prefixes |
|---|---|
| Latin | `INT`, `EXT`, `EST`, `I/E`, `INT/EXT` |
| Russian | `ИНТ`, `НАТ`, `ЭСТ`, `И/Н`, `ИНТ/НАТ` |
| Ukrainian | `ІНТ`, `НАТ`, `ЕСТ`, `І/Н`, `ІНТ/НАТ` |
| Bulgarian | `ВН`, `ИЗН`, `ВН/ИЗН` |
| Serbian/Macedonian | `ВН`, `НАДВ`, `ВН/НАДВ` |
| Greek | `ΕΣΩ`, `ΕΞΩ`, `ΕΣΩ/ΕΞΩ`, `ΕΣΤ` |
| Hebrew | `פנ`, `חוץ`, `פנ/חוץ` |
| Arabic | `د`, `خ`, `د/خ`, `داخل`, `خارج`, `داخل/خارج` |
| Turkish | `İÇ`, `DIŞ`, `İÇ/DIŞ` |
| Romance (FR/ES/IT) | `INTÉR`, `INTER`, `EST`, `EXT` |

Prefixes deduplicated via `new Set()` and combined into one regex with `iu` flag.

## Settings

| Setting | Key | Default | Description |
|---|---|---|---|
| Fix Minimal Theme | `fixMinimal` | `false` | Adds `.fountain-theme-fix` class to `document.body` to override theme conflicts |
| Prefer Blockquotes | `preferObsidianBlockquote` | `false` | Treats `>` lines as Obsidian blockquotes instead of Fountain transitions |

Settings loaded from `FountainEditorSettings` in `src/settings.ts`, persisted via `loadData()`/`saveData()`.

## Design Rationale

### Why ViewPlugin over StateField for decorations?

StateField runs on every transaction (keystroke, selection change). ViewPlugin fires only on `docChanged`, `viewportChanged`, or state field change. Perf-critical for large scripts.

### Why isFountainStateField separate from FountainPlugin?

State field provides reactive boolean to any CM6 component. ViewPlugin reads it for decorations. Separation means future extensions (reading-mode highlights, status bar) read same field without coupling.

### Why visibleRanges instead of full doc?

Scripts can be 100+ pages. Decorating invisible lines wastes CPU. `visibleRanges` limits work to viewport. Scrolling triggers rebuild via `viewportChanged`.

### Why multilingual prefix set over NLP?

Scene heading detection only needs prefix matching. Adding a language = one key-value pair. No model, no parser changes. Covers 95%+ of screenwriters without complexity.

### Why state.inDialogue requires context.afterEmptyLine?

Fountain spec: Character must follow empty line. Dialogue must follow Character. Structural correctness prevents false positives (uppercase in Markdown passages).

### Why >-prefix overload handled by setting?

`>` means Transition, Centered Text suffix, or Markdown blockquote. Three meanings, one character. Default Fountain-first preserves spec compliance. Setting reverts priority for Obsidian blockquote users.

### Why .fountain.md extension pattern?

Preserves `.md` so Obsidian treats file as Markdown (search, graph view). Dot-delimited suffix is clean signal. Separate `.fountain` extension breaks Obsidian integration.

### Why no automated tests?

Plugin is DOM/CM6-dependent — requires running Obsidian or mocking CodeMirror. Prioritized velocity over test harness. Manual test procedure in `04-workflow.md`.

## Common Gotchas

### Character detection requires correct line context

`Character` regex can match, but `handleToken()` returns `null` if `!context.afterEmptyLine`. Uppercase after text = not a character.

### Dialogue falls through to action if state.inDialogue is false

Empty line resets `inDialogue`. Text in dialogue position becomes `action`. Correct per Fountain spec but surprising in debugging.

### Boneyard does not support nesting

Boneyard `/* ... */` is flat. `/*` inside boneyard does not create nested section — second `*/` closes everything.

### Scene heading regex uses `iu` flag

Case-insensitive + Unicode. Important when adding prefixes with diacritics or non-Latin scripts. Always test with `iu` applied.

### fixMinimal disables left-offset CSS

Character, Dialogue, Parenthetical use left-offset for script layout. `fixMinimal` disables this. Affects visual layout only, not token detection.
