import { Configuration, OpenAIApi } from "openai";
import process from "node:process";

export const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export const createClient = (apiKey: string) => {
	return new OpenAIApi(new Configuration({ apiKey }));
};
