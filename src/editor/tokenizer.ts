import type {FountainEditorSettings} from '../settings.js';
import {LINE_TOKENS, TOKEN_NAMES as n} from './consts.js';
import type {FountainContext, FountainState} from './interface.js';

export function composeFntClass(t: string) {
	return `cm-formatting cm-fountain-formatting-${t}`;
}

export function handleEmptyLine(line: string, state: FountainState) {
	if (line.trim()) {
		return false;
	}

	if (line.length < 2) {
		state.inDialogue = false;
	}

	return true;
}

export function handleCommentBlock(line: string, state: FountainState) {
	if (state.inCommentBlock) {
		if (line.includes('%%')) {
			state.inCommentBlock = false;
		}

		return true;
	}

	if (line.includes('%%')) {
		state.inCommentBlock = true;
		return true;
	}

	return false;
}

export function handleToken(
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
			context.afterEmptyLine
			&& !context.beforeEmptyLine
			&& !context.isLastLine
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
		tId === n.transition
		&& !(context.afterEmptyLine && context.beforeEmptyLine)
	) {
		return null;
	}

	return tId;
}

export function getLineFormat(
	line: string,
	state: FountainState,
	context: FountainContext,
	settings: FountainEditorSettings,
): string | null {
	if (handleEmptyLine(line, state)) {
		return null;
	}

	if (handleCommentBlock(line, state)) {
		return null;
	}

	for (const {id: tId, regex: tRegex} of LINE_TOKENS) {
		if (tRegex.test(line)) {
			const token = handleToken(tId, state, context);
			if (
				settings.preferObsidianBlockquote
				&& token === n.transition
				&& line.startsWith('>')
			) {
				return null;
			}

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

	if (line.startsWith('>')) {
		return null;
	}

	return n.action;
}