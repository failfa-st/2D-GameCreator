import { Configuration, OpenAIApi } from "openai";

export const createClient = (apiKey: string) => {
	return new OpenAIApi(new Configuration({ apiKey }));
};
