import { atomWithStorage } from "jotai/utils";

import { base } from "@/constants";

export const answersAtom = atomWithStorage<
	{
		id: string;
		content: string;
		task: string;
	}[]
>("2DGameGPT", [
	{
		id: "1",
		content: base.default,
		task: "Base Game",
	},
]);
export const showCodeAtom = atomWithStorage("2DGameGPT-editor", false);
