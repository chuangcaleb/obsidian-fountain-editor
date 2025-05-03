import {Compartment} from "@codemirror/state";
import {Plugin, type TFile} from "obsidian";
import {fountainPlugin} from "./editor/plugin.js";
import {
	DEFAULT_SETTINGS,
	type FountainEditorSettings,
	FountainEditorSettingTab,
	setFixThemeState,
} from "./settings.js";
import {onMetadataChanged, updateClass} from "./tracker.js";

const fountainSettingsCompartment = new Compartment();

export default class FountainPlugin extends Plugin {
	settings: FountainEditorSettings;

	async onload() {
		/* ---------------------------- settings -------------------------------- */

		await this.loadSettings();
		this.addSettingTab(new FountainEditorSettingTab(this.app, this));

		// Apply the classname on load if the setting is enabled
		if (this.settings.fixMinimal) {
			setFixThemeState.add();
		}

		/* ------------------------ editor extension ---------------------------- */

		// this.registerEditorExtension(fountainPlugin);
		this.registerEditorExtension(fountainPlugin(this.settings));

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

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as FountainEditorSettings,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {
		this.app.metadataCache.off("changed", (file: TFile) => {
			onMetadataChanged(this.app, file);
		});
		updateClass(this.app);

		// Remove the classname when the plugin is unloaded
		setFixThemeState.remove();
	}
}
