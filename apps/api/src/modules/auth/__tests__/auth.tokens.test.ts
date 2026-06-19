import { describe, expect, it } from "bun:test";
import {
	signAccessToken,
	signRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
} from "../auth.tokens";

describe("auth.tokens", () => {
	it("access token roundtrips userId", async () => {
		const token = await signAccessToken("user-123");
		const userId = await verifyAccessToken(token);
		expect(userId).toBe("user-123");
	});

	it("refresh token roundtrips userId", async () => {
		const token = await signRefreshToken("user-456");
		const userId = await verifyRefreshToken(token);
		expect(userId).toBe("user-456");
	});

	it("rejects garbage tokens", async () => {
		await expect(verifyAccessToken("not.a.token")).rejects.toThrow();
	});

	it("refresh secret can't verify access token", async () => {
		const token = await signAccessToken("user-123");
		await expect(verifyRefreshToken(token)).rejects.toThrow();
	});
});
