import { atomWithStorage } from "jotai/utils";

import { baseGame } from "@/constants/baseGame";

export const answersAtom = atomWithStorage<
	{
		id: string;
		content: string;
		task: string;
	}[]
>("2DGameCreator", [
	{
		id: "1",
		content: baseGame.default,
		task: "Base Game",
	},
]);
export const showCodeAtom = atomWithStorage("2DGameCreator-editor", false);
