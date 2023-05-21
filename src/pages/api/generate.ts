import { toOpenAI } from "@/services/api";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	switch (request.method) {
		case "POST":
			try {
				const answer = await toOpenAI(request.body);
				return response.status(200).json(answer);
			} catch (error) {
				return response.status((error as AxiosError).status ?? 500).json(error);
			}
		default:
			return response.status(405).json({});
	}
}
