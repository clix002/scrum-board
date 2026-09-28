import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const NotFoundPage = () => {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<h1 className="text-2xl font-bold">404 - Page Not Found</h1>
			<p className="text-muted-foreground">
				The page you are looking for does not exist.
			</p>
			<Button asChild>
				<Link to="/">Go to Home</Link>
			</Button>
		</div>
	);
};
