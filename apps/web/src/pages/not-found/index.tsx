import { Link } from "react-router";

export const NotFoundPage = () => {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<h1 className="text-2xl font-bold">404 - Page Not Found</h1>
			<p className="text-muted-foreground">
				The page you are looking for does not exist.
			</p>
			<Link
				to="/"
				className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
			>
				Go to Home
			</Link>
		</div>
	);
};
