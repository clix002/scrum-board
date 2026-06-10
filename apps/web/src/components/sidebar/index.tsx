import type * as React from "react";
import { Link } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{
			url: "#",
			items: [
				{
					title: "My Tasks",
					url: "#",
				},
				{
					title: "Boards",
					url: "#",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<h2 className="text-lg font-semibold">Scrum-Board</h2>
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroupContent
						key={`${item.url}-${item.items[0]?.title ?? "group"}`}
					>
						<SidebarMenu>
							{item.items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>{item.title}</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
