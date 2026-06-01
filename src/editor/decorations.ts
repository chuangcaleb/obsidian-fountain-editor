import {RangeSetBuilder, type StateField} from '@codemirror/state';
import {
	Decoration,
	type DecorationSet,
	type EditorView,
} from '@codemirror/view';
import {type FountainEditorSettings} from '../settings.js';
import {TOKEN_NAMES as n} from './consts.js';
import {type FountainState} from './interface.js';
import {
	composeFntClass,
	getLineFormat,
} from './tokenizer.js';

export function buildDecorations(
	view: EditorView,
	isFountainStateField: StateField<boolean>,
	settings: FountainEditorSettings,
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

		for (let pos = from; pos <= to;) {
			const line = view.state.doc.lineAt(pos);
			const {from: lFrom, to: lTo, text: lText} = line;

			const relativeFrom = lFrom - from;
			const relativeTo = lTo - from;

			const context = {
				afterEmptyLine: visibleText[relativeFrom - 2] === '\n',
				beforeEmptyLine: visibleText[relativeTo + 1] === '\n',
				isLastLine: line.number === maxLines,
			};
			const token = getLineFormat(lText, state, context, settings);

			if (!token) {
				pos = lTo + 1;
				continue;
			}

			const deco = Decoration.line({class: 'cm-fountain-' + token});
			builder.add(lFrom, lFrom, deco);

			// Mark Decorations
			const firstChar = lText[0];
			const lastChar = lText[line.length - 1];

			// Action
			if (token === n.action && firstChar === '!' && !lText.startsWith('![[')) {
				markDeco(lFrom, lFrom + 1, composeFntClass(token));
			}

			// Scene heading
			if (token === n.sceneHeading && firstChar === '.') {
				markDeco(lFrom, lFrom + 1, composeFntClass(token));
			}

			// Lyric
			if (token === n.lyrics && firstChar === '~') {
				markDeco(lFrom, lFrom + 1, composeFntClass(token));
			}

			// Synopsis
			if (token === n.synopsis && firstChar === '=') {
				markDeco(lFrom, lFrom + 2, composeFntClass(token));
			}

			// Character
			if (token === n.character) {
				// Forced character
				if (firstChar === '@') {
					markDeco(lFrom, lFrom + 1, composeFntClass(token));
				}

				// Character extension
				if (lastChar === ')') {
					const charExtension = lText.match(/(\(.*\))?$/g);
					if (charExtension === null) {
						console.error('Character regex broken; char ext segment should exist');
						continue;
					}

					const charExtensionLength = charExtension[0].length;
					const charExtensionStart = lTo - charExtensionLength;
					markDeco(charExtensionStart, lTo, 'cm-fountain-character-extension');
				}
			}

			// Centered
			if (token === n.centered && lastChar === '<') {
				markDeco(lTo - 1, lTo, composeFntClass(token));
			}

			pos = lTo + 1;
		}
	}

	return builder.finish();
}
