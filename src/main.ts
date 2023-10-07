// import { fountain } from "codemirror-lang-fountain";
import { Plugin } from "obsidian";
import { fountainPlugin } from "./editor/plugin";
import { Prec } from "@codemirror/state";

export default class FountainPlugin extends Plugin {
	async onload() {
		this.registerEditorExtension(Prec.lowest(fountainPlugin));
	}

	onunload() {}
}
