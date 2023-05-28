import { atomWithStorage } from "jotai/utils";

import { baseGame } from "@/constants/baseGame";

export const answersAtom = atomWithStorage<
	{
		id: string;
		content: string;
		task: string;
	}[]
>("2DGameGPT", [
	{
		id: "1",
		content: baseGame.default,
		task: "Base Game",
	},
]);
export const showCodeAtom = atomWithStorage("2DGameGPT-editor", false);
