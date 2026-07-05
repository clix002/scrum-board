import { createRoute, z } from "@hono/zod-openapi";
import {
	BoardSchema,
	CreateBoardSchema,
	paginatedResponseOf,
	UpdateBoardSchema,
} from "@scrum-board/shared/schemas";

const ParamsSchema = z.object({
	id: z.string().openapi({
		param: {
			name: "id",
			in: "path",
		},
	}),
});

export const listBoardsRoute = createRoute({
	method: "get",
	path: "/",
	responses: {
		200: {
			description: "List of boards for the authenticated user",
			content: {
				"application/json": {
					schema: paginatedResponseOf(BoardSchema),
				},
			},
		},
	},
});

export const getBoardByIdRoute = createRoute({
	method: "get",
	path: "/{id}",
	request: {
		params: ParamsSchema,
	},
	responses: {
		200: {
			description: "Board details for the authenticated user",
			content: {
				"application/json": {
					schema: BoardSchema,
				},
			},
		},
	},
});

export const createBoardRoute = createRoute({
	method: "post",
	path: "/",
	request: {
		body: {
			content: { "application/json": { schema: CreateBoardSchema } },
		},
	},
	responses: {
		201: {
			description: "Board created successfully",
			content: { "application/json": { schema: BoardSchema } },
		},
	},
});

export const updateBoardRoute = createRoute({
	method: "put",
	path: "/{id}",
	request: {
		params: ParamsSchema,
		body: {
			content: { "application/json": { schema: UpdateBoardSchema } },
		},
	},
	responses: {
		200: {
			description: "Board updated successfully",
			content: { "application/json": { schema: BoardSchema } },
		},
	},
});

export const deleteBoardRoute = createRoute({
	method: "delete",
	path: "/{id}",
	request: { params: ParamsSchema },
	responses: {
		204: {
			description: "Board deleted successfully",
		},
	},
});
