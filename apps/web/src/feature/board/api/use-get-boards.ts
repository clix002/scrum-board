import { BoardSchema, paginatedResponseOf } from "@scrum-board/shared/schemas";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";
import { api } from "@/lib/api";

const BoardResponseSchema = paginatedResponseOf(BoardSchema);
type boardResponse = z.infer<typeof BoardResponseSchema>;

export const useGetBoardsQuery = () => {
	return useQuery({
		queryKey: ["boards"],
		queryFn: () => api.get<boardResponse>("/boards"),
	});
};
