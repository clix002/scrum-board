import { describe, expect, it } from "bun:test";
import { refreshSession } from "../auth.service";
import { signRefreshToken } from "../auth.tokens";

describe("auth.service.refreshSession", () => {
	it("regenerates new tokens from a valid refresh token", async () => {
		const refreshToken = await signRefreshToken("user-abc");

		const { accessToken, refreshToken: newRefresh } =
			await refreshSession(refreshToken);

		expect(accessToken).toBeString();
		expect(newRefresh).toBeString();
		expect(newRefresh).not.toBe(refreshToken);
	});

	it("rejects a garbage refresh token", async () => {
		await expect(refreshSession("not.a.token")).rejects.toThrow();
	});
});
