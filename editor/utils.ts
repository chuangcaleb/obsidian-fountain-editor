import { FountainContext } from "./interface";

export function getCumulativeCount(lines: string[]) {
	return lines.reduce<number[]>(
		(accu, curr, index) => {
			const length = curr.trim().length ? curr.length : 0;
			accu.push(accu[index] + length + 1);
			return accu;
		},
		[0],
	);
}

export function getContext(lines: string[], index: number): FountainContext {
	return {
		afterEmptyLine: lines[index - 1] === "",
		beforeEmptyLine: lines[index + 1] === "",
		isLastLine: lines.length === index + 1,
	};
}
