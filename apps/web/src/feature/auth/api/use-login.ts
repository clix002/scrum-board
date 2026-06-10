import type { LoginSchema } from "@scrum-board/shared/schemas";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";

type LoginData = z.infer<typeof LoginSchema>;

export const useLoginMutation = () => {
	return useMutation({
		mutationFn: async (data: LoginData) => {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Error al iniciar sesión");
			}
			return response.json();
		},
	});
};
