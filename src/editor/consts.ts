export const TOKEN_NAMES = {
	sceneHeading: "scene-heading",
	formattingSceneHeading: "formatting-scene-heading",
	action: "action",
	character: "character",
	dialogue: "dialogue",
	parenthetical: "parenthetical",
	lyrics: "lyrics",
	centered: "centered",
	transition: "transition",
	synopsis: "synopsis",
	boneyard: "boneyard",
	formattingBoneyardStart: "formatting-boneyard-start",
	formattingBoneyardEnd: "formatting-boneyard-end",
	pageBreak: "page-break",
};

const n = TOKEN_NAMES;

export const LINE_TOKENS = [
	{
		id: n.sceneHeading,
		regex: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e|int\/ext)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
	},
	{
		id: n.action,
		regex: /^!.*$/,
	},
	{
		id: n.character,
		regex: /^\s*((?=.*[A-Z])[A-Z0-9 \t]+(\([^)]*\))?|@.*)$/,
	},
	{
		id: n.dialogue,
		regex: /^\s*(\^?)?(?:\n(?!\n+))([\s\S]+)/,
	},
	{
		id: n.parenthetical,
		regex: /^\s*(\(.+\))$/,
	},
	{
		id: n.lyrics,
		regex: /^~.*$/,
	},
	{
		id: n.centered,
		regex: /^\s*>[^<>]+<$/,
	},
	{
		id: n.transition,
		regex: /^\s*(>[^<\n\r]*|[A-Z ]+ TO:)$/,
	},
	// section: /^(#+)(?: *)(.*)/,
	{
		id: n.synopsis,
		regex: /^(?:=(?!=+) *)(.*)$/,
	},
	// note: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
	// note_inline: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,
	// boneyard: /(^\/\*|^\*\/)$/g,
	{
		id: n.formattingBoneyardStart,
		regex: /(^\/\*$)/g,
	},
	{
		id: n.formattingBoneyardEnd,
		regex: /(^\*\/$)/g,
	},
	{
		id: n.pageBreak,
		regex: /^={3,}$/,
	},
] as const;
