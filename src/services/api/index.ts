import { ChatCompletionRequestMessage } from "openai";
import { nanoid } from "nanoid";
import { extractCode, miniPrompt } from "@/utils/prompt";
import { systemMessage } from "@/constants";

export async function toOpenAI({
	command = "CREATE_GAME",
	prompt = "extend the code",
	temperature = "0.2",
	template = "",
	model = "gpt-3.5-turbo",
	maxTokens = "2048",
	client = null,
}) {
	if (client === null) {
		throw new Error("OpenAI client is not defined");
	}

	const prompt_ = prompt.trim();

	const nextMessage: ChatCompletionRequestMessage = {
		role: "user",
		content: miniPrompt`
			"${command}": ${prompt_}. Return the full source code of the game.
			TEMPLATE:
			\`\`\`javascript
			${template.trim().replace(/^\s+/gm, "").replace(/^\n+/g, "").replace(/\s+/, " ")}
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
		const response = await client.createChatCompletion({
			model,
			messages,
			max_tokens: Number.parseInt(maxTokens),
			temperature: Number.parseFloat(temperature),
		});

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
		throw error;
	}
}
