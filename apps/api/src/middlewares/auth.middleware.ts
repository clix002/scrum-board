import { isString } from "es-toolkit/predicate";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { jwtVerify } from "jose";
import type { AppEnv } from "@/types";

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
	const authHeader = c.req.header("Authorization");

	if (!authHeader) {
		throw new HTTPException(401, {
			message: "No Authorization header provided",
		});
	}
	const token = authHeader.split(" ")[1];

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
