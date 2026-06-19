import { randomUUIDv7 } from "bun";
import { isString } from "es-toolkit/predicate";
import { jwtVerify, SignJWT } from "jose";

const ACCESS_SECRET = () => new TextEncoder().encode(process.env.JWT_SECRET!);
const REFRESH_SECRET = () =>
	new TextEncoder().encode(process.env.REFRESH_SECRET!);

const ACCESS_DURATION = "15m";
const REFRESH_DURATION = "7d";

export const signAccessToken = async (userId: string) => {
	return await new SignJWT({ id: userId })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(ACCESS_DURATION)
		.sign(ACCESS_SECRET());
};

export const signRefreshToken = async (userId: string) => {
	return await new SignJWT({ id: userId, jti: randomUUIDv7() })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(REFRESH_DURATION)
		.sign(REFRESH_SECRET());
};

export const verifyAccessToken = async (token: string): Promise<string> => {
	const { payload } = await jwtVerify(token, ACCESS_SECRET());
	if (!isString(payload.id)) {
		throw new Error("Invalid token payload");
	}
	return payload.id;
};

export const verifyRefreshToken = async (token: string): Promise<string> => {
	const { payload } = await jwtVerify(token, REFRESH_SECRET());
	if (!isString(payload.id)) {
		throw new Error("Invalid token payload");
	}
	return payload.id;
};
