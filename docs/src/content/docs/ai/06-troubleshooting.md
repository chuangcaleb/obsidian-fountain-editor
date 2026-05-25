# Troubleshooting & Debugging

## Common Issues

| Issue | Likely Cause | Solution |
|---|---|---|
| No syntax highlighting | File not detected as Fountain | Check file extension (`.fountain.md`), frontmatter `tags: fountain`, or `cssclasses: fountain` |
| Broken styling on Minimal theme | Theme overrides plugin CSS | Enable **"Fix broken styling on certain themes"** in plugin settings |
| Blockquotes being treated as transitions | `>` prefix detected as Transition | Enable **"Prefer Obsidian's blockquote"** in plugin settings |
| Plugin not loading | Manifest version mismatch | Ensure `minAppVersion` in `manifest.json` matches your Obsidian version (currently 0.15.0) |
| Build errors | Missing dependencies | Run `pnpm install` and ensure Node.js >= 18.20.8 |
| Decorations not updating | State effect not dispatched | Check that `updateFileState()` is being called in `tracker.ts` |
| Syntax highlighting visible but wrong token applied | Regex matching issue or token order | Check `LINE_TOKENS` order in `consts.ts` — first match wins |
| Character lines detected as scene headings | Uppercase matching ambiguous | Ensure characters are after an empty line (required by Fountain spec) |
| Dialogue not detected | `inDialogue` state not set | Verify `getLineFormat()` sets `state.inDialogue = true` on character line |

## Debugging Tips

### 1. Check Fountain State in Console

```javascript
// In Obsidian Developer Console with a Fountain note open:
const editor = app.workspace.getActiveViewOfType(MarkdownView).editor.cm;
editor.state.field(isFountainStateField);
```

### 2. Inspect Decorations

```javascript
// Get decorations for the current viewport
const plugin = editor.plugin(view => view instanceof FountainPlugin);
console.log(plugin.decorations);
```

### 3. Debug Tokenizer with Logging

Add temporary logging in `src/editor/decorations.ts` → `getLineFormat()`:
```typescript
console.log(`[${line.number}] "${line.text}" → ${token}`);
```
> Remove before committing — tests are manual, so no one will catch leftover logging.

### 4. Verify CSS Classes in DOM

- Right-click the editor area → **Inspect Element**
- Look at `.cm-line` elements in the `.markdown-source-view` container
- Verify the expected `.cm-fountain-*` classes are applied
- Check that the `.fountain` class is present on the source view container

### 5. Check for Theme Conflicts

If the minimalist theme or another CSS framework overrides plugin styles:
- Toggle the "Fix broken styling" setting
- Or manually add `.fountain-theme-fix` to `document.body` to see if it resolves the issue

### 6. Validate Regex Patterns

Test regex patterns from `src/editor/consts.ts` in a regex tester (e.g., regex101.com) before editing:
```typescript
const regex = /^((?:\.)(?!\.+)(.+))|^((?:INT|EXT|EST|I/E|INT\/EXT)[. ].+)/iu;
regex.test("INT. HOUSE - DAY"); // Should return true
regex.test(".MONTAGE"); // Should return true
regex.test("Regular action line"); // Should return false
```

### 7. Ensure .js Extension in Imports

A common build error is forgetting the `.js` extension in relative imports:
```typescript
// Correct:
import {fountainPlugin} from "./editor/plugin.js";

// Wrong (will cause build error):
import {fountainPlugin} from "./editor/plugin";
```

### 8. Verify Rollup Build

If the plugin doesn't load in Obsidian, check:
- `main.js` exists in the output directory
- `styles.css` exists and has content
- `manifest.json` has matching version
- No errors in Rollup output during build

## Quick Reference: Obsidian API for Debugging

```javascript
// Get the active editor view
const view = app.workspace.getActiveViewOfType(MarkdownView);

// Access the CodeMirror editor
const cm = view.editor.cm;

// Get the current file
const file = view.file;

// Get file frontmatter
const metadata = app.metadataCache.getFileCache(file);
const tags = metadata?.frontmatter?.tags;
const cssclasses = metadata?.frontmatter?.cssclasses;
```