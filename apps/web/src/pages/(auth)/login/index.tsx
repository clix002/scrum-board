import { Navigate } from "react-router";
import { LoginForm } from "@/feature/auth/components/login-form";
import { useAuthStore } from "@/store/useAuthStore";

export const LoginPage = () => {
	const { token } = useAuthStore();

	if (token) {
		return <Navigate to="/board" replace />;
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
};
