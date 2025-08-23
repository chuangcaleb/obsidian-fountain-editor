---
title: 🔤 Authoring in a Non-Latin Language
---

Writing in a language that does not use a Latin alphabet? A user has requested this feature for you! As of v1.4.2, the custom Fountain parser will handle non-Latin character sets.

The plugin aims to cover these main languages/alphabets.

- Latin
- Russian
- Ukrainian
- Bulgarian
- Serbian/Macedonian
- Greek
- Hebrew
- Arabic
- Turkish
- "Romance"

This is most obvious in Scene Heading tokens, which typically requires an `EXT.` or `INT.` prefix. Usually, this (literally) doesn't translate well in other languages. But the plugin should parse the following correctly!

```
ИНТ. ПЕЩЕРА — ДЕНЬ

Полевка метнулась, но в кадр с глухим стуком врезается огромная львиная лапа
```

The plugin will accommodate for non-Latin languages using the following map:

```ts
const sceneHeadingPrefixesMap = {
 // - Latin: INT, EXT, EST, I/E, INT/EXT
 latin: ["int", "ext", "est", "i/e", "int/ext"],

 // - Russian: ИНТ, ЭКСТ, ЭСТ, И/Э, ИНТ/ЭКСТ
 russian: ["инт", "экст", "эст", "и/э", "инт/экст"],

 // - Ukrainian: ІНТ, ЕКСТ, ЕСТ, І/Е, ІНТ/ЕКСТ
 ukrainian: ["інт", "екст", "ест", "і/е", "інт/екст"],

 // - Bulgarian: ВН, ИЗН, ВН/ИЗН
 bulgarian: ["вн", "изн", "вн/изн"],

 // - Serbian/Macedonian: ВН, НАДВ, ВН/НАДВ
 serbianMacedonian: ["вн", "надв", "вн/надв"],

 // - Greek: ΕΣΩ. (INT), ΕΞΩ. (EXT), ΕΣΩ/ΕΞΩ. (INT/EXT)
 //   Sometimes ΕΣΤ. for "establishing"
 greek: ["εσω", "εξω", "εσω/εξω", "εστ"],

 // - Hebrew: פנ. (INT = פנימי), חוץ. (EXT), פנ/חוץ. (INT/EXT)
 //   NB: Hebrew is RTL but regex still matches left-to-right in source
 hebrew: ["פנ", "חוץ", "פנ/חוץ"],

 // - Arabic: د. (داخل = INT), خ. (خارج = EXT), د/خ. (INT/EXT)
 //   Sometimes spelled in full: داخل, خارج
 arabic: ["د", "خ", "د/خ", "داخل", "خارج", "داخل/خارج"],

 // - Turkish: İÇ (INT), DIŞ (EXT), İÇ/DIŞ
 turkish: ["iç", "dış", "iç/dış"],

 // - French/Spanish/Italian (they often keep English, but some use native)
 //   French: INTÉR. / EXT. ; Spanish: INT. / EXT. ; Italian: INT. / EST.
 //   Adding common alternatives
 romance: ["intér", "inter", "est", "ext"],
};
```

Note that while the Transition token now extends the character set, the suffix `TO:` is still expected, as most non-English industries still use that U.S.-based standard. We often see CUT TO: even in fully Russian, Hebrew, or Greek scripts.

```js
// This is still commonly used in non-English scripts
"CUT TO:"

// This is now valid; "ΜΕΤΑΒΑΣΗ" was previously not detected in the uppercase Latin character set
"ΜΕΤΑΒΑΣΗ TO:"

// The plugin has decided to not handle this:
"COUPE À:"
```

Contact me if you need the plugin to handle a new language/character set, or if you would like any part of this to be enhanced!
