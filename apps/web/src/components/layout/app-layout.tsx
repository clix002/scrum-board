import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/feature/auth/api/use-logout";
import { useAuthStore } from "@/store/useAuthStore";

export const AppLayout = () => {
	const navigate = useNavigate();
	const { clearUser } = useAuthStore();

	const { mutate: logoutMutation } = useLogoutMutation();

	const handleLogout = () => {
		logoutMutation(undefined, {
			onSuccess: () => {
				clearUser();
				navigate("/login");
			},
			onError: (error) => {
				toast.error(error.message || "An error occurred while logging out");
			},
		});
	};
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="px-4">
				<Header handleLogout={handleLogout} />
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
};
