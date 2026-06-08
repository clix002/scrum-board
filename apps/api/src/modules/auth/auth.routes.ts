import { createRoute, z } from "@hono/zod-openapi";
import { LoginSchema, RegisterSchema } from "@scrum-board/shared/schemas";

export const registerRoute = createRoute({
	method: "post",
	path: "/register",
	request: {
		body: {
			content: {
				"application/json": {
					schema: RegisterSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: "User registered successfully",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						token: z.string(),
					}),
				},
			},
		},
	},
});

export const loginRoute = createRoute({
	method: "post",
	path: "/login",
	request: {
		body: {
			content: {
				"application/json": {
					schema: LoginSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: "User logged in successfully",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						token: z.string(),
					}),
				},
			},
		},
	},
});
