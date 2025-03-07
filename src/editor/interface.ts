export type FountainState = {
	inDialogue: boolean;
	inBoneyard: boolean;
	inCommentBlock: boolean;
};
export type FountainContext = {
	afterEmptyLine: boolean;
	beforeEmptyLine: boolean;
	isLastLine: boolean;
};
