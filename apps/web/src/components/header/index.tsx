import { LogOutIcon, Monitor, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { useTheme } from "../theme-provider";
import { Separator } from "../ui/separator";

type HeaderProps = {
	handleLogout: () => void;
};

const themeOptions = [
	{ key: "light" as const, icon: <Sun />, label: "Light" },
	{ key: "dark" as const, icon: <Moon />, label: "Dark" },
	{ key: "system" as const, icon: <Monitor />, label: "System" },
];

export const Header = ({ handleLogout }: HeaderProps) => {
	const { user } = useAuthStore();
	const { setTheme } = useTheme();
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1" />
			<div className="flex justify-between items-center w-full">
				<Input className="max-w-sm" placeholder="Search..." />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<Avatar>
								<AvatarImage src={user?.avatarUrl ?? ""} alt="user" />
								<AvatarFallback>
									{user?.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuItem disabled>
								<h3 className="text-muted-foreground">{user?.name}</h3>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<Separator className="my-1" />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={handleLogout}>
								<LogOutIcon />
								Log out
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>Themes</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									{themeOptions.map(({ key, icon, label }) => (
										<DropdownMenuItem key={key} onClick={() => setTheme(key)}>
											{icon}
											{label}
										</DropdownMenuItem>
									))}
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
