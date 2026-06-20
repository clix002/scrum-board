import type { UserResponseSchema } from "@scrum-board/shared/schemas";
import type { z } from "zod";
import { create } from "zustand";
import type { Maybe } from "@/lib/utils";

type User = z.infer<typeof UserResponseSchema>;

type AuthState = {
	user: Maybe<User>;
	setUser: (user: User) => void;
	clearUser: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
	user: null,

	setUser: (user) =>
		set({
			user,
		}),
	clearUser: () =>
		set({
			user: null,
		}),
}));
