import {
	type DecorationSet,
	type EditorView,
	type PluginSpec,
	type PluginValue,
	ViewPlugin,
	type ViewUpdate,
} from "@codemirror/view";
import {buildDecorations} from "./decorations.js";

class FountainPlugin implements PluginValue {
	decorations: DecorationSet;

	constructor(view: EditorView) {
		this.decorations = buildDecorations(view);
	}

	update(update: ViewUpdate) {
		if (update.docChanged || update.viewportChanged) {
			this.decorations = buildDecorations(update.view);
		}
	}

	// destroy() {}
}

const pluginSpec: PluginSpec<FountainPlugin> = {
	decorations: (value: FountainPlugin) => value.decorations,
};

export const fountainPlugin = ViewPlugin.fromClass(FountainPlugin, pluginSpec);
