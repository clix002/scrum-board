import type { RouteHandler } from "@hono/zod-openapi";
import type { loginRoute, registerRoute } from "./auth.routes";
import { loginUser, registerUser } from "./auth.service";

export const registerHandler: RouteHandler<typeof registerRoute> = async (
	c,
) => {
	const body = c.req.valid("json");

	const { accessToken, refreshToken, user } = await registerUser(body);

	return c.json(
		{
			message: "User registered successfully",
			accessToken,
			refreshToken,
			user,
		},
		201,
	);
};

export const loginHandler: RouteHandler<typeof loginRoute> = async (c) => {
	const body = c.req.valid("json");
	const { accessToken, refreshToken, user } = await loginUser(body);

	return c.json(
		{
			message: "User logged in successfully",
			accessToken,
			refreshToken,
			user,
		},
		200,
	);
};
