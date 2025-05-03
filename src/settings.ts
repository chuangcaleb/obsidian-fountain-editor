import {PluginSettingTab, Setting, type App} from "obsidian";
import type FountainPlugin from "./main.js";

export type FountainEditorSettings = {
	fixMinimal: boolean;
	preferObsidianBlockquote: boolean;
};

export const DEFAULT_SETTINGS: FountainEditorSettings = {
	fixMinimal: false,
	preferObsidianBlockquote: false,
};

const themeFixClass = "fountain-theme-fix";
export const setFixThemeState = {
	add() {
		document.body.classList.add(themeFixClass);
	},
	remove() {
		document.body.classList.remove(themeFixClass);
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
							setFixThemeState.add();
						} else {
							setFixThemeState.remove();
						}
					}),
			);
	}
}
