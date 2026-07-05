import type { z } from "@hono/zod-openapi";
import type { CreateBoardSchema } from "@scrum-board/shared/schemas";
import { HTTPException } from "hono/http-exception";
import type { PaginateOptions } from "@/lib/pagination/types";
import { boardRepository } from "./board.repository";

export const boardService = {
	listByUser(userId: string, opts: PaginateOptions) {
		return boardRepository.findPaginatedByUserId(userId, opts);
	},
	async getById(id: string, userId: string) {
		const board = await boardRepository.findById(id);
		if (!board) throw new HTTPException(404, { message: "Board not found" });
		if (board.ownerId !== userId)
			throw new HTTPException(403, { message: "Not authorized" });
		return board;
	},

	async create(userId: string, data: z.infer<typeof CreateBoardSchema>) {
		return await boardRepository.create({
			name: data.name,
			owner: {
				connect: {
					id: userId,
				},
			},
		});
	},

	async update(
		id: string,
		userId: string,
		data: z.infer<typeof CreateBoardSchema>,
	) {
		const board = await boardRepository.findById(id);
		if (!board) throw new HTTPException(404, { message: "Board not found" });
		if (board.ownerId !== userId)
			throw new HTTPException(403, { message: "Not authorized" });

		return boardRepository.update(id, data);
	},

	async remove(id: string, userId: string) {
		const board = await boardRepository.findById(id);
		if (!board) throw new HTTPException(404, { message: "Board not found" });
		if (board.ownerId !== userId)
			throw new HTTPException(403, { message: "Not authorized" });

		return boardRepository.delete(id);
	},
};
