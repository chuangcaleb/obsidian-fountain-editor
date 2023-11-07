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
	section: "section",
	synopsis: "synopsis",
	boneyard: "boneyard",
	fBoneyardStart: "formatting-boneyard-start",
	fBoneyardEnd: "formatting-boneyard-end",
	pageBreak: "page-break",
};

const n = TOKEN_NAMES;

export const LINE_TOKENS = [
	{
		id: n.sceneHeading,
		regex:
			/^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e|int\/ext)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
	},
	{
		id: n.action,
		regex: /^!.*$/,
	},
	{
		id: n.character,
		regex: /^[^\S\r\n]*(?=.*[A-Z])[A-Z0-9 \t'.-]+\s?(\(.*\))?$|@.*$/,
	},
	{
		id: n.dialogue,
		regex: /^[^\S\r\n]*(\^?)?(?:\n(?!\n+))([\s\S]+)/,
	},
	{
		id: n.parenthetical,
		regex: /^[^\S\r\n]*(\(.+\))$/,
	},
	{
		id: n.lyrics,
		regex: /^~.*$/,
	},
	{
		id: n.centered,
		regex: /^[^\S\r\n]*>[^<>]+<$/,
	},
	{
		id: n.transition,
		regex: /^[^\S\r\n]*(>[^<\n\r]*|[A-Z ]+ TO:)$/,
	},
	{
		id: n.section,
		regex: /^(#+)(?: *)(.*)/,
	},
	{
		id: n.synopsis,
		regex: /^(?:=(?!=+) *)(.*)$/,
	},
	// note: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
	// note_inline: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,
	// boneyard: /(^\/\*|^\*\/)$/g,
	{
		id: n.fBoneyardStart,
		regex: /(^\/\*$)/g,
	},
	{
		id: n.fBoneyardEnd,
		regex: /(^\*\/$)/g,
	},
	{
		id: n.pageBreak,
		regex: /^={3,}$/,
	},
] as const;
