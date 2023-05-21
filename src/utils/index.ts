import GPT3Tokenizer from "gpt3-tokenizer";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";

export const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

export function getTokens(text: string) {
	return tokenizer.encode(text).bpe.length;
}

export function prettify(code: string) {
	try {
		return prettier.format(code, {
			useTabs: true,
			semi: true,
			parser: "babel",
			plugins: [parserBabel],
		});
	} catch (error) {
		return code;
	}
}

export function getTheme(mode: string | undefined, systemMode: string | undefined) {
	if (mode === "system") {
		return `vs-${systemMode}`;
	}
	if (mode) {
		return `vs-${mode}`;
	}
	return undefined;
}
