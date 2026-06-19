import type { RegisterSchema } from "@scrum-board/shared/schemas";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";

type RegisterData = z.infer<typeof RegisterSchema>;

export const useRegisterMutation = () => {
	return useMutation({
		mutationFn: async (data: RegisterData) => {
			const response = await fetch(
				`${import.meta.env.BACKEND_URL}/auth/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Error al registrar el usuario");
			}
			return response.json();
		},
	});
};
