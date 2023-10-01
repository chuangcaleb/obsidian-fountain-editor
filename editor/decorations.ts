import { RangeSetBuilder } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";
import { TOKEN_NAMES as t, TOKEN_CLASSES as c } from "./consts";

const TOKENS: Record<string, RegExp> = {
	[t.sceneHeading]:
		/^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e|int\/ext)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
	// scene_number: /( *#(.+)# *)/,

	[t.action]: /^!.*$/,
	[t.character]: /^\s*((?=.*[A-Z])[A-Z0-9 \t]+( \([^)]*\))?|@.*)$/,
	[t.dialogue]: /^\s*(\^?)?(?:\n(?!\n+))([\s\S]+)/,
	[t.parenthetical]: /^\s*(\(.+\))$/,
	[t.lyrics]: /^~.*$/,

	[t.centered]: /^>[^<>\n]+<$/g,
	[t.transition]: /^(>[^<\n\r]*|[A-Z ]+ TO:)$/,

	// section: /^(#+)(?: *)(.*)/,
	[t.synopsis]: /^(?:=(?!=+) *)(.*)$/,

	// note: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
	// note_inline: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,
	// boneyard: /(^\/\*|^\*\/)$/g,
	[t.formattingBoneyardStart]: /(^\/\*$)/g,
	[t.formattingBoneyardEnd]: /(^\*\/$)/g,

	[t.pageBreak]: /^={3,}$/,
};

interface FountainState {
	inDialogue: boolean;
	inBoneyard: boolean;
}
interface FountainContext {
	afterEmptyLine: boolean;
	beforeEmptyLine: boolean;
	isLastLine: boolean;
}

function getContext(lines: string[], index: number): FountainContext {
	return {
		afterEmptyLine: lines[index - 1] === "",
		beforeEmptyLine: lines[index + 1] === "",
		isLastLine: lines.length === index + 1,
	};
}

export function buildDecorations(view: EditorView): DecorationSet {
	// if (!view.state.field(editorLivePreviewField)) {
	// 	return null;
	// }

	const builder = new RangeSetBuilder<Decoration>();

	function markDeco(start: number, end: number, className: string) {
		const deco = Decoration.mark({ class: className });
		builder.add(start, end, deco);
	}

	function getLineFormat(
		line: string,
		state: FountainState,
		ctx: FountainContext,
	) {
		if (!line) {
			state.inDialogue = false;
			return null;
		}

		for (const type in TOKENS) {
			if (TOKENS[type].test(line)) {
				if (type === t.formattingBoneyardEnd) {
					state.inBoneyard = false;
				}
				if (state.inBoneyard) {
					return t.boneyard;
				}
				if (type === t.formattingBoneyardStart) {
					state.inDialogue = false;
					state.inBoneyard = true;
				}

				if (type === t.character) {
					if (
						ctx.afterEmptyLine &&
						!ctx.beforeEmptyLine &&
						!ctx.isLastLine
					) {
						state.inDialogue = true;
					} else {
						break;
					}
				}

				return type;
			}
		}
		if (state.inDialogue) {
			return t.dialogue;
		}
		if (state.inBoneyard) {
			return t.boneyard;
		}
		return t.action;
	}

	for (const { from, to } of view.visibleRanges) {
		const visibleText = view.state.sliceDoc(from, to);
		const visibleLines = visibleText.split("\n");

		const charCountMarkers = visibleLines.reduce<number[]>(
			(accu, curr, index) => {
				if (!curr.trim().length) {
					accu.push(accu[index] + 1);
				} else {
					accu.push(accu[index] + curr.length + 1);
				}
				return accu;
			},
			[0],
		);

		const state: FountainState = {
			inDialogue: false,
			inBoneyard: false,
		};

		for (const [index, line] of visibleLines.entries()) {
			const type = getLineFormat(
				line,
				state,
				getContext(visibleLines, index),
			);

			if (!type) continue;

			const start = from + charCountMarkers[index];
			const end = start + visibleLines[index].length;

			// Line decorations
			const deco = Decoration.line({ class: "cm-fountain-" + type });
			builder.add(start, start, deco);

			// Mark Decorations
			const firstChar = line[0];
			const lastChar = line[line.length - 1];
			if (type === t.action && firstChar === "!") {
				markDeco(start, start + 1, c.fAction);
			}
			if (type === t.sceneHeading && firstChar === ".") {
				markDeco(start, start + 1, c.fSceneHeading);
			}
			if (type === t.lyrics && firstChar === "~") {
				markDeco(start, start + 1, c.fLyrics);
			}
			if (type === t.synopsis && firstChar === "=") {
				markDeco(start, start + 2, c.fSynopsis);
			}
			if (type === t.character) {
				if (firstChar === "@") {
					markDeco(start, start + 1, c.fCharacter);
				}
				if (lastChar === ")") {
					const charExt = line.match(/(\([^)]*\))$/g);
					if (charExt === null) continue;
					const charExtLength = charExt[0].length;
					const charExtStart = end - charExtLength;
					markDeco(charExtStart, end, c.characterExtension);
				}
			}
			if (type === t.centered && lastChar === "<") {
				markDeco(end - 2, end, c.fCentered);
			}
		}
	}

	return builder.finish();
}
