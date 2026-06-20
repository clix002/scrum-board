import { BadgeCheckIcon, CreditCardIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AppSidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLogoutMutation } from "@/feature/auth/api/use-logout";
import { useAuthStore } from "@/store/useAuthStore";

export const BoardPage = () => {
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
				toast.error(error.message || "Error al cerrar sesión");
			},
		});
	};

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<div className="flex justify-between items-center w-full">
						<Input className="max-w-sm" placeholder="Search..." />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-full">
									<Avatar>
										<AvatarImage
											src="https://github.com/shadcn.png"
											alt="shadcn"
										/>
										<AvatarFallback>LR</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuGroup>
									<DropdownMenuItem onSelect={handleLogout}>
										<BadgeCheckIcon />
										Log out
									</DropdownMenuItem>
									<DropdownMenuItem>
										<CreditCardIcon />
										Theme
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
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
