import { MarkdownPostProcessorContext } from "obsidian";
import { LINE_TOKENS, TOKEN_NAMES as n } from "./editor/consts";
import { FountainState } from "./editor/interface";

function getLineFormat(line: string, state: FountainState) {
	if (!line.trim()) return "empty";

	for (const { id: tId, regex: tRegex } of LINE_TOKENS) {
		if (tRegex.test(line)) {
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
			if (tId === n.parenthetical) {
				if (!state.inDialogue) break;
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

export function markdownPostProcessor(
	el: HTMLElement,
	ctx: MarkdownPostProcessorContext,
) {
	const paragraphs = el.querySelectorAll("p");
	const quotes = el.querySelectorAll("blockquote");

	const state: FountainState = {
		inDialogue: false,
		inBoneyard: false,
	};

	for (const p of Array.from(paragraphs)) {
		if (p.parentNode?.nodeName === "BLOCKQUOTE") continue;

		const text = p.getText();
		let firstLine = text.split("\n")[0];
		const token = getLineFormat(firstLine, state);

		const firstChar = firstLine[0];
		const lastChar = firstLine[firstLine.length - 1];
		if (token === n.sceneHeading && firstChar === ".") {
			p.setText(text.substring(1));
		}
		if (token === n.action && firstChar === "!") {
			p.setText(text.substring(1));
		}
		if (token === n.character) {
			p.addClass(`fountain-${n.character}`);

			if (firstChar === "@") firstLine = firstLine.substring(1);
			if (lastChar === ")") {
				const charExt = firstLine.match(/(\(.*\))?$/g);
				if (charExt === null) continue;
				const charExtLength = charExt[0].length;
				const charExtStart = firstLine.length - charExtLength;

				const span = createSpan({
					cls: "fountain-character-extension",
					text: firstLine.substring(charExtStart),
				});
				firstLine = firstLine.substring(0, charExtStart);
				p.setText(firstLine);
				p.appendChild(span);
			} else {
				p.setText(firstLine);
			}

			state.inDialogue = true;
			const lines = text.split("\n").slice(1);
			for (const line of lines) {
				const subtoken = getLineFormat(line, state);

				const child = createEl("p", {
					cls: `fountain-${subtoken}`,
					text: line,
				});
				p.parentElement?.appendChild(child);
			}
			state.inDialogue = false;
			continue;
		}
		p.addClass(`fountain-${token}`);
	}

	for (const bq of Array.from(quotes)) {
		const p = bq.firstElementChild as HTMLParagraphElement;
		const text = p.getText();

		const lastChar = text[text.length - 1];
		if (lastChar === "<") {
			p.addClass("fountain-centered");
			p.setText(text.substring(0, text.length - 1));
		} else {
			p.addClass("fountain-transition");
		}
	}
}
