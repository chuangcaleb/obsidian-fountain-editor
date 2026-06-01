# Obsidian Fountain Editor

Domain glossary for the Fountain screenplay syntax plugin. Terms specific to hybrid Fountain+Markdown editing in Obsidian.

## Project

**Obsidian**: A markdown-based note-taking app.
**Fountain**: A plain text markup language for screenwriting. (<fountain.io>)

## Fountain Screenplay Elements

**Scene Heading**: Location+time detection via multilingual prefix set (INT, EXT, ИНТ, НАТ, etc.). `iu` flag regex.
_Avoid_: Slug line

**Action**: Default line type when no token matches. Descriptive prose.
_Avoid_: Description, narrative

**Character**: Uppercase name or `@`-prefixed name identifying speaker. Valid only after empty line.
_Avoid_: Speaker, person

**Dialogue**: Spoken words after Character line, before next empty line. `inDialogue` state controls this.
_Avoid_: Speech, dialog

**Parenthetical**: Delivery direction in Dialogue, wrapped in `()`. Valid only when `inDialogue` is true.
_Avoid_: Wryly, direction

**Character Extension**: Parenthetical suffix on Character name (`(V.O.)`, `(CONT'D)`). Rendered italic.
_Avoid_: Extension, character modifier

**Dual Dialogue**: Two speakers simultaneously, indicated by `^` suffix. Not implemented.
_Avoid_: Simultaneous dialogue

**Lyric**: Song/musical line prefixed with `~`.
_Avoid_: Lyrics, song

**Centered Text**: Text centered on page, wrapped in `> text <`. `>` conflicts with blockquotes.
_Avoid_: Center, centered

**Transition**: Editing transition (e.g. `CUT TO:`). Valid only between empty lines. `>` prefix forces it — conflicts with blockquotes.
_Avoid_: Cut, edit

**Section**: Structural divider prefixed with `#`. Not screenplay output.
_Avoid_: Heading, divider

**Synopsis**: Summary note prefixed with `=`. Not screenplay output. Acts as Escape Hatch.
_Avoid_: Summary, annotation

**Boneyard**: Multi-line comment block delimited by `/*` `*/`. Content rendered faint.
_Avoid_: Block comment

**Comment Block**: Obsidian-flavoured comment delimited by `%%`. Content skipped entirely by parser. No nesting. No escape.
_Avoid_: Obsidian comment, percent comment

**Page Break**: Forced page separator, 3+ `=` characters. Not formatted.
_Avoid_: Page separator

**Title Page**: Key:value metadata at document start per Fountain spec. No plugin styling.

**Fountain Notes**: Annotation syntax `[[ ]]`. Overridden by Obsidian wikilinks — see ADR-001.
_Avoid_: Wikilinks, annotations

**Scene Numbers**: Sequential IDs appended to Scene Headings via `#1#` suffix. Planned, not implemented.
_Avoid_: Scene IDs, numbering

**Line Break**: Forced break within Action block, indicated by two trailing spaces.

## Fountain Syntax

**Forced Line**: Single-character prefix overriding default detection. `!` = Action, `@` = Character, `.` = Scene Heading, `>` = Transition.
_Avoid_: Override, power user

**Empty Line**: Blank line (length < 2) resets dialogue mode. Constraints: Character only after empty line, Transition only between empty lines.

**Scene Heading Prefix Set**: Multilingual vocabulary for location words. Latin, Russian, Ukrainian, Bulgarian, Serbian/Macedonian, Greek, Hebrew, Arabic, Turkish, Romance.
_Avoid_: Scene prefixes

**Fountain State**: Parser flags (`inDialogue`, `inBoneyard`, `inCommentBlock`) reset per decoration pass. Persist across lines WITHIN pass only.
_Avoid_: Parser state

## Detection

**Fountain Marker**: Signal activating Fountain formatting. Three methods: `.fountain.md` extension, frontmatter `tags: fountain`, frontmatter `cssclasses: fountain`.
_Avoid_: Fountain flag

**Fountain Active**: Per-editor boolean controlling decoration build. CSS class `fountain` on `.markdown-source-view` when true.

## Design Principles

Fountain-first / Obsidian-second: Fountain wins on `>` conflict by default, reversible via Prefer Blockquotes.

Fountain-compliant: All hybrid files must remain compatible with standard Fountain processors. Non-Fountain syntax removable via simple regex.

View-only: Plugin applies visual formatting only. Never modifies file content.
_Avoid_: Read-only

Styling Parity: In-editor styling should match Fountain-exported PDF.
_Avoid_: PDF matching

Hybrid Syntax: Mixing Fountain screenplay and Markdown annotation in one document.

## Workflow Concepts

**Atomic Slices**: Each scene/sequence in own file, not monolithic.
_Avoid_: Single file

**Escape Hatches**: Methods for plain Markdown inside Fountain docs: Synopsis (`=`), Blockquotes (`>` with preferObsidianBlockquote), Obsidian Comments (`%%`).
_Avoid_: Opting out

**Synergistic Tools**: Companion plugins: Longform (compilation), Better Fountain (PDF export).
_Avoid_: External tools

**Callouts**: Obsidian blockquote extensions (`> [!note]`). Usable when Prefer Blockquotes enabled.
_Avoid_: Alerts

**Strip Blockquotes**: Removing `>` lines before PDF export. Required when using blockquote annotations.

**Reading Mode**: Obsidian's non-editable preview. No plugin formatting.
_Avoid_: Preview mode

## Flagged Ambiguities

**`>` character**: Three meanings — Transition prefix, Centered Text wrapper, Markdown blockquote. Prefer Blockquotes setting resolves Transition vs blockquote. Centered Text always wins.

**`[[ ]]` brackets**: Fountain Notes vs Obsidian wikilinks. Wikilinks always win. ADR-001 documents the decision — not configurable.

**`=` prefix**: Fountain Synopsis vs heading underline. Obsidian doesn't implement heading underline — no practical conflict.

**`*/` sequence**: Boneyard close vs italic delimiter. Obsidian Markdown parser sees `*/` as italic. Plugin CSS overrides with `color: var(--text-faint)`.

## Design Decisions

The following decisions are documented in `adr/`:

- **ADR-001**: Fountain Notes (`[[...]]`) overridden by Obsidian wikilinks. Hard boundary, no setting.
