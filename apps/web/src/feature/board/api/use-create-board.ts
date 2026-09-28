import type { CreateBoardSchema } from "@scrum-board/shared/schemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { z } from "zod";
import { api } from "@/lib/api";

type BoardData = z.infer<typeof CreateBoardSchema>;

export const useCreateBoardMutation = () => {
	return useMutation({
		mutationFn: async (data: BoardData) => api.post("/boards", data),
		onSuccess: () => {
			toast.success("Board created successfully");
		},
		onError: () => {
			toast.error("An error occurred while creating the board");
		},
	});
};
