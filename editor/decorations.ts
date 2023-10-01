import { RangeSetBuilder } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";

const tokenTypes: Record<string, RegExp> = {
	"scene-heading":
		/^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
	// scene_number: /( *#(.+)# *)/,

	character: /^\s*([A-Z][A-Z0-9 \t]+|@.*)$/,
	dialogue: /^\s*(\^?)?(?:\n(?!\n+))([\s\S]+)/,
	parenthetical: /^\s*(\(.+\))$/,

	centered: /^>[^<>\n]+<$/g,
	transition: /^(>[^<\n\r]*|[A-Z ]+ TO:)$/,

	// section: /^(#+)(?: *)(.*)/,
	synopsis: /^(?:=(?!=+) *)(.*)$/,

	// note: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
	// note_inline: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,
	// boneyard: /(^\/\*|^\*\/)$/g,
	"formatting-boneyard-start": /(^\/\*$)/g,
	"formatting-boneyard-end": /(^\*\/$)/g,

	page_break: /^={3,}$/,
};

interface FountainState {
	inDialogue: boolean;
	inBoneyard: boolean;
}
interface FountainContext {
	afterEmptyLine: boolean;
	beforeEmptyLine: boolean;
}

function getContext(lines: string[], index: number): FountainContext {
	return {
		afterEmptyLine: lines[index - 1] === "",
		beforeEmptyLine: lines[index + 1] === "",
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

		for (const type in tokenTypes) {
			if (tokenTypes[type].test(line)) {
				if (type === "formatting-boneyard-end") {
					state.inBoneyard = false;
				}
				if (state.inBoneyard) {
					return "boneyard";
				}
				if (type === "formatting-boneyard-start") {
					state.inDialogue = false;
					state.inBoneyard = true;
				}

				if (type === "character") {
					if (ctx.afterEmptyLine) {
						state.inDialogue = true;
					} else {
						break;
					}
				}

				return type;
			}
		}
		if (state.inDialogue) {
			return "dialogue";
		}
		if (state.inBoneyard) {
			return "boneyard";
		}
		return "action";
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
			if (type === "scene-heading" && firstChar === ".") {
				markDeco(
					start,
					start + 1,
					"cm-formatting cm-formatting-fountain-scene-heading",
				);
			}
			if (type === "synopsis" && firstChar === "=") {
				markDeco(
					start,
					start + 2,
					"cm-formatting cm-formatting-fountain-synopsis",
				);
			}
			if (type === "character" && firstChar === "@") {
				markDeco(
					start,
					start + 1,
					"cm-formatting cm-formatting-fountain-action",
				);
			}
			if (type === "centered" && lastChar === "<") {
				markDeco(
					end - 2,
					end,
					"cm-formatting cm-formatting-fountain-centered",
				);
			}
		}
	}

	return builder.finish();
}
