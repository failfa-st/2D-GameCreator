import { ChatCompletionRequestMessage } from "openai";
import { nanoid } from "nanoid";
import { openai } from "@/services/api/openai";
import { extractCode, miniPrompt } from "@/utils/prompt";

export async function toOpenAI({
	command = "CREATE_GAME",
	prompt = "extend the code",
	negativePrompt = "",
	temperature = "0.2",
	template = "",
	model = "gpt-3.5-turbo",
	maxTokens = "2048",
}) {
	const negativePrompt_ = negativePrompt.trim();
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

	const task = `${prompt_}${negativePrompt_ ? ` | not(${negativePrompt_})` : ""}`;

	try {
		const response = await openai.createChatCompletion({
			model,
			max_tokens: Number.parseInt(maxTokens),
			temperature: Number.parseFloat(temperature),
			messages: [
				{
					role: "system",
					content: miniPrompt`
					You are a skilled 2D game developer working with JavaScript on Canvas2D. 
					You understand and follow a set of "COMMANDS" to build and modify games. 

					- "CREATE_GAME": You initiate the development of a game. You consider the game type, environment, basic mechanics and extend the "TEMPLATE".
					- "ADD_FEATURE": You add new features to the game like power-ups, enemies, or levels.
					- "REMOVE_FEATURE": You can remove any existing feature from the game.
					- "UPDATE_FEATURE": You can modify an existing feature in the game, altering its behavior or properties.
					- "FIX_BUG": You debug and fix problems in the game, ensuring everything functions as intended.
					
					You NEVER use any (external) assets: image, base64, sprite or audio. 
					You can use these globally available libraries without importing them: TWEEN.
					Never use alert! Write your message on Canvas directly.
					You aim for high performance.
					Your "OUTPUT FORMAT" must be valid JavaScript code within a markdown code block.
					It's crucial to follow these "COMMANDS" and "OUTPUT FORMAT" for the desired results.
					`,
					// content: miniPrompt`
					// 	You are a 2D Game developer and use JavaScript to create full games on Canvas2D.
					// 	You can choose to add highscore, levels, player life, power ups, enemies.
					// 	You NEVER add assets like images or audio, everything you use is generated.
					// 	You use space key for jumping or shooting; arrow left, bottom, right for movement
					// 	You have a keen eye for performance optimization and are highly skilled in creating interactive experiences.
					// 	When working on new features, you follow the "ADD" guidelines, and when necessary, remove or exclude elements using "REMOVE".
					// 	You also pay close attention to "TEMPLATE" code, extending or fixing it as needed.
					// 	Your "OUTPUT FORMAT" must be exclusively valid JavaScript in a markdown code block, which you achieve by using the provided "TEMPLATE".
					// 	And remember, the "ADD", "REMOVE", "TEMPLATE", and "OUTPUT FORMAT" guidelines are crucial to follow for optimal results.
					// `,
				},
				nextMessage,
			],
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
