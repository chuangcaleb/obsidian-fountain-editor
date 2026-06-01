import { type App, MarkdownView, type Plugin, type TFile } from 'obsidian';
import { updateFileState } from './editor/plugin';

export function onMetadataChanged(app: App, file: TFile) {
	const activeFile = getActiveMarkdownFile(app);
	if (activeFile?.path === file.path) {
		updateClass(app);
	}
}

export function isFountainFile(file: TFile, app: Plugin['app']): boolean {
	if (file.extension === 'fountain' || file.basename.endsWith('.fountain')) {
		return true;
	}

	const metadata = app.metadataCache.getFileCache(file);
	if (metadata?.frontmatter?.tags) {
		const tags = metadata.frontmatter.tags as string[];
		if (tags.includes('fountain')) {
			return true;
		}
	}

	if (metadata?.frontmatter?.cssclasses) {
		const cssclasses = metadata.frontmatter.cssclasses as string[];
		if (cssclasses.includes('fountain')) {
			return true;
		}
	}

	return false;
}

export function updateClass(app: App) {
	const file = getActiveMarkdownFile(app);
	if (!file) {
		toggleClass(app, false);
		return;
	}

	if (isFountainFile(file, app)) {
		toggleClass(app, true);
		return;
	}

	toggleClass(app, false);
}

function toggleClass(app: App, add: boolean) {
	const view = app.workspace.getActiveViewOfType(MarkdownView);
	const entryPoint = view?.containerEl.querySelector('.node-insert-event');

	updateFileState({app, hasTag: add});
	if (entryPoint) {
		entryPoint.classList.toggle('fountain', add);
	}
}

function getActiveMarkdownFile(app: App): TFile | undefined {
	const view = app.workspace.getActiveViewOfType(MarkdownView);
	return view?.file ?? undefined;
}
