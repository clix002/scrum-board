import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type Maybe<T> = T | null;

export function isEmpty(value: unknown): boolean {
	if (value == null) return true;
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === "object") return Object.keys(value).length === 0;
	if (typeof value === "string") return value.length === 0;
	return false;
}
