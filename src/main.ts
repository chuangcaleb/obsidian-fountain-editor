import { Prec } from "@codemirror/state";
import { Plugin } from "obsidian";
import { fountainPlugin } from "./editor/plugin";

export default class FountainPlugin extends Plugin {
	async onload() {
		this.registerEditorExtension(Prec.lowest(fountainPlugin));
	}
	onunload() {}
}
