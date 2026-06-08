import type { z } from "@hono/zod-openapi";
import type { LoginSchema, RegisterSchema } from "@scrum-board/shared/schemas";
import { HTTPException } from "hono/http-exception";
import { SignJWT } from "jose";
import { prisma } from "@/db/connections";

export const registerUser = async (data: z.infer<typeof RegisterSchema>) => {
	const { email, password, name } = data;

	const existingUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser) {
		throw new HTTPException(400, { message: "User already exists" });
	}

	const hashedPassword = await Bun.password.hash(password);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			password: hashedPassword,
		},
	});

	const secret = new TextEncoder().encode(process.env.JWT_SECRET);
	const token = await new SignJWT({ id: user.id })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("2h")
		.sign(secret);

	return {
		user,
		token,
	};
};

export const loginUser = async (data: z.infer<typeof LoginSchema>) => {
	const { email, password } = data;

	const user = await prisma.user.findFirstOrThrow({
		where: {
			email,
		},
	});

	const isPasswordValid = await Bun.password.verify(password, user.password);

	if (!isPasswordValid) {
		throw new HTTPException(400, { message: "Invalid credentials" });
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET);
	const token = await new SignJWT({ id: user.id })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("2h")
		.sign(secret);

	return {
		user,
		token,
	};
};
