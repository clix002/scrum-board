import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

type Bucket = {
	timestamps: number[];
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10_000;
const MAX_REQUESTS = 5;

const getClientKey = (c: Context): string => {
	const forwarded = c.req.header("x-forwarded-for");
	if (forwarded) {
		return forwarded.split(",")[0].trim();
	}
	const realIp = c.req.header("x-real-ip");
	if (realIp) return realIp;
	return "unknown";
};

const cleanupExpiredTimestamps = (
	timestamps: number[],
	now: number,
): number[] => timestamps.filter((t) => now - t < WINDOW_MS);

export const rateLimit = async (c: Context, next: Next) => {
	const key = getClientKey(c);
	const now = Date.now();

	const bucket = buckets.get(key);
	const timestamps = bucket
		? cleanupExpiredTimestamps(bucket.timestamps, now)
		: [];

	if (timestamps.length >= MAX_REQUESTS) {
		const retryAfter = Math.ceil((WINDOW_MS - (now - timestamps[0])) / 1000);
		c.header("Retry-After", retryAfter.toString());
		throw new HTTPException(429, {
			message: "Too many requests. Please try again later.",
		});
	}

	timestamps.push(now);
	buckets.set(key, { timestamps });

	await next();
};

export const resetRateLimits = () => buckets.clear();
