import {StateEffect, StateField} from "@codemirror/state";
import {
	Decoration,
	type DecorationSet,
	type EditorView,
	type PluginSpec,
	type PluginValue,
	ViewPlugin,
	type ViewUpdate,
} from "@codemirror/view";
import {type App, MarkdownView} from "obsidian";
import {buildDecorations} from "./decorations.js";

const updateIsFountainState = StateEffect.define<boolean>();

const isFountainStateField = StateField.define<boolean>({
	create() {
		return false;
	},
	update(value, tr) {
		for (const effect of tr.effects) {
			if (effect.is(updateIsFountainState)) {
				return effect.value;
			}
		}

		return value;
	},
});

export function updateFileState({app, hasTag}: {app: App; hasTag: boolean}) {
	const markdownView = app.workspace.getActiveViewOfType(MarkdownView);
	if (!markdownView || !("cm" in markdownView.editor)) return;
	const cmEditor = markdownView.editor.cm as EditorView;
	cmEditor.dispatch({effects: updateIsFountainState.of(hasTag)});
}

/* ------------------------------------ - ----------------------------------- */

class FountainPlugin implements PluginValue {
	decorations: DecorationSet;

	constructor(view: EditorView) {
		this.decorations = view.state.field(isFountainStateField)
			? buildDecorations(view, isFountainStateField)
			: Decoration.none;
	}

	update(update: ViewUpdate) {
		const shouldBuildDecorations =
			update.docChanged ||
			update.viewportChanged ||
			update.startState.field(isFountainStateField) !==
				update.state.field(isFountainStateField);

		if (shouldBuildDecorations) {
			this.decorations = buildDecorations(update.view, isFountainStateField);
		}
	}

	// destroy() {}
}

const pluginSpec: PluginSpec<FountainPlugin> = {
	decorations: (value: FountainPlugin) => value.decorations,
};

export const fountainPlugin = [
	isFountainStateField,
	ViewPlugin.fromClass(FountainPlugin, pluginSpec),
];
