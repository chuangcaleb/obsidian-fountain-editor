# Common Development Tasks

## Adding a New Fountain Token Type

This is a 5-step process across 3 files.

### Step 1: Define the Token Name (`src/editor/consts.ts`)

Add your token to the `TOKEN_NAMES` const:

```typescript
export const TOKEN_NAMES = {
 // ... existing tokens ...
 myNewToken: "my-new-token",
} as const;
```

### Step 2: Add the Regex Pattern (`src/editor/consts.ts`)

Add a new entry to the `LINE_TOKENS` array:

```typescript
export const LINE_TOKENS = [
 // ... existing tokens ...
 {
  id: n.myNewToken,
  regex: /^YOUR_PATTERN$/u, // Use 'u' flag for Unicode support
 },
] as const;
```

### Step 3: Update the Tokenizer (`src/editor/decorations.ts`)

In `getLineFormat()`, add logic to return the new token under appropriate conditions. Place it in the right order relative to existing token checks.

### Step 4: Add Decoration Logic (`src/editor/decorations.ts`)

In `buildDecorations()`, after getting the token:

```typescript
// Line decoration (always needed)
const deco = Decoration.line({class: "cm-fountain-" + token});
builder.add(lFrom, lFrom, deco);

// Optional: inline mark decoration for formatting characters
if (token === n.myNewToken && firstChar === "YOUR_PREFIX") {
 markDeco(lFrom, lFrom + 1, composeFntClass(token));
}
```

### Step 5: Add CSS Styling (`src/styles/tokens.css`)

Add CSS variables and classes:

```css
.cm-fountain-my-new-token {
 /* Your styles */
 color: var(--font-color-my-new-token, #yourColor);
}
```

---

## Adding a New Plugin Setting

### Step 1: Add to the Type (`src/settings.ts`)

```typescript
export type FountainEditorSettings = {
 // ... existing settings ...
 myNewSetting: boolean; // or string, number, etc.
};
```

### Step 2: Add a Default Value

```typescript
export const DEFAULT_SETTINGS: FountainEditorSettings = {
 // ... existing defaults ...
 myNewSetting: false,
};
```

### Step 3: Add the UI Toggle

In `FountainEditorSettingTab.display()`:

```typescript
new Setting(containerEl)
 .setName("My New Setting")
 .setDesc("Description of what this setting does.")
 .addToggle((toggle) =>
  toggle
   .setValue(this.plugin.settings.myNewSetting)
   .onChange(async (value) => {
    this.plugin.settings.myNewSetting = value;
    await this.plugin.saveSettings();
   }),
 );
```

### Step 4: Consume the Setting

Pass `this.settings` to the extension in `src/main.ts` (already done for the pipeline):

```typescript
this.registerEditorExtension(fountainPlugin(this.settings));
```

Then access it in `decorations.ts`:

```typescript
if (settings.myNewSetting) {
 // custom behavior
}
```

---

## Debugging Syntax Highlighting

1. **Open Obsidian** with the test vault.
2. **Open Developer Console** (`Ctrl+Shift+I` or `Cmd+Opt+I`).
3. **Create a test note** with `cssclasses: fountain` and Fountain content.
4. **Inspect the DOM** to verify `.cm-fountain-*` classes are applied:
   - Right-click → Inspect Element on the editor area.
   - Look for `.cm-line` elements with classes like `cm-fountain-scene-heading`.
5. **Check the state field** directly:

   ```javascript
   const editor = app.workspace.getActiveViewOfType(MarkdownView).editor.cm;
   editor.state.field(isFountainStateField); // Should return true
   ```

6. **Debug token matching** by adding temporary logging in `getLineFormat()`:

   ```typescript
   console.log(`Line: "${line}" → matched token: ${tId}`);
   ```

   Remove this logging before committing.
7. **Check visible ranges** — if the file is long, decorations only apply to visible lines. Ensure `view.visibleRanges` returns the expected range.

---

## Updating the Documentation Site

Content lives in `docs/src/content/docs/` as Markdown/MDX files. Agents should only need to edit or add new `.mdx` files there, and should not start the documentation dev server.

---

## Common Gotchas

### Token order in LINE_TOKENS
Adding token at end of array is safe only if no broader regex above it catches the same input. Scene heading regex is broad (multilingual prefixes) — new tokens before scene headings must be more specific.

### state resets per buildDecorations() call
`inDialogue`, `inBoneyard`, `inCommentBlock` reset every decoration pass. They persist across lines WITHIN a pass but NOT between edits. If dialogue tracking seems wrong, check state isn't resetting mid-pass.

### Decorations only build for visible ranges
`view.visibleRanges` limits work to viewport. For debugging, scroll to target line or use Console to check `FountainPlugin.decorations`.

### Boneyard */ misparsed as italic
Obsidian Markdown parser sees `*/` as italic delimiter. Plugin CSS must override with `color: var(--text-faint)`.

### `[[` is wikilink, not Fountain Note
Fountain Notes spec uses `[[...]]` for annotations. Obsidian wikilinks take precedence. Plugin intentionally ignores Fountain Notes. See ADR-001.
