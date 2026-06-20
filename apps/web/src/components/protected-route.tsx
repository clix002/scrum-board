import { Navigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user } = useAuthStore();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};
