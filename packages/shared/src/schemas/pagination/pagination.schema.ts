import { z } from "zod";
export const PaginateInfoSchema = z.object({
	hasNextPage: z.boolean(),
	hasPrevPage: z.boolean(),
	limit: z.number(),
	nextPage: z.number().optional(),
	page: z.number(),
	prevPage: z.number().optional(),
	totalDocs: z.number(),
	totalPages: z.number(),
});

export function paginatedResponseOf<T extends z.ZodTypeAny>(itemSchema: T) {
	return z.object({
		docs: z.array(itemSchema),
		info: PaginateInfoSchema,
	});
}
