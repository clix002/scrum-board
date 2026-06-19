import { createRoute, z } from "@hono/zod-openapi";
import {
	AuthResponseSchema,
	LoginSchema,
	RegisterSchema,
	UserResponseSchema,
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

export const refreshRoute = createRoute({
	method: "post",
	path: "/refresh",
	responses: {
		204: {
			description: "Session refreshed, new tokens set in cookies",
		},
	},
});

export const logoutRoute = createRoute({
	method: "post",
	path: "/logout",
	responses: {
		204: {
			description: "Cookies cleared",
		},
	},
});

export const meRoute = createRoute({
	method: "get",
	path: "/me",
	responses: {
		200: {
			description: "Current authenticated user",
			content: {
				"application/json": {
					schema: z.object({
						user: UserResponseSchema,
					}),
				},
			},
		},
		401: {
			description: "No active session",
		},
	},
});
