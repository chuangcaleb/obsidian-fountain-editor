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

		new Setting(containerEl)
			.setName("Prefer Obsidian's blockquote over Fountain's forced Transition")
			.setDesc(
				"Skips trying to convert single-lines that start with `>` from Obsidian blockquotes into Fountain's Transitions. Blockquotes are the preferred cleaner way to annotate your screenplay, but you will need to strip them out before rendering your Fountain document to PDF.",
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.preferObsidianBlockquote)
					.onChange(async (value) => {
						this.plugin.settings.preferObsidianBlockquote = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
