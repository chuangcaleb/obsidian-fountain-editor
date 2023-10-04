# Conflicts between Obsidian-flavored Markdown vs Fountain

There are two obvious cases of formatting conflict.

| Formatting | Markdown |   Fountain |
| -- | -- | -- |
| Line begins with `>` | [blockquote](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Quotes) | [Centered Text](https://fountain.io/syntax/#centered-text) & forced [Transition](https://fountain.io/syntax/#transition) |
| Inline text wrapped in `_` | [italic](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Styling+text) | [Underline (Emphasis)](https://fountain.io/syntax/#emphasis) |

In both these cases, we should favor the Fountain formatting over the Markdown formatting. That means, no more italics with underscores, and no more blockquotes. *(Implementation is WIP, it half-works now)*
