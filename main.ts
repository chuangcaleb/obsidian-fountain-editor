// import { fountain } from "codemirror-lang-fountain";
import { fountainPlugin } from "editor/plugin";
import { Plugin } from "obsidian";

export default class FountainPlugin extends Plugin {
	async onload() {
		// this.registerEditorExtension(fountain());
		this.registerEditorExtension(fountainPlugin);
	}

	onunload() {}
}
