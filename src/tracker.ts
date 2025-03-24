import {type App, MarkdownView, type TFile} from "obsidian";
import {updateFileState} from "src/editor/plugin";

export function onMetadataChanged(app: App, file: TFile) {
	const activeFile = getActiveMarkdownFile(app);
	if (activeFile && activeFile.path === file.path) {
		updateClass(app);
	}
}

export function updateClass(app: App) {
	const file = getActiveMarkdownFile(app);
	if (!file) {
		toggleClass(app, false);
		return;
	}

	if (file.extension === "fountain" || file.basename.endsWith(".fountain")) {
		toggleClass(app, true);
		return;
	}

	const metadata = app.metadataCache.getFileCache(file);
	if (metadata?.frontmatter?.tags) {
		const tags = metadata.frontmatter.tags as string[];
		if (tags.includes("fountain")) {
			toggleClass(app, true);
			return;
		}
	}

	if (metadata?.frontmatter?.cssclasses) {
		const cssclasses = metadata.frontmatter.cssclasses as string[];
		if (cssclasses.includes("fountain")) {
			toggleClass(app, true);
			return;
		}
	}

	toggleClass(app, false);
}

function toggleClass(app: App, add: boolean) {
	const view = app.workspace.getActiveViewOfType(MarkdownView);
	const sourceView = view?.containerEl.querySelector(".markdown-source-view");

	updateFileState({app, hasTag: add});
	if (!sourceView) return;
	sourceView.classList.toggle("fountain", add);
}

function getActiveMarkdownFile(app: App): TFile | undefined {
	const view = app.workspace.getActiveViewOfType(MarkdownView);
	return view?.file ?? undefined;
}
