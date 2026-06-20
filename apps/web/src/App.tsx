import { RouterProvider } from "react-router";
import { Root } from "@/components/root";
import { routes } from "./routes";

function App() {
	return (
		<Root>
			<RouterProvider router={routes} />
		</Root>
	);
}

export default App;
