import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // Los datos se consideran "frescos" por 5 minutos
			retry: 1, // Si falla una petición, reintenta 1 vez
		},
	},
});
