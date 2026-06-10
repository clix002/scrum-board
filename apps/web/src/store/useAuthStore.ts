import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Maybe } from "@/lib/utils";

type User = {
	id: string;
	email: string;
	name: string;
};

type Auth = {
	token: string;
	user: User;
};

type AuthState = {
	token: Maybe<string>;
	user: Maybe<User>;
	setAuth: (auth: Auth) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			user: null,

			setAuth: ({ token, user }) =>
				set({
					token,
					user,
				}),
			logout: () =>
				set({
					token: null,
					user: null,
				}),
		}),
		{
			name: "auth-storage",
		},
	),
);
