import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useLogoutMutation = () => {
	return useMutation({
		mutationFn: async (): Promise<void> => api.post<void>("/auth/logout"),
	});
};
