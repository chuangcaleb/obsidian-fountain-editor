import {
	DecorationSet,
	EditorView,
	PluginSpec,
	PluginValue,
	ViewPlugin,
	ViewUpdate,
} from "@codemirror/view";
import { buildDecorations } from "./decorations";

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

	destroy() {}
}

const pluginSpec: PluginSpec<FountainPlugin> = {
	decorations: (value: FountainPlugin) => value.decorations,
};

export const fountainPlugin = ViewPlugin.fromClass(FountainPlugin, pluginSpec);
