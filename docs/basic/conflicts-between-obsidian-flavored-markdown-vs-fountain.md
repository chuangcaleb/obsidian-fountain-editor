# Conflicts between Obsidian-flavored Markdown vs Fountain

There are two obvious cases of formatting conflict.

| Formatting                    | Markdown/Obsidian                                                                              | Fountain                                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Line begins with `>`          | [blockquote](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Quotes)   | [Centered Text](https://fountain.io/syntax/#centered-text) & forced [Transition](https://fountain.io/syntax/#transition) |
| Inline text wrapped in `_`    | [italic](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Styling+text) | [Underline (Emphasis)](https://fountain.io/syntax/#emphasis)                                                             |
| Inline text wrapped in `[[]]` | [Internal Links / Wikilinks](https://help.obsidian.md/Linking+notes+and+files/Internal+links)  | [Notes](https://fountain.io/syntax/#notes)                                                                               |

## Escape hatch with markdown comments (requires Longform)

Markdown is still syntax-highlighted in Obsidian comments. If you use Longform and use Remove Comments in your workflow, you could inject `%% comments %%` ANYWHERE since the compiler will strip away markdown comments. This is an easy and flexible solution to escape 95% of markdown formatting in Obsidian-Fountain hybrid notes.

## `>` and `_text_`

In the first two cases from the table, it is unavoidable in Fountain formatting. We should favor the Fountain formatting over the Markdown formatting. That means, no more italics with underscores, and no more blockquotes (which you shouldn't be using much in Fountain anwyays).

## Markdown wikilinks vs Fountain Notes

However, internal links are such a crucial part of Markdown. I've made the decision to prefer internal links over Fountain Notes.

The first major reason is the simple alternative of the [escape hatch with markdown comments through longform](#escape-hatch-with-markdown-comments-requires-longform).

Another reason is a hidden feature: if you have the Remove Wikilinks option in a Longform workflow, then you can use wikilinks DIRECTLY in your Fountain syntax, which I think is really neat.

This does mean, however, when importing Fountain text with Notes into Obsidian, the Notes will format as internal links. You _could_ run a find-and-replace for `[[` and `]]` instances with `%%`, but seems clunky and unintuitive and clearly not [interoperable](../../README#🔀-interoperable) anymore. This will need more investigation.
