import { Configuration, OpenAIApi } from "openai";

export const createClient = (apiKey: string): OpenAIApi => {
	const configuration = new Configuration({ apiKey });

	// See https://github.com/openai/openai-node/issues/6#issuecomment-1492814621
	delete configuration.baseOptions.headers["User-Agent"];

	return new OpenAIApi(configuration);
};
