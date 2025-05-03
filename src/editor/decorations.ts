import {RangeSetBuilder, type StateField} from "@codemirror/state";
import {
	Decoration,
	type DecorationSet,
	type EditorView,
} from "@codemirror/view";
import {LINE_TOKENS, TOKEN_NAMES as n} from "./consts.js";
import {type FountainContext, type FountainState} from "./interface.js";

function composeFntClass(t: string) {
	return `cm-formatting cm-fountain-formatting-${t}`;
}

function handleEmptyLine(line: string, state: FountainState) {
	if (line.trim()) {
		return false;
	}

	// At least two spaces to be considered
	// https://fountain.io/syntax#line-breaks
	if (line.length < 2) {
		state.inDialogue = false;
	}

	return true;
}

/** Skip formatting within %% comments */
function handleCommentBlock(line: string, state: FountainState) {
	if (state.inCommentBlock) {
		if (line.includes("%%")) {
			state.inCommentBlock = false;
		}

		return true;
	}

	if (line.includes("%%")) {
		state.inCommentBlock = true;
		return true;
	}

	return false;
}

function handleToken(
	tId: string,
	state: FountainState,
	context: FountainContext,
) {
	if (tId === n.fBoneyardEnd) {
		state.inBoneyard = false;
	}

	if (state.inBoneyard) {
		return n.boneyard;
	}

	if (tId === n.fBoneyardStart) {
		state.inDialogue = false;
		state.inBoneyard = true;
	}

	if (tId === n.character) {
		if (
			context.afterEmptyLine &&
			!context.beforeEmptyLine &&
			!context.isLastLine
		) {
			state.inDialogue = true;
		} else {
			return null;
		}
	}

	if (tId === n.parenthetical && !state.inDialogue) {
		return null;
	}

	if (
		tId === n.transition &&
		!(context.afterEmptyLine && context.beforeEmptyLine)
	) {
		return null;
	}

	return tId;
}

function getLineFormat(
	line: string,
	state: FountainState,
	context: FountainContext,
) {
	if (handleEmptyLine(line, state)) {
		return null;
	}

	if (handleCommentBlock(line, state)) {
		return null;
	}

	for (const {id: tId, regex: tRegex} of LINE_TOKENS) {
		if (tRegex.test(line)) {
			const token = handleToken(tId, state, context);
			if (token !== null) {
				return token;
			}
		}
	}

	if (state.inDialogue) {
		return n.dialogue;
	}

	if (state.inBoneyard) {
		return n.boneyard;
	}

	if (line.startsWith(">")) return null;

	return n.action;
}

export function buildDecorations(
	view: EditorView,
	isFountainStateField: StateField<boolean>,
): DecorationSet {
	const isFountain = view.state.field(isFountainStateField, false);

	if (!isFountain) {
		return Decoration.none;
	}

	const builder = new RangeSetBuilder<Decoration>();

	function markDeco(start: number, end: number, className: string) {
		const deco = Decoration.mark({class: className});
		builder.add(start, end, deco);
	}

	const state: FountainState = {
		inDialogue: false,
		inBoneyard: false,
		inCommentBlock: false,
	};

	for (const {from, to} of view.visibleRanges) {
		const visibleText = view.state.sliceDoc(from, to);
		const maxLines = view.state.doc.lines;

		for (let pos = from; pos <= to; ) {
			const line = view.state.doc.lineAt(pos);
			const {from: lFrom, to: lTo, text: lText} = line;

			const relativeFrom = lFrom - from;
			const relativeTo = lTo - from;

			const context = {
				afterEmptyLine: visibleText[relativeFrom - 2] === "\n",
				beforeEmptyLine: visibleText[relativeTo + 1] === "\n",
				isLastLine: line.number === maxLines,
			};
			const token = getLineFormat(lText, state, context);

			if (!token) {
				pos = lTo + 1;
				continue;
			}

			const deco = Decoration.line({class: "cm-fountain-" + token});
			builder.add(lFrom, lFrom, deco);

			// Mark Decorations
			const firstChar = lText[0];
			const lastChar = lText[line.length - 1];
			if (token === n.action && firstChar === "!" && !lText.startsWith("![[")) {
				markDeco(lFrom, lFrom + 1, composeFntClass(token));
			}

			if (token === n.sceneHeading && firstChar === ".") {
				markDeco(lFrom, lFrom + 1, composeFntClass(token));
			}

			if (token === n.lyrics && firstChar === "~") {
				markDeco(lFrom, lFrom + 1, composeFntClass(token));
			}

			if (token === n.synopsis && firstChar === "=") {
				markDeco(lFrom, lFrom + 2, composeFntClass(token));
			}

			if (token === n.character) {
				if (firstChar === "@") {
					markDeco(lFrom, lFrom + 1, composeFntClass(token));
				}

				if (lastChar === ")") {
					const charExtension = lText.match(/(\(.*\))?$/g);
					if (charExtension === null) {
						console.error(
							"Character regex broken; char ext segment should exist",
						);
						continue;
					}

					const charExtensionLength = charExtension[0].length;
					const charExtensionStart = lTo - charExtensionLength;
					markDeco(charExtensionStart, lTo, "cm-fountain-character-extension");
				}
			}

			if (token === n.centered && lastChar === "<") {
				markDeco(lTo - 1, lTo, composeFntClass(token));
			}

			pos = lTo + 1;
		}
	}

	return builder.finish();
}
