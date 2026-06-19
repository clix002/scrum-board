import type { RouteHandler } from "@hono/zod-openapi";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import {
	ACCESS_COOKIE,
	clearAuthCookies,
	REFRESH_COOKIE,
	setAccessCookie,
	setRefreshCookie,
} from "./auth.cookies";
import { authRepository } from "./auth.repository";
import type {
	loginRoute,
	logoutRoute,
	meRoute,
	refreshRoute,
	registerRoute,
} from "./auth.routes";
import { loginUser, refreshSession, registerUser } from "./auth.service";
import { verifyAccessToken } from "./auth.tokens";

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

export const refreshHandler: RouteHandler<typeof refreshRoute> = async (c) => {
	const refreshToken = getCookie(c, REFRESH_COOKIE);
	if (!refreshToken) {
		throw new HTTPException(401, { message: "No refresh token" });
	}

	const { accessToken, refreshToken: newRefreshToken } =
		await refreshSession(refreshToken);

	setAccessCookie(c, accessToken);
	setRefreshCookie(c, newRefreshToken);

	return c.body(null, 204);
};

export const logoutHandler: RouteHandler<typeof logoutRoute> = async (c) => {
	clearAuthCookies(c);
	return c.body(null, 204);
};

export const meHandler: RouteHandler<typeof meRoute> = async (c) => {
	const token = getCookie(c, ACCESS_COOKIE);
	if (!token) {
		throw new HTTPException(401, { message: "Not authenticated" });
	}

	const userId = await verifyAccessToken(token);
	const user = await authRepository.findById(userId);

	if (!user) {
		throw new HTTPException(401, { message: "User not found" });
	}

	return c.json({ user }, 200);
};
