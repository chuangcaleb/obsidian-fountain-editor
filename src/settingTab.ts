import FountainPlugin from './main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class FountainSettingTab extends PluginSettingTab {
	plugin: FountainPlugin;

	constructor(app: App, plugin: FountainPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(this.containerEl)
			.setName("Extra parsed characters")
			.setDesc("Higher values may improve parsing stability at the expense of performance.")
			.addText((textfield) => {
				textfield.inputEl.type = "number";
				textfield.setValue(String(this.plugin.settings.extraParseRange));
				textfield.onChange(async (value) => {
					let num = Number(value);
					if (!Number.isNaN(num) && num >= 0) {
						this.plugin.settings.extraParseRange = num;
						await this.plugin.saveSettings();
					}
				});
			});
	}
}