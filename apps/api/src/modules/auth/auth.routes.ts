import { createRoute } from "@hono/zod-openapi";
import {
	AuthResponseSchema,
	LoginSchema,
	RegisterSchema,
} from "@scrum-board/shared/schemas";

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
					schema: AuthResponseSchema,
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
					schema: AuthResponseSchema,
				},
			},
		},
	},
});
