import { z } from "zod";

export const RegisterSchema = z
	.object({
		email: z.email(),
		name: z.string().min(2).max(50),
		password: z.string().min(8).max(72),
		confirmPassword: z.string().min(8).max(72),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		error: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const LoginSchema = z.object({
	email: z.email(),
	password: z.string().min(8).max(72),
});
