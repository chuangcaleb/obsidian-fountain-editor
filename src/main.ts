import {Prec} from "@codemirror/state";
import {Plugin, type TFile} from "obsidian";
import {fountainPlugin} from "./editor/plugin.js";
import {onMetadataChanged, updateClass} from "./utils/tracker.js";

export default class FountainPlugin extends Plugin {
	async onload() {
		this.registerEditorExtension(Prec.lowest(fountainPlugin));

		// Ensure `fountain` class is added to relevant leaves
		this.app.workspace.on("active-leaf-change", () => {
			updateClass(this.app);
		});
		this.app.workspace.on("file-open", () => {
			updateClass(this.app);
		});
		this.app.metadataCache.on("changed", (file: TFile) => {
			onMetadataChanged(this.app, file);
		});
		updateClass(this.app);
	}

	onunload() {
		this.app.metadataCache.off("changed", (file: TFile) => {
			onMetadataChanged(this.app, file);
		});
		updateClass(this.app);
	}
}
