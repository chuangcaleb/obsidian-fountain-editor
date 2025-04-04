// @ts-check
import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	site: "obsidian-fountain-editor.chuangcaleb.com",
	integrations: [
		starlight({
			title: "Obsidian Fountain Editor",
			social: {
				github: "https://github.com/chuangcaleb/obsidian-fountain-editor",
			},
			favicon: "/favicon.ico",
			sidebar: [
				{
					label: "Start Here",
					autogenerate: {directory: "start-here"},
				},
				{
					label: "Guides",
					items: [
						// Each item here is one entry in the navigation menu.
						{label: "Example Guide", slug: "guides/example"},
					],
				},
				// {
				// 	label: "Reference",
				// 	autogenerate: {directory: "reference"},
				// },
				{
					label: "Resources",
					autogenerate: {directory: "resources"},
				},
				{
					label: "Contributing",
					autogenerate: {directory: "contributing"},
				},
			],
			logo: {
				src: "./src/assets/obsidian-fountain-editor-logo.svg",
			},
		}),
	],
});
