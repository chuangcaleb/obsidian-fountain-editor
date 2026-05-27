# ADR 001: Fountain Notes overridden by Obsidian Wikilinks

**Date:** 2025-04-14

**Context:** Fountain spec defines `[[note]]` for annotations. Obsidian uses `[[wikilink]]` for internal links. Both use identical `[[...]]` syntax.

**Decision:** Obsidian wikilinks win. Plugin does NOT implement Fountain Notes.

**Rationale:**
- Wikilinks are core Obsidian UX (graph view, backlinks, vault navigation)
- Implementing Fountain Notes would break existing vaults using wikilinks
- No setting to revert — this is a hard architectural choice

**Alternatives considered:**
- Configurable toggle (rejected: complexity, user confusion)
- Regex to distinguish Notes from wikilinks (rejected: impossible reliably)
- Plugin-only syntax like `[[^note]]` (rejected: non-standard, fork risk)

**Status:** Accepted. Not revisiting.