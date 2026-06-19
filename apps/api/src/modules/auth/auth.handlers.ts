import type { RouteHandler } from "@hono/zod-openapi";
import { setAccessCookie, setRefreshCookie } from "./auth.cookies";
import type { loginRoute, registerRoute } from "./auth.routes";
import { loginUser, registerUser } from "./auth.service";

export const registerHandler: RouteHandler<typeof registerRoute> = async (
	c,
) => {
	const body = c.req.valid("json");

	const { accessToken, refreshToken, user } = await registerUser(body);

	setAccessCookie(c, accessToken);
	setRefreshCookie(c, refreshToken);

	return c.json(
		{
			message: "User registered successfully",
			user,
		},
		201,
	);
};

export const loginHandler: RouteHandler<typeof loginRoute> = async (c) => {
	const body = c.req.valid("json");
	const { accessToken, refreshToken, user } = await loginUser(body);

	setAccessCookie(c, accessToken);
	setRefreshCookie(c, refreshToken);

	return c.json(
		{
			message: "User logged in successfully",
			user,
		},
		200,
	);
};
