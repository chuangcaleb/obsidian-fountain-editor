import { RangeSetBuilder } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";
import { TOKEN_NAMES as n, LINE_TOKENS } from "./consts";
import { getContext, getCumulativeCount } from "./utils";
import { FountainContext, FountainState } from "./interface";

function composeFClass(t: string) {
	return `cm-formatting cm-formatting-fountain-${t}`;
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

		for (const { id: tId, regex: tRegex } of LINE_TOKENS) {
			if (tRegex.test(line)) {
				if (tId === n.formattingBoneyardEnd) {
					state.inBoneyard = false;
				}
				if (state.inBoneyard) {
					return n.boneyard;
				}
				if (tId === n.formattingBoneyardStart) {
					state.inDialogue = false;
					state.inBoneyard = true;
				}
				if (tId === n.character) {
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

				if (tId === n.transition) {
					if (!(ctx.afterEmptyLine && ctx.beforeEmptyLine)) break;
				}

				return tId;
			}
		}
		if (state.inDialogue) {
			return n.dialogue;
		}
		if (state.inBoneyard) {
			return n.boneyard;
		}
		return n.action;
	}

	for (const { from, to } of view.visibleRanges) {
		const visibleText = view.state.sliceDoc(from, to);
		const visibleLines = visibleText.split("\n");

		const charCountMarkers = getCumulativeCount(visibleLines);

		const state: FountainState = {
			inDialogue: false,
			inBoneyard: false,
		};

		for (const [index, line] of visibleLines.entries()) {
			if (!line.trim()) continue;
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
			if (type === n.action && firstChar === "!") {
				markDeco(start, start + 1, composeFClass(type));
			}
			if (type === n.sceneHeading && firstChar === ".") {
				markDeco(start, start + 1, composeFClass(type));
			}
			if (type === n.lyrics && firstChar === "~") {
				markDeco(start, start + 1, composeFClass(type));
			}
			if (type === n.synopsis && firstChar === "=") {
				markDeco(start, start + 2, composeFClass(type));
			}
			if (type === n.character) {
				if (firstChar === "@") {
					markDeco(start, start + 1, composeFClass(type));
				}
				if (lastChar === ")") {
					const charExt = line.match(/(\([^)]*\))$/g);
					if (charExt === null) continue;
					const charExtLength = charExt[0].length;
					const charExtStart = end - charExtLength;
					markDeco(
						charExtStart,
						end,
						"cm-fountain-character-extension",
					);
				}
			}
			if (type === n.centered && lastChar === "<") {
				markDeco(end - 1, end, composeFClass(type));
			}
		}
	}

	return builder.finish();
}
