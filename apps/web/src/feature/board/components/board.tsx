import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/feature/auth/api/use-logout";
import { useAuthStore } from "@/store/useAuthStore";

export const Board = () => {
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
			<SidebarInset>
				<Header handleLogout={handleLogout} />
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
					</div>
					<div className="flex-1 rounded-xl bg-muted/50 md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};
