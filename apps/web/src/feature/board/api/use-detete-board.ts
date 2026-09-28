import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";

type useDeleteBoardProps = {
	id: string;
};

export const UseDeleteBoardMutation = () => {
	return useMutation({
		mutationFn: async ({ id }: useDeleteBoardProps) => api.del(`/boards/${id}`),
		onSuccess: () => {
			toast.success("Board deleted successfully");
		},
		onError: () => {
			toast.error("An error occurred while deleting the board");
		},
	});
};
