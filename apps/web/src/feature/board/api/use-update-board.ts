import type {
	BoardSchema,
	UpdateBoardSchema,
} from "@scrum-board/shared/schemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { z } from "zod";
import { api } from "@/lib/api";

type UpdateData = z.infer<typeof UpdateBoardSchema>;
type Board = z.infer<typeof BoardSchema>;

type useUpdateBoardProps = {
	id: string;
	data: UpdateData;
};

export const useUpdateBoard = () => {
	return useMutation({
		mutationFn: async ({ data, id }: useUpdateBoardProps) =>
			api.put<Board>(`/boards/${id}`, data),
		onSuccess: () => {
			toast.success("Board updated successfully");
		},
		onError: () => {
			toast.error("An error occurred while updating the board");
		},
	});
};
