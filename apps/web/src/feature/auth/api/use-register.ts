import type {
	AuthResponseSchema,
	RegisterSchema,
} from "@scrum-board/shared/schemas";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { api } from "@/lib/api";

type RegisterData = z.infer<typeof RegisterSchema>;
type RegisterResponse = z.infer<typeof AuthResponseSchema>;

export const useRegisterMutation = () => {
	return useMutation({
		mutationFn: async (data: RegisterData): Promise<RegisterResponse> =>
			api.post<RegisterResponse>("/auth/register", data),
	});
};
