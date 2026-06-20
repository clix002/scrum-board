import type { UserResponseSchema } from "@scrum-board/shared/schemas";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";
import { ApiError, api } from "@/lib/api";

export type MeResponse = { user: z.infer<typeof UserResponseSchema> };

export const ME_QUERY_KEY = ["me"] as const;

export const useMe = () => {
	return useQuery({
		queryKey: ME_QUERY_KEY,
		queryFn: async (): Promise<MeResponse> => api.get<MeResponse>("/auth/me"),
		retry: (failureCount, error) => {
			if (error instanceof ApiError && error.status === 401) return false;
			return failureCount < 2;
		},
		staleTime: 5 * 60 * 1000,
	});
};
