import { describe, expect, it } from "bun:test";
import { OpenAPIHono } from "@hono/zod-openapi";
import { meHandler } from "../auth.handlers";
import { meRoute } from "../auth.routes";

const testApp = new OpenAPIHono();
testApp.openapi(meRoute, meHandler);

describe("GET /auth/me", () => {
	it("responds 401 without access cookie", async () => {
		const res = await testApp.request("/me");
		expect(res.status).toBe(401);
	});
});
