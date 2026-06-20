import { beforeEach, describe, expect, it } from "bun:test";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { rateLimit, resetRateLimits } from "@/middlewares/rate-limit";

const dummyRoute = createRoute({
	method: "post",
	path: "/login",
	responses: {
		200: {
			description: "ok",
		},
	},
});

const testApp = new OpenAPIHono();
testApp.use("/login", rateLimit);
testApp.openapi(dummyRoute, async (c) => c.json({ ok: true }));

const fireRequest = async (headers: Record<string, string> = {}) => {
	return testApp.request("/login", { method: "POST", headers });
};

describe("rate limiter", () => {
	beforeEach(() => {
		resetRateLimits();
	});

	it("allows up to 5 requests within the window", async () => {
		for (let i = 0; i < 5; i++) {
			const res = await fireRequest();
			expect(res.status).not.toBe(429);
		}
	});

	it("returns 429 on the 6th request", async () => {
		for (let i = 0; i < 5; i++) {
			await fireRequest();
		}
		const sixth = await fireRequest();
		expect(sixth.status).toBe(429);
		expect(sixth.headers.get("Retry-After")).not.toBeNull();
	});

	it("isolates requests by client IP", async () => {
		for (let i = 0; i < 5; i++) {
			await fireRequest();
		}
		const isolated = await fireRequest({ "x-forwarded-for": "10.0.0.1" });
		expect(isolated.status).not.toBe(429);
	});
});
