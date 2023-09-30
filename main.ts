import { Plugin } from "obsidian";
import { fountain } from "codemirror-lang-fountain";
// Remember to rename these classes and interfaces!

export default class FountainPlugin extends Plugin {
	async onload() {
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Fountain");

		this.registerEditorExtension(fountain());
	}

	onunload() {}
}
