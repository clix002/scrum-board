import { z } from "zod";

export const BoardSchema = z.object({
	id: z.string(),
	name: z.string(),
	ownerId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CreateBoardSchema = z.object({
	name: z.string().min(1).max(100),
});

export const UpdateBoardSchema = z.object({
	name: z.string().min(1).max(100),
});
