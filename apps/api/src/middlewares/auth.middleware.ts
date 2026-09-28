import { isString } from "es-toolkit/predicate";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { jwtVerify } from "jose";
import { ACCESS_COOKIE } from "@/modules/auth/auth.cookies";
import type { AppEnv } from "@/modules/auth/types";

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
	const token = getCookie(c, ACCESS_COOKIE);

	if (!token) {
		throw new HTTPException(401, {
			message: "Invalid Authorization header format",
		});
	}

	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);

		const { payload } = await jwtVerify(token, secret);

		if (!isString(payload.id) || payload.id.length === 0) {
			throw new HTTPException(401, {
				message: "Invalid token payload",
			});
		}

		c.set("jwtPayload", { id: payload.id });

		await next();
	} catch (_error) {
		throw new HTTPException(401, {
			message: "Invalid token",
		});
	}
});
