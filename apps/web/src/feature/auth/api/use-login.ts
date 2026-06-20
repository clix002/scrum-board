import type {
	AuthResponseSchema,
	LoginSchema,
} from "@scrum-board/shared/schemas";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { api } from "@/lib/api";

type LoginData = z.infer<typeof LoginSchema>;
type LoginResponse = z.infer<typeof AuthResponseSchema>;

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (data: LoginData): Promise<LoginResponse> =>
			api.post<LoginResponse>("/auth/login", data),
	});
};
