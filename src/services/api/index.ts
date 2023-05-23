import { ChatCompletionRequestMessage } from "openai";
import { nanoid } from "nanoid";
import { openai } from "@/services/api/openai";
import { extractCode, miniPrompt } from "@/utils/prompt";
import {
	COMMAND_ADD_FEATURE,
	COMMAND_CREATE_GAME,
	COMMAND_EXTEND_FEATURE,
	COMMAND_FIX_BUG,
	COMMAND_REMOVE_FEATURE,
} from "@/constants";

export async function toOpenAI({
	command = "CREATE_GAME",
	prompt = "extend the code",
	temperature = "0.2",
	template = "",
	model = "gpt-3.5-turbo",
	maxTokens = "2048",
}) {
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
			content: miniPrompt`
			You are a skilled 2D game developer working with JavaScript on Canvas2D and aim for high performance
			You understand and follow a set of "COMMANDS" to build games:

			"${COMMAND_CREATE_GAME}": Initiate the development. Consider the game type, environment, basic mechanics and extend the "TEMPLATE"
			"${COMMAND_ADD_FEATURE}": Add the new feature
			"${COMMAND_REMOVE_FEATURE}": Remove the existing feature
			"${COMMAND_EXTEND_FEATURE}": Modify an existing feature, altering its behavior or properties
			"${COMMAND_FIX_BUG}": Debug and fix problems, ensuring everything functions as intended

			NEVER use any external assets: image, base64, sprite or audio
			You can use these libraries without importing them: TWEEN, Mousetrap
			NEVER use alert! Write your message on Canvas directly
			Your "OUTPUT FORMAT" must be valid JavaScript code within a markdown code block
			It's crucial to follow these "COMMANDS" and "OUTPUT FORMAT" for the desired results
			`,
		},
		nextMessage,
	];

	try {
		const response = await openai.createChatCompletion({
			model,
			messages,
			max_tokens: Number.parseInt(maxTokens),
			temperature: Number.parseFloat(temperature),
		});

		const { message } = response.data.choices[0];

		if (message) {
			console.log("ORIGINAL OUTPUT");
			console.log(message.content);
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
