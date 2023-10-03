// import { fountain } from "codemirror-lang-fountain";
import { Plugin } from "obsidian";
import { fountainPlugin } from "./editor/plugin";

export default class FountainPlugin extends Plugin {
	async onload() {
		// this.registerEditorExtension(fountain());
		this.registerEditorExtension(fountainPlugin);
	}

	onunload() {}
}
