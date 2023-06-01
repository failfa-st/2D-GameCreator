import { AxiosError } from "axios";

export interface CustomAxiosError extends AxiosError {
	data?: {
		error?: {
			message?: string;
			code?: string;
		};
	};
}
