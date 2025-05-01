import {Prec} from "@codemirror/state";
import {Plugin, type TFile} from "obsidian";
import {fountainPlugin} from "./editor/plugin.js";
import {onMetadataChanged, updateClass} from "./tracker.js";
import {FountainSettingTab} from "./settingTab.js";
import {setExtraParseRange} from "./editor/decorations.js";

interface FountainPluginSettings {
	extraParseRange: number;
}

const DEFAULT_SETTINGS: Partial<FountainPluginSettings> = {
	extraParseRange: 0,
};

export default class FountainPlugin extends Plugin {
	settings: FountainPluginSettings;

	async onload() {
		this.registerEditorExtension(Prec.lowest(fountainPlugin));
		
		await this.loadSettings();
		this.addSettingTab(new FountainSettingTab(this.app, this));

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

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

		// TODO: Pass the value to the view plugin better?
		setExtraParseRange(this.settings.extraParseRange);
	  }
	
	async saveSettings() {
		await this.saveData(this.settings);

		// TODO: Pass the value to the view plugin better?
		setExtraParseRange(this.settings.extraParseRange);
	}
}
