import { z } from "zod";

export const RegisterSchema = z.object({
	email: z.email(),
	name: z.string().min(2).max(50),
	password: z.string().min(8).max(72),
});

export const LoginSchema = z.object({
	email: z.email(),
	password: z.string().min(8).max(72),
});
