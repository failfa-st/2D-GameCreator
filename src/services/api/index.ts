import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { nanoid } from "nanoid";
import { extractCode, miniPrompt } from "@/utils/prompt";
import { systemMessage } from "@/constants";
import { OpenAIError } from "./openai";
import { minify } from "terser";

const minifyConfig = {
	compress: {
		dead_code: true,
		drop_console: true,
		drop_debugger: true,
		keep_classnames: false,
		keep_fargs: true,
		keep_fnames: false,
		keep_infinity: false,
	},
	mangle: false,
	module: false,
	sourceMap: false,
	output: {
		comments: true,
	},
};

interface ToOpenAIProps {
	command: string;
	prompt: string;
	temperature: string;
	template: string;
	model: string;
	maxTokens: string;
	client: OpenAIApi | null;
	signal?: AbortSignal;
}

export async function toOpenAI({
	command = "CREATE_GAME",
	prompt = "extend the code",
	temperature = "0.2",
	template = "",
	model = "gpt-3.5-turbo",
	maxTokens = "2048",
	client = null,
	signal = new AbortController().signal,
}: ToOpenAIProps) {
	if (client === null) {
		throw new Error("OpenAI client is not defined");
	}

	const prompt_ = prompt.trim();

	const minifiedCode = await minify(template, minifyConfig);

	// 		// ${template.trim().replace(/^\s+/gm, "").replace(/^\n+/g, "").replace(/\s+/, " ")}
	const nextMessage: ChatCompletionRequestMessage = {
		role: "user",
		content: miniPrompt`
			"${command}": ${prompt_}. Return the full source code of the game.
			TEMPLATE:
			\`\`\`javascript
			${minifiedCode.code}
			\`\`\`
			`,
	};

	const task = `${prompt_}`;

	const messages: ChatCompletionRequestMessage[] = [
		{
			role: "system",
			content: miniPrompt`${systemMessage}`,
		},
		nextMessage,
	];

	try {
		const response = await client.createChatCompletion(
			{
				model,
				messages,
				max_tokens: Number.parseInt(maxTokens),
				temperature: Number.parseFloat(temperature),
			},
			{ signal }
		);

		const { message } = response.data.choices[0];

		if (message) {
			return {
				...message,
				content: extractCode(message.content).replace(
					/(COMMANDS|CREATE_GAME|ADD_FEATURE|REMOVE_FEATURE|UPDATE_FEATURE|FIX_BUG|TEMPLATE|OUTPUT FORMAT).*\n/,
					""
				),
				task,
				id: nanoid(),
			};
		}

		// Something broke
		// ToDo: fix it :)
		return {
			content: "/* BROKEN */",
			task,
			id: nanoid(),
		};
	} catch (error) {
		const err = error as OpenAIError;

		if (err.response) {
			throw err.response;
		} else {
			throw error;
		}
	}
}
