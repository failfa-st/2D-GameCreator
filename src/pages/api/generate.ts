import { toOpenAI } from "@/services/api";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";
import process from "node:process";
import { createClient } from "@/services/api/openai";
import { CustomAxiosError } from "@/services/api/axios";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	switch (request.method) {
		case "POST":
			try {
				const client = createClient(process.env.OPENAI_API_KEY as string);

				const answer = await toOpenAI({ ...request.body, client });
				return response.status(200).json(answer);
			} catch (error) {
				return response.status((error as AxiosError).status ?? 500).json({
					message: (error as CustomAxiosError).data?.error?.message ?? "UNKNOWN",
				});
			}
		default:
			return response.status(405).json({});
	}
}
