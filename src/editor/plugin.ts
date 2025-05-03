import {type Extension, StateEffect, StateField} from "@codemirror/state";
import {
	Decoration,
	type DecorationSet,
	type EditorView,
	type PluginValue,
	ViewPlugin,
	type ViewUpdate,
} from "@codemirror/view";
import {type App, MarkdownView} from "obsidian";
import {type FountainEditorSettings} from "src/settings.js";
import {buildDecorations} from "./decorations.js";

/* ------------------------------------ - ----------------------------------- */

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
	constructor(
		view: EditorView,
		private readonly settings: FountainEditorSettings,
	) {
		this.decorations = view.state.field(isFountainStateField)
			? buildDecorations(view, isFountainStateField, settings)
			: Decoration.none;
	}

	update(update: ViewUpdate) {
		const shouldBuildDecorations =
			update.docChanged ||
			update.viewportChanged ||
			update.startState.field(isFountainStateField) !==
				update.state.field(isFountainStateField);

		if (shouldBuildDecorations) {
			this.decorations = buildDecorations(
				update.view,
				isFountainStateField,
				this.settings,
			);
		}
	}

	// destroy() {}
}

export function fountainPlugin(settings: FountainEditorSettings): Extension {
	const plugin = ViewPlugin.fromClass(
		class extends FountainPlugin {
			constructor(view: EditorView) {
				super(view, settings);
			}
		},
		{decorations: (value) => value.decorations},
	);

	return [isFountainStateField, plugin];
}
