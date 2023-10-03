export interface FountainState {
	inDialogue: boolean;
	inBoneyard: boolean;
}
export interface FountainContext {
	afterEmptyLine: () => boolean;
	beforeEmptyLine: () => boolean;
	isLastLine: () => boolean;
}
