import { Configuration, OpenAIApi } from "openai";

export const createClient = (apiKey: string): OpenAIApi => {
	return new OpenAIApi(new Configuration({ apiKey }));
};
