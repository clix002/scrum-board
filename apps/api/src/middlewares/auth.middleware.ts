import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { jwtVerify } from "jose";

type Env = {
	Variables: {
		jwtPayload: { id: string };
	};
};

export const authMiddleware = createMiddleware(async (c, next) => {
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

		const payload = await jwtVerify(token, secret);

		c.set("jwtPayload", payload as unknown as { id: string });

		await next();
	} catch (error) {
		throw new HTTPException(401, {
			message: "Invalid token",
		});
	}
});
