import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "@/components/protected-route";
import { BoardPage, LoginPage, NotFoundPage, RegisterPage } from "@/pages";

export const routes = createBrowserRouter([
	{
		path: "*",
		Component: () => <NotFoundPage />,
	},
	{
		path: "/login",
		Component: () => <LoginPage />,
	},
	{
		path: "/register",
		Component: () => <RegisterPage />,
	},
	{
		path: "/",
		Component: () => (
			<ProtectedRoute>
				<BoardPage />
			</ProtectedRoute>
		),
	},
]);
