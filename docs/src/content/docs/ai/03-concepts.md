# Key Concepts: Fountain Tokens & Decoration Pipeline

## Fountain Syntax Elements

The plugin recognizes these Fountain elements (defined in `src/editor/consts.ts`, variable `TOKEN_NAMES`):

| Element | Example | Token Name (CSS class) |
|---|---|---|
| Scene Heading | `INT. HOUSE - DAY` | `scene-heading` |
| Action | `He opens the door.` | `action` |
| Character | `JOHN` | `character` |
| Dialogue | `I'm coming in.` | `dialogue` |
| Parenthetical | `(whispering)` | `parenthetical` |
| Lyric | `~La la la` | `lyrics` |
| Centered Text | `>THE END<` | `centered` |
| Transition | `CUT TO:` | `transition` |
| Section | `### SECTION` | `section` |
| Synopsis | `= A key moment` | `synopsis` |
| Boneyard (Comment) | `/* ... */` | `boneyard` |
| Page Break | `===` | `page-break` |

The `TOKEN_NAMES` const also defines two formatting tokens:

- `formatting-boneyard-start` — line matching `/*`
- `formatting-boneyard-end` — line matching `*/`

## Marking a Note for Fountain Highlighting

Create a note and use **one** of these methods:

| Method | Example |
|---|---|
| **File extension** | `myscript.fountain.md` |
| **Frontmatter tag** | `---\ntags: fountain\n---` |
| **Frontmatter cssclasses** | `---\ncssclasses:\n  - fountain\n---` |

## How Decorations Work (Pipeline)

### Step 1: File Detection (`src/tracker.ts`)

- Listens for `file-open`, `active-leaf-change`, and metadata `changed` events.
- Checks if the active file has a Fountain marker in this priority order:
  1. File extension: `.fountain.md` (or any `.fountain.*` extension)
  2. Frontmatter `tags` array includes `"fountain"`
  3. Frontmatter `cssclasses` array includes `"fountain"`
- Calls `updateFileState()` to notify the CodeMirror extension.

### Step 2: State Update (`src/editor/plugin.ts`)

- `updateFileState()` dispatches a `StateEffect<boolean>` to the CodeMirror state.
- `isFountainStateField` is a `StateField<boolean>` that tracks whether the current file is Fountain.
- The `FountainPlugin` ViewPlugin watches this field and rebuilds decorations when it changes.

### Step 3: Tokenizer (`src/editor/decorations.ts`)

- `buildDecorations()` is called on:
  - Document changes (`docChanged`)
  - Viewport changes (`viewportChanged`)
  - Fountain state changes
- Iterates over visible ranges (`view.visibleRanges`).
- For each line, calls `getLineFormat()` which:
  1. Checks for empty lines and `%% comment` blocks.
  2. Tests the line against each regex in `LINE_TOKENS` (order matters).
  3. Resolves context-dependent tokens (character only after empty line, parenthetical only during dialogue, transition only between empty lines).
  4. Falls back to `action` if no special token matches.

### Step 4: Decoration Building

- Line decorations: `Decoration.line({class: "cm-fountain-" + token})`
- Inline mark decorations for formatting characters:
  - `!` for forced action
  - `.` for scene heading prefix
  - `~` for lyrics
  - `=` for synopsis
  - `@` for forced character
  - `(...)` for character extension
  - `<` for centered text suffix

### Step 5: CSS Styling

- CSS variables in `src/styles/tokens.css` control colors, fonts, and styling.
- Classes applied: `cm-fountain-scene-heading`, `cm-fountain-character`, etc.
- Settings-controlled overrides in `options.css`.

The `FountainPlugin` ViewPlugin exposes `decorations` which CodeMirror renders as line-level CSS classes.

## Multilingual Scene Heading Support

Scene headings are detected via `sceneHeadingPrefixesMap` in `src/editor/consts.ts`.
Supported languages and their prefixes:

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

Prefixes are deduplicated and combined into one regex with the `iu` flag for case-insensitive Unicode matching.

## Settings

| Setting | Key | Default | Description |
|---|---|---|---|
| Fix Minimal Theme | `fixMinimal` | `false` | Adds `.fountain-theme-fix` class to `document.body` to override theme conflicts |
| Prefer Blockquotes | `preferObsidianBlockquote` | `false` | When enabled, `>` lines are treated as Obsidian blockquotes instead of Fountain transitions |

Settings are loaded from `FountainEditorSettings` interface in `src/settings.ts` and persisted via Obsidian's `loadData()`/`saveData()`.
