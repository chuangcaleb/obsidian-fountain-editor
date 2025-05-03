import {PluginSettingTab, Setting, type App} from "obsidian";
import type FountainPlugin from "./main.js";

export type FountainEditorSettings = {
	fixMinimal: boolean;
};

export const DEFAULT_SETTINGS: FountainEditorSettings = {
	fixMinimal: false,
};

const minimalFixClass = "fountain-theme-fix";

export const setMinimalFixState = {
	add() {
		document.body.classList.add(minimalFixClass);
	},
	remove() {
		document.body.classList.remove(minimalFixClass);
	},
};

export class FountainEditorSettingTab extends PluginSettingTab {
	plugin: FountainPlugin;

	constructor(app: App, plugin: FountainPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl("h2", {text: "Fountain Editor Settings"});

		// Add toggle for the body classname
		new Setting(containerEl)
			.setName("Fix broken styling on certain themes")
			.setDesc("Fix Fountain formatting on themes like Minimal.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.fixMinimal)
					.onChange(async (value) => {
						this.plugin.settings.fixMinimal = value;
						await this.plugin.saveSettings();

						// Add or remove the class
						if (value) {
							setMinimalFixState.add();
						} else {
							setMinimalFixState.remove();
						}
					}),
			);
	}
}
