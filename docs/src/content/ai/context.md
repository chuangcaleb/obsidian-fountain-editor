# Obsidian Fountain Editor

Domain glossary for the Fountain screenplay syntax plugin within Obsidian. Terms are specific to the hybrid Fountain+Markdown editing experience this plugin provides.

## Fountain Screenplay Elements

**Scene Heading**:
A line identifying a new scene location and time of day (e.g. `INT. HOUSE - DAY`). Detected via multilingual prefix set.
_Avoid_: Slug line

**Action**:
Descriptive prose describing on-screen activity. The default line type when no other token matches. Plugin does not apply custom formatting.
_Avoid_: Description, narrative

**Character**:
An uppercase name (or `@`-prefixed name) identifying a speaking participant.
_Avoid_: Speaker, person

**Dialogue**:
Spoken words attributed to a Character. Valid only after a Character line and before an empty line.
_Avoid_: Speech, line, dialog

**Parenthetical**:
A delivery direction within Dialogue, wrapped in `()`.
_Avoid_: Wryly, direction

**Character Extension**:
A parenthetical suffix on a Character name indicating delivery context (e.g. `(V.O.)`, `(CONT'D)`). Rendered italic.
_Avoid_: Extension, character modifier

**Dual Dialogue**:
Two Characters speaking simultaneously, indicated by `^` suffix on a Character name. Not currently handled by the plugin.
_Avoid_: Simultaneous dialogue

**Lyric**:
A song or musical line, prefixed with `~`.
_Avoid_: Lyrics, song

**Centered Text**:
Text centered on the page, wrapped in `> text <`. The `>` prefix conflicts with Markdown blockquotes.
_Avoid_: Center, centered

**Transition**:
An editing transition (e.g. `CUT TO:`), valid only between empty lines. Can also be forced with the `>` prefix, which conflicts with Markdown blockquotes.
_Avoid_: Cut, edit

**Section**:
A structural divider or outline heading, prefixed with `#`. Not screenplay output.
_Avoid_: Heading, divider

**Synopsis**:
A summary or annotation note, prefixed with `=`. Not screenplay output. Acts as an Escape Hatch for plain Markdown.

**Boneyard**:
A multi-line comment block delimited by `/*` and `*/`. Content rendered faint, excluded from screenplay output. Closing `*/` token can be misparsed as italic by Obsidian.
_Avoid_: Block comment

**Comment Block**:
An Obsidian-flavoured comment delimited by `%%`. Content skipped entirely by parser. Acts as an Escape Hatch for plain Markdown.
_Avoid_: Obsidian comment, percent comment

**Page Break**:
A forced page separator, indicated by three or more `=` characters. Not currently formatted by the plugin.

**Title Page**:
Key:value metadata at the start of a Fountain document according to Fountain spec. Plugin does not apply additional styling.

**Fountain Notes**:
Annotation syntax using `[[ ]]` brackets. Conflicts with Obsidian wikilinks which use identical syntax. Obsidian wikilinks take precedence. The project decides to ignore this Fountain spec.
_Avoid_: Wikilinks, annotations

**Scene Numbers**:
Sequential identifiers appended to Scene Headings via `#1#` suffix. Planned, not yet implemented.
_Avoid_: Scene IDs, numbering

**Line Break**:
A forced line break within an Action block, indicated by two spaces at end of line.

## Fountain Syntax

**Forced Line**:
A single-character prefix that overrides default line-type detection. `!` = Action, `@` = Character, `.` = Scene Heading, `>` = Transition.
_Avoid_: Override, power user syntax

**Empty Line**:
A blank line (length < 2) that resets dialogue mode and constrains valid token positions (Character only after empty line, Transition only between empty lines).

**Scene Heading Prefix Set**:
The multilingual vocabulary of location-indicating words for Scene Heading detection. Supports Latin, Russian, Ukrainian, Bulgarian, Serbian/Macedonian, Greek, Hebrew, Arabic, Turkish, and Romance language prefixes.
_Avoid_: Scene prefixes, location prefixes

**Fountain State**:
Parser tracking flags that persist across lines during a decoration pass: `inDialogue`, `inBoneyard`, `inCommentBlock`. Reset each pass.
_Avoid_: Parser state

## Detection

**Fountain Marker**:
A signal that a note should activate Fountain formatting. Three methods: `.fountain.md` extension, frontmatter `tags: fountain`, or frontmatter `cssclasses: fountain`.
_Avoid_: Fountain flag, activation marker

**Fountain Active**:
A per-editor boolean that controls whether the CodeMirror extension builds decorations. The CSS class `fountain` is applied to `.markdown-source-view` when true.

## Design Principles

**Hybrid Syntax**:
The paradigm of mixing Fountain screenplay syntax and Markdown annotation syntax in the same document.

**Fountain-compliant**:
Design principle: all hybrid files must remain compatible with standard Fountain processors. Non-Fountain syntax must be removable with simple regex.

**Fountain-first / Obsidian-second**:
Design priority: when Fountain and Obsidian syntax conflict, Fountain takes precedence by default. Reversible via the Prefer Blockquotes setting.

**View-only**:
Design principle: the plugin only applies visual formatting to the editor. It never modifies file contents.
_Avoid_: Read-only, cosmetic

**Styling Parity**:
Design principle: in-editor styling should closely match a Fountain-exported PDF.
_Avoid_: PDF matching, visual parity

## Workflow Concepts

**Atomic Slices**:
A writing approach where each scene or sequence lives in its own file, as opposed to a single monolithic screenplay.

**Escape Hatches**:
Methods to write plain Markdown within a Fountain-marked document. Three options: Synopsis (`=`), Blockquotes (`>` with Prefer Blockquotes enabled), Obsidian Comments (`%%`).
_Avoid_: Opting out, bypass

**Synergistic Tools**:
Companion Obsidian plugins extending the Fountain workflow, such as Longform (compilation) and Better Fountain (PDF export).
_Avoid_: External tools, companions

**Callouts**:
Obsidian's extended blockquote syntax (`> [!note]`, `> [!tip]`). Usable inside Fountain documents when Prefer Blockquotes is enabled.
_Avoid_: Alerts, admonitions

**Strip Blockquotes**:
Removing `>`-prefixed lines before PDF export. Required when using blockquotes for annotations with Prefer Blockquotes enabled.
_Avoid_: Blockquote removal

**Reading Mode**:
Obsidian's non-editable document preview. Plugin does not yet apply formatting in this mode.

## Settings

**Fix Minimal Theme**:
A setting (`fixMinimal`) disables custom left-offset positioning for Character, Dialogue, and Parenthetical lines. Used to resolve conflicts with themes like Minimal.

**Prefer Blockquotes**:
A setting (`preferObsidianBlockquote`) reverses the Fountain-first priority for `>` lines, treating them as Obsidian blockquotes instead of Transitions.

## Flagged Ambiguities

**`>` character**:
Used by both Fountain (Transition prefix, Centered Text wrapper) and Markdown (blockquote prefix). Resolved by the Prefer Blockquotes setting.

**`[[ ]]` brackets**:
Used by both Fountain (Notes annotation, `Fountain Notes`) and Obsidian (wikilinks). Fountain Notes are overridden entirely — Obsidian wikilinks always win.

**`=` prefix**:
Used by Fountain (Synopsis) and some Markdown parsers (heading underline). Obsidian does not implement heading underline syntax, so no practical conflict.

## Example Dialogue

**Dev**: "I want a Callout inside my screenplay, but the plugin renders it as a Transition."

**Writer**: "That's the `>` conflict. Every `>` line is Fountain-first by default."

**Dev**: "Enable Prefer Blockquotes in settings?"

**Writer**: "Yes. Then `>` becomes blockquote. But you must Strip Blockquotes before PDF export or they'll appear in your screenplay."

**Dev**: "Can I use other Escape Hatches too — Synopsis for one-liners, Comment Blocks for longer notes?"

**Writer**: "Exactly. All three are Fountain-compliant: trivially removable via regex. Synopsis is cleanest for short notes. Comment blocks for anything multi-line."
